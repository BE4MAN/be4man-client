import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;

export const DateTimeWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  flex: 1; /* 원래대로 되돌리기 */

  .custom-datepicker-wrapper {
    width: 100%;
  }

  .custom-datepicker {
    width: 100%;
    height: 40px;
    padding: 0 40px 0 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #111827;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      border-color: #3b82f6;
    }

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  .calendar-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #6b7280;
    pointer-events: none;
  }

  /* react-datepicker 스타일 오버라이드 */
  /* stylelint-disable selector-class-pattern */
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 40px;
    padding: 0 40px 0 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #111827;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      border-color: #3b82f6;
    }

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  /* 상단 화살표 제거 */
  .react-datepicker__input-container::after {
    display: none !important;
  }

  .react-datepicker__input-container::before {
    display: none !important;
  }

  .react-datepicker {
    width: 320px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 10%),
      0 2px 4px -1px rgb(0 0 0 / 6%);
    font-family: inherit;
  }

  .react-datepicker__header {
    background: white;
    border-bottom: 1px solid #f3f4f6;
    border-radius: 8px 8px 0 0;
    padding: 16px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 화살표를 양쪽 끝에 배치 */
  }

  .react-datepicker__navigation {
    position: static; /* static으로 변경하여 flex 레이아웃에 참여 */
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: transparent;
    border: none;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f3f4f6;
      color: #374151;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .react-datepicker__current-month {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: #111827;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    text-align: center;
    margin: 0;
    flex: 1; /* 중앙에 위치하도록 flex: 1 */
  }

  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: #6b7280;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-bottom: 8px;
    align-items: center;
  }

  .react-datepicker__day-name {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__month {
    padding: 16px;
  }

  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 2px;
    align-items: center;
  }

  .react-datepicker__day {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: #9ca3af;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin: 0 auto;
    text-align: center;

    &:hover {
      background: #f9fafb;
      color: #374151;
    }

    &.react-datepicker__day--selected {
      background: #000;
      color: white;
      border-radius: 50%;
      font-weight: 600;
    }

    &.react-datepicker__day--today {
      color: #3b82f6;
      font-weight: 600;
    }

    &.react-datepicker__day--outside-month {
      color: #d1d5db;
      cursor: default;
    }
  }

  .react-datepicker__time-container {
    border-left: 1px solid #f3f4f6;
  }

  .react-datepicker__time {
    background: white;
  }

  .react-datepicker__time-box {
    width: 100%;
  }

  .react-datepicker__time-list {
    padding: 0;
  }

  .react-datepicker__time-list-item {
    padding: 8px 12px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: #111827;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f3f4f6;
    }

    &.react-datepicker__time-list-item--selected {
      background: #3b82f6;
      color: white;
    }
  }
  /* stylelint-enable selector-class-pattern */
`;

export const TimePickerWrapper = styled.div`
  position: relative;
  flex: 1;

  .clock-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #6b7280;
    pointer-events: none;
  }
`;

export const TimeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 12px; /* 날짜 선택기와 동일한 패딩 */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #111827;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
