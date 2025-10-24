import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
    box-shadow: ${({ theme }) => theme.colors.schedule.deploymentHover} 0 4px
      12px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
`;

export const StatusCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  margin-left: 4px;
  margin-right: 4px;

  ${({ status, theme }) => {
    switch (status) {
      case 'scheduled':
        return `background: ${theme.colors.textPrimary};`;
      case 'success':
        return `background: ${theme.colors.schedule.successGreen};`;
      case 'failed':
        return `background: ${theme.colors.schedule.restrictedDanger};`;
      default:
        return `background: ${theme.colors.textPrimary};`;
    }
  }}
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
