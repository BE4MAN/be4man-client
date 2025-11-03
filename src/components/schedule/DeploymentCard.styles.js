import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.3125rem;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    ${({ status, theme }) => {
      switch (status) {
        case 'scheduled':
          return `color: ${theme.colors.textPrimary};`;
        case 'success':
          return `color: ${theme.colors.schedule.successGreen};`;
        case 'failed':
          return `color: ${theme.colors.schedule.restrictedDanger};`;
        default:
          return `color: ${theme.colors.textPrimary};`;
      }
    }}
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-left: 18px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  line-height: 1.4;
`;

export const Service = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
`;

export const Time = styled.p`
  color: ${({ theme }) => theme.colors.schedule.deploymentPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
`;
