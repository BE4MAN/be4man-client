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

    primary: '#2563EB',
    onPrimary: '#ffffff',
    gray900: '#1F2937',
    tab: {
      activeBg: '#2563EB',
      inactiveBg: '#7894BC',
    },
    status: {
      pending: { bg: '#86EFAC', text: '#14532D' },
      approved: { bg: '#FDE047', text: '#713F12' },
      rejected: { bg: '#FCA5A5', text: '#7F1D1D' },
      deployed: { bg: '#93C5FD', text: '#1E3A8A' },
    },
    btn: {
      approveBg: '#4ccc88',
      approveText: '#000',
      rejectBg: '#ff6b6b',
      rejectText: '#000',
    },
    riskChipBg: {
      high: '#ff6b6b',
      medium: '#ffb84d',
      low: '#4ccc88',
    },
    labels: {
      pr: { bg: '#447B58', text: '#E6EEFF' },
      jenkins: { bg: '#374764', text: '#E6EEFF' },
    },
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

    primary: '#2563EB',
    onPrimary: '#ffffff',
    gray900: '#1F2937',
    tab: {
      activeBg: '#2563EB',
      inactiveBg: '#1F2937',
    },
    status: {
      pending: { bg: '#14532D', text: '#86EFAC' },
      approved: { bg: '#713F12', text: '#FDE047' },
      rejected: { bg: '#7F1D1D', text: '#FCA5A5' },
      deployed: { bg: '#1E3A8A', text: '#93C5FD' },
    },
    btn: {
      approveBg: 'rgb(80 200 120 / 14%)',
      approveText: '#4ccc88',
      rejectBg: 'rgb(255 90 90 / 12%)',
      rejectText: '#ff6b6b',
    },
    riskChipBg: {
      high: '#ff6b6b',
      medium: '#ffb84d',
      low: '#4ccc88',
    },
    labels: {
      pr: { bg: '#035421', text: '#86EFAC' },
      jenkins: { bg: '#647895', text: '#E6EEFF' },
    },
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
