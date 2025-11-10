import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;

  /* remove extra horizontal padding so cards align with TopGrid panels */
  padding: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  width: 100%;

  /* scale down title on very small screens */
  ${({ theme }) => theme.mq.sm`
    font-size: calc(${({ theme }) => theme.typography.fontSize.md} - 1px);
  `}
`;

export const ChipsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ChipButton = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.12s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
  }

  &.active {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#1f2937' : '#edf2f7'};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.border};
  }

  /* slightly smaller chips on small screens */
  ${({ theme }) => theme.mq.sm`
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  `}
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  /* match the dashboard TopGrid breakpoint: side-by-side at large screens */
  ${({ theme }) => theme.mq.lg`
    grid-template-columns: repeat(2, 1fr);
  `}

  /* at medium screens keep stacked but reduce gaps/padding slightly */
  ${({ theme }) => theme.mq.md`
    gap: calc(${({ theme }) => theme.spacing.md} / 2);
  `}
`;

export const Card = styled.section`
  /* match PanelContainer look to align widths/spacing with other dashboard cards */
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px ${({ theme }) => theme.spacing.lg}
    calc(${({ theme }) => theme.spacing.lg} + 30px);
  display: flex;
  flex-direction: column;
`;

export const Panel = styled.section`
  /* outer panel that groups the two charts with a title */
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px ${({ theme }) => theme.spacing.lg}
    calc(${({ theme }) => theme.spacing.lg} + 30px);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  /* reduce panel padding on small screens so inner elements scale down */
  ${({ theme }) => theme.mq.sm`
    padding: 12px ${theme.spacing.md} calc(${theme.spacing.md} + 16px);
    gap: calc(${theme.spacing.sm} / 2);
  `}
`;

export const CardTitle = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
`;

/* slightly smaller card title on small screens */
export const CardTitleSmall = styled(CardTitle)`
  ${({ theme }) => theme.mq.sm`
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  `}
`;

export const ChartWrapper = styled.div`
  width: 100%;

  /* use a modest fixed min-height to align with other dashboard charts */

  /* responsive height: shrinks on small screens, grows on larger viewports */
  height: clamp(140px, 28vw, 260px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;

  /* slightly taller on medium screens */
  ${({ theme }) => theme.mq.md`
    height: clamp(180px, 24vw, 300px);
  `}

  /* ensure the Chart.js canvas always fills the wrapper */
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const ChartCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0; /* inner card uses panel padding, so keep inner minimal */
  background: transparent;
  border: none;

  /* allow cards to shrink/grow evenly and prevent overflow in grid */
  flex: 1 1 0;
  min-width: 0;
`;

export const LegendList = styled.div`
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  & .legend-item {
    /* use grid so numeric columns align vertically across rows */
    display: grid;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.88rem;

    /* mobile-first: let numeric columns size automatically */
    grid-template-columns: 12px 1fr auto auto;
  }

  /* at medium screens tighten font and numeric widths */
  ${({ theme }) => theme.mq.md`
    & .legend-item {
      font-size: 0.88rem;
      grid-template-columns: 12px 1fr 56px 48px;
    }
  `}

  /* at large screens use the full fixed widths for perfect alignment */
  ${({ theme }) => theme.mq.lg`
    & .legend-item {
      font-size: 0.9rem;
      grid-template-columns: 12px 1fr 72px 60px;
    }
  `}

  & .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  & .legend-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .legend-value {
    /* right-align and use tabular numbers so digits line up */
    justify-self: end;
    text-align: right;
    font-variant-numeric: tabular-nums;
    width: auto;
  }

  & .legend-pct {
    justify-self: end;
    text-align: right;
    width: auto;
    color: var(--text-secondary, #6b7280);
  }
`;

export default {
  Container,
  Header,
  Title,
  ChipsRow,
  ChipButton,
  StatsGrid,
  ChartsRow,
  Card,
  CardTitle,
  ChartWrapper,
  LegendList,
};
