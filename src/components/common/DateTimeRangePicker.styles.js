import styled from '@emotion/styled';

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const DateRangeLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex: 1;
  min-width: 0;
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const DateRangeWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  position: relative;
`;

export const ErrorWrapper = styled.div`
  border: none;
  border-radius: 0.3125rem;
  padding: 0;
  transition: border-color 0.2s ease;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  transition: all 0.2s ease;
`;

export const TimeInputField = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 180px;
  position: relative;
`;

export const TimeLabelText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  min-width: 70px;
`;

export const TimeLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex: 0 0 auto;
  min-width: 140px;
`;

export const TimeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.brand};
  }
`;

export const RestrictedHoursInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 40px 8px 12px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.brand};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type='number'] {
    appearance: textfield;
  }
`;

export const HoursUnit = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;
