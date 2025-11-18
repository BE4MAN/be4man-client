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

export const FormContainer = styled.div`
  width: 100%;
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
    width: 75%;
  }

  & > col:nth-of-type(3) {
    width: 120px;
  }

  & > col:nth-of-type(4) {
    width: 75%;
  }
`;

export const MetaRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MetaTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 8px 10px 8px 15px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MetaTd = styled.td`
  vertical-align: middle;
  padding: 8px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 0;
`;

export const MetaTdText = styled(MetaTd)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const MetaTdTitle = styled(MetaTd)`
  & > input {
    width: 100%;
  }
`;

export const MetaTdDescription = styled(MetaTd)`
  & > div {
    width: 100%;
  }
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
  border-radius: 0.3125rem;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--fg);
  outline: none;
  &::placeholder { color: var(--muted); }
  &:disabled { background: var(--bg); color: var(--fg); opacity: 1; cursor: default; }
  &[readonly] { cursor: pointer; }
`;

export const Input = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  border: none;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : 'transparent'};
`;
