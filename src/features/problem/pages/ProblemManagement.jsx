import { Plus } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';

import { ProblemCaseList } from '../components/ProblemCaseList';
import { ProblemTypeTree } from '../components/ProblemTypeTree';

import * as S from './ProblemManagement.styles';

export default function ProblemManagement() {
  const [selectedProblemType, setSelectedProblemType] = useState(null);
  const [selectedProblemCase, setSelectedProblemCase] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const handleCreateProblem = () => {
    // TODO: Step 5에서 구현
    console.log('문제 생성');
  };

  return (
    <S.Container>
      <S.MainContent>
        <S.ActionBar>
          <Button variant="primary" onClick={handleCreateProblem}>
            <Plus size={16} />
            문제 생성
          </Button>
        </S.ActionBar>

        <S.ContentArea>
          <S.ListContainer>
            <ProblemCaseList
              filterByType={selectedProblemType}
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

      {/* TODO: Step 5에서 ProblemTypeModal 추가 */}
    </S.Container>
  );
}
