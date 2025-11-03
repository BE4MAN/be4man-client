import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.3125rem;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
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
  margin-top: 6px;
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

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: ${({ isCollapsed }) => (isCollapsed ? 1 : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
`;

export const AdditionalCount = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex-shrink: 0;
  margin-left: auto;
`;
