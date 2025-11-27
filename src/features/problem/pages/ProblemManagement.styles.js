// 작성자 : 김민호, 이원석
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
`;

export const ActionBar = styled.div`
  height: 3rem;
  margin: 0 0 -10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
