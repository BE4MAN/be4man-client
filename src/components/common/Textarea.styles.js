// 작성자 : 이원석
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: 0 0 0 3px rgb(0 102 204 / 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ hasError, theme }) =>
    hasError &&
    `
    border-color: ${theme.colors.error};
    
    &:focus {
      border-color: ${theme.colors.error};
      box-shadow: 0 0 0 3px rgba(255, 69, 58, 0.1);
    }
  `}
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;
