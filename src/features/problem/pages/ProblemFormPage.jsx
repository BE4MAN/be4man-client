// 작성자 : 김민호, 이원석
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import CustomSelect from '@/components/auth/CustomSelect';
import Textarea from '@/components/common/Textarea';
import { RequiredAsterisk } from '@/components/schedule/commonStyles';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import {
  useAllProblemCategoriesQuery,
  useDeploymentsQuery,
  useProblemQuery,
  useCreateProblemMutation,
  useUpdateProblemMutation,
} from '@/hooks/useProblemQueries';
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
    isSolved: false,
  });
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

  const { data: categories = [] } = useAllProblemCategoriesQuery();
  const { data: deployments = [] } = useDeploymentsQuery();
  const { data: problemDetail } = useProblemQuery(problemId, {
    enabled: isEditMode && !!problemId,
  });

  const createProblemMutation = useCreateProblemMutation();
  const updateProblemMutation = useUpdateProblemMutation(problemId);

  useEffect(() => {
    if (isEditMode && problemDetail) {
      setFormData({
        title: problemDetail.title || '',
        categoryId: problemDetail.categoryId
          ? String(problemDetail.categoryId)
          : '',
        importance: problemDetail.importance || 'MEDIUM',
        description: problemDetail.description || '',
        deploymentIds: problemDetail.deploymentIds || [],
        isSolved:
          typeof problemDetail.isSolved === 'boolean'
            ? problemDetail.isSolved
            : false,
      });
    }
  }, [isEditMode, problemDetail]);

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        value: String(cat.id),
        label: cat.title,
      })),
    [categories],
  );

  const deploymentOptions = deployments.map((dep) => ({
    value: dep.id,
    label: dep.title || dep.name || `#${dep.id}`,
  }));

  const validateField = (field, value) => {
    if (field === 'title') {
      return !value || value.trim() === '' ? '제목을 입력해주세요' : '';
    }
    if (field === 'categoryId') {
      return !value || value === '' ? '문제 유형을 선택해주세요' : '';
    }
    if (field === 'importance') {
      return !value || value === '' ? '중요도를 선택해주세요' : '';
    }
    if (field === 'description') {
      return !value || value.trim() === '' ? '설명을 입력해주세요' : '';
    }
    return '';
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
      if (isEditMode) {
        const updateData = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          importance: formData.importance,
          categoryId: Number.parseInt(formData.categoryId, 10),
          deploymentIds: formData.deploymentIds,
          accountId: user?.id || null,
          isSolved: formData.isSolved,
        };
        await updateProblemMutation.mutateAsync(updateData);
      } else {
        const createData = {
          categoryId: Number.parseInt(formData.categoryId, 10),
          title: formData.title.trim(),
          description: formData.description.trim(),
          importance: formData.importance,
          deploymentIds: formData.deploymentIds,
          accountId: user?.id || null,
          isSolved: formData.isSolved,
        };
        await createProblemMutation.mutateAsync(createData);
      }

      navigate(PATHS.PROBLEMS);
    } catch {
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
              <S.MetaTh>
                해결 여부<RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTdText>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.isSolved}
                    onChange={(e) =>
                      handleFieldChange('isSolved', e.target.checked)
                    }
                  />
                </label>
              </S.MetaTdText>
            </S.MetaRow>

            <S.MetaRow>
              <S.MetaTh>
                제목 <RequiredAsterisk>*</RequiredAsterisk>
              </S.MetaTh>
              <S.MetaTdTitle>
                <S.Input
                  placeholder="제목을 입력하세요"
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
