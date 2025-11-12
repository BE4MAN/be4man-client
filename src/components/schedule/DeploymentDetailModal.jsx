import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import {
  enumToStage,
  enumToStatus,
} from '@/features/schedule/utils/enumConverter';
import { PrimaryBtn } from '@/styles/modalButtons';

import * as S from './DeploymentDetailModal.styles';

export default function DeploymentDetailModal({ open, onClose, deployment }) {
  const navigate = useNavigate();

  if (!deployment) return null;

  const handleTitleClick = () => {
    navigate(`/tasks/${deployment.id}`);
    onClose();
  };

  return (
    <ScheduleModal
      isOpen={open}
      onClose={onClose}
      title="작업 상세 정보"
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          <PrimaryBtn onClick={onClose}>닫기</PrimaryBtn>
        </S.Footer>
      }
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
            <S.InfoTd colSpan={3}>
              <S.TitleLink onClick={handleTitleClick}>
                {deployment.title}
              </S.TitleLink>
            </S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>등록자</S.InfoTh>
            <S.InfoTd>{deployment.registrant || '—'}</S.InfoTd>
            <S.InfoTh>등록부서</S.InfoTh>
            <S.InfoTd>{deployment.registrantDepartment || '—'}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>작업 단계</S.InfoTh>
            <S.InfoTd>
              {deployment.stage
                ? enumToStage(deployment.stage) || deployment.stage
                : '—'}
            </S.InfoTd>
            <S.InfoTh>작업 상태</S.InfoTh>
            <S.InfoTd>
              {deployment.status
                ? enumToStatus(deployment.status) || deployment.status
                : '—'}
            </S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>배포 상태</S.InfoTh>
            <S.InfoTd>
              {deployment.isDeployed === true
                ? '성공'
                : deployment.isDeployed === false
                  ? '실패'
                  : '—'}
            </S.InfoTd>
            <S.InfoTh>작업 시각</S.InfoTh>
            <S.InfoTd>
              {deployment.date} {deployment.scheduledTime}
            </S.InfoTd>
          </S.InfoRow>
        </S.InfoTable>
      </S.Content>
    </ScheduleModal>
  );
}
