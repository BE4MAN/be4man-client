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
    padding: 8px 36px 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.colors.brand};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.brand};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .calendar-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
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
    padding: 8px 36px 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.colors.brand};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.brand};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
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
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      theme.mode === 'dark'
        ? '0 8px 24px rgba(0,0,0,0.5)'
        : '0 8px 24px rgba(0,0,0,0.15)'};
    font-family: inherit;
  }

  .react-datepicker__header {
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px 12px 0 0;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .react-datepicker__navigation {
    position: static;
    width: 24px;
    height: 24px;
    min-width: 24px;
    border-radius: 4px;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin: 0;
    top: auto;
    left: auto;
    right: auto;

    &:hover {
      background: ${({ theme }) =>
        theme.mode === 'dark' ? '#2a2a2a' : '#f3f4f6'};
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    &:active {
      transform: scale(0.95);
    }

    &.react-datepicker__navigation--previous {
      order: 1;
    }

    &.react-datepicker__navigation--next {
      order: 3;
    }
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    border-width: 2px 2px 0 0;
    width: 6px;
    height: 6px;
  }

  .react-datepicker__current-month {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: center;
    margin: 0;
    flex: 1;
    order: 2;
  }

  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 4px;
    padding: 0 4px;
  }

  .react-datepicker__day-name {
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__month {
    padding: 10px;
  }

  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 2px;
    align-items: center;
  }

  .react-datepicker__day {
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 400;
    margin: 0;

    &:hover {
      background: ${({ theme }) =>
        theme.mode === 'dark' ? '#2a2a2a' : '#f3f4f6'};
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    &.react-datepicker__day--selected {
      background: ${({ theme }) => theme.colors.brand};
      color: #fff;
      border-radius: 4px;
      font-weight: 500;
    }

    &.react-datepicker__day--today {
      color: ${({ theme }) => theme.colors.brand};
      font-weight: 600;
    }

    &.react-datepicker__day--outside-month {
      color: ${({ theme }) => theme.colors.textSecondary};
      opacity: 0.4;
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
      background: #06c;
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
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

export const TimeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 36px 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand}20;
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
