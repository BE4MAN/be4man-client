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

export const Wrap = styled.div`
  ${({ theme }) => vars(theme)}

  overflow: auto;
  width: 100%;
  background: ${({ theme }) =>
    theme.colors?.background ??
    (theme.mode === 'dark' ? '#0b0d12' : '#f6f7fb')};
`;

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 16px;
  width: 100%;
  justify-self: center;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 2%);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

export const RightGroup = styled.div`
  display: flex;
  flex-direction: end;
  gap: 6px;
  flex-wrap: wrap;
`;

export const SubtleBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#fff')};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#182030' : '#f0f4f9'};
  }
`;

export const PrimaryBtn = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#2563eb' : '#2563eb')};
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === 'dark' ? '#1d4ed8' : '#1e40af'};
  }
`;

export const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 16px;
  margin-bottom: 12px;
`;

export const TitleWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
`;

export const DocTitle = styled.h2`
  text-align: center;
  margin: 6px 0 16px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
`;

export const InfoTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const InfoColGroup = styled.colgroup`
  & > col:nth-of-type(1) {
    width: 120px;
  }

  & > col:nth-of-type(2) {
    width: 50%;
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
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const InfoTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 8px 10px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

export const InfoTd = styled.td`
  vertical-align: middle;
  padding: 8px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Section = styled.section`
  margin: 14px 0;
`;

export const SecHead = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ALTable = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  overflow: hidden;

  --c1: 8%;
  --c2: 12%;
  --c3: 10%;
  --c4: 10%;
  --c5: 10%;
  --c6: 10%;
  --c7: 40%;
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
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  vertical-align: middle;
  padding: 6px 10px;
  min-width: 0;
  text-align: center;
`;

export const ALHeadRow = styled(ALRow)`
  & > ${ALCell}:nth-of-type(1) {
    width: var(--c1);
  }
  & > ${ALCell}:nth-of-type(2) {
    width: var(--c2);
  }
  & > ${ALCell}:nth-of-type(3) {
    width: var(--c3);
  }
  & > ${ALCell}:nth-of-type(4) {
    width: var(--c4);
  }
  & > ${ALCell}:nth-of-type(5) {
    width: var(--c5);
  }
  & > ${ALCell}:nth-of-type(6) {
    width: var(--c6);
  }
  & > ${ALCell}:nth-of-type(7) {
    width: var(--c7);
  }

  @media (width <= 960px) {
    & > ${ALCell}:nth-of-type(7) {
      width: 46%;
    }
  }
`;

export const BodyViewer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 14px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0b0f17' : '#fff')};
  min-height: 220px;

  h1,
  h2,
  h3 {
    margin: 12px 0 8px;
  }

  p,
  li {
    line-height: 1.6;
  }

  ul {
    padding-left: 20px;
  }
`;

export const CommentText = styled.div`
  white-space: pre-wrap;
  line-height: 1.55;
  text-align: left;
  max-height: none;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 45%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const Modal = styled.div`
  background: ${({ theme }) => (theme.mode === 'dark' ? '#111827' : '#fff')};
  color: ${({ theme }) => theme.colors.text};
  width: 70%;
  max-width: 90%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 30px rgb(0 0 0 / 30%);
`;

export const ModalHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
  font-size: 16px;
`;

export const ModalTitle = styled.h4`
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

export const ModalActions = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#fafafa')};
  gap: 8px;
`;
