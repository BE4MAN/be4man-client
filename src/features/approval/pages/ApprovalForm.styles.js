// 작성자 : 허겸, 김민호, 이원석
import styled from '@emotion/styled';

const R = (t, key = 'lg', def = 12) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

const vars = (t) => `
  --bg: ${t.mode === 'dark' ? '#0f1520' : '#fff'};
  --fg: ${t.colors.text};
  --muted: ${t.colors.textMuted ?? '#8B95A1'};
  --border: ${t.colors.border};
  --border-strong: ${t.colors.borderStrong ?? t.colors.border};
  --ring: ${t.mode === 'dark' ? 'rgba(37,99,235,.25)' : 'rgba(37,99,235,.2)'};
`;

const baseInput = `
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--fg);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
  &::placeholder { color: var(--muted); }
  &:focus { border-color: var(--border-strong); box-shadow: 0 0 0 3px var(--ring); }
  &:disabled { background: var(--bg); color: var(--fg); opacity: 1; cursor: default; }
  &[readonly] { cursor: pointer; }
`;

export const Wrap = styled.div`
  overflow: auto;
  background: ${({ theme }) =>
    theme.colors?.background ??
    (theme.mode === 'dark' ? '#0b0d12' : '#f6f7fb')};
`;

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  width: 100%;
  justify-self: center;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

export const ToolRight = styled.div`
  display: flex;
  justify-content: end;
  gap: 6px;
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary ?? '#0066cc'};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

export const SecondaryBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const ToolBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const DocTitle = styled.h2`
  text-align: center;
  margin: 6px 0 16px;
  font-size: 28px;
`;

export const MetaTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: visible;
  margin-bottom: 12px;
`;

export const MetaColGroup = styled.colgroup`
  & > col:nth-of-type(1) {
    width: 140px;
  }

  & > col:nth-of-type(2) {
    width: 50%;
  }

  & > col:nth-of-type(3) {
    width: 140px;
  }

  & > col:nth-of-type(4) {
    width: 50%;
  }
`;

export const MetaRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MetaTh = styled.th`
  width: 140px;
  vertical-align: middle;
  padding: 8px 10px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;

  &[data-bb] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MetaTd = styled.td`
  vertical-align: middle;
  padding: 8px 10px;

  & > input,
  & > select,
  & > textarea {
    width: 100%;
  }

  &[data-bb] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Input = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}
`;

export const Select = styled.select`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  &[data-nocaret='true'] {
    appearance: none;
    background-image: none !important;
  }

  &[data-nocaret='true']::-ms-expand {
    display: none;
  }
`;

export const Textarea = styled.textarea`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  height: auto;
  min-height: 220px;
  padding: 10px 12px;
  line-height: 1.6;
  resize: vertical;
`;

export const EditorCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;

  .tiptap {
    outline: none;
  }
`;

export const EditorToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f7fb')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ToolGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ToolIcon = styled.button`
  padding: 6px 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  border-radius: 6px;
  font-size: 12px;
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.text};
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;

  & > img,
  & > svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const Separator = styled.span`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.colors.border};
  display: inline-block;
`;

export const ALBox = styled.section`
  margin: 8px 0 16px;
`;

export const ALHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ALTitle = styled.div`
  font-weight: 700;
`;

export const ALActions = styled.div`
  display: flex;
  gap: 6px;
`;

export const ALSmallBtn = styled.button`
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#111827' : theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const ALTable = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;
`;

export const ALRow = styled.div`
  display: table-row;

  &[data-head] {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#0f1520' : '#f1f5f9'};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 700;
    & > div {
      text-align: center;
    }
  }

  &:not([data-head]) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const ALCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 6px 10px;
  min-width: 0;

  & > input,
  & > select,
  & > textarea {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const ALActionsCell = styled(ALCell)`
  display: table-cell;
  text-align: center;
  white-space: nowrap;

  & > * + * {
    margin-left: 6px;
  }

  @media (width <= 760px) {
    display: block;
    text-align: left;
    & > * {
      width: 100%;
      margin-left: 0;
    }
    & > * + * {
      margin-top: 6px;
    }
  }
`;

export const ModalScrim = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 45%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalCard = styled.div`
  width: min(920px, calc(100vw - 32px));
  height: 80vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;
`;

export const ModalHead = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f7fb')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
`;

export const CloseBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const ModalToolbar = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#fbfcfe')};
`;

export const ModalBody2 = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 12px;
  padding: 12px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}
`;

export const TreePanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const PanelHead = styled.div`
  flex: 0 0 auto;
  padding: 8px 10px;
  font-weight: 700;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#101827' : '#f1f5f9')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TreeScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 6px 8px;
`;

export const TreeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;

  &[data-active='true'] {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#0f1628' : '#eef6ff'};
  }

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#0e1420' : '#f6f7fb'};
  }
`;

export const TreeToggle = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0e1420' : '#fff')};
  line-height: 1;
  cursor: pointer;
`;

export const TreeTogglePlaceholder = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
`;

export const ListPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const TableLike = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
  height: 100%;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#101827' : '#f1f5f9')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  & > div {
    padding: 8px 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }

  & > div:last-child {
    border-right: 0;
  }
`;

export const TableBody = styled.div`
  overflow: auto;
  min-height: 0;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  & > div {
    padding: 10px;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }

  & > div:last-child {
    border-right: 0;
  }

  &[data-full='true'] > div {
    grid-column: 1 / -1;
    text-align: center;
  }

  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#0f152a' : '#fafcff'};
  }

  &[data-active='true'] {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#0c1220' : '#e9f2ff'};
  }
`;

export const ModalFoot = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#fbfcfe')};
`;

export const ConfirmBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary ?? '#0066cc'};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  margin-right: 6px;
`;

export const CancelBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
  }
`;

export const ConfirmScrim = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 45%);
  display: grid;
  place-items: center;
  z-index: 1100;
`;

export const ProblemScrim = styled(ConfirmScrim)`
  z-index: 900;
`;

export const ConfirmCard = styled.div`
  width: min(520px, calc(100vw - 32px));
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  box-shadow: 0 12px 30px rgb(0 0 0 / 25%);
  overflow: hidden;
`;

export const ConfirmHead = styled.div`
  padding: 12px 14px;
  background: var(--head-bg);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ConfirmTitle = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const ConfirmBody = styled.div`
  padding: 14px;
`;

export const ConfirmMsg = styled.div`
  margin-bottom: 10px;
  line-height: 1.6;

  & > strong {
    font-weight: 800;
  }
`;

export const SummaryKV = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  row-gap: 6px;
  column-gap: 10px;
  align-items: center;
`;

export const K = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const V = styled.div`
  color: ${({ theme }) => theme.colors.text};
  min-width: 0;
`;

export const ConfirmFoot = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 14px;
`;

export const CustomSelect = styled.div`
  position: relative;
  width: 100%;
`;

export const CustomSelectBtn = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const CustomSelectList = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 110;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

export const CustomSelectItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;
