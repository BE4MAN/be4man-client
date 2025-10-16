import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '/icons/logo.svg';

import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import Modal from '@/components/auth/Modal';
import Select from '@/components/auth/Select';
import { POSITION_OPTIONS } from '@/constants/accounts';

import { useAuth } from '../hooks/useAuth';

import * as S from './AuthPage.styles';

export default function AuthPage() {
  const location = useLocation();
  const { loginWithGithub, completeRegistration } = useAuth();
  const [step, setStep] = useState(1);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [signToken, setSignToken] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: 'user@github.com',
  });
  const [errors, setErrors] = useState({
    name: '',
    position: '',
    email: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    position: false,
    email: false,
  });

  // AuthCallback에서 회원가입 필요 시 SignToken과 함께 리다이렉트
  useEffect(() => {
    // URL state에서 회원가입 필요 여부 확인
    if (location.state?.requiresSignup) {
      const token = sessionStorage.getItem('sign_token');
      if (token) {
        setSignToken(token);
        setStep(2);
      }
    }
  }, [location]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z가-힣\s]{2,30}$/;
    if (!name) return '이름을 입력해주세요';
    if (!nameRegex.test(name))
      return '이름은 2~30자의 한글 또는 영문이어야 합니다';
    return '';
  };

  const validatePosition = (position) => {
    if (!position) return '직급을 선택해주세요';
    if (position.length < 2 || position.length > 30)
      return '직급은 2~30자 이내여야 합니다';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '이메일을 입력해주세요';
    if (!emailRegex.test(email)) return '올바른 이메일 형식을 입력해주세요';
    return '';
  };

  const handleGithubLogin = () => {
    // GitHub OAuth 페이지로 리다이렉트
    loginWithGithub();
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    let error = '';
    if (field === 'name') error = validateName(value);
    if (field === 'position') error = validatePosition(value);
    if (field === 'email') error = validateEmail(value);

    setErrors({ ...errors, [field]: error });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async () => {
    const nameError = validateName(formData.name);
    const positionError = validatePosition(formData.position);
    const emailError = validateEmail(formData.email);

    setErrors({
      name: nameError,
      position: positionError,
      email: emailError,
    });

    setTouched({
      name: true,
      position: true,
      email: true,
    });

    if (!nameError && !positionError && !emailError) {
      setShowLoadingModal(true);

      try {
        // SignToken과 회원가입 정보로 실제 API 호출
        await completeRegistration(
          {
            name: formData.name,
            position: formData.position,
            department: formData.department,
            email: formData.email,
          },
          signToken,
        );

        // 성공 시 sessionStorage의 signToken 제거
        sessionStorage.removeItem('sign_token');
      } catch (error) {
        console.error('Registration error:', error);
        setShowLoadingModal(false);
        // TODO: 사용자에게 에러 메시지 표시
      }
    }
  };

  return (
    <S.PageContainer>
      <S.GradientBackground />

      <S.MainContainer>
        <S.Card>
          <AnimatePresence mode="wait">
            {/* Step 1: GitHub OAuth */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: -600, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -600, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <S.StepContainer>
                  <S.HeaderSection>
                    <S.Logo src={logo} alt="BE4MAN Logo" />
                  </S.HeaderSection>

                  <S.WelcomeSection>
                    <S.WelcomeTitle>배포맨</S.WelcomeTitle>
                    <S.WelcomeText>
                      안정적인 CI/CD 배포 환경 관리 서비스
                    </S.WelcomeText>
                  </S.WelcomeSection>

                  <Button
                    variant="github"
                    size="lg"
                    fullWidth
                    onClick={handleGithubLogin}
                  >
                    <Github size={24} />
                    깃허브 로그인
                  </Button>
                </S.StepContainer>
              </motion.div>
            )}

            {/* Step 2: User Information Form */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 600, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 600, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <S.StepContainer>
                  <S.FormSection>
                    <S.FormTitle>회원가입</S.FormTitle>
                  </S.FormSection>

                  <S.FormFields>
                    <Input
                      label="이름"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      onBlur={() => handleBlur('name')}
                      error={touched.name ? errors.name : ''}
                      size="lg"
                    />

                    <Select
                      label="직급"
                      placeholder="직급을 선택하세요"
                      value={formData.position}
                      onChange={(e) =>
                        handleInputChange('position', e.target.value)
                      }
                      onBlur={() => handleBlur('position')}
                      options={POSITION_OPTIONS}
                      error={touched.position ? errors.position : ''}
                      size="lg"
                    />

                    <Input
                      label="부서"
                      type="text"
                      placeholder="부서를 입력하세요"
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange('department', e.target.value)
                      }
                      size="lg"
                    />

                    <Input
                      label="이메일"
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      onBlur={() => handleBlur('email')}
                      error={touched.email ? errors.email : ''}
                      size="lg"
                    />
                  </S.FormFields>

                  <S.ButtonGroup>
                    <Button
                      variant="cancel"
                      size="lg"
                      onClick={() => setStep(1)}
                    >
                      취소
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleSubmit}>
                      가입
                    </Button>
                  </S.ButtonGroup>
                </S.StepContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </S.Card>
      </S.MainContainer>

      {/* Loading Modal */}
      <Modal
        isOpen={showLoadingModal}
        onClose={() => {}} // 모달을 닫지 않음
        showCloseButton={false}
        closeOnOverlayClick={false}
      >
        <S.LoadingSpinner />
        <S.ModalTitle>가입 완료!</S.ModalTitle>
        <S.ModalText>배포 페이지로 이동 중...</S.ModalText>
      </Modal>
    </S.PageContainer>
  );
}
