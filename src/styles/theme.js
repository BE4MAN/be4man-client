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
    bg: '#fff',
    surface: '#FDFDFD',
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
      approveText: '#fff',
      rejectBg: '#ff6b6b',
      rejectText: '#fff',
      historyBg: '#2563EB',
      historyText: '#fff',
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
    // 스케줄 페이지 전용 색상
    schedule: {
      cellToday: '#e3f2fd',
      deploymentPrimary: '#0969da',
      deploymentHover: 'rgb(9 105 218 / 15%)',
      restrictedDanger: '#cf222e',
      restrictedBg: '#fff1f0',
      restrictedBorder: '#ffccc7',
      restrictedHover: 'rgb(207 34 46 / 15%)',
      successGreen: '#1a7f37',
      warning: '#FF9F0A',
    },
    scrollbarTrack: '#f1f5f9',
    scrollbarThumb: '#cbd5e1',
    scrollbarThumbHover: '#94a3b8',
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
      historyBg: 'rgb(37 99 235 / 12%)',
      historyText: '#2563EB',
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
    // 스케줄 페이지 전용 색상
    schedule: {
      cellToday: '#2a3b5c',
      deploymentPrimary: '#007aff',
      deploymentHover: 'rgb(0 122 255 / 20%)',
      restrictedDanger: '#ff453a',
      restrictedBg: '#2a1f1f',
      restrictedBorder: '#5a3b3b',
      restrictedHover: 'rgb(255 69 58 / 20%)',
      successGreen: '#30d158',
      warning: '#FF9F0A',
    },
    scrollbarTrack: '#1f2735',
    scrollbarThumb: '#3b4558',
    scrollbarThumbHover: '#54607a',
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
