import styled from '@emotion/styled';

const tone = (t) => ({
  bg: t.mode === 'dark' ? '#0f141c' : '#f7f9fc',
  card: t.mode === 'dark' ? '#151b26' : '#ffffff',
  cardAlt: t.mode === 'dark' ? '#171c27' : '#ffffff',
  border: t.colors?.border ?? (t.mode === 'dark' ? '#263046' : '#e5e9f2'),
  text: t.colors?.text ?? (t.mode === 'dark' ? '#e5eaf3' : '#0f172a'),
  textDim:
    t.colors?.textSecondary ?? (t.mode === 'dark' ? '#98a2b2' : '#6b7280'),
  primary: t.colors?.primary ?? '#2563eb',
  success: '#16a34a',
  wait: '#eab308',
  error: '#ef4444',
});

export const Wrap = styled.div`
  padding: 18px;
  color: ${({ theme }) => tone(theme).text};
  background: ${({ theme }) => tone(theme).bg};
`;

export const SectionTitle = styled.h3`
  margin: 4px 0 10px;
  font-size: 16px;
  color: ${({ theme }) => tone(theme).text};
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (width <= 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (width <= 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => tone(theme).card};
  border: 1px solid ${({ theme }) => tone(theme).border};
  border-radius: 14px;
  padding: 14px;
`;

export const StatHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatFoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatTitle = styled.div`
  color: ${({ theme }) => tone(theme).textDim};
  font-weight: 700;
`;

export const StatValue = styled.div`
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 800;
  margin-top: 8px;
`;

export const StatDiff = styled.div`
  margin-top: 4px;
  font-weight: 700;
  color: ${({ theme }) => tone(theme).error};

  &[data-up='true'] {
    color: ${({ theme }) => tone(theme).primary};
  }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0 22px;

  @media (width <= 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Block = styled.div`
  background: ${({ theme }) => tone(theme).cardAlt};
  border: 1px solid ${({ theme }) => tone(theme).border};
  border-radius: 14px;
  padding: 10px;
`;

export const BlockHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px 10px;
`;

export const BlockTitle = styled.div`
  font-weight: 800;
`;

export const HeadBtns = styled.div`
  display: flex;
  gap: 6px;
`;

export const IconBtn = styled.button`
  border: 1px solid ${({ theme }) => tone(theme).border};
  background: ${({ theme }) => tone(theme).card};
  color: ${({ theme }) => tone(theme).text};
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
  padding: 6px;
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => tone(theme).border};
  border-radius: 12px;
  background: ${({ theme }) => tone(theme).card};
`;

export const Left = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;

  .title {
    font-weight: 700;
  }

  .sub {
    color: ${({ theme }) => tone(theme).textDim};
    font-size: 12px;
  }
`;

export const Right = styled.div`
  display: grid;
  gap: 6px;
  justify-items: end;

  .time {
    font-size: 12px;
    color: ${({ theme }) => tone(theme).textDim};
  }
`;

export const StatusIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border: 2px solid currentcolor;
  color: ${({ theme }) => tone(theme).success};

  &[data-type='wait'] {
    color: ${({ theme }) => tone(theme).wait};
  }

  &[data-type='error'] {
    color: ${({ theme }) => tone(theme).error};
  }
`;

export const Pill = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => tone(theme).border};
  background: ${({ theme }) => tone(theme).card};
  color: ${({ theme }) => tone(theme).success};

  &[data-kind='대기중'] {
    color: ${({ theme }) => tone(theme).wait};
  }

  &[data-kind='실패'] {
    color: ${({ theme }) => tone(theme).error};
  }
`;

export const WeekViewport = styled.div`
  overflow: hidden;
  padding: 12px;
`;

export const WeekPage = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 12px;
`;

export const DayCol = styled.div`
  border: 1px solid ${({ theme }) => tone(theme).border};
  border-radius: 14px;
  background: ${({ theme }) => tone(theme).card};
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const SlideHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => tone(theme).border};

  .dow {
    font-weight: 800;
  }

  .date {
    color: ${({ theme }) => tone(theme).textDim};
    font-size: 12px;
  }
`;

export const Empty = styled.div`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => tone(theme).textDim};
`;

export const DayList = styled.div`
  padding: 10px 12px;
  display: grid;
  gap: 10px;
  grid-auto-rows: minmax(56px, auto);
`;

export const DayItem = styled.div`
  border: 1px solid ${({ theme }) => tone(theme).border};
  border-radius: 10px;
  background: ${({ theme }) => tone(theme).cardAlt};
  padding: clamp(8px, 1.2vw, 12px);

  .title {
    font-weight: 700;
  }

  .meta {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => tone(theme).textDim};
    font-size: 12px;
  }

  &[data-danger='true'] {
    box-shadow: inset 0 0 0 1px ${({ theme }) => tone(theme).error};
  }
`;
