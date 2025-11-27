// 작성자 : 조윤상
// src/features/log/pages/JenkinsTab.style.js
import { css } from '@emotion/react';

// Firefox/Edge 스크롤바 숨김 공통 박스 스타일 (인라인에서만 사용)
const noScrollbarBox = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
};

/** WebKit 전역 스크롤바 숨김 + 반응형/가상선택자 규칙들
 *  theme 파라미터를 사용하지 않으므로 제거 → no-unused-vars 해결
 */
export const buildJenkinsGlobalStyles = () => css`
  /* 공통: 스크롤바 숨김 (선택적으로 data-no-scrollbar="true" 부여한 요소에만 적용) */
  [data-no-scrollbar='true']::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
  }

  /* ───────── Pipeline (반응형/라인 높이) ───────── */
  .jt-pipeline-container {
    /* 반응형은 전역 CSS에서 처리 */
    padding: 1.25rem 0 2.75rem;
  }

  @media (width <= 768px) {
    .jt-pipeline-container {
      padding: 1rem 0 2.25rem;
    }
    .jt-pipeline-stage {
      min-width: 4rem;
      gap: 0.5rem;
    }
    .jt-pipeline-stage-icon {
      width: 2.5rem;
      height: 2.5rem;
    }
    .jt-pipeline-stage-name {
      font-size: 0.75rem;
      max-width: 5rem;
    }
  }

  /* ───────── Stats Grid (2-row layout, responsive) ───────── */
  .jt-stats-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Each row can use a grid so top row can be 3 cols and bottom row 2 cols */
  .jt-stats-row {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr); /* default top row layout */
  }

  /* bottom row will use .jt-stats-row.bottom to become 2 columns */
  .jt-stats-row.bottom {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 1200px) {
    .jt-stats-row {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }
    .jt-stats-row.bottom {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (width <= 768px) {
    .jt-stats-row {
      grid-template-columns: 1fr; /* collapse to single column on small screens */
      gap: 0.5rem;
    }
    .jt-stats-item {
      padding: 0.6rem;
      gap: 0.5rem;
    }
    .jt-stats-icon {
      font-size: 1.25rem;
      width: 2.25rem;
      height: 2.25rem;
    }
    .jt-console-header {
      padding: 0.5rem 0.75rem;
      margin-bottom: 0.75rem;
    }
    .jt-console-output {
      padding: 0.75rem;
      max-height: 25rem;
      font-size: 0.75rem;
    }
  }

  /* 마지막 아이템 여백 제거 등 가상 선택자 처리 */
  .jt-approval-history-item:last-child {
    margin-bottom: 0;
  }
`;

/** 인라인 style 전용: 미디어쿼리/가상선택자 없는 순수 속성만 남김 */
export const getJenkinsInlineStyles = (theme) => {
  const isDark = theme.mode === 'dark';

  return {
    noScrollbarBox,

    /* ───────────────────────── Pipeline ───────────────────────── */
    pipelineContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0',
      overflowX: 'auto',
      position: 'relative',
      ...noScrollbarBox,
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
    },
    pipelineStageIcon: {
      width: 'clamp(2rem, 6vw, 3rem)',
      height: 'clamp(2rem, 6vw, 3rem)',
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
    },
    pipelineStageName: {
      fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
      fontWeight: 600,
      color: theme.colors.text,
      textAlign: 'center',
      maxWidth: '7.5rem',
      // 최대 2줄까지 허용하고 넘치면 말줄임
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 1.2,
      maxHeight: '2.4em',
    },
    pipelineLine: {
      flex: 1,
      height: '0.1rem',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      minWidth: '1rem',
      alignSelf: 'center',
      transform: 'translateY(-0.6rem)',
      marginTop: 0,
    },

    /* ───────────────────────── Stats ───────────────────────── */
    statsItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.875rem',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      borderRadius: '0.5rem',
      border: `1px solid ${theme.colors.border}`,
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
    },
    statsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
      minWidth: 0,
    },
    statsLabel: {
      fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
      fontWeight: 600,
      color: theme.colors.textSecondary,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
      return { fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', fontWeight: 700, color };
    },

    /* ───────────────────────── Console ───────────────────────── */
    consoleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(0.5rem, 1.2vw, 0.85rem) clamp(0.75rem, 2vw, 1rem)',
      backgroundColor: isDark ? '#0d0d0d' : '#f5f5f5',
      borderBottom: `1px solid ${theme.colors.border}`,
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    consoleTitle: {
      fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
      fontWeight: 600,
      color: theme.colors.text,
    },
    consoleActions: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    consoleButton: {
      padding: 'clamp(0.375rem, 0.9vw, 0.6rem) clamp(0.75rem, 1.6vw, 1rem)',
      fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
      fontWeight: 500,
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
    },
    consoleOutput: {
      backgroundColor: isDark ? '#0d0d0d' : '#fafafa',
      padding: 'clamp(0.75rem, 1.6vw, 1rem)',
      borderRadius: '0.5rem',
      maxHeight: '37.5rem',
      overflowY: 'auto',
      fontFamily: 'monospace',
      fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
      lineHeight: 1.6,
      border: `1px solid ${theme.colors.border}`,
      ...noScrollbarBox,
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
      fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
    },
    consoleLevel: (level) => {
      let color;
      if (level === 'ERROR') color = isDark ? '#ef5350' : '#d32f2f';
      else if (level === 'WARN') color = isDark ? '#ffb74d' : '#f57c00';
      else if (level === 'INFO') color = isDark ? '#90caf9' : '#1976d2';
      else color = theme.colors.textSecondary;

      return {
        color,
        fontWeight: 700,
        minWidth: '70px',
        fontSize: 'clamp(0.78rem, 1vw, 0.95rem)',
      };
    },
    consoleMessage: {
      color: theme.colors.text,
      flex: 1,
      fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
    },

    /* ───────────────────── Issues ───────────────────── */
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
      fontSize: '0.875rem',
      color: theme.colors.text,
      margin: 0,
      marginBottom: '16px',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    issuesDetails: {
      marginTop: '16px',
      padding: '16px',
      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#ffffff',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
    },
    issuesDetailsTitle: {
      fontSize: '0.875rem',
      fontWeight: 700,
      color: isDark ? '#ef5350' : '#d32f2f',
      margin: 0,
      marginBottom: '12px',
    },
    issuesList: {
      margin: 0,
      paddingLeft: '20px',
      listStyleType: 'disc',
    },
    issuesListItem: {
      fontSize: '0.875rem',
      color: theme.colors.text,
      lineHeight: 1.8,
      marginBottom: '6px',
    },
  };
};
