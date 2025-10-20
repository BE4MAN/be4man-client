import styled from '@emotion/styled';

export const Wrap = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
  grid-template-rows: var(--header-h) 1fr;

  @media (width <= 767px) {
    grid-template-areas:
      'header header'
      'main   main';
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  grid-area: main;
  padding-left: 0;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media (width <= 767px) {
    padding-left: 0;
    padding-right: 0;
    height: calc(100dvh - var(--header-h));
  }
`;
