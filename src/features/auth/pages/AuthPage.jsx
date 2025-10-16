import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { useState } from 'react';
import logo from '/icons/logo.svg';

import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import Modal from '@/components/auth/Modal';
import Select from '@/components/auth/Select';

import { useAuth } from '../hooks/useAuth';

import * as S from './AuthPage.styles';

const POSITIONS = [
  { value: '본부장', label: '본부장' },
  { value: '차장', label: '차장' },
  { value: '과장', label: '과장' },
  { value: '대리', label: '대리' },
  { value: '사원', label: '사원' },
];

export default function AuthPage() {
  const { loginWithGithub, completeRegistration } = useAuth();
  const [step, setStep] = useState(1);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
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

  const handleGithubLogin = async () => {
    try {
      const user = await loginWithGithub();
      setGithubUser(user);
      setFormData((prev) => ({ ...prev, email: user.email }));
      setStep(2);
    } catch (error) {
      console.error('GitHub login error:', error);
    }
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
        await completeRegistration({
          ...githubUser,
          name: formData.name,
          position: formData.position,
          department: formData.department,
          email: formData.email,
        });
      } catch (error) {
        console.error('Registration error:', error);
        setShowLoadingModal(false);
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
                      options={POSITIONS}
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
