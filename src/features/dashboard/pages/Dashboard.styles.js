import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  padding: 24px;
  display: grid;
  gap: 24px;

  ${({ theme }) => theme.mqMax.md`
    padding: 16px;
    gap: 16px;
  `}
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  ${({ theme }) => theme.mqMax.md`
    grid-template-columns: 1fr;
    gap: 16px;
  `}
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bg || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding: 10px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.surface || '#131821'
        : theme.colors.interactiveHover || '#f9fafb'};
  }
`;

export const CardTopLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7px;
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
  color: ${({ theme }) => theme.colors.textSecondary || '#6b7280'};
  margin-top: 2px;
  padding-left: 26px;
`;

export const IconBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 4px;
`;

export const WeekBlock = styled.div`
  background: ${({ theme }) => theme.colors.bg || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding: 16px;

  ${({ theme }) => theme.mqMax.md`
    display: none;
  `}
`;

export const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const IconBtn = styled.button`
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.surface || '#131821'
      : theme.colors.interactiveHover || '#f9fafb'};
  border: 0.5px solid ${({ theme }) => theme.colors.border || '#d1d5db'};
  padding: 4px 8px;
  margin-left: 6px;
  cursor: pointer;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.interactiveActive || 'rgb(100 150 255 / 12%)'
        : '#e5e7eb'};
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayCol = styled.div`
  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? theme.colors.error || '#ef4444'
        : theme.colors.border || '#e8e8ef'};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active &&
    `
    box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.3);
    background-color: ${theme.mode === 'dark' ? 'rgba(207, 34, 46, 0.15)' : 'rgba(254, 242, 242, 0.4)'};
  `}

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.surface || '#131821'
        : theme.colors.interactiveHover || '#f9fafb'};
  }
`;

export const DayHead = styled.div`
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.surface || '#131821'
      : theme.colors.interactiveHover || '#f9fafb'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding: 8px;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
`;

export const DayHeadLeft = styled.div`
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.surface || '#131821'
      : theme.colors.interactiveHover || '#f9fafb'};
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
  color: ${({ theme }) => theme.colors.brand || '#2563a1'};
  padding: 1px 6px;
  line-height: 1;
`;

export const DayItem = styled.div`
  border-left: 3px solid
    ${({ $variant, theme }) =>
      $variant === 'blackout'
        ? theme.colors.error || '#ef4444'
        : theme.colors.brand || '#2563eb'};
  margin: 6px;
  padding: 8px;
  font-size: 13px;
  color: ${({ $variant, theme }) =>
    $variant === 'blackout'
      ? theme.colors.error || '#b91c1c'
      : theme.colors.textPrimary || '#111827'};
  background: ${({ $variant, theme }) =>
    $variant === 'blackout'
      ? theme.mode === 'dark'
        ? 'rgba(207, 34, 46, 0.15)'
        : '#fef2f2'
      : 'transparent'};
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary || '#9ca3af'};
  font-size: 12px;
`;

export const RecoveryBlock = styled.div`
  background: ${({ theme }) => theme.colors.bg || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding: 16px;

  ${({ theme }) => theme.mqMax.md`
    display: none;
  `}
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  border-collapse: collapse;
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  table-layout: fixed;

  th {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.surface || '#131821'
        : theme.colors.interactiveHover || '#f9fafb'};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  }

  th:nth-child(1) {
    width: 40%;
  }

  th:nth-child(2) {
    width: 20%;
  }

  th:nth-child(3) {
    width: 12%;
  }

  th:nth-child(4) {
    width: 12%;
  }

  th:nth-child(5) {
    width: 16%;
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  }

  td:nth-child(1) {
    width: 40%;
  }

  td:nth-child(2) {
    width: 20%;
  }

  td:nth-child(3) {
    width: 12%;
  }

  td:nth-child(4) {
    width: 12%;
  }

  td:nth-child(5) {
    width: 16%;
  }

  thead tr:hover {
    background: none;
  }

  tbody tr:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.interactiveHover || 'rgb(100 150 255 / 8%)'
        : theme.colors.interactiveHover || '#f9fafb'};
  }
`;

export const RecoveryRow = styled.tr`
  cursor: pointer;
`;

export const Status = styled.span`
  display: inline-block;
  padding: 3px 8px;
  font-weight: 600;
  color: ${({ $status, theme }) => {
    if (
      $status === '완료' ||
      $status === 'COMPLETED' ||
      $status === '복구 완료'
    ) {
      return theme.mode === 'dark' ? '#86EFAC' : '#16a34a';
    }
    if ($status === '진행중' || $status === 'IN_PROGRESS') {
      return theme.mode === 'dark' ? '#FDE047' : '#eab308';
    }
    return theme.colors.error || '#ef4444';
  }};
  background: ${({ $status, theme }) => {
    if (
      $status === '완료' ||
      $status === 'COMPLETED' ||
      $status === '복구 완료'
    ) {
      return theme.mode === 'dark' ? 'rgba(134, 239, 172, 0.15)' : '#dcfce7';
    }
    if ($status === '진행중' || $status === 'IN_PROGRESS') {
      return theme.mode === 'dark' ? 'rgba(253, 224, 71, 0.15)' : '#fef9c3';
    }
    return theme.mode === 'dark' ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2';
  }};
  border-radius: 9999px;
`;

export const SidePanel = styled.div`
  position: fixed;
  top: var(--header-h, 72px);
  right: 0;
  width: 600px;
  height: calc(100dvh - var(--header-h, 72px));
  background: ${({ theme }) => theme.colors.bg || '#fff'};
  border-left: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  z-index: 20;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '-2px 0 6px rgb(0 0 0 / 30%)'
      : '-2px 0 6px rgb(0 0 0 / 10%)'};
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mqMax.md`
    width: 100%;
    left: 0;
    border-left: none;
    border-top: 1px solid ${theme.colors.border || '#e8e8ef'};
  `}
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.surface || '#131821'
      : theme.colors.interactiveHover || '#f9fafb'};
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};

  ${({ theme }) => theme.mqMax.md`
    padding: 12px;
  `}
`;

export const PanelTitle = styled.div`
  font-size: 16px;
  font-weight: 700;

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.md || '1rem'};
  `}
`;

export const PanelTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PanelTitleIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const PanelSub = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary || '#6b7280'};
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

  ${({ theme }) => theme.mqMax.md`
    padding: 8px 12px;
  `}
`;

export const TaskItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.bg || '#fff'};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.interactiveHover || 'rgb(100 150 255 / 8%)'
        : '#f3f4f6'};
  }

  ${({ theme }) => theme.mqMax.md`
    padding: 10px;
    margin-bottom: 8px;
  `}
`;

export const TaskTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.sm || '0.875rem'};
  `}
`;

export const TaskIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const TaskMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary || '#6b7280'};
  margin-top: 4px;

  div + div {
    margin-top: 2px;
  }

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.sm || '0.875rem'};
  `}
`;

export const TaskBadge = styled.span`
  background: ${({ $variant, theme }) => {
    if ($variant === 'alert') return theme.colors.error || '#b91c1c';
    if ($variant === 'pending') return theme.colors.brand || '#2563eb';
    return theme.mode === 'dark'
      ? theme.colors.surface || '#131821'
      : '#111827';
  }};
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
`;

export const DetailContent = styled.div`
  padding: 16px 0;
  overflow-y: auto;
  flex: 1;

  ${({ theme }) => theme.mqMax.md`
    padding: 12px 0;
  `}
`;

export const TaskStatus = styled.span`
  display: inline-block;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface || '#131821' : '#111827'};
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
  text-align: left;

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.md || '1rem'};
    margin: 0 0 8px;
  `}
`;

export const DetailMeta = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;

  li {
    margin-bottom: 6px;
  }

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.md || '1rem'};
  `}
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  margin: 16px 0;
`;

export const DetailDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary || '#374151'};
  line-height: 1.5;

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.sm || '0.875rem'};
  `}
`;

export const FileLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.brand || '#2563eb'};
  font-size: 13px;
  text-decoration: underline;

  ${({ theme }) => theme.mqMax.md`
    font-size: ${theme.typography?.fontSize.sm || '0.875rem'};
  `}
`;

export const Overlay = styled.div`
  position: fixed;
  inset: var(--header-h, 72px) 0 0 0;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgb(0 0 0 / 40%)' : 'rgb(0 0 0 / 15%)'};
  z-index: 10;

  ${({ theme }) => theme.mqMax.md`
    background: ${theme.mode === 'dark' ? 'rgb(0 0 0 / 50%)' : 'rgb(0 0 0 / 25%)'};
  `}
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
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding: 0 8px;

  ${({ theme }) => theme.mqMax.md`
    padding: 0 12px;
    margin-top: 12px;
    gap: 6px;
  `}
`;

export const StatusBadge = styled.span`
  display: inline-block;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.surface || '#131821' : '#111827'};
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin-right: auto;
`;

export const InfoTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: ${({ $singleColumn, theme }) =>
    $singleColumn ? 'none' : `1px solid ${theme.colors.border || '#e8e8ef'}`};
  border-top: ${({ $singleColumn, theme }) =>
    $singleColumn ? 'none' : `1px solid ${theme.colors.border || '#e8e8ef'}`};
  border-radius: 0;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  margin-bottom: 16px;

  ${({ theme }) => theme.mqMax.md`
    margin-bottom: 12px;
    font-size: ${theme.typography?.fontSize.xs || '0.75rem'};
  `}
`;

export const InfoColGroup = styled.colgroup`
  & > col:nth-of-type(1) {
    width: 120px;
  }

  & > col:nth-of-type(2) {
    width: ${({ $singleColumn }) => ($singleColumn ? 'auto' : '50%')};
  }

  & > col:nth-of-type(3) {
    width: 120px;
  }

  & > col:nth-of-type(4) {
    width: 50%;
  }
`;

export const InfoRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  }
`;

export const InfoTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 6px 10px;
  background: ${({ $noBorder, theme }) =>
    $noBorder
      ? 'transparent'
      : theme.mode === 'dark'
        ? theme.colors.surface || '#0f1520'
        : '#f7f9fc'};
  color: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.textSecondary || '#a8b0bf'
      : 'dimgrey'};
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography?.fontSize.sm || '0.875rem'};
  border-left: ${({ $noBorder, theme }) =>
    $noBorder ? 'none' : `1px solid ${theme.colors.border || '#e8e8ef'}`};
  border-right: ${({ $noBorder, theme }) =>
    $noBorder ? 'none' : `1px solid ${theme.colors.border || '#e8e8ef'}`};
  border-bottom: ${({ $noBorder, theme }) =>
    $noBorder ? 'none' : `1px solid ${theme.colors.border || '#e8e8ef'}`};
  text-align: ${({ $noBorder }) => ($noBorder ? 'left' : 'center')};

  ${({ theme }) => theme.mqMax.md`
    width: 80px;
    padding: 4px 8px;
    font-size: ${theme.typography?.fontSize.xs || '0.75rem'};
  `}
`;

export const InfoTd = styled.td`
  vertical-align: middle;
  padding: 6px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  font-size: ${({ theme }) => theme.typography?.fontSize.sm || '0.9rem'};

  ${({ theme }) => theme.mqMax.md`
    padding: 4px 8px;
    font-size: ${theme.typography?.fontSize.sm || '0.875rem'};
  `}
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
`;

export const Pagination = styled.nav`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing?.sm || '0.5rem'} 4px;
  margin-top: 16px;
`;

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors?.textSecondary || '#6b7280'};
  font-size: ${({ theme }) => theme.typography?.fontSize.sm || '0.875rem'};
`;

export const PageBtns = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const PageBtn = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: ${({ theme }) => theme.radius?.sm || '6px'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#d1d5db'};
  background: ${({ theme }) => theme.colors?.bg || '#fff'};
  color: ${({ theme }) => theme.colors?.textPrimary || '#111827'};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography?.fontSize.sm || '0.875rem'};
  transition: none;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-active] {
    background: ${({ theme }) => theme.colors?.brand || '#2563eb'};
    color: #fff;
    border-color: ${({ theme }) => theme.colors?.brand || '#2563eb'};
  }
`;

export const Ellipsis = styled.span`
  padding: 0 6px;
  color: ${({ theme }) => theme.colors?.textSecondary || '#6b7280'};
`;

export const ConfirmFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing?.sm || '0.5rem'};
`;

export const ConfirmButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors?.brand || '#2563eb'};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmMessage = styled.div`
  color: ${({ theme }) => theme.colors?.textPrimary || '#111827'};
  line-height: 1.6;
  text-align: center;
  padding: ${({ theme }) => theme.spacing?.md || '1rem'} 0;
`;

export const PrimaryButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.colors.brand || '#2563eb'};
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#3b82f6' : '#1d4ed8'};
  }

  ${({ theme }) => theme.mqMax.md`
    padding: 6px 10px;
    font-size: ${theme.typography?.fontSize.xs || '0.75rem'};
  `}
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

  ${({ theme }) => theme.mqMax.md`
    padding: 6px 10px;
    font-size: ${theme.typography?.fontSize.xs || '0.75rem'};
  `}
`;

// 승인/반려 모달 스타일 (ApprovalDetail과 동일)
export const ActionModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.modalOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ActionModal = styled.div`
  width: 720px;
  max-width: calc(100% - 40px);
  max-height: calc(100% - 80px);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mqMax.md`
    width: calc(100% - 24px);
    max-width: calc(100% - 24px);
    max-height: calc(100% - 40px);
  `}
`;

export const ActionModalHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.mqMax.md`
    padding: 10px 12px;
  `}
`;

export const ActionModalTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ActionModalBody = styled.div`
  padding: 12px 16px;
  flex: 1;
  overflow-y: auto;

  ${({ theme }) => theme.mqMax.md`
    padding: 10px 12px;
  `}
`;

export const ActionModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px 14px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.mqMax.md`
    padding: 10px 12px;
    gap: 6px;
  `}
`;

export const SubtleButton = styled.button`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cancelBorder || '#e8e8ef'};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const ReasonTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBg || theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
  }
`;
