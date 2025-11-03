import Badge from '@/components/common/Badge';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { PrimaryBtn } from '@/styles/modalButtons';

import * as S from './DeploymentDetailModal.styles';

const statusConfig = {
  scheduled: { label: '예정', variant: 'info' },
  success: { label: '성공', variant: 'success' },
  failed: { label: '실패', variant: 'error' },
};

export default function DeploymentDetailModal({ open, onClose, deployment }) {
  if (!deployment) return null;

  const statusInfo = statusConfig[deployment.status];

  return (
    <ScheduleModal
      isOpen={open}
      onClose={onClose}
      title="배포 상세 정보"
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          <PrimaryBtn onClick={onClose}>닫기</PrimaryBtn>
        </S.Footer>
      }
    >
      <S.Content>
        <S.Grid>
          <S.Field>
            <S.Label>제목</S.Label>
            <S.Value>{deployment.title}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>상태</S.Label>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </S.Field>
        </S.Grid>

        <S.Grid>
          <S.Field>
            <S.Label>서비스</S.Label>
            <S.Value>{deployment.service}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>브랜치</S.Label>
            <S.Value>{deployment.branch}</S.Value>
          </S.Field>
        </S.Grid>

        <S.Grid>
          <S.Field>
            <S.Label>PR 번호</S.Label>
            <S.Value>{deployment.prNumber}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>예정 시간</S.Label>
            <S.Value>
              {deployment.date} {deployment.scheduledTime}
            </S.Value>
          </S.Field>
        </S.Grid>
      </S.Content>
    </ScheduleModal>
  );
}
