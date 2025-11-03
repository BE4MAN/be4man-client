import styled from '@emotion/styled';

export const Wrap = styled.div`
  background: #f3f4f6;
  color: #111827;
  padding: 24px;
  font-family: Pretendard, 'Noto Sans KR', sans-serif;
  display: grid;
  gap: 24px;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const StatCard = styled.div`
  background: #fff;
  border: 1px solid #d1d5db;
  padding: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9fafb;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconBox = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const StatLabel = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
`;

export const StatDesc = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const WeekBlock = styled.div`
  background: #fff;
  border: 1px solid #d1d5db;
  padding: 16px;
`;

export const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const IconBtn = styled.button`
  background: #f9fafb;
  border: 1px solid #d1d5db;
  padding: 4px 8px;
  margin-left: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #e5e7eb;
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayCol = styled.div`
  border: 0.5px solid #d1d5db;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

export const DayHead = styled.div`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
`;

export const DayItem = styled.div`
  border-left: 3px solid #2563eb;
  margin: 6px;
  padding: 8px;
  font-size: 13px;
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
`;

export const RecoveryBlock = styled.div`
  background: #fff;
  border: 1px solid #d1d5db;
  padding: 16px;
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 15px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: center;

  th {
    background: #f9fafb;
    border-bottom: 1px solid #d1d5db;
    padding: 8px;
  }

  td {
    border-bottom: 1px solid #e5e7eb;
    padding: 8px;
  }

  tr:hover {
    background: #f9fafb;
  }
`;

export const Status = styled.span`
  display: inline-block;
  padding: 3px 8px;
  font-weight: 600;
  border: 1px solid
    ${({ $status }) =>
      $status === '복구 완료'
        ? '#16a34a'
        : $status === '진행중'
          ? '#eab308'
          : '#ef4444'};
  color: ${({ $status }) =>
    $status === '복구 완료'
      ? '#16a34a'
      : $status === '진행중'
        ? '#eab308'
        : '#ef4444'};
  background: ${({ $status }) =>
    $status === '복구 완료'
      ? '#dcfce7'
      : $status === '진행중'
        ? '#fef9c3'
        : '#fee2e2'};
`;

/* 오른쪽 패널 */
export const SidePanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  background: #fff;
  border-left: 1px solid #d1d5db;
  z-index: 20;
  box-shadow: -2px 0 6px rgb(0 0 0 / 10%);
  margin-top: 72px;
  display: flex;
  flex-direction: column;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: '#f9fafb';
  color: '#111';
`;

export const PanelTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const PanelSub = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
`;

export const TaskList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
`;

export const TaskItem = styled.div`
  border: 1px solid #d1d5db;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

export const TaskTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const TaskDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

export const TaskBadge = styled.span`
  background: #111827;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

export const DetailPanel = styled(SidePanel)`
  right: 420px;
  border-right: 1px solid #d1d5db;
  background: #f9fafb;
  z-index: 30;
`;

export const DetailContent = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

export const TaskStatus = styled.span`
  display: inline-block;
  background: #111827;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

export const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px;
`;

export const DetailMeta = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;

  li {
    margin-bottom: 6px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #d1d5db;
  margin: 16px 0;
`;

export const DetailDesc = styled.p`
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
`;

export const FileLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: #2563eb;
  font-size: 13px;
  text-decoration: underline;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 15%);
  z-index: 10;
`;

export const BackBtn = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 14px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    text-decoration: underline;
  }
`;
