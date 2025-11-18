import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import Modal from '@/components/auth/Modal';
import Badge from '@/components/common/Badge';
import ServiceTag from '@/components/common/ServiceTag';
import { mockProblems, mockRegistrants } from '@/mock/problem';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import * as S from './ProblemCaseDetailModal.styles';

const getImportanceLabel = (importance) => {
  switch (importance) {
    case 'HIGH':
      return '상';
    case 'MEDIUM':
      return '중';
    case 'LOW':
      return '하';
    default:
      return importance;
  }
};

const getImportanceVariant = (importance) => {
  switch (importance) {
    case 'HIGH':
      return 'error';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'info';
    default:
      return 'default';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export function ProblemCaseDetailModal({ isOpen, onClose, problemId }) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!problemId) return null;

  const problem = mockProblems.find((p) => p.id === problemId);
  if (!problem) return null;

  const registrant = mockRegistrants[problem.accountId];

  const handleEdit = () => {
    // TODO: 수정 페이지로 이동 (현재는 생성 페이지로 이동)
    navigate(PATHS.PROBLEM_NEW, { state: { problemId: problem.id } });
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // TODO: 실제 API 연동 시 주석 해제
      // await problemAPI.deleteProblem(problem.id);
      console.log('문제 삭제:', problem.id);
      setShowDeleteConfirm(false);
      onClose();
      // 성공 시 목록 새로고침 또는 상태 업데이트
    } catch (error) {
      console.error('문제 삭제 실패:', error);
      alert('문제 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="문제 상세 정보"
        maxWidth="600px"
      >
        <S.Content>
          <S.InfoTable role="table">
            <S.InfoColGroup>
              <col />
              <col />
              <col />
              <col />
            </S.InfoColGroup>

            <S.InfoRow>
              <S.InfoTh>제목</S.InfoTh>
              <S.InfoTd>{problem.title}</S.InfoTd>
              <S.InfoTh>문제 유형</S.InfoTh>
              <S.InfoTd>{problem.category.title}</S.InfoTd>
            </S.InfoRow>

            <S.InfoRow>
              <S.InfoTh>중요도</S.InfoTh>
              <S.InfoTd>
                <Badge variant={getImportanceVariant(problem.importance)}>
                  {getImportanceLabel(problem.importance)}
                </Badge>
              </S.InfoTd>
              <S.InfoTh>등록자</S.InfoTh>
              <S.InfoTd>{registrant?.name || '-'}</S.InfoTd>
            </S.InfoRow>

            <S.InfoRow>
              <S.InfoTh>등록일</S.InfoTh>
              <S.InfoTd>{formatDate(problem.createdAt)}</S.InfoTd>
              <S.InfoTh>관련 서비스</S.InfoTh>
              <S.InfoTd>
                {problem.services && problem.services.length > 0 ? (
                  <S.ServicesContainer>
                    {problem.services.map((service) => (
                      <ServiceTag key={service} service={service} />
                    ))}
                  </S.ServicesContainer>
                ) : (
                  '—'
                )}
              </S.InfoTd>
            </S.InfoRow>

            <S.InfoRow>
              <S.InfoTh>관련 배포</S.InfoTh>
              <S.InfoTd colSpan={3}>
                {problem.deployments && problem.deployments.length > 0 ? (
                  <S.DeploymentsList>
                    {problem.deployments.map((deploymentId) => (
                      <span key={deploymentId}>#{deploymentId}</span>
                    ))}
                  </S.DeploymentsList>
                ) : (
                  '—'
                )}
              </S.InfoTd>
            </S.InfoRow>
          </S.InfoTable>

          <S.InfoTable role="table">
            <S.InfoColGroup>
              <col />
            </S.InfoColGroup>
            <S.InfoRow>
              <S.InfoTh>설명</S.InfoTh>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoTd colSpan={4}>
                <S.DescriptionText>{problem.description}</S.DescriptionText>
              </S.InfoTd>
            </S.InfoRow>
          </S.InfoTable>
        </S.Content>

        <S.Footer>
          <S.ActionButtons>
            <S.DeleteButton onClick={handleDelete}>
              <Trash2 size={16} />
              삭제
            </S.DeleteButton>
            <SecondaryBtn onClick={handleEdit}>
              <Edit size={16} style={{ marginRight: '4px' }} />
              수정
            </SecondaryBtn>
          </S.ActionButtons>
          <PrimaryBtn onClick={onClose}>닫기</PrimaryBtn>
        </S.Footer>
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        title="문제 삭제 확인"
        maxWidth="400px"
        footer={
          <S.Footer>
            <SecondaryBtn onClick={handleCloseDeleteConfirm}>취소</SecondaryBtn>
            <S.ConfirmDeleteButton onClick={handleConfirmDelete}>
              삭제
            </S.ConfirmDeleteButton>
          </S.Footer>
        }
      >
        <S.ConfirmMessage>
          이 문제를 삭제하시겠습니까?
          <br />
          삭제된 문제는 복구할 수 없습니다.
        </S.ConfirmMessage>
      </Modal>
    </>
  );
}
