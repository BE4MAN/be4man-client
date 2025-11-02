import styled from '@emotion/styled';

const R = (t, key = 'lg', def = 12) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: ${({ $full }) =>
    $full ? '1fr' : '320px minmax(0,1fr)'};
  height: calc(100dvh - var(--header-h));
  min-height: 0;
  padding: 0;
  overflow: hidden;

  @media (width <= 1200px) {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
    width: 100%;
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }
`;

export const Side = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${(p) => R(p.theme)}px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;
  height: 100%;
  align-self: stretch;
  overflow: hidden;

  @media (width <= 1200px) {
    height: auto;
    align-self: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const SideHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  strong {
    font-size: 20px;
  }
`;

export const SideTop = styled.div`
  display: flex;
  gap: 15px;
`;

export const TopTab = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textPrimary : '#8B95A8'};
  -webkit-tap-highlight-color: transparent;
`;

export const SideBottom = styled.div`
  display: flex;
  margin-left: -5px;
  justify-content: space-between;
  gap: 20px;
`;

export const SideTabs = styled.div`
  display: inline-flex;
  gap: 6px;
`;

export const SideTab = styled.button`
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.tab.activeBg : theme.colors.tab.inactiveBg};
  color: #fff;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const SideCount = styled.div`
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

export const List = styled.div`
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (width <= 1200px) {
    max-height: 40vh;
  }
`;

export const SideBody = styled.div`
  display: contents;
`;

export const ApplyBtn = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const ListItem = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  padding: 10px;
  cursor: pointer;

  &[data-active='true'] {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const ItemTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

export const ItemBranch = styled.small`
  font-weight: 600;
  color: ${({ theme, $status }) => {
    if (!$status) return theme.colors.textSecondary;
    const m = theme.colors.status[$status];
    return m ? m.text : theme.colors.textSecondary;
  }};
`;

export const Badge = styled.span`
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ItemTitle = styled.div`
  margin: 6px 0 4px;
  font-weight: 600;
`;

export const ItemBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
  min-width: 0;
`;

export const ItemMeta = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  min-width: 0;
`;

export const RiskChip = styled.span`
  display: inline-block;
  margin-top: 0;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 6px;
  color: #000;
  background: ${({ theme, $risk }) =>
    $risk === 'High'
      ? theme.colors.riskChipBg.high
      : $risk === 'Medium'
        ? theme.colors.riskChipBg.medium
        : theme.colors.riskChipBg.low};
  align-self: flex-end;
  white-space: nowrap;
`;

export const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
  padding: 18px;
  height: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;

  @media (width <= 1200px) {
    border-left: none;
    overflow: visible;
    overscroll-behavior: contain;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: auto;
  }

  @media (width <= 1200px) and (hover: none) {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 14px;
  margin: 0;
  background-clip: padding-box;
  margin-bottom: 18px;
  min-width: 0;
  max-width: 100%;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;

  @media (width <= 1200px) {
    flex-wrap: wrap;
  }
`;

export const LabelBar = styled.div`
  display: inline-flex;
  gap: 6px;
  margin: 0 0 8px;
  padding: 0 2px;
`;

export const PRLabel = styled.span`
  width: 4rem;
  font-size: 13px;
  padding: 4px 8px;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-align: center;
  background: ${({ theme }) => theme.colors.labels.pr.bg};
  color: ${({ theme }) => theme.colors.labels.pr.text};
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  outline: none;
`;

export const JenkinsLabel = styled.span`
  width: 4rem;
  font-size: 13px;
  padding: 4px 8px;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-align: center;
  background: ${({ theme }) => theme.colors.labels.jenkins.bg};
  color: ${({ theme }) => theme.colors.labels.jenkins.text};
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  outline: none;
`;

export const ActionRow = styled.div`
  display: inline-flex;
  gap: 15px;

  @media (width <= 1200px) {
    display: flex;
    width: 100%;
    margin-top: 10px;
    gap: 10px;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: wrap;
    & > button {
      flex: 1 1 0;
      min-width: 0;
    }
  }
`;

export const RejectBtn = styled.button`
  width: 5rem;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.btn.rejectBg};
  color: ${({ theme }) => theme.colors.btn.rejectText};
  -webkit-tap-highlight-color: transparent;
`;

export const ApproveBtn = styled.button`
  width: 5rem;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.btn.approveBg};
  color: ${({ theme }) => theme.colors.btn.approveText};
  -webkit-tap-highlight-color: transparent;
`;

export const HistoryBtn = styled.button`
  width: 5rem;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.btn.historyBg};
  color: ${({ theme }) => theme.colors.btn.historyText};
  -webkit-tap-highlight-color: transparent;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 6px 0;

  h2 {
    font-size: 18px;
    margin: 0;
  }
  ${Badge} {
    font-size: 12px;
  }

  @media (width <= 1200px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const TitleLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  min-width: 0;
`;

export const TitleRight = styled.div`
  margin-right: 10px;

  @media (width <= 1200px) {
    order: 2;
    width: 100%;
    margin-right: 0;
  }
`;

export const SubMeta = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 7rem, 7rem);
  padding: 8px 0 2px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;

  @media (width <= 1200px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export const MetaValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  time& {
    font-variant-numeric: tabular-nums;
  }
`;

export const MetaRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  gap: 10px;
`;

export const StatusBadge = styled(Badge)`
  margin-left: -5px;

  ${({ theme, $status }) => {
    const map = theme.colors.status;
    if (!$status || !map[$status]) return '';
    const { bg, text } = map[$status];
    return `
      background: ${bg};
      color: ${text};
      border-color: ${bg};
      font-weight: 600;
    `;
  }}
`;

export const MetaAvatar = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 6px;
`;

export const Section = styled.section`
  margin-top: 8px;
`;

export const SectionTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand};
`;

export const SectionBody = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5;
`;

export const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 10px;

  ${({ theme }) => theme.mqMax.md`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const MetricCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 10px;

  small {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1;
  }

  strong {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1;
    transform: translateY(-2px);
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: stretch;
  gap: 18px;
  min-height: 0;
  height: 100%;

  @media (width <= 1200px) {
    flex-direction: column;
    height: auto;
    align-items: stretch;
  }
`;

export const LeftCol = styled.div`
  flex: 0 0 clamp(300px, 28vw, 420px);
  max-width: 42%;
  min-width: 300px;
  display: flex;
  align-items: stretch;

  @media (width <= 1200px) {
    flex-basis: auto;
    min-width: 0;
    max-width: 100%;
  }
`;

export const RightCol = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (width <= 1200px) {
    flex: 1 1 auto;
    width: 100%;
  }
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  width: 100%;

  @media (width <= 1200px) {
    height: auto;
    align-self: stretch;
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RelatedProjectArea = styled.div`
  height: 220px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  place-items: center;
  position: relative;
  align-self: stretch;
  display: flex;
  min-height: 0;
  overflow: hidden;
  overscroll-behavior: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const DepTableInner = styled.div`
  margin: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const DepHeader = styled.div`
  display: grid;
  grid-template-columns: 30% 50% 20%;
  padding: 10px 15px;
  font-weight: 700;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  position: sticky;
  top: 0;
  z-index: 1;
  justify-items: center;
  align-items: center;

  & > div {
    white-space: nowrap;
    word-break: keep-all;
  }
`;

export const DepBody = styled.div`
  min-height: 0;
`;

export const DepRow = styled.div`
  display: grid;
  grid-template-columns: 30% 50% 20%;
  padding: 16px 18px;
  height: 1rem;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const DepCell = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  &[data-col='status'] {
    gap: 10px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export const StatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: ${({ $ok }) => ($ok ? '#22c55e' : '#ef4444')};
`;

export const RiskAnalystArea = styled.div`
  height: 220px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  align-self: stretch;
  overflow: auto;
  padding-left: 15px;
  overscroll-behavior: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (width <= 480px) {
    height: auto;
    max-height: 240px;
  }
`;

export const RiskList = styled.ol`
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};

  li {
    font-size: 14px;
    line-height: 1.2;
  }
`;

export const RiskText = styled.div`
  font-size: 14px;
  white-space: normal;
  overflow-wrap: anywhere;
  line-break: anywhere;
`;

export const RiskSub = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: normal;
  overflow-wrap: anywhere;
  line-break: anywhere;
`;

export const Empty = styled.div`
  padding: 12px 14px;
  color: #8b95a8;
  font-size: 14px;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;

  @media (width <= 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MetaCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
  margin-left: -5px;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
`;

export const TimeEl = styled.time`
  display: inline-block;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StatRow3 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const CardBase = styled.div`
  border-radius: 16px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;

  .tit {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 0.2px;
  }

  strong {
    font-size: 30px;
    font-weight: 900;
    line-height: 1;
  }
`;

export const StatOk = styled(CardBase)`
  background: rgb(34 197 94 / 8%);
  border: 1px solid rgb(34 197 94 / 25%);

  .tit,
  strong {
    color: #16a34a;
  }
`;

export const StatWarn = styled(CardBase)`
  background: rgb(239 68 68 / 8%);
  border: 1px solid rgb(239 68 68 / 25%);

  .tit,
  strong {
    color: #ef4444;
  }
`;

export const StatInfo = styled(CardBase)`
  background: rgb(59 130 246 / 8%);
  border: 1px solid rgb(59 130 246 / 25%);

  .tit,
  strong {
    color: #3b82f6;
  }
`;

export const ApplyShell = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: calc(100dvh - var(--header-h));
  min-height: 0;
  padding: 0;
  overflow: hidden;

  @media (width <= 1200px) {
    height: auto;
    overflow: visible;
    width: 100%;
    max-width: 100vw;
  }
`;

export const ApplyMain = styled.main`
  display: block;
  min-height: 0;
  height: 100%;
  padding: 16px;

  @media (width <= 1200px) {
    height: auto;
    overflow: visible;
  }
`;

export const ApplyWrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 16px;
  min-width: 0;
  min-height: 0;

  @media (width <= 1200px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ApplyLeft = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 20px;
`;

export const ApplyRight = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const RightTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ServiceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (width <= 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  height: 35px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Select = styled.select`
  height: 35px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 10px;
  font-size: 14px;
  height: 7rem;
  resize: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const DateField = styled.div`
  .react-datepicker-wrapper,
  [class*='react-datepicker__input-container'] {
    display: block;
    width: 100%;
  }

  [class*='react-datepicker__input-container'] input {
    width: 100%;
    height: 35px;
    padding: 0 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.bg};
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    color: ${({ theme }) => theme.colors.textPrimary};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  gap: 8px;
  padding: 10px;
  width: 100%;
  min-width: 0;
  overflow-x: hidden;
`;

export const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

export const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 12px;
  flex: 0 0 auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    line-height: 1;
    color: inherit;
  }
`;

export const SmallBtn = styled.button`
  height: 30px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ApproverBox = styled.div`
  margin-top: 8px;
  flex: 1;
  min-height: 280px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  padding: 12px;
  overflow: auto;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FlexRow = styled.div`
  display: flex;
  gap: ${({ gap }) => gap ?? 12}px;
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  cursor: pointer;
`;

export const SecondaryBtn = styled.button`
  height: 48px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
