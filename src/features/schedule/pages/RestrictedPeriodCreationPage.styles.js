import styled from '@emotion/styled';

const R = (t, key = 'lg', def = 12) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

export const PageContainer = styled.div`
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

export const PageTitle = styled.h2`
  text-align: center;
  margin: 6px 0;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

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

export const Input = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : 'var(--border)'} !important;
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

export const MetaTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const MetaColGroup = styled.colgroup`
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

export const MetaRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MetaTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 8px 10px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &[data-bb] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MetaTd = styled.td`
  vertical-align: middle;
  padding: 8px 18px;

  & > input,
  & > select,
  & > textarea,
  & > div {
    width: 100%;
  }

  &[data-bb] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const ServicesTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const DateTimeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
