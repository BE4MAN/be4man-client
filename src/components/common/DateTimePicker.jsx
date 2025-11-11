import DatePicker from './DatePicker';
import * as S from './DateTimeRangePicker.styles';

export default function DateTimePicker({
  date,
  onDateChange,
  showLabel = false,
  error = false,
  disabled = false,
  minDate,
  allowedWeekdays,
}) {
  return (
    <>
      {showLabel && (
        <S.LabelContainer>
          <S.DateRangeLabel>
            날짜<S.RequiredAsterisk> *</S.RequiredAsterisk>
          </S.DateRangeLabel>
        </S.LabelContainer>
      )}
      <S.Container>
        <S.ErrorWrapper $hasError={error}>
          <S.DateRangeWrapper>
            <DatePicker
              value={date}
              onChange={onDateChange}
              disabled={disabled}
              minDate={minDate}
              allowedWeekdays={allowedWeekdays}
            />
          </S.DateRangeWrapper>
        </S.ErrorWrapper>
      </S.Container>
    </>
  );
}
