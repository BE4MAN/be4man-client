// 작성자 : 김민호
import styled from '@emotion/styled';

export const Wrap = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: var(--header-h);
`;

export const Main = styled.main`
  margin-left: var(--sidebar-w);
  padding-left: 0;
  min-width: 0;
  position: relative;
  min-height: calc(100vh - var(--header-h));

  @media (width <= 767px) {
    margin-left: 0;
    padding-right: 0;
  }
`;
