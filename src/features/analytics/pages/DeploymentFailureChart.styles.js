// 작성자 : 이원석, 조윤상
// src/features/analytics/pages/DeploymentFailureChart.styles.js
import styled from '@emotion/styled';

// 최상위 컨테이너 (여유 공간용)
export const Container = styled.div`
  width: 100%;
`;

// 패널 카드
export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

// 헤더
export const Header = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

// 본문
export const PanelContent = styled.div`
  padding: 20px ${({ theme }) => theme.spacing.lg}
    calc(${({ theme }) => theme.spacing.lg} + 30px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

/* ============ Filter (DeploymentPeriodStats와 동일 패턴) ============ */

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
      `box-shadow: 0 0 0 3px ${
        theme.mode === 'light'
          ? 'rgba(37, 99, 235, 0.1)'
          : 'rgba(59, 130, 246, 0.2)'
      };`}
  }
`;

/* ============ 차트 레이아웃 ============ */

export const ChartsRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  @media (width <= 960px) {
    flex-direction: column;
  }
`;

export const ChartCard = styled.section`
  flex: 1 1 0;
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

/* 도넛 차트 영역 */
export const DoughnutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 260px;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

/* 라인 차트 영역 */
export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 260px;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

/* ============ 도넛 범례 ============ */

export const LegendList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 6px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    flex-shrink: 0;
  }

  .legend-label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .legend-value,
  .legend-pct {
    font-variant-numeric: tabular-nums;
  }
`;

/* ============ 유형 선택 Chips ============ */

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ChipButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &.active {
    background: ${({ theme }) => theme.colors.brand};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.brand};
  }

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'light'
        ? 'rgba(37, 99, 235, 0.06)'
        : 'rgba(37, 99, 235, 0.24)'};
  }
`;
