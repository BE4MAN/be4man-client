import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { PrimaryBtn } from '@/styles/modalButtons';

import { ProblemCaseDetailModal } from '../components/ProblemCaseDetailModal';
import { ProblemCaseList } from '../components/ProblemCaseList';
import { ProblemTypeModal } from '../components/ProblemTypeModal';
import { ProblemTypeTree } from '../components/ProblemTypeTree';

import * as S from './ProblemManagement.styles';

export default function ProblemManagement() {
  const navigate = useNavigate();
  const [selectedProblemType, setSelectedProblemType] = useState(null);
  const [selectedProblemCase, setSelectedProblemCase] = useState(null);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const handleCreateProblem = () => {
    navigate(PATHS.PROBLEM_NEW);
  };

  const handleAddType = (categoryData) => {
    // TODO: 실제 API 연동 시 problemAPI.createProblemCategory() 사용
    console.log('문제 카테고리 생성:', categoryData);
    // 성공 시 목록 새로고침 또는 상태 업데이트
  };

  return (
    <S.Container>
      <S.MainContent>
        <S.ActionBar>
          <PrimaryBtn onClick={handleCreateProblem}>문제 생성</PrimaryBtn>
        </S.ActionBar>

        <S.ContentArea>
          <S.ListContainer>
            <ProblemCaseList
              selectedCaseId={selectedProblemCase}
              onSelectCase={setSelectedProblemCase}
            />
          </S.ListContainer>

          {/* TODO: Step 6에서 ProblemCaseDetail 추가 */}
        </S.ContentArea>
      </S.MainContent>

      {/* Right panel - Problem Types */}
      <ProblemTypeTree
        selectedType={selectedProblemType}
        onSelectType={setSelectedProblemType}
        onSelectCase={setSelectedProblemCase}
        onAddType={() => setIsTypeModalOpen(true)}
      />

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
