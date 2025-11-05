import styled from '@emotion/styled';

// Panel Container
export const PanelContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
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
  padding: 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  --chart-grid-color: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#374151'};
  --chart-text-color: ${({ theme }) => theme.colors.textSecondary};
`;

// Filter Components
export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  ${({ spaceBetween }) =>
    spaceBetween
      ? 'justify-content: space-between;'
      : 'justify-content: flex-start;'}

  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ marginBottom, theme }) =>
    marginBottom || theme.spacing.md};
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
    ${({ noShadow, theme }) =>
      !noShadow &&
      `box-shadow: 0 0 0 3px ${theme.mode === 'light' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.2)'};`}
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#1F2937'};
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const ToggleButton = styled.button`
  padding: 6px ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ theme, active }) =>
    active ? theme.colors.brand : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.colors.onPrimary : theme.colors.textSecondary};

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.brand : theme.colors.interactiveHover};
    opacity: ${({ active }) => (active ? 0.9 : 1)};
  }
`;

// Chart
export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '250px'};
`;

// Legend
export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: ${({ color }) => color};
  opacity: 0.8;
  flex-shrink: 0;
`;
