import { css } from '@emotion/react';

export const globalStyles = (theme) => css`
  :root {
    --header-h: 72px;
    --header-h-sm: 56px;
    --sidebar-w: 170px;
  }

  @media (width <= 767px) {
    :root {
      --header-h: var(--header-h-sm);
      --sidebar-w: 0px;
      --page-gap: 0px;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    font-size: clamp(14px, 1.2vw + 10px, 16px);
  }

  body {
    margin: 0;
    background: ${theme.colors.bg};
    color: ${theme.colors.textPrimary};
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.brand};
    outline-offset: 2px;
  }
`;
