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
  const handleStartTimeChange = (e) => {
    onTimeChange?.(e.target.value, endTime);
  };

  const handleEndTimeChange = (e) => {
    onTimeChange?.(startTime, e.target.value);
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
            종료 시간<S.RequiredAsterisk> *</S.RequiredAsterisk>
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
          <S.TimeLabelText>종료시각</S.TimeLabelText>
          <S.TimeInput
            type="time"
            value={endTime || ''}
            onChange={handleEndTimeChange}
            $hasError={error}
          />
        </S.TimeInputField>
      </S.Container>
    </>
  );
}
