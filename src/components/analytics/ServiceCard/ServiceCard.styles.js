// 작성자 : 이원석
import styled from '@emotion/styled';

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  --ring-bg-color: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#374151'};
  --icon-color: ${({ theme }) => theme.colors.textSecondary};
  --error-color: ${({ theme }) => theme.colors.error};

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: ${({ theme }) =>
      theme.mode === 'light'
        ? '0 10px 25px rgba(37, 99, 235, 0.15)'
        : '0 10px 25px rgba(59, 130, 246, 0.2)'};
    transform: scale(1.02);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) =>
    theme.mode === 'light' ? '#EFF6FF' : 'rgba(37, 99, 235, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brand};
  transition: background 0.2s ease;

  ${CardContainer}:hover & {
    background: ${({ theme }) =>
      theme.mode === 'light' ? '#DBEAFE' : 'rgba(37, 99, 235, 0.3)'};
  }
`;

export const ServiceName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const MetricsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressRing = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

export const RingValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const RingPercentage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RingLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MetricsInfo = styled.div`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MetricRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const MetricLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MetricWarning = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid
    ${({ theme }) => (theme.mode === 'light' ? '#F3F4F6' : '#374151')};
`;

export const DeploymentCount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

export const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, isIncrease }) =>
    isIncrease ? theme.colors.brand : theme.colors.error};
`;
