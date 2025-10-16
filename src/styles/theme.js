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

const typography = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const palette = {
  light: {
    bg: '#ffffff',
    surface: '#f8f9fb',
    textPrimary: '#0f1115',
    textSecondary: '#5b6270',
    border: '#e8e8ef',
    brand: '#2563EB',
    brandText: '#2b5fe3',
    skeletonBase: 'rgba(0,0,0,0.06)',
    skeletonHi: 'rgba(0,0,0,0.12)',
    // Interactive states (Header/Sidebar pattern)
    interactiveHover: 'rgb(100 150 255 / 8%)',
    interactiveActive: 'rgb(100 150 255 / 12%)',
    // Auth 페이지용 색상
    error: '#ef4444',
    success: '#22c55e',
    github: '#000000',
    githubHover: '#1a1a1a',
    gray: '#6b7280',
    grayHover: '#4b5563',
    cancelBorder: '#575D6B',
    modalOverlay: 'rgba(0,0,0,0.6)',
    inputBg: '#f1f5f9',
  },
  dark: {
    bg: '#0e1116',
    surface: '#131821',
    textPrimary: '#e8edf7',
    textSecondary: '#a8b0bf',
    border: '#263043',
    brand: '#3b82f6',
    brandText: '#ffffff',
    skeletonBase: 'rgba(255,255,255,0.06)',
    skeletonHi: 'rgba(255,255,255,0.22)',
    // Interactive states (Header/Sidebar pattern)
    interactiveHover: 'rgb(100 150 255 / 8%)',
    interactiveActive: 'rgb(100 150 255 / 12%)',
    // Auth 페이지용 색상
    error: '#ef4444',
    success: '#22c55e',
    github: '#000000',
    githubHover: '#1a1a1a',
    gray: '#6b7280',
    grayHover: '#9ca3af',
    cancelBorder: '#575D6B',
    modalOverlay: 'rgba(0,0,0,0.6)',
    inputBg: '#1e293b',
  },
};

const base = {
  spacing,
  radius,
  shadow,
  typography,
  breakpoints: bp,
  mq,
  mqMax,
};

export const light = { mode: 'light', colors: palette.light, ...base };

export const dark = { mode: 'dark', colors: palette.dark, ...base };

export default light;
