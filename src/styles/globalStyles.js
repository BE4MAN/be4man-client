import { css } from '@emotion/react';

export const globalStyles = (theme) => css`
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

  .safe-area-px {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
`;
