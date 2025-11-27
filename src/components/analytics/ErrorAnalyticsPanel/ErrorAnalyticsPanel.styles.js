// 작성자 : 이원석
import styled from '@emotion/styled';

// Panel Container
export const PanelContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
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
  padding: 20px ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  --chart-grid-color: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#374151'};
  --chart-text-color: ${({ theme }) => theme.colors.textSecondary};
  --chart-error-color: ${({ theme }) => theme.colors.error};
  --chart-bg-color: ${({ theme }) => theme.colors.bg};
`;

// Filter Components
export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const FilterLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
`;

export const FilterChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FilterChip = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ theme, active }) =>
    active ? theme.colors.brand : theme.colors.bg};
  color: ${({ theme, active }) =>
    active ? theme.colors.onPrimary : theme.colors.textSecondary};
  border-color: ${({ theme, active }) =>
    active ? theme.colors.brand : theme.colors.border};

  &:hover {
    border-color: ${({ theme, active }) =>
      active ? theme.colors.brand : theme.colors.brand};
    opacity: ${({ active }) => (active ? 0.9 : 0.8)};
  }
`;

// Section
export const SubSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionSubtitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

// Charts
export const ChartsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;
  flex-direction: column;

  ${({ theme }) => theme.mq.md`
    flex-direction: row;
  `}
`;

export const LineChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  ${({ theme }) => theme.mq.md`
    width: 60%;
  `}
`;

export const PieChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mq.md`
    width: 40%;
  `}
`;

export const PieChartContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  justify-content: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.md`
    flex-direction: row;
  `}
`;

export const PieChartTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`;

// Legend
export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;
