import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  padding: 1.5rem;
`;

export const ActionBar = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-width: 0;
`;

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`;
