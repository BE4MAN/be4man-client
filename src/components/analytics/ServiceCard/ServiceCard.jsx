import { AlertTriangle, Clock, TrendingDown, TrendingUp } from 'lucide-react';

import { getSuccessColor } from '@/utils/analyticsHelpers';

import * as S from './ServiceCard.styles';

export default function ServiceCard({
  serviceName,
  icon,
  successRate,
  avgApprovalTime,
  violations,
  totalDeployments,
  trend,
  trendType,
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (successRate / 100) * circumference;
  const color = getSuccessColor(successRate);

  return (
    <S.CardContainer>
      <S.CardHeader>
        <S.ServiceInfo>
          <S.IconWrapper>{icon}</S.IconWrapper>
          <S.ServiceName>{serviceName}</S.ServiceName>
        </S.ServiceInfo>
      </S.CardHeader>

      <S.MetricsSection>
        <S.ProgressRing>
          <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              style={{ color: 'var(--ring-bg-color)' }}
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke={color}
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <S.RingValue>
            <S.RingPercentage>{successRate}%</S.RingPercentage>
            <S.RingLabel>성공률</S.RingLabel>
          </S.RingValue>
        </S.ProgressRing>

        <S.MetricsInfo>
          <S.MetricRow>
            <Clock
              size={14}
              color="currentColor"
              style={{ color: 'var(--icon-color)' }}
            />
            <S.MetricLabel>평균 {avgApprovalTime}h</S.MetricLabel>
          </S.MetricRow>
          {violations > 0 && (
            <S.MetricRow>
              <AlertTriangle
                size={14}
                color="currentColor"
                style={{ color: 'var(--error-color)' }}
              />
              <S.MetricWarning>실패 {violations}건</S.MetricWarning>
            </S.MetricRow>
          )}
        </S.MetricsInfo>
      </S.MetricsSection>

      <S.Footer>
        <S.DeploymentCount>
          총 <span>{totalDeployments}</span>건
        </S.DeploymentCount>
        <S.TrendIndicator isIncrease={trendType === 'increase'}>
          {trendType === 'increase' ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          <span>{Math.abs(trend)}%</span>
        </S.TrendIndicator>
      </S.Footer>
    </S.CardContainer>
  );
}
