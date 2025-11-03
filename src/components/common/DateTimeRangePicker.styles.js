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
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : 'transparent'};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 2px;
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
  border-radius: ${({ theme }) => `calc(${theme.radius.md} * 0.5)`};
  transition: all 0.2s ease;
`;

export const TimeInputField = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 180px;
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
  border-radius: calc(6px * 0.5);
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

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.brand};
    box-shadow: 0 0 0 2px
      ${({ $hasError, theme }) =>
        $hasError ? `${theme.colors.error}20` : `${theme.colors.brand}20`};
  }
`;
