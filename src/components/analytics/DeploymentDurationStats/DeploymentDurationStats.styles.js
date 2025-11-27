// 작성자 : 이원석
import styled from '@emotion/styled';

// Panel Container
export const PanelContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  ${({ hasHeight }) =>
    hasHeight &&
    `
    height: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

export const PanelHeader = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PanelTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PanelContent = styled.div`
  padding: 20px ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  ${({ flex }) =>
    flex &&
    `
    flex: 1;
    display: flex;
    flex-direction: column;
  `}
  --chart-grid-color: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#374151'};
  --chart-text-color: ${({ theme }) => theme.colors.textSecondary};
  --chart-brand-color: ${({ theme }) => theme.colors.brand};
`;

// Filter Components
export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ marginBottom, theme }) =>
    marginBottom || theme.spacing.md};
  flex-wrap: wrap;
`;

export const FilterLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
    opacity: 0.8;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'light'
          ? 'rgba(37, 99, 235, 0.1)'
          : 'rgba(59, 130, 246, 0.2)'};
  }
`;

// Chart
export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '250px'};
`;
