import Button from '@/components/auth/Button';
import Modal from '@/components/auth/Modal';

import * as S from './RestrictedPeriodDetailModal.styles';

export default function RestrictedPeriodDetailModal({ open, onClose, period }) {
  if (!period) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="작업 금지 상세 정보"
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          <Button variant="primary" onClick={onClose}>
            확인
          </Button>
        </S.Footer>
      }
    >
      <S.Content>
        <S.Field>
          <S.Label>제목</S.Label>
          <S.Value>{period.title}</S.Value>
        </S.Field>

        <S.Field>
          <S.Label>유형</S.Label>
          <S.Value>{period.type}</S.Value>
        </S.Field>

        <S.Field>
          <S.Label>설명</S.Label>
          <S.Value>{period.description}</S.Value>
        </S.Field>

        <S.Grid>
          <S.Field>
            <S.Label>시작 시간</S.Label>
            <S.Value>
              {period.startDate} {period.startTime}
            </S.Value>
          </S.Field>
          <S.Field>
            <S.Label>종료 시간</S.Label>
            <S.Value>
              {period.endDate} {period.endTime}
            </S.Value>
          </S.Field>
        </S.Grid>
      </S.Content>
    </Modal>
  );
}
