import styled from '@emotion/styled';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;

  &&:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand};
    outline-offset: 2px;
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
          height: 2rem;
          padding: 0 ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return `
          height: 3.5rem;
          padding: 0 2rem;
          font-size: ${theme.typography.fontSize.lg};
        `;
      default:
        return `
          height: 2.5rem;
          padding: 0 ${theme.spacing.md};
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.brand};
          color: white;
          border: none;
          
          &&:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          
          &&:hover:not(:disabled) {
            background-color: ${theme.colors.surface};
          }
        `;
      case 'github':
        return `
          background-color: ${theme.colors.github};
          color: white;
          border: none;
          
          &&:hover:not(:disabled) {
            background-color: ${theme.colors.githubHover};
          }
        `;
      case 'gray':
        return `
          background-color: ${theme.colors.gray};
          color: white;
          border: none;
          
          &&:hover:not(:disabled) {
            background-color: ${theme.colors.grayHover};
          }
        `;
      case 'cancel':
        return `
          background-color: transparent;
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.cancelBorder};
          
          &&:hover:not(:disabled) {
            background-color: rgba(87, 93, 107, 0.1);
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.error};
          color: white;
          border: none;
          
          &&:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.brand};
          color: white;
          border: none;
        `;
    }
  }}

  /* Full width */
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}
`;
