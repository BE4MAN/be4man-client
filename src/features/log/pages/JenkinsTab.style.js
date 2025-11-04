// src/features/log/pages/JenkinsTab.style.js
import { css } from '@emotion/react';

const noScrollbarBox = {
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE/Edge(legacy)
};

/**
 * data-no-scrollbar="true" 가 붙은 요소의 WebKit 스크롤바 숨김
 */
export const noScrollbarGlobalStyles = css`
  [data-no-scrollbar='true']::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
  }
`;

export const getJenkinsStyles = (theme) => {
  const isDark = theme.mode === 'dark';

  return {
    /* ───────────────────────── Pipeline ───────────────────────── */
    pipelineContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 0 2.75rem 0',
      gap: '0',
      overflowX: 'auto',
      position: 'relative',
      ...noScrollbarBox,
      '@media (max-width: 768px)': {
        padding: '1rem 0 2.25rem 0',
        gap: '0.5rem',
      },
    },

    pipelineStage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      flex: 1,
      minWidth: '5rem',
      position: 'relative',
      zIndex: 1,
      '@media (max-width: 768px)': {
        minWidth: '4rem',
        gap: '0.5rem',
      },
    },

    pipelineStageIcon: () => ({
      width: '3rem',
      height: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      border: `0.125rem solid ${theme.colors.border}`,
      boxShadow: isDark
        ? '0 0.125rem 0.5rem rgba(0,0,0,0.3)'
        : '0 0.125rem 0.5rem rgba(0,0,0,0.1)',
      flexShrink: 0,
      position: 'relative',
      zIndex: 2,
      '@media (max-width: 768px)': {
        width: '2.5rem',
        height: '2.5rem',
      },
    }),

    pipelineStageName: {
      fontSize: '0.8125rem',
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      maxWidth: '7.5rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
        maxWidth: '5rem',
      },
    },

    pipelineLine: {
      flex: 1,
      height: '0.1rem',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      minWidth: '1rem',
      transform: 'translateY(-0.6rem)',
      alignSelf: 'center',
      marginTop: 0,
      '@media (max-width: 768px)': {
        marginTop: 0,
      },
    },

    /* ───────────────────────── Stats ───────────────────────── */
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
      justifyItems: 'stretch',
      alignItems: 'stretch',
      '@media (min-width: 1200px)': {
        gridTemplateColumns: 'repeat(5, 1fr)',
      },
      '@media (max-width: 1200px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '0.5rem',
      },
    },

    statsItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.875rem',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      borderRadius: '0.5rem',
      border: `1px solid ${theme.colors.border}`,
      '@media (max-width: 768px)': {
        padding: '0.6rem',
        gap: '0.5rem',
      },
    },

    statsIcon: {
      fontSize: '1.75rem',
      width: '3rem',
      height: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      borderRadius: '0.5rem',
      flexShrink: 0,
      '@media (max-width: 768px)': {
        fontSize: '1.25rem',
        width: '2.25rem',
        height: '2.25rem',
      },
    },

    statsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
    },

    statsLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },

    statsValue: (status) => {
      let color = theme.colors.text;
      if (status === 'SUCCESS' || status === '성공') {
        color = isDark ? '#81c784' : '#388e3c';
      } else if (status === 'FAILURE' || status === '실패') {
        color = isDark ? '#ef5350' : '#d32f2f';
      } else if (status === 'IN_PROGRESS' || status === '진행중') {
        color = isDark ? '#90caf9' : '#1976d2';
      } else if (status === 'ABORTED') {
        color = isDark ? '#ffb74d' : '#f57c00';
      }
      return {
        fontSize: '14px',
        fontWeight: '700',
        color,
      };
    },

    /* ───────────────────────── Console ───────────────────────── */
    consoleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      backgroundColor: isDark ? '#0d0d0d' : '#f5f5f5',
      borderBottom: `1px solid ${theme.colors.border}`,
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem',
      '@media (max-width: 768px)': {
        padding: '0.5rem 0.75rem',
        marginBottom: '0.75rem',
      },
    },

    consoleTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: theme.colors.text,
      '@media (max-width: 768px)': {
        fontSize: '0.8125rem',
      },
    },

    consoleActions: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },

    consoleButton: {
      padding: '0.5rem 1rem',
      fontSize: '0.8125rem',
      fontWeight: '500',
      color: theme.colors.textPrimary,
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.03)',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      whiteSpace: 'nowrap',
      '&:hover:not(:disabled)': {
        backgroundColor: isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.08)',
        borderColor: theme.colors.brand,
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      '@media (max-width: 768px)': {
        padding: '0.375rem 0.75rem',
        fontSize: '0.75rem',
        gap: '0.25rem',
      },
    },

    consoleOutput: {
      backgroundColor: isDark ? '#0d0d0d' : '#fafafa',
      padding: '1rem',
      borderRadius: '0.5rem',
      maxHeight: '37.5rem',
      overflowY: 'auto',
      fontFamily: 'monospace',
      fontSize: '0.8125rem',
      lineHeight: '1.6',
      border: `1px solid ${theme.colors.border}`,
      ...noScrollbarBox,
      '@media (max-width: 768px)': {
        padding: '0.75rem',
        maxHeight: '25rem',
        fontSize: '0.75rem',
      },
    },

    consoleLine: {
      display: 'flex',
      gap: '8px',
      marginBottom: '2px',
      padding: '2px 0',
    },

    consoleTime: {
      color: theme.colors.textSecondary,
      minWidth: '90px',
      fontSize: '12px',
    },

    consoleLevel: (level) => {
      let color;
      if (level === 'ERROR') color = isDark ? '#ef5350' : '#d32f2f';
      else if (level === 'WARN') color = isDark ? '#ffb74d' : '#f57c00';
      else if (level === 'INFO') color = isDark ? '#90caf9' : '#1976d2';
      else color = theme.colors.textSecondary;

      return {
        color,
        fontWeight: '700',
        minWidth: '70px',
        fontSize: '12px',
      };
    },

    consoleMessage: {
      color: theme.colors.text,
      flex: 1,
      fontSize: '13px',
    },

    /* ───────────────────── Issues (요약/세부) ───────────────────── */
    issuesCardBody: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    issuesSummary: {
      padding: '16px',
      backgroundColor: isDark ? 'rgba(244, 67, 54, 0.08)' : '#ffebee',
      borderLeft: `4px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
      borderRadius: '8px',
    },

    issuesText: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.6',
      fontWeight: '500',
    },

    issuesDetails: {
      padding: '16px',
      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#ffffff',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
    },

    issuesDetailsTitle: {
      fontSize: '13px',
      fontWeight: '700',
      color: isDark ? '#ef5350' : '#d32f2f',
      margin: 0,
      marginBottom: '8px',
    },

    issuesList: {
      margin: 0,
      paddingLeft: '20px',
      listStyleType: 'disc',
    },

    issuesListItem: {
      fontSize: '13px',
      color: theme.colors.text,
      lineHeight: '1.8',
      marginBottom: '6px',
    },
  };
};
