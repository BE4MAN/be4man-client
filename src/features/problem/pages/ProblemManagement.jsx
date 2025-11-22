import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useCreateProblemCategoryMutation } from '@/hooks/useProblemQueries';
import { useAuthStore } from '@/stores/authStore';
import { PrimaryBtn } from '@/styles/modalButtons';

import { ProblemCaseDetailModal } from '../components/ProblemCaseDetailModal';
import { ProblemCaseList } from '../components/ProblemCaseList';
import { ProblemTypeModal } from '../components/ProblemTypeModal';

import * as S from './ProblemManagement.styles';

export default function ProblemManagement() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [selectedProblemCase, setSelectedProblemCase] = useState(null);

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const createCategoryMutation = useCreateProblemCategoryMutation();

  const handleCreateProblem = () => {
    navigate(PATHS.PROBLEM_NEW);
  };

  const handleAddType = async (categoryData) => {
    const payload = {
      title: categoryData.title,
      description: categoryData.description,
      projectId: categoryData.projectId,
      accountId: user?.accountId ?? user?.id,
    };

    await createCategoryMutation.mutateAsync(payload);
  };

  return (
    <S.Container>
      <S.MainContent>
        <S.ActionBar>
          <PrimaryBtn onClick={() => setIsTypeModalOpen(true)}>
            유형 생성
          </PrimaryBtn>
          <PrimaryBtn onClick={handleCreateProblem}>문제 생성</PrimaryBtn>
        </S.ActionBar>

        <S.ContentArea>
          <S.ListContainer>
            <ProblemCaseList
              selectedCaseId={selectedProblemCase}
              onSelectCase={setSelectedProblemCase}
            />
          </S.ListContainer>
        </S.ContentArea>
      </S.MainContent>

      <ProblemTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSave={handleAddType}
      />

      <ProblemCaseDetailModal
        isOpen={!!selectedProblemCase}
        onClose={() => setSelectedProblemCase(null)}
        problemId={selectedProblemCase}
      />
    </S.Container>
  );
}
