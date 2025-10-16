import styled from '@emotion/styled';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &&:focus {
    border-color: ${({ theme }) => theme.colors.brand};
  }

  &&:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `
          height: 2rem;
          padding: 0 ${({ theme }) => theme.spacing.sm};
          font-size: ${({ theme }) => theme.typography.fontSize.sm};
        `;
      case 'lg':
        return `
          height: 3rem;
          padding: 0 ${({ theme }) => theme.spacing.lg};
          font-size: ${({ theme }) => theme.typography.fontSize.lg};
        `;
    }
  }}
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
