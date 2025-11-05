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

// Metrics Grid
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

export const MetricCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const MetricLabelText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const MetricValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const MetricStatus = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ status }) =>
    status === 'good'
      ? '#10B981'
      : status === 'warning'
        ? '#F59E0B'
        : '#EF4444'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LegendLine = styled.div`
  width: 20px;
  height: 2px;
  background: ${({ color }) => color};
`;

export const LegendLabelSmall = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
