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

  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : 'var(--border)'};
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

  &[data-bb] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

// 기본 MetaTd 스타일
export const MetaTd = styled.td`
  vertical-align: middle;
  padding: 8px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// 등록자/등록부서 (텍스트만)
export const MetaTdText = styled(MetaTd)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

// 제목
export const MetaTdTitle = styled(MetaTd)`
  & > input {
    width: 100%;
  }
`;

// 금지 주기 (RecurrenceContainer)
export const MetaTdRecurrence = styled(MetaTd)`
  & > div {
    width: 100% !important;
  }
`;

// 금지 일자 (DateTimePicker)
export const MetaTdDate = styled(MetaTd)`
  & > div {
    width: 100%;
  }
`;

// 시작 시각 (TimeInput)
export const MetaTdTime = styled(MetaTd)`
  & > input {
    width: 55.5%;
    min-width: 80px;
  }
`;

// 금지 시간 (RestrictedHoursInput)
export const MetaTdRestrictedHours = styled(MetaTd)`
  & > div {
    width: 45%;
    min-width: 80px;
  }
`;

// 연관 서비스 (ServiceSelectContainer)
export const MetaTdService = styled(MetaTd)`
  & > div {
    width: 100%;
  }
`;

// 설명 (Textarea)
export const MetaTdDescription = styled(MetaTd)`
  & > textarea {
    width: 100%;
  }
`;

// RecurrenceContainer는 MetaTd의 직접 자식이므로 별도 처리
export const RecurrenceContainerWrapper = styled.div`
  width: 100% !important;
`;

export const ServiceSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  width: 25%;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ServiceInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 25%;
`;

export const ServiceSelectWrapper = styled.div`
  flex: 0.75;
  min-width: 0;
`;

export const ServiceButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

export const ServiceButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 2.2rem;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.brand};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.interactiveActive};
  }
`;

export const ServicesTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-left: 5px;

  & > * {
    padding-left: 13px;
  }
`;

export const DateTimeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RecurrenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const RecurrenceTypeSelect = styled.div`
  width: 144px;
`;

export const RecurrenceField = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 150px;
  margin-left: 30px;

  & > div {
    flex: 1;
    min-width: 0;
  }
`;

export const RecurrenceLabel = styled.label`
  min-width: 80px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const RecurrenceTimeFields = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const RecurrenceEndSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-left: 15px;
`;

export const RecurrenceEndLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const RecurrenceEndControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const RecurrenceEndPicker = styled.div`
  min-width: 180px;

  & > div {
    width: 100%;
  }
`;

export const RecurrenceEndNoneOption = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.brand};
  }
`;

export const TimeInput = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  width: 100%;
  min-width: 80px;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

export const RestrictedHoursInputWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 80px;
`;

export const RestrictedHoursInput = styled.input`
  ${({ theme }) => vars(theme)}
  ${baseInput}

  width: 100%;
  padding-right: 50px;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

export const HoursUnit = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const MinutesUnit = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const DurationInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;
