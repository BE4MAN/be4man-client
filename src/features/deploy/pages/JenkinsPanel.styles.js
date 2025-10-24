import styled from '@emotion/styled';

const R = (t, key = 'lg', def = 12) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

export const JenkinsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  padding: 2px 12px 12px 0;
  box-sizing: border-box;
  overflow: hidden;

  @media (width <= 800px) {
    gap: 8px;
  }
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ $fill }) =>
    $fill &&
    `
    flex: 1 1 auto;
    min-height: 0; /* 중요한 부분: wrap되어도 아래 카드 잘림 방지 */
  `}
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (width <= 800px) {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

export const PipelineArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme)}px;
  padding: 18px 18px 12px;
  overflow-x: hidden;
  flex: 0 0 auto;
  box-sizing: border-box;

  @media (width <= 800px) {
    padding: 14px 12px 10px;
  }
`;

export const PipelineStages = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px 20px;
  padding: 6px 8px;

  /* 항상 줄바꿈 허용 */
  flex-wrap: wrap;

  /* 스테이지가 길면 자연스럽게 줄바꿈 */
  width: 100%;

  /* 스크롤 필요 없음 */
  overflow-x: visible;
  -webkit-overflow-scrolling: auto;

  @media (width <= 1200px) {
    gap: 10px 16px;
  }

  @media (width <= 800px) {
    gap: 8px 12px;
    padding: 4px;
  }
`;

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;

  & > div:first-of-type {
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

  @media (width <= 1200px) {
    width: 32px;
    height: 32px;
  }

  @media (width <= 800px) {
    width: 28px;
    height: 28px;
  }
`;

export const StageLabel = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre-line;

  @media (width <= 1200px) {
    font-size: 13px;
  }

  @media (width <= 800px) {
    font-size: 12px;
  }
`;

export const PipelineConnector = styled.div`
  width: 24px;
  height: 2px;
  background: ${({ $isDark, theme }) =>
    $isDark ? theme.colors.textSecondary : '#999'};
  margin: 0 4px;
  align-self: center;

  @media (width <= 800px) {
    width: 16px;
    margin: 0 2px;
  }
`;

export const JenkinsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px 8px; /* row gap 4px, column gap 8px로 줄임 */

  @media (width <= 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3px 6px;
  }

  @media (width <= 800px) {
    grid-template-columns: 1fr;
    gap: 2px 4px;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 6px 8px; /* 기존 12px -> 6px로 절반으로 줄임 */
  display: flex;
  gap: 4px; /* 기존 8px -> 4px로 줄임 */
  align-items: center;

  .icon-wrap {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.colors.bg};
    border: 1px solid ${({ theme }) => theme.colors.surface};
    img {
      max-width: 18px;
      max-height: 18px;
      display: block;
    }
  }

  .stat-label {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 11px;
  }

  .stat-value {
    font-weight: 700;
    font-size: 13px;
  }
`;

export const ConsoleWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConsoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.surface};

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
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }

  @media (width <= 800px) {
    padding: 8px 10px;
    h3 {
      font-size: 13px;
    }
    button {
      padding: 4px 6px;
      font-size: 11px;
    }
  }
`;

export const ConsoleContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: visible;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  line-height: 1.4;

  .line-time {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.9;
    margin-right: 8px;
  }

  @media (width <= 800px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

export const ProblemArea = styled.div`
  margin-top: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};

  h4 {
    margin: 0 0 6px;
  }

  p,
  ul {
    margin: 0 0 6px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
