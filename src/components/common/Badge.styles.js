// 작성자 : 이원석
import styled from '@emotion/styled';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 0.125rem 0.375rem;
          font-size: 0.6875rem;
          line-height: 1.2;
        `;
      case 'md':
      default:
        return `
          padding: 0.125rem 0.5rem;
          font-size: ${theme.typography.fontSize.xs};
          line-height: 1.4;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return `
          background: ${theme.colors.schedule.successGreen};
          color: white;
          border-color: transparent;
        `;
      case 'error':
        return `
          background: ${theme.colors.error};
          color: white;
          border-color: transparent;
        `;
      case 'warning':
        return `
          background: ${theme.colors.schedule.warning};
          color: white;
          border-color: transparent;
        `;
      case 'info':
        return `
          background: ${theme.colors.schedule.deploymentPrimary};
          color: white;
          border-color: transparent;
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.textPrimary};
          border-color: ${theme.colors.border};
        `;
      default:
        return `
          background: ${theme.colors.brand};
          color: white;
          border-color: transparent;
        `;
    }
  }}
`;
