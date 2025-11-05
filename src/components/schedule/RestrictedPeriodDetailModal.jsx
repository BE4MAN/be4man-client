import { useTheme } from '@emotion/react';
import { CalendarOff, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

import DateTimePicker from '@/components/common/DateTimePicker';
import ServiceTag from '@/components/common/ServiceTag';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import * as S from './RestrictedPeriodDetailModal.styles';

export default function RestrictedPeriodDetailModal({ open, onClose, period }) {
  const theme = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStartDate, setEditStartDate] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (period) {
      setEditStartDate(period.startDate || '');
      setEditStartTime(period.startTime || '');
      setEditEndTime(period.endTime || '');
    }
  }, [period]);

  if (!period) return null;

  // 금지 시간 계산 (시간 차이)
  const getRestrictedTime = () => {
    if (!period.startTime || !period.endTime) return '—';
    const start = new Date(`2000-01-01T${period.startTime}:00`);
    const end = new Date(`2000-01-01T${period.endTime}:00`);
    // 하루를 넘어가는 경우 처리
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return `${diffHours} 시간`;
  };

  // 시작일자 형식 (YYYY-MM-DD HH:mm:ss)
  const getStartDateTime = () => {
    if (!period.startDate || !period.startTime) return '—';
    return `${period.startDate} ${period.startTime}:00`;
  };

  const handleAdjustClick = () => {
    setIsEditMode(true);
    setEditStartDate(period.startDate);
    setEditStartTime(period.startTime);
    setEditEndTime(period.endTime);
  };

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    // TODO: API 호출하여 일정 취소 처리
    // 취소 후 모달 상태 업데이트 필요
    setShowConfirmModal(false);
    onClose();
  };

  const handleCloseConfirm = () => {
    setShowConfirmModal(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // 편집 취소 시 원래 값으로 복원
    setEditStartDate(period.startDate || '');
    setEditStartTime(period.startTime || '');
    setEditEndTime(period.endTime || '');
  };

  const handleCompleteEdit = () => {
    setIsEditMode(false);
    // TODO: API 호출하여 수정 처리
    // period 업데이트 필요
  };

  const handleBackClick = () => {
    setIsEditMode(false);
  };

  return (
    <ScheduleModal
      isOpen={open}
      onClose={onClose}
      title={isEditMode ? '일정 조정' : '작업 금지 상세 정보'}
      titleIcon={
        !isEditMode ? (
          <S.BanTitleIcon>
            <CalendarOff
              size={20}
              color={theme.colors.schedule.restrictedDanger}
            />
          </S.BanTitleIcon>
        ) : (
          <S.BackButton onClick={handleBackClick}>
            <ChevronLeft size={20} />
          </S.BackButton>
        )
      }
      maxWidth="600px"
      variant="detail"
      footer={
        <S.Footer>
          {isEditMode ? (
            <>
              <SecondaryBtn onClick={handleCancelEdit}>취소</SecondaryBtn>
              <PrimaryBtn onClick={handleCompleteEdit}>조정 완료</PrimaryBtn>
            </>
          ) : (
            <>
              <SecondaryBtn onClick={handleAdjustClick}>조정</SecondaryBtn>
              <S.CancelButton onClick={handleCancelClick}>
                일정 취소
              </S.CancelButton>
              <PrimaryBtn onClick={onClose}>닫기</PrimaryBtn>
            </>
          )}
        </S.Footer>
      }
    >
      <S.ContentWrapper>
        {!isEditMode ? (
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
                <S.InfoTd>{period.registrantDepartment || '—'}</S.InfoTd>
              </S.InfoRow>

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
                <S.InfoTh>시작일자</S.InfoTh>
                <S.InfoTd colSpan={3}>{getStartDateTime()}</S.InfoTd>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoTh>금지 시간</S.InfoTh>
                <S.InfoTd>{getRestrictedTime()}</S.InfoTd>
                <S.InfoTh>금지 주기</S.InfoTh>
                <S.InfoTd>{period.recurrenceCycle || '—'}</S.InfoTd>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoTh>설명</S.InfoTh>
                <S.InfoTd colSpan={3}>{period.description || '—'}</S.InfoTd>
              </S.InfoRow>
            </S.InfoTable>
          </S.Content>
        ) : (
          <S.EditSection>
            <DateTimePicker
              date={editStartDate}
              startTime={editStartTime}
              endTime={editEndTime}
              onDateChange={(date) => {
                setEditStartDate(date);
              }}
              onTimeChange={(start, end) => {
                setEditStartTime(start);
                setEditEndTime(end);
              }}
              showLabel
            />
          </S.EditSection>
        )}
      </S.ContentWrapper>

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
    </ScheduleModal>
  );
}
