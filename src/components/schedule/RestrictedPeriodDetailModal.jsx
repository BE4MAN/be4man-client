import { CalendarOff } from 'lucide-react';

import ServiceTag from '@/components/common/ServiceTag';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { PrimaryBtn } from '@/styles/modalButtons';

import * as S from './RestrictedPeriodDetailModal.styles';

export default function RestrictedPeriodDetailModal({ open, onClose, period }) {
  if (!period) return null;

  return (
    <ScheduleModal
      isOpen={open}
      onClose={onClose}
      title="작업 금지 상세 정보"
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          <PrimaryBtn onClick={onClose}>확인</PrimaryBtn>
        </S.Footer>
      }
    >
      <S.Content>
        <S.Grid>
          <S.Field>
            <S.Label>제목</S.Label>
            <S.Value>{period.title}</S.Value>
          </S.Field>
          <S.Field>
            <S.Label>유형</S.Label>
            <S.TypeContainer>
              <S.TypeIconWrapper>
                <CalendarOff size={16} />
              </S.TypeIconWrapper>
              <S.Value>{period.type}</S.Value>
            </S.TypeContainer>
          </S.Field>
        </S.Grid>

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

        {period.services && period.services.length > 0 && (
          <S.Field>
            <S.Label>연관 서비스</S.Label>
            <S.ServicesContainer>
              {period.services.map((service) => (
                <ServiceTag key={service} service={service} />
              ))}
            </S.ServicesContainer>
          </S.Field>
        )}
      </S.Content>
    </ScheduleModal>
  );
}
