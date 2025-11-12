import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: #111827;
  padding: 24px;
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
  border: 0.5px solid #d1d5db;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9fafb;
  }
`;

export const CardTopLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatLabel = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-top: 2px;
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
`;

export const StatDesc = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
  padding-left: 20px;
`;

export const IconBox = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const WeekBlock = styled.div`
  background: #fff;
  border: 0.5px solid #d1d5db;
  padding: 16px;
`;

export const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #d1d5db;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const IconBtn = styled.button`
  background: #f9fafb;
  border: 0.5px solid #d1d5db;
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
  border: 0.5px solid ${({ $active }) => ($active ? '#ef4444' : '#d1d5db')};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    background 0.15s,
    box-shadow 0.15s,
    border-color 0.15s;

  ${({ $active }) =>
    $active &&
    `
    box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.3);
    background-color: rgba(254, 242, 242, 0.4);
  `}

  &:hover {
    background: #f9fafb;
  }
`;

export const DayHead = styled.div`
  background: #f9fafb;
  border-bottom: 0.5px solid #e5e7eb;
  padding: 8px;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
`;

export const DayHeadLeft = styled.div`
  background: #f9fafb;
  display: flex;
  align-items: center;
`;

export const DayDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MoreBadge = styled.span`
  font-size: 12px;
  color: #2563a1;
  padding: 1px 6px;
  line-height: 1;
`;

export const DayItem = styled.div`
  border-left: 3px solid
    ${({ $variant }) => ($variant === 'blackout' ? '#ef4444' : '#2563eb')};
  margin: 6px;
  padding: 8px;
  font-size: 13px;
  color: ${({ $variant }) => ($variant === 'blackout' ? '#b91c1c' : '#111827')};
  background: ${({ $variant }) =>
    $variant === 'blackout' ? '#fef2f2' : 'transparent'};
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
`;

export const RecoveryBlock = styled.div`
  background: #fff;
  border: 0.5px solid #d1d5db;
  padding: 16px;
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 15px;
`;

export const Table = styled.table`
  width: 100%;
  border: 0.5px solid #d1d5db;
  border-collapse: collapse;
  font-size: 13px;
  text-align: center;

  th {
    background: #f9fafb;
    border-bottom: 0.5px solid #d1d5db;
    padding: 8px;
  }

  td {
    border-bottom: 0.5px solid #e5e7eb;
    padding: 8px;
  }

  tr:hover {
    background: #f9fafb;
  }
`;

export const RecoveryRow = styled.tr`
  cursor: pointer;
`;

export const Status = styled.span`
  display: inline-block;
  padding: 3px 8px;
  font-weight: 600;
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
  border-radius: 9999px;
`;

export const SidePanel = styled.div`
  position: fixed;
  top: var(--header-h, 72px);
  right: 0;
  width: 480px;
  height: calc(100dvh - var(--header-h, 72px));
  background: #fff;
  border-left: 0.5px solid #d1d5db;
  z-index: 20;
  box-shadow: -2px 0 6px rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ $dark }) => ($dark ? '#f9fafb' : '#f9fafb')};
  color: ${({ $dark }) => ($dark ? '#111827' : '#111827')};
`;

export const PanelTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const PanelTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const PanelSub = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: inherit;
`;

export const TaskList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
`;

export const TaskItem = styled.div`
  border: 0.5px solid #d1d5db;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

export const TaskMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;

  div + div {
    margin-top: 2px;
  }
`;

export const TaskBadge = styled.span`
  background: ${({ $variant }) =>
    $variant === 'alert'
      ? '#b91c1c'
      : $variant === 'pending'
        ? '#2563eb'
        : '#111827'};
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
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
  border-top: 0.5px solid #d1d5db;
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
  inset: var(--header-h, 72px) 0 0 0;
  background: rgb(0 0 0 / 15%);
  z-index: 10;
`;

export const PanelRight = styled.div`
  display: flex;
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

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const DangerButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: #dc2626;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`;
