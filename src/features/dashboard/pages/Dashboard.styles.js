import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 24px;
  display: grid;
  gap: 24px;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${({ theme }) => theme.mq.md`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 10px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
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
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-top: 2px;
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: 800;
  line-height: 1.1;
`;

export const StatDesc = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
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
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
`;

export const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 8px;
  margin-bottom: 16px;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const IconBtn = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 4px 8px;
  margin-left: 6px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayCol = styled.div`
  border: 0.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.schedule.restrictedDanger : theme.colors.border};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active &&
    `
    box-shadow: 0 0 0 1px ${theme.colors.schedule.restrictedHover};
    background-color: ${theme.colors.schedule.restrictedBg};
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const DayHead = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  display: flex;
  justify-content: space-between;
`;

export const DayHeadLeft = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DayDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MoreBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.schedule.deploymentPrimary};
  padding: 1px 6px;
  line-height: 1;
`;

export const DayItem = styled.div`
  border-left: 3px solid
    ${({ $variant, theme }) =>
      $variant === 'blackout'
        ? theme.colors.schedule.restrictedDanger
        : theme.colors.schedule.deploymentPrimary};
  margin: 6px;
  padding: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $variant, theme }) =>
    $variant === 'blackout'
      ? theme.colors.schedule.restrictedDanger
      : theme.colors.textPrimary};
  background: ${({ $variant, theme }) =>
    $variant === 'blackout'
      ? theme.colors.schedule.restrictedBg
      : 'transparent'};
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const RecoveryBlock = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 16px;
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const Table = styled.table`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;

  th {
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  td {
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
    padding: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const RecoveryRow = styled.tr`
  cursor: pointer;
`;

// Dashboard.styles.js 안에서 Status 부분만 교체

export const Status = styled.span`
  display: inline-block;
  padding: 3px 8px;
  font-weight: 600;
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};

  ${({ theme, $status }) => {
    const map = {
      '복구 완료': theme.colors.status.completed, // 완료 → 보라 계열
      진행중: theme.colors.status.inprogress, // 진행중 → 파랑 계열
      분석중: theme.colors.status.pending, // 분석중 → 노랑 계열
    };

    const conf = map[$status] || theme.colors.status.rejected;

    return `
      background: ${conf.bg};
      color: ${conf.text};
    `;
  }}
`;

export const SidePanel = styled.div`
  position: fixed;
  top: var(--header-h, 72px);
  right: 0;
  width: 480px;
  height: calc(100dvh - var(--header-h, 72px));
  background: ${({ theme }) => theme.colors.surface};
  border-left: 0.5px solid ${({ theme }) => theme.colors.border};
  z-index: 20;
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: flex;
  flex-direction: column;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PanelTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
`;

export const PanelTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const PanelSub = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TaskList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
`;

export const TaskItem = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const TaskTitle = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TaskMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;

  div + div {
    margin-top: 2px;
  }
`;

export const TaskBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;

  ${({ $variant, theme }) => {
    const s = theme.colors.status;
    if ($variant === 'pending') {
      return `
        background:${s.pending.bg};
        color:${s.pending.text};
      `;
    }
    if ($variant === 'approved') {
      return `
        background:${s.approved.bg};
        color:${s.approved.text};
      `;
    }
    if ($variant === 'rejected') {
      return `
        background:${s.rejected.bg};
        color:${s.rejected.text};
      `;
    }
    if ($variant === 'canceled') {
      return `
        background:${s.canceled.bg};
        color:${s.canceled.text};
      `;
    }
    if ($variant === 'inprogress') {
      return `
        background:${s.inprogress.bg};
        color:${s.inprogress.text};
      `;
    }
    if ($variant === 'completed') {
      return `
        background:${s.completed.bg};
        color:${s.completed.text};
      `;
    }
    if ($variant === 'alert') {
      return `
        background:${theme.colors.error};
        color:${theme.colors.onPrimary};
      `;
    }
    return `
      background:${theme.colors.gray};
      color:${theme.colors.onPrimary};
    `;
  }}
`;

export const DetailContent = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

export const TaskStatus = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.gray900};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  padding: 4px 8px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

export const DetailTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  margin: 0 0 12px;
`;

export const DetailMeta = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  li {
    margin-bottom: 6px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};
  margin: 16px 0;
`;

export const DetailDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5;
`;

export const FileLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: underline;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: var(--header-h, 72px) 0 0 0;
  background: ${({ theme }) => theme.colors.modalOverlay};
  z-index: 10;
`;

export const PanelRight = styled.div`
  display: flex;
`;

export const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const DangerButton = styled.button`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
