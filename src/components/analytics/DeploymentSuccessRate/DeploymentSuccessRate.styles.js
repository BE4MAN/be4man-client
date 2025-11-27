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
export const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  flex-direction: column;

  ${({ theme }) => theme.mq.md`
    flex-direction: row;
  `}
`;

export const DonutWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const SuccessRate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #10b981;
`;

export const RateLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// Legend
export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap, theme }) => gap || theme.spacing.sm};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap, theme }) => gap || theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  ${({ noColor }) =>
    !noColor && `color: ${({ theme }) => theme.colors.textSecondary};`}
`;

export const LegendColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

export const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const LegendLabelText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
