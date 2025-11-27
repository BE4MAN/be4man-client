// 작성자 : 이원석
import { useTheme } from '@emotion/react';
import { format, parseISO } from 'date-fns';
import { CalendarOff, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

import ServiceTag from '@/components/common/ServiceTag';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { DEPARTMENT_REVERSE_MAP } from '@/constants/accounts';
import { useCancelBan } from '@/features/schedule/hooks/useCancelBan';
import {
  formatDuration,
  getDurationInMinutes,
} from '@/features/schedule/utils/durationUtils';
import { enumToWeekday } from '@/features/schedule/utils/enumConverter';
import { formatTimeToKorean } from '@/features/schedule/utils/timeFormatter';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';
import { getForbiddenMessage, isForbiddenError } from '@/utils/errorHandler';

import * as S from './RestrictedPeriodDetailModal.styles';

export default function RestrictedPeriodDetailModal({ open, onClose, period }) {
  const theme = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showForbiddenModal, setShowForbiddenModal] = useState(false);
  const [forbiddenMessage, setForbiddenMessage] = useState('');
  const cancelBanMutation = useCancelBan();

  if (!period) return null;

  const getRestrictedTime = () => {
    const durationMinutes = getDurationInMinutes(period);
    if (durationMinutes > 0) {
      return formatDuration(durationMinutes);
    }

    if (!period.startTime) return '—';
    const start = new Date(`2000-01-01T${period.startTime}:00`);
    const end = period.endTime
      ? new Date(`2000-01-01T${period.endTime}:00`)
      : null;
    if (!end) return '—';
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const diffMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);
    return formatDuration(diffMinutes);
  };

  const getStartDateTime = () => {
    if (!period.startDate || !period.startTime) return '—';
    const dateTime = `${period.startDate} ${period.startTime}:00`;
    return formatTimeToKorean(dateTime);
  };

  const getEndedAt = () => {
    if (period.endedAt) {
      const ended = parseISO(period.endedAt);
      if (!Number.isNaN(ended.getTime())) {
        const formatted = format(ended, 'yyyy-MM-dd HH:mm');
        return formatTimeToKorean(formatted);
      }
    }
    const durationMinutes = getDurationInMinutes(period);
    if (period.startDate && period.startTime && durationMinutes > 0) {
      const start = parseISO(`${period.startDate}T${period.startTime}:00`);
      if (!Number.isNaN(start.getTime())) {
        const computed = new Date(start);
        computed.setMinutes(computed.getMinutes() + durationMinutes);
        const formatted = format(computed, 'yyyy-MM-dd HH:mm');
        return formatTimeToKorean(formatted);
      }
    }
    if (period.endDate || period.endTime) {
      const dateTime =
        `${period.endDate || period.startDate} ${period.endTime || ''}`.trim();
      return dateTime ? formatTimeToKorean(dateTime) : '—';
    }
    return '—';
  };

  const getRecurrenceLabel = () => {
    if (!period.recurrenceType || period.recurrenceType === 'NONE') {
      return '—';
    }
    if (period.recurrenceType === 'DAILY') return '매일';
    if (period.recurrenceType === 'WEEKLY') {
      const weekdayKorean = period.recurrenceWeekday
        ? enumToWeekday(period.recurrenceWeekday) || period.recurrenceWeekday
        : null;
      return weekdayKorean ? `매주 ${weekdayKorean}` : '매주';
    }
    if (period.recurrenceType === 'MONTHLY') {
      const week =
        period.recurrenceWeekOfMonth === 'FIRST'
          ? '첫째 주'
          : period.recurrenceWeekOfMonth === 'SECOND'
            ? '둘째 주'
            : period.recurrenceWeekOfMonth === 'THIRD'
              ? '셋째 주'
              : period.recurrenceWeekOfMonth === 'FOURTH'
                ? '넷째 주'
                : period.recurrenceWeekOfMonth === 'FIFTH'
                  ? '다섯째 주'
                  : '';
      const weekdayKorean = period.recurrenceWeekday
        ? enumToWeekday(period.recurrenceWeekday) || period.recurrenceWeekday
        : '';
      return `${week} ${weekdayKorean}`.trim() || '매월';
    }
    return period.recurrenceCycle || '—';
  };

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!period?.id) return;

    try {
      await cancelBanMutation.mutateAsync(period.id);
      setShowConfirmModal(false);
      onClose();
    } catch (error) {
      // 403 Forbidden 에러 처리
      if (isForbiddenError(error)) {
        const message = getForbiddenMessage(error);
        setForbiddenMessage(message);
        setShowConfirmModal(false);
        setShowForbiddenModal(true);
      } else {
        // 기타 에러 처리
        console.error('Ban 취소 실패:', error);
      }
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirmModal(false);
  };

  const truncateDescription = (text) => {
    if (!text || text.trim() === '') return '—';
    // 문장 단위로 분리 (마침표, 느낌표, 물음표 기준)
    const sentences = text
      .split(/([.!?]+\s*)/)
      .filter((s) => s.trim().length > 0)
      .reduce((acc, curr, idx) => {
        if (idx % 2 === 0) {
          acc.push(curr);
        } else {
          acc[acc.length - 1] += curr;
        }
        return acc;
      }, [])
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length <= 2) {
      return text;
    }

    return sentences.slice(0, 2).join(' ') + '...';
  };

  return (
    <ScheduleModal
      isOpen={open}
      onClose={onClose}
      title="작업 금지 상세 정보"
      titleIcon={
        <S.BanTitleIcon>
          <CalendarOff
            size={20}
            color={theme.colors.schedule.restrictedDanger}
          />
        </S.BanTitleIcon>
      }
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          <S.CancelButton onClick={handleCancelClick}>일정 취소</S.CancelButton>
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
            <S.InfoTd>{period.title}</S.InfoTd>
            <S.InfoTh>유형</S.InfoTh>
            <S.InfoTd>{period.type}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>등록자</S.InfoTh>
            <S.InfoTd>{period.registrant || '—'}</S.InfoTd>
            <S.InfoTh>등록부서</S.InfoTh>
            <S.InfoTd>
              {period.registrantDepartment
                ? DEPARTMENT_REVERSE_MAP[period.registrantDepartment] ||
                  period.registrantDepartment
                : '—'}
            </S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>시작일자</S.InfoTh>
            <S.InfoTd>{getStartDateTime()}</S.InfoTd>
            <S.InfoTh>종료일자</S.InfoTh>
            <S.InfoTd>{getEndedAt()}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>지속시간</S.InfoTh>
            <S.InfoTd>{getRestrictedTime()}</S.InfoTd>
            <S.InfoTh>반복 주기</S.InfoTh>
            <S.InfoTd>{getRecurrenceLabel()}</S.InfoTd>
          </S.InfoRow>
        </S.InfoTable>

        <S.InfoTable role="table">
          <S.InfoColGroup>
            <col />
            <col />
            <col />
            <col />
          </S.InfoColGroup>

          <S.InfoRow>
            <S.InfoTh>연관 서비스</S.InfoTh>
            <S.InfoTd colSpan={3}>
              {period.services && period.services.length > 0 ? (
                <S.ServicesContainer>
                  {period.services.map((service) => (
                    <ServiceTag key={service} service={service} />
                  ))}
                </S.ServicesContainer>
              ) : (
                '—'
              )}
            </S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>설명</S.InfoTh>
            <S.InfoTd colSpan={3}>
              {truncateDescription(period.description)}
            </S.InfoTd>
          </S.InfoRow>
        </S.InfoTable>
      </S.Content>

      {/* 확인 모달 */}
      <ScheduleModal
        isOpen={showConfirmModal}
        onClose={handleCloseConfirm}
        title="일정 취소 확인"
        maxWidth="400px"
        footer={
          <S.Footer>
            <SecondaryBtn onClick={handleCloseConfirm}>취소</SecondaryBtn>
            <S.ConfirmButton onClick={handleConfirmCancel}>
              확인
            </S.ConfirmButton>
          </S.Footer>
        }
      >
        <S.ConfirmMessage>
          이 일정을 취소하시겠습니까?
          <br />
          취소된 일정은 복구할 수 없습니다.
        </S.ConfirmMessage>
      </ScheduleModal>

      {/* 403 권한 없음 모달 */}
      <ScheduleModal
        isOpen={showForbiddenModal}
        onClose={() => setShowForbiddenModal(false)}
        title="관리자 권한이 필요합니다."
        titleIcon={<TriangleAlert size={20} color="#EF4444" />}
        maxWidth="400px"
        footer={
          <S.Footer>
            <PrimaryBtn onClick={() => setShowForbiddenModal(false)}>
              확인
            </PrimaryBtn>
          </S.Footer>
        }
      >
        <S.ConfirmMessage>{forbiddenMessage}</S.ConfirmMessage>
      </ScheduleModal>
    </ScheduleModal>
  );
}
