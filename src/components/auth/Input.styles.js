import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: border-color 0.2s ease;
  outline: none;

  &&::placeholder {
    color: rgb(107 114 128 / 40%);
  }

  &&:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          height: 1.875rem;
          padding: 0 ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return `
          height: 2.8125rem;
          padding: 0 ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
        `;
    }
  }}
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
