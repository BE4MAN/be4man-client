import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
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
  transition:
    background 0.15s,
    box-shadow 0.15s,
    border-color 0.15s;

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

  th {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.surface || '#131821'
        : theme.colors.interactiveHover || '#f9fafb'};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  }

  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
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
`;

export const PanelTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
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
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? theme.colors.interactiveHover || 'rgb(100 150 255 / 8%)'
        : '#f3f4f6'};
  }
`;

export const TaskTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
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
  border-top: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  margin: 16px 0;
`;

export const DetailDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary || '#374151'};
  line-height: 1.5;
`;

export const FileLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.brand || '#2563eb'};
  font-size: 13px;
  text-decoration: underline;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: var(--header-h, 72px) 0 0 0;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgb(0 0 0 / 40%)' : 'rgb(0 0 0 / 15%)'};
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
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding: 0 8px;
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
`;

export const InfoTd = styled.td`
  vertical-align: middle;
  padding: 6px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e8e8ef'};
  color: ${({ theme }) => theme.colors.textPrimary || '#111827'};
  font-size: ${({ theme }) => theme.typography?.fontSize.sm || '0.9rem'};
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

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-active] {
    background: ${({ theme }) => theme.colors?.brand || '#2563eb'};
    color: #fff;
    border-color: ${({ theme }) => theme.colors?.brand || '#2563eb'};
  }

  &:hover:not([disabled]) {
    background: ${({ theme }) => theme.colors?.interactiveHover || '#f9fafb'};
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
