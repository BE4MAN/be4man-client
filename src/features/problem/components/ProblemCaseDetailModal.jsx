import { Trash2, Edit } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import Modal from '@/components/auth/Modal';
import Badge from '@/components/common/Badge';
import ServiceTag from '@/components/common/ServiceTag';
import { useAccountByIdQuery } from '@/hooks/useAccountQueries';
import {
  useProblemQuery,
  useAllProblemCategoriesQuery,
  useDeleteProblemMutation,
} from '@/hooks/useProblemQueries';
import { useProjectDetailQuery } from '@/hooks/useProjectQueries';
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

const getSolvedLabel = (isSolved) => {
  if (isSolved == null) return '-';
  return isSolved ? '해결' : '미해결';
};

export function ProblemCaseDetailModal({
  isOpen,
  onClose,
  problemId,
  showActions = true,
}) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: problem } = useProblemQuery(problemId, {
    enabled: isOpen && !!problemId,
  });

  const { data: categories = [] } = useAllProblemCategoriesQuery();

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((cat) => {
      map.set(cat.id, cat);
    });
    return map;
  }, [categories]);

  const category = problem ? categoryMap.get(problem.categoryId) : null;

  const { data: account } = useAccountByIdQuery(problem?.accountId, {
    enabled: isOpen && !!problemId && !!problem?.accountId,
  });

  const projectId = category?.projectId ?? null;

  const { data: project } = useProjectDetailQuery(projectId, {
    enabled: !!projectId,
  });

  const projectServices = useMemo(() => {
    if (!project) return [];

    if (Array.isArray(project.services) && project.services.length > 0) {
      return project.services
        .map((s) => {
          if (typeof s === 'string') return s;
          return s.name || s.serviceName || s.service || '';
        })
        .filter(Boolean);
    }

    const singleService =
      project.serviceName || project.service || project.name;

    if (singleService) {
      return [singleService];
    }

    return [];
  }, [project]);

  const problemServices = Array.isArray(problem?.services)
    ? problem.services
    : [];

  const finalServices =
    projectServices.length > 0 ? projectServices : problemServices;

  const deleteProblemMutation = useDeleteProblemMutation();

  if (!isOpen || !problemId) return null;
  if (!problem) return null;

  const handleEdit = () => {
    navigate(PATHS.PROBLEM_NEW, { state: { problemId: problem.id } });
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProblemMutation.mutateAsync(problem.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch {
      alert('문제 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  const registrantName =
    account?.name || account?.accountName || problem.accountId || '-';

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="문제 상세 정보"
        maxWidth="600px"
        z-index="10000"
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
              <S.InfoTd>{category?.title || '-'}</S.InfoTd>
            </S.InfoRow>

            <S.InfoRow>
              <S.InfoTh>중요도</S.InfoTh>
              <S.InfoTd>
                <Badge variant={getImportanceVariant(problem.importance)}>
                  {getImportanceLabel(problem.importance)}
                </Badge>
              </S.InfoTd>
              <S.InfoTh>등록자</S.InfoTh>
              <S.InfoTd>{registrantName}</S.InfoTd>
            </S.InfoRow>

            <S.InfoRow>
              <S.InfoTh>등록일</S.InfoTh>
              <S.InfoTd>{formatDate(problem.createdAt)}</S.InfoTd>
              <S.InfoTh>관련 서비스</S.InfoTh>
              <S.InfoTd>
                {finalServices.length > 0 ? (
                  <S.ServicesContainer>
                    {finalServices.map((service) => (
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
              <S.InfoTd>
                {problem.deploymentIds && problem.deploymentIds.length > 0 ? (
                  <S.DeploymentsList>
                    {problem.deploymentIds.map((deploymentId) => (
                      <span key={deploymentId}>#{deploymentId}</span>
                    ))}
                  </S.DeploymentsList>
                ) : (
                  '—'
                )}
              </S.InfoTd>
              <S.InfoTh>해결 여부</S.InfoTh>
              <S.InfoTd>{getSolvedLabel(problem.isSolved)}</S.InfoTd>
            </S.InfoRow>
          </S.InfoTable>

          <S.InfoTable role="table">
            <S.InfoColGroup>
              <col />
            </S.InfoColGroup>

            <S.InfoRow>
              <S.InfoTd colSpan={4}>
                <S.DescriptionText>{problem.description}</S.DescriptionText>
              </S.InfoTd>
            </S.InfoRow>
          </S.InfoTable>
        </S.Content>

        <S.Footer>
          {showActions && (
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
          )}
          <PrimaryBtn onClick={onClose}>닫기</PrimaryBtn>
        </S.Footer>
      </Modal>

      {showActions && (
        <Modal
          isOpen={showDeleteConfirm}
          onClose={handleCloseDeleteConfirm}
          title="문제 삭제 확인"
          maxWidth="400px"
          footer={
            <S.Footer $hasActions={showActions}>
              <SecondaryBtn onClick={handleCloseDeleteConfirm}>
                취소
              </SecondaryBtn>
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
      )}
    </>
  );
}
