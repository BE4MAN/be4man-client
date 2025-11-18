import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import CustomSelect from '@/components/auth/CustomSelect';
import Textarea from '@/components/common/Textarea';
import { RequiredAsterisk } from '@/components/schedule/commonStyles';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import { DEPARTMENT_REVERSE_MAP } from '@/constants/accounts';
import { mockProblems, mockProblemCategories } from '@/mock/problem';
import { useAuthStore } from '@/stores/authStore';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import * as S from './ProblemFormPage.styles';

const IMPORTANCE_OPTIONS = [
  { value: 'HIGH', label: '상' },
  { value: 'MEDIUM', label: '중' },
  { value: 'LOW', label: '하' },
];

export default function ProblemFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const problemId = location.state?.problemId;
  const isEditMode = !!problemId;

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    importance: 'MEDIUM',
    description: '',
    deploymentIds: [],
    service: '',
  });
  const [deployments, setDeployments] = useState([]);
  const [errors, setErrors] = useState({
    title: '',
    categoryId: '',
    importance: '',
    description: '',
  });
  const [touched, setTouched] = useState({
    title: false,
    categoryId: false,
    importance: false,
    description: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드일 때 기존 문제 데이터 로드
  useEffect(() => {
    if (isEditMode && problemId) {
      const problem = mockProblems.find((p) => p.id === problemId);
      if (problem) {
        setFormData({
          title: problem.title || '',
          categoryId: problem.category?.id || '',
          importance: problem.importance || 'MEDIUM',
          description: problem.description || '',
          deploymentIds: problem.deployments || [],
          service:
            problem.services && problem.services.length > 0
              ? problem.services[0]
              : '',
        });
      }
    }
  }, [isEditMode, problemId]);

  // 배포 목록 조회
  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        // TODO: 실제 API 연동 시 problemAPI.getDeployments() 사용
        // const data = await problemAPI.getDeployments();
        // setDeployments(data);

        // Mock data 사용
        const mockDeployments = [
          { id: 290, title: '유저 서비스 v2.1.0 배포' },
          { id: 289, title: '결제 서비스 v1.5.2 배포' },
          { id: 288, title: '검색 서비스 v3.0.1 배포' },
          { id: 287, title: '알림 서비스 v1.2.0 배포' },
          { id: 286, title: 'API 게이트웨이 v2.3.0 배포' },
          { id: 285, title: '부사 서비스 v1.0.5 배포' },
          { id: 284, title: '유저 서비스 v2.0.9 배포' },
          { id: 283, title: '결제 서비스 v1.5.1 배포' },
          { id: 282, title: '검색 서비스 v2.9.8 배포' },
          { id: 281, title: '알림 서비스 v1.1.9 배포' },
          { id: 280, title: 'API 게이트웨이 v2.2.7 배포' },
        ];
        setDeployments(mockDeployments);
      } catch (error) {
        console.error('배포 목록 조회 실패:', error);
      }
    };

    fetchDeployments();
  }, []);

  const categoryOptions = mockProblemCategories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  const deploymentOptions = deployments.map((dep) => ({
    value: dep.id,
    label: dep.title,
  }));

  // 서비스 목록 (mockProblems에서 추출)
  const availableServices = useMemo(() => {
    const servicesSet = new Set();
    // TODO: 실제 API 연동 시 서비스 목록 API 사용
    const mockProblems = [
      { services: ['유저 서비스'] },
      { services: ['결제 서비스'] },
      { services: ['검색 서비스'] },
      { services: ['알림 서비스'] },
      { services: ['부사 서비스'] },
      { services: ['API 게이트웨이'] },
    ];
    mockProblems.forEach((problem) => {
      if (problem.services && Array.isArray(problem.services)) {
        problem.services.forEach((service) => servicesSet.add(service));
      }
    });
    return Array.from(servicesSet)
      .sort()
      .map((service) => ({ value: service, label: service }));
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        return !value || value.trim() === '' ? '제목을 입력해주세요' : '';
      case 'categoryId':
        return !value || value === '' ? '문제 유형을 선택해주세요' : '';
      case 'importance':
        return !value || value === '' ? '중요도를 선택해주세요' : '';
      case 'description':
        return !value || value.trim() === '' ? '설명을 입력해주세요' : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleDeploymentChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, deploymentIds: selectedIds }));
  };

  const validateForm = () => {
    const newErrors = {
      title: validateField('title', formData.title),
      categoryId: validateField('categoryId', formData.categoryId),
      importance: validateField('importance', formData.importance),
      description: validateField('description', formData.description),
    };
    setErrors(newErrors);
    setTouched({
      title: true,
      categoryId: true,
      importance: true,
      description: true,
    });
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // 필수 필드 검증 (등록 버튼 활성화 여부)
  const isFormValid = useMemo(() => {
    return (
      formData.title.trim() !== '' &&
      formData.categoryId !== '' &&
      formData.importance !== '' &&
      formData.description.trim() !== ''
    );
  }, [
    formData.title,
    formData.categoryId,
    formData.importance,
    formData.description,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const problemData = {
        categoryId: Number.parseInt(formData.categoryId, 10),
        title: formData.title.trim(),
        description: formData.description.trim(),
        importance: formData.importance,
        deploymentIds: formData.deploymentIds,
      };

      if (isEditMode) {
        // 수정 모드
        // TODO: 실제 API 연동 시 주석 해제
        // await problemAPI.updateProblem(problemId, problemData);
        console.log('문제 수정:', problemId, problemData);
      } else {
        // 생성 모드
        // TODO: 실제 API 연동 시 주석 해제
        // await problemAPI.createProblem(problemData);
        console.log('문제 생성:', problemData);
      }

      // 성공 시 문제 목록으로 이동
      navigate(PATHS.PROBLEMS);
    } catch (error) {
      console.error(isEditMode ? '문제 수정 실패:' : '문제 생성 실패:', error);
      alert(
        isEditMode
          ? '문제 수정에 실패했습니다. 다시 시도해주세요.'
          : '문제 생성에 실패했습니다. 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(PATHS.PROBLEMS);
  };

  return (
    <S.PageContainer>
      <S.Panel>
        <S.PageTitle>{isEditMode ? '문제 수정' : '문제 생성'}</S.PageTitle>

        <S.Toolbar>
          <SecondaryBtn onClick={handleCancel}>취소</SecondaryBtn>
          <PrimaryBtn
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
          >
            등록
          </PrimaryBtn>
        </S.Toolbar>

        <S.FormContainer>
          <S.MetaTable role="table">
            <S.MetaColGroup>
              <col />
              <col />
              <col />
              <col />
            </S.MetaColGroup>

            <S.MetaRow>
              <S.MetaTh>등록자</S.MetaTh>
              <S.MetaTdText>{user?.name || ''}</S.MetaTdText>
              <S.MetaTh>등록부서</S.MetaTh>
              <S.MetaTdText>
                {user?.department
                  ? DEPARTMENT_REVERSE_MAP[user.department] || user.department
                  : '없음'}
              </S.MetaTdText>
            </S.MetaRow>

            <S.MetaRow>
              <S.MetaTh>
                제목 <RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTdTitle>
                <S.Input
                  placeholder="문제 사례의 제목을 입력하세요"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  onBlur={() => handleBlur('title')}
                  $hasError={touched.title && errors.title}
                />
              </S.MetaTdTitle>
              <S.MetaTh>
                문제 유형 <RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTd>
                <CustomSelect
                  value={formData.categoryId}
                  onChange={(value) => handleFieldChange('categoryId', value)}
                  onBlur={() => handleBlur('categoryId')}
                  options={categoryOptions}
                  placeholder="문제 유형을 선택하세요"
                />
              </S.MetaTd>
            </S.MetaRow>

            <S.MetaRow>
              <S.MetaTh>
                중요도 <RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTd>
                <CustomSelect
                  value={formData.importance}
                  onChange={(value) => handleFieldChange('importance', value)}
                  onBlur={() => handleBlur('importance')}
                  options={IMPORTANCE_OPTIONS}
                  placeholder="중요도를 선택하세요"
                />
              </S.MetaTd>
              <S.MetaTh>관련 배포</S.MetaTh>
              <S.MetaTd>
                <ScheduleCustomSelect
                  value={formData.deploymentIds}
                  onChange={handleDeploymentChange}
                  options={deploymentOptions}
                  placeholder="관련 배포를 선택하세요"
                  multiple
                />
              </S.MetaTd>
            </S.MetaRow>

            <S.MetaRow>
              <S.MetaTh>관련 서비스</S.MetaTh>
              <S.MetaTd colSpan={3}>
                <CustomSelect
                  value={formData.service}
                  onChange={(value) => handleFieldChange('service', value)}
                  options={availableServices}
                  placeholder="관련 서비스를 선택하세요"
                />
              </S.MetaTd>
            </S.MetaRow>

            <S.MetaRow>
              <S.MetaTh>
                설명 <RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTdDescription colSpan={3}>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange('description', e.target.value)
                  }
                  onBlur={() => handleBlur('description')}
                  placeholder="문제의 발생 상황, 예방법 등 설명을 입력하세요."
                  rows={6}
                />
              </S.MetaTdDescription>
            </S.MetaRow>
          </S.MetaTable>
        </S.FormContainer>
      </S.Panel>
    </S.PageContainer>
  );
}
