import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 10px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Breadcrumb = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 30px;
`;

export const PrimaryBtn = styled.button`
  height: 38px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
`;

export const FilterCard = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

export const FilterLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  min-width: 70px;
`;

export const FilterSelectWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

export const SearchRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
`;

export const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
`;

export const SearchBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
`;

export const ResetBtn = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: clip;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
`;

export const Head = styled.thead`
  display: contents;
`;

export const Body = styled.tbody`
  display: contents;
`;

export const Tr = styled.tr`
  cursor: pointer;
`;

export const Th = styled.th`
  background: ${({ theme }) => (theme.mode === 'dark' ? '#111827' : '#f7f8fa')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: 10px 12px;
  text-align: center;

  & + & {
    border-left: 0.5px solid ${({ theme }) => theme.colors.border};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Td = styled.td`
  padding: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-no-ellipsis] {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }

  &[data-nopointer] {
    cursor: default;
  }
`;

export const Title = styled.span`
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LinkLike = styled.a`
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.colors.brand : '#0066cc'};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const ApproveWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const Pagination = styled.nav`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing.sm} 4px;
  margin-top: 5px;
`;

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-active] {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Ellipsis = styled.span`
  padding: 0 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatusBtn = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ theme, ...p }) =>
      p['data-variant'] === 'danger'
        ? (theme.colors.danger ?? '#DC2626')
        : p['data-variant'] === 'warning'
          ? (theme.colors.warning ?? '#D97706')
          : '#0066cc'};
  background: ${({ theme, ...p }) => {
    const isDanger = p['data-variant'] === 'danger';
    const isWarn = p['data-variant'] === 'warning';
    if (theme.mode === 'dark') {
      if (isDanger) return theme.colors.danger ?? '#DC2626';
      if (isWarn) return theme.colors.warning ?? '#D97706';
      return theme.colors.bg;
    }
    if (isDanger) return '#fff';
    if (isWarn) return '#fff';
    return theme.colors.bg;
  }};
  color: ${({ theme, ...p }) => {
    const isDanger = p['data-variant'] === 'danger';
    const isWarn = p['data-variant'] === 'warning';
    if (theme.mode === 'dark') {
      if (isDanger) return '#fff';
      if (isWarn) return '#fff';
      return theme.colors.textPrimary;
    }
    if (isDanger) return theme.colors.danger ?? '#DC2626';
    if (isWarn) return theme.colors.warning ?? '#D97706';
    return '#0066cc';
  }};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme, ...p }) => {
      const isDanger = p['data-variant'] === 'danger';
      const isWarn = p['data-variant'] === 'warning';
      if (theme.mode === 'dark') {
        if (isDanger) return theme.colors.danger ?? '#DC2626';
        if (isWarn) return theme.colors.warning ?? '#D97706';
        return theme.colors.surface;
      }
      if (isDanger) return '#FFF1F2';
      if (isWarn) return '#FFFBEB';
      return theme.colors.surface;
    }};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(2 6 23 / 50%);
  display: grid;
  place-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: min(560px, 92vw);
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const ModalBody = styled.div`
  padding: 16px;
`;

export const ReasonBox = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.6;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(148,163,184,0.08)' : '#fafafa'};
`;

export const ModalActions = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

export const KV = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 8px;
  column-gap: 10px;
  align-items: center;
  padding: 12px;

  @media (width <= 520px) {
    grid-template-columns: 100px 1fr;
  }
`;

export const K = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const V = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  min-width: 0;
`;

export const Dashed = styled.div`
  height: 1px;
  margin: 0 12px;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.border} 33%,
    transparent 0%
  );
  background-size: 8px 1px;
  background-repeat: repeat-x;
`;

export const ReasonScroll = styled.div`
  padding: 12px;
  max-height: 260px;
  overflow: auto;
`;

export const CustomSelect = styled.div`
  position: relative;
  min-width: 140px;
`;

export const CustomSelectBtn = styled.button`
  width: 100%;
  height: 36px;
  padding: 0 34px 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  cursor: pointer;
  position: relative;

  span {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

export const CustomSelectList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  overflow: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  z-index: 40;
  list-style: none;
  margin: 0;
  padding: 4px 0;

  /* 스크롤 커스텀 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(148 163 184 / 45%);
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(148 163 184 / 70%);
  }
`;

export const CustomSelectItem = styled.li`
  padding: 6px 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  line-height: 1.4;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover ?? '#eff6ff'};
  }
`;
