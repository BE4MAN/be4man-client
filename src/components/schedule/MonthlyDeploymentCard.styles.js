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

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  margin-left: 4px;
  margin-right: 4px;

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
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
`;
