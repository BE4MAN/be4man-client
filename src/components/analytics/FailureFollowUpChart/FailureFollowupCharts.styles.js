import styled from '@emotion/styled';

export const PanelContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PanelTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PanelContent = styled.div`
  padding: 12px ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  --chart-grid-color: ${({ theme }) =>
    theme.mode === 'light' ? '#F3F4F6' : '#374151'};
  --chart-text-color: ${({ theme }) => theme.colors.textSecondary};

  /* 작은 화면 폰트 살짝 축소 */
  @media (width <= 820px) {
    --chart-text-color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 12px;
  }
`;

// 가로 스크롤 컨테이너 (스크롤바 숨김)
export const ChartScroll = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 8px;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  /* 모바일에서 여백 살짝 축소 */
  @media (width <= 820px) {
    margin-bottom: 4px;
  }
`;

export const ChartInner = styled.div`
  min-width: 100%;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;
