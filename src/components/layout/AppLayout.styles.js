import styled from '@emotion/styled';

export const Wrap = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-rows: 56px 1fr;
  grid-template-columns: 195px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';

  @media (width <= 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main';
  }
`;

export const Main = styled.main`
  grid-area: main;
  padding: 20px;
`;
