import styled from '@emotion/styled';

const R = (t, key = 'lg', def = 12) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

export const JenkinsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* fill the parent area managed by DeployManagement.Wrap / Main */

  /* when a card is intended to fill remaining space (like console), pass $fill */
  min-height: 0;
  padding: 2px 12px 12px 0;
  box-sizing: border-box;
  overflow: hidden; /* 내부 스크롤만 허용 */
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* when a card is intended to fill remaining space (like console), pass $fill */
  ${({ $fill }) =>
    $fill &&
    `
    flex: 1 1 auto;
    min-height: 0;
  `}
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PipelineArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 18px 18px 12px;
  overflow-x: hidden; /* prevent horizontal overflow, allow internal wrap */
  flex: 0 0 auto; /* 내용 크기만큼 높이 차지 */
  box-sizing: border-box;

  @media (width <= 800px) {
    padding: 20px;
  }
`;

export const PipelineStages = styled.div`
  display: flex;

  /* align items at the top so circles are on the same baseline; labels sit below
    and won't push the circle vertically when they wrap or have multiple lines */
  align-items: flex-start;
  justify-content: center; /* center horizontally */
  gap: 12px 20px;
  padding: 6px 8px;
  flex-wrap: wrap; /* allow stages to wrap onto multiple rows instead of forcing horizontal scroll */
`;

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;

  /* ensure the circle is not nudged by multi-line labels: give the circle a fixed
    margin-top offset area and allow the label to grow independently */
  & > div:first-of-type {
    /* StageCircle wrapper - keep it aligned */
    margin-bottom: 6px;
    flex: 0 0 auto;
  }
`;

export const StageCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: ${({ theme, $status }) => {
    const map = theme.colors.status;
    if ($status && map && map[$status] && map[$status].text)
      return map[$status].text;
    if ($status === 'success') return '#1dd36f';
    if ($status === 'failed') return '#ff4d4f';
    return theme.colors.textPrimary;
  }};
  background: ${({ theme }) => theme.colors.bg};
  border: 3px solid
    ${({ theme, $status }) => {
      const map = theme.colors.status;
      if ($status && map && map[$status] && map[$status].bg)
        return map[$status].bg;
      if ($status === 'success') return '#1dd36f';
      if ($status === 'failed') return '#ff4d4f';
      return 'transparent';
    }};

  @media (width <= 800px) {
    width: 30px;
    height: 30px;
  }
`;

export const StageLabel = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre-line;

  @media (width <= 800px) {
    font-size: 13px;
  }
`;

export const PipelineConnector = styled.div`
  height: 2px;

  /* choose color from prop when available; default to black */
  background: ${({ $isDark }) => ($isDark ? '#fff' : '#000')};
  flex: 0 0 24px;
  align-self: center;

  /* If prop not used, prefer system-level dark mode as a fallback */
  @media (prefers-color-scheme: dark) {
    background: #fff;
  }

  /* Some apps toggle theme with a data attribute on body — handle that too */
  body[data-theme='dark'] & {
    background: #fff;
  }

  @media (width <= 800px) {
    flex: 0 0 12px;
  }
`;

export const JenkinsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  flex: 0 0 auto;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 24px;
  display: flex;
  gap: 12px;
  align-items: center;

  .icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.colors.bg};
    border: 1px solid ${({ theme }) => theme.colors.surface};
    font-weight: 700;
    img {
      max-width: 22px;
      max-height: 22px;
      display: block;
    }
  }

  .stat-label {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 12px;
  }

  .stat-value {
    font-weight: 700;
    font-size: 14px;
  }
`;

export const StatNote = styled.div`
  margin-top: 8px;
  padding: 4px 0;
  font-size: 12px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ConsoleWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;

  /* 핵심 */
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 내부 스크롤 정상작동용 */
  overflow: hidden;
`;

export const ConsoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 24px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0;
    font-size: 14px;
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  button {
    background: ${({ theme }) => theme.colors.bg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPrimary};
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const ConsoleContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 24px 32px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  line-height: 1.4;

  .line-time {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.9;
    margin-right: 8px;
  }
`;

export const ProblemArea = styled.div`
  margin-top: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};

  h4 {
    margin: 0 0 8px;
  }

  p {
    margin: 0 0 10px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
