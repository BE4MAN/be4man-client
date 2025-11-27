// 작성자 : 이원석
import { useState, useEffect, useMemo } from 'react';

import DateRangePicker from '@/features/log/pages/DateRangePicker';

import * as S from './DateTimeRangePicker.styles';

export default function DateTimeRangePicker({
  startDate,
  endDate,
  startTime,
  endTime,
  onDateChange,
  onTimeChange,
  showLabel = false,
  error = false,
}) {
  // 지속시간 계산 (시간 차이)
  const restrictedHours = useMemo(() => {
    if (!startTime || !endTime) return '';
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    // 하루를 넘어가는 경우 처리
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours.toString();
  }, [startTime, endTime]);

  const [restrictedHoursInput, setRestrictedHoursInput] =
    useState(restrictedHours);

  useEffect(() => {
    setRestrictedHoursInput(restrictedHours);
  }, [restrictedHours]);

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    // 시작 시간이 변경되면, 지속시간을 기준으로 종료 시간 계산
    if (newStartTime && restrictedHoursInput) {
      const hours = parseInt(restrictedHoursInput, 10);
      if (!isNaN(hours) && hours > 0) {
        const start = new Date(`2000-01-01T${newStartTime}:00`);
        start.setHours(start.getHours() + hours);
        const newEndTime = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
        onTimeChange?.(newStartTime, newEndTime);
      } else {
        onTimeChange?.(newStartTime, endTime);
      }
    } else {
      onTimeChange?.(newStartTime, endTime);
    }
  };

  const handleRestrictedHoursChange = (e) => {
    const value = e.target.value;
    setRestrictedHoursInput(value);
    // 지속시간이 변경되면, 시작 시간을 기준으로 종료 시간 계산
    if (startTime && value) {
      const hours = parseInt(value, 10);
      if (!isNaN(hours) && hours > 0) {
        const start = new Date(`2000-01-01T${startTime}:00`);
        start.setHours(start.getHours() + hours);
        const newEndTime = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
        onTimeChange?.(startTime, newEndTime);
      }
    }
  };

  return (
    <>
      {showLabel && (
        <S.LabelContainer>
          <S.DateRangeLabel>
            기간<S.RequiredAsterisk> *</S.RequiredAsterisk>
          </S.DateRangeLabel>
          <S.TimeLabel>
            시작 시간<S.RequiredAsterisk> *</S.RequiredAsterisk>
          </S.TimeLabel>
          <S.TimeLabel>
            지속시간<S.RequiredAsterisk> *</S.RequiredAsterisk>
          </S.TimeLabel>
        </S.LabelContainer>
      )}
      <S.Container>
        <S.ErrorWrapper $hasError={error}>
          <S.DateRangeWrapper>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={onDateChange}
            />
          </S.DateRangeWrapper>
        </S.ErrorWrapper>

        <S.TimeInputField>
          <S.TimeLabelText>시작시각</S.TimeLabelText>
          <S.TimeInput
            type="time"
            value={startTime || ''}
            onChange={handleStartTimeChange}
            $hasError={error}
          />
        </S.TimeInputField>

        <S.TimeInputField>
          <S.TimeLabelText>지속시간</S.TimeLabelText>
          <S.RestrictedHoursInput
            type="number"
            min="1"
            value={restrictedHoursInput || ''}
            onChange={handleRestrictedHoursChange}
            placeholder="시간"
            $hasError={error}
          />
          <S.HoursUnit>시간</S.HoursUnit>
        </S.TimeInputField>
      </S.Container>
    </>
  );
}
