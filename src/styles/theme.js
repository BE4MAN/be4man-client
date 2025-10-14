const bp = { xs: 360, sm: 480, md: 768, lg: 1024, xl: 1280 };

const mediaFactory =
  (min) =>
  (strings, ...vals) => {
    if (Array.isArray(strings)) {
      const css = strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ''), '');
      return `@media (min-width:${min}px){${css}}`;
    }
    return `@media (min-width:${min}px){${strings}}`;
  };

const maxFactory =
  (max) =>
  (strings, ...vals) => {
    if (Array.isArray(strings)) {
      const css = strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ''), '');
      return `@media (max-width:${max}px){${css}}`;
    }
    return `@media (max-width:${max}px){${strings}}`;
  };

export const mq = Object.fromEntries(
  Object.entries(bp).map(([k, v]) => [k, mediaFactory(v)]),
);

export const mqMax = Object.fromEntries(
  Object.entries(bp).map(([k, v]) => [k, maxFactory(v)]),
);

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
};

const radius = { sm: '6px', md: '10px', lg: '14px' };
const shadow = {
  sm: '0 2px 8px rgba(0,0,0,0.05)',
  md: '0 4px 16px rgba(0,0,0,0.08)',
};

const palette = {
  light: {
    bg: '#ffffff',
    surface: '#f8f9fb',
    textPrimary: '#0f1115',
    textSecondary: '#5b6270',
    border: '#e8e8ef',
    brand: '#4f7df3',
    brandText: '#2b5fe3',
    skeletonBase: 'rgba(0,0,0,0.06)',
    skeletonHi: 'rgba(0,0,0,0.12)',
  },
  dark: {
    bg: '#0e1116',
    surface: '#131821',
    textPrimary: '#e8edf7',
    textSecondary: '#a8b0bf',
    border: '#263043',
    brand: '#6da2ff',
    brandText: '#ffffff',
    skeletonBase: 'rgba(255,255,255,0.06)',
    skeletonHi: 'rgba(255,255,255,0.22)',
  },
};

const base = {
  spacing,
  radius,
  shadow,
  breakpoints: bp,
  mq,
  mqMax,
};

export const light = { mode: 'light', colors: palette.light, ...base };

export const dark = { mode: 'dark', colors: palette.dark, ...base };

export default light;
