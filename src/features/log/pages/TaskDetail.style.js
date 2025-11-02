// src/features/log/pages/TaskDetail.style.js

export const getStyles = (theme) => {
  const isDark = theme.mode === 'dark';

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      minHeight: 0,
      overflow: 'auto',
      padding: '24px',
      backgroundColor: theme.colors.background,
      gap: '20px',
    },

    notFound: {
      padding: '40px',
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: '16px',
    },

    // ===== 취소/반려 알림 박스 =====
    alertBox: (type) => ({
      backgroundColor:
        type === 'rejected'
          ? isDark
            ? 'rgba(244, 67, 54, 0.15)'
            : '#ffebee'
          : isDark
            ? 'rgba(255, 152, 0, 0.15)'
            : '#fff3e0',
      border:
        type === 'rejected'
          ? `2px solid ${isDark ? '#ef5350' : '#f44336'}`
          : `2px solid ${isDark ? '#ffb74d' : '#ff9800'}`,
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '20px',
    }),

    alertHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
    },

    alertIcon: {
      fontSize: '24px',
    },

    alertTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: theme.colors.text,
    },

    alertBody: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },

    alertInfo: {
      fontSize: '13px',
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },

    alertReason: {
      fontSize: '14px',
      color: theme.colors.text,
      lineHeight: '1.6',
      padding: '12px',
      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
      borderRadius: '8px',
    },

    // ===== 메인 컨텐츠 래퍼 (좌우 레이아웃) =====
    mainContentWrapper: {
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
      '@media (max-width: 1200px)': {
        flexDirection: 'column',
      },
    },

    leftContent: {
      flex: '1 1 60%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    // ===== 서브 탭 스타일 =====
    subTabContainer: {
      display: 'flex',
      gap: '8px',
      padding: '16px 24px 0',
      borderBottom: `1px solid ${theme.colors.border}`,
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },

    subTabButton: (isActive, isEnabled) => ({
      padding: '10px 20px',
      fontSize: '13px',
      fontWeight: '600',
      color: isActive
        ? theme.colors.brand
        : !isEnabled
          ? isDark
            ? '#555555'
            : '#cccccc'
          : isDark
            ? '#ffffff'
            : theme.colors.text, // ← 수정: 다크모드일 때 흰색
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: isActive
        ? `3px solid ${theme.colors.brand}`
        : '3px solid transparent',
      cursor: isEnabled ? 'pointer' : 'default',
      opacity: !isEnabled ? 0.5 : 1,
      marginBottom: '-1px',
    }),

    tabContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },

    // ===== 전체 높이 승인 사이드바 =====
    approvalSidebarFull: {
      flex: '0 0 450px',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '600px',
      maxHeight: '800px',
      position: 'sticky',
      top: '20px',
      overflow: 'hidden',
      '@media (max-width: 1200px)': {
        flex: '1 1 auto',
        minHeight: 'auto',
        maxHeight: 'none',
        position: 'relative',
        top: 0,
      },
    },

    sidebarHeader: {
      padding: '24px 24px 0',
    },

    // ===== 승인 프로세스 스타일 =====
    approvalProcessSection: {
      padding: '0 24px',
      maxHeight: '500px',
      overflowY: 'auto',
    },

    approvalProcessTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '16px',
    },

    approvalProcessFlow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    approverCard: {
      display: 'flex',
      gap: '12px',
      padding: '14px',
      backgroundColor: isDark ? '#252525' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      boxShadow: isDark
        ? '0 1px 3px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.08)',
    },

    approverInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },

    approverName: {
      fontSize: '14px',
      fontWeight: '700',
      color: theme.colors.text,
    },

    approverTime: {
      fontSize: '11px',
      color: theme.colors.textSecondary,
    },

    approverStatusBadge: (status) => {
      let bgColor, textColor;

      if (status === '승인') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (status === '반려') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else if (status === '대기') {
        bgColor = isDark ? 'rgba(255, 152, 0, 0.2)' : '#fff3e0';
        textColor = isDark ? '#ffb74d' : '#f57c00';
      } else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        backgroundColor: bgColor,
        color: textColor,
        width: 'fit-content',
      };
    },

    approverComment: {
      fontSize: '12px',
      color: theme.colors.text,
      fontStyle: 'italic',
      marginTop: '4px',
      padding: '8px',
      backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
      borderRadius: '4px',
      lineHeight: '1.4',
    },

    approvalArrow: {
      textAlign: 'center',
      fontSize: '18px',
      color: theme.colors.textSecondary,
      margin: '4px 0',
    },

    // ===== 다음 승인자 스타일 =====
    nextApproverSection: {
      padding: '0 24px',
    },

    nextApproverTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '12px',
    },

    nextApproverCardLarge: {
      display: 'flex',
      gap: '14px',
      padding: '18px',
      backgroundColor: isDark ? '#252525' : '#ffffff',
      border: `2px solid ${theme.colors.brand || '#2196F3'}`,
      borderRadius: '10px',
      boxShadow: isDark
        ? '0 4px 12px rgba(33, 150, 243, 0.2)'
        : '0 4px 12px rgba(33, 150, 243, 0.15)',
    },

    nextApproverInfoLarge: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      justifyContent: 'center',
    },

    nextApproverNameLarge: {
      fontSize: '16px',
      fontWeight: '700',
      color: theme.colors.text,
    },

    // ===== 탭 스타일 (기존 제거용) =====
    tabContainer: {
      display: 'flex',
      gap: '8px',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      padding: '12px',
      borderRadius: '12px',
      border: `1px solid ${theme.colors.border}`,
      marginBottom: '20px',
      boxShadow: isDark
        ? '0 1px 3px rgba(0,0,0,0.3)'
        : '0 1px 3px rgba(0,0,0,0.1)',
    },

    tabButton: (isActive, isEnabled) => ({
      flex: 1,
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: isActive
        ? '#ffffff'
        : !isEnabled
          ? isDark
            ? '#555555'
            : '#cccccc'
          : theme.colors.text,
      backgroundColor: isActive ? theme.colors.brand : 'transparent',
      border: isActive
        ? `2px solid ${theme.colors.brand}`
        : `2px solid ${theme.colors.border}`,
      borderRadius: '8px',
      cursor: isEnabled ? 'pointer' : 'default',
      opacity: !isEnabled ? 0.5 : 1,
      '&:hover':
        isEnabled && !isActive
          ? {
              backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
              borderColor: theme.colors.brand,
            }
          : {},
    }),

    // ===== 계획서 카드 스타일 =====
    planCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: isDark
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.1)',
    },

    planHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '20px 24px',
      borderBottom: `1px solid ${theme.colors.border}`,
      backgroundColor: isDark ? '#222222' : '#f8f9fa',
    },

    planIcon: {
      fontSize: '24px',
    },

    planTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: theme.colors.text,
      margin: 0,
    },

    planBody: {
      padding: '24px',
    },

    // ===== 좌우 레이아웃 스타일 =====
    planBodyWrapper: {
      display: 'flex',
      gap: '24px',
      padding: '24px',
      '@media (max-width: 1024px)': {
        flexDirection: 'column',
      },
    },

    planBodyLeft: {
      flex: '1 1 65%',
      minWidth: 0,
    },

    // ===== 1컬럼 그리드 (간결한 수직 레이아웃) =====
    infoGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    },

    infoItem: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: '20px',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: `1px solid ${isDark ? '#2a2a2a' : '#f0f0f0'}`,
      minHeight: '48px',
    },

    infoLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      letterSpacing: '0.3px',
    },

    infoValue: {
      fontSize: '14px',
      color: theme.colors.text,
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },

    // ===== 승인 정보 사이드바 스타일 =====
    approvalSidebar: {
      flex: '0 0 320px',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxHeight: '600px',
      overflowY: 'auto',
      '@media (max-width: 1024px)': {
        flex: '1 1 auto',
        maxHeight: 'none',
      },
    },

    sidebarTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: theme.colors.text,
      margin: 0,
      paddingBottom: '12px',
      borderBottom: `2px solid ${theme.colors.border}`,
    },

    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    sidebarSectionTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },

    approvalHistoryList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxHeight: '300px',
      overflowY: 'auto',
    },

    sidebarApprovalItem: {
      padding: '12px',
      backgroundColor: isDark ? '#222222' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },

    sidebarApprovalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    sidebarApprovalInfo: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.text,
    },

    sidebarApprovalTime: {
      fontSize: '11px',
      color: theme.colors.textSecondary,
    },

    sidebarApprovalComment: {
      fontSize: '12px',
      color: theme.colors.text,
      margin: 0,
      marginTop: '4px',
      padding: '8px',
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      borderRadius: '4px',
      fontStyle: 'italic',
      lineHeight: '1.4',
    },

    // 다음 승인자 카드
    nextApproverCard: {
      padding: '14px',
      backgroundColor: isDark ? '#222222' : '#ffffff',
      border: `2px solid ${theme.colors.brand || '#2196F3'}`,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },

    nextApproverName: {
      fontSize: '15px',
      fontWeight: '700',
      color: theme.colors.text,
    },

    nextApproverRole: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
    },

    // 사이드바 승인 버튼들
    sidebarApprovalButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: 'auto',
    },

    sidebarApproveButton: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#ffffff',
      backgroundColor: isDark ? '#2e7d32' : '#4caf50',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      boxShadow: isDark
        ? '0 2px 8px rgba(76, 175, 80, 0.3)'
        : '0 2px 8px rgba(76, 175, 80, 0.2)',
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    sidebarRejectButton: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#ffffff',
      backgroundColor: isDark ? '#d32f2f' : '#f44336',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      boxShadow: isDark
        ? '0 2px 8px rgba(244, 67, 54, 0.3)'
        : '0 2px 8px rgba(244, 67, 54, 0.2)',
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    infoBadge: (type) => {
      let bgColor, textColor;

      // 유형별 색상
      if (type === 'Deploy') {
        bgColor = isDark ? 'rgba(33, 150, 243, 0.2)' : '#e3f2fd';
        textColor = isDark ? '#90caf9' : '#1976d2';
      } else if (type === 'Update') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (type === 'Fix') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else if (type === 'Feature') {
        bgColor = isDark ? 'rgba(156, 39, 176, 0.2)' : '#f3e5f5';
        textColor = isDark ? '#ba68c8' : '#7b1fa2';
      }
      // 환경별 색상
      else if (type === 'PROD') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else if (type === 'DEV') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (type === 'STAGING') {
        bgColor = isDark ? 'rgba(255, 152, 0, 0.2)' : '#fff3e0';
        textColor = isDark ? '#ffb74d' : '#f57c00';
      }
      // 기본
      else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        backgroundColor: bgColor,
        color: textColor,
        width: 'fit-content',
      };
    },

    statusBadge: (status) => {
      let bgColor, textColor;

      if (status.includes('승인') || status.includes('완료')) {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (status.includes('대기')) {
        bgColor = isDark ? 'rgba(255, 152, 0, 0.2)' : '#fff3e0';
        textColor = isDark ? '#ffb74d' : '#f57c00';
      } else if (status.includes('반려') || status.includes('취소')) {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else if (status.includes('진행중')) {
        bgColor = isDark ? 'rgba(33, 150, 243, 0.2)' : '#e3f2fd';
        textColor = isDark ? '#90caf9' : '#1976d2';
      } else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        backgroundColor: bgColor,
        color: textColor,
        width: 'fit-content',
      };
    },

    // ===== 승인 이력 (기본 정보 카드 내) =====
    approvalHistoryContainer: {
      marginTop: '20px',
      padding: '16px',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      borderRadius: '8px',
      border: `1px solid ${theme.colors.border}`,
    },

    approvalHistoryTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: '12px',
      marginTop: 0,
    },

    approvalHistoryItem: {
      padding: '12px',
      backgroundColor: isDark ? '#222222' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      marginBottom: '8px',
      '&:last-child': {
        marginBottom: 0,
      },
    },

    approvalHistoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },

    approvalHistoryStatus: (status) => {
      let bgColor, textColor;

      if (status === '승인' || status === '결과승인') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (status === '반려') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: bgColor,
        color: textColor,
      };
    },

    approvalHistoryInfo: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
    },

    approvalHistoryComment: {
      fontSize: '13px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.5',
      fontStyle: 'italic',
    },

    // ===== 취소 사유 스타일 =====
    cancelReasonContainer: {
      marginTop: '20px',
      padding: '16px',
      backgroundColor: isDark ? 'rgba(244, 67, 54, 0.08)' : '#ffebee',
      borderRadius: '8px',
      border: `1px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
    },

    cancelReasonTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: isDark ? '#ef5350' : '#d32f2f',
      margin: 0,
      marginBottom: '12px',
    },

    cancelReasonBox: {
      padding: '12px',
      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#ffffff',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
    },

    cancelReasonHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },

    cancelReasonActor: {
      fontSize: '13px',
      fontWeight: '600',
      color: isDark ? '#ef5350' : '#d32f2f',
    },

    cancelReasonTime: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
    },

    cancelReasonText: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.6',
    },

    // ===== 상세 정보 하단 승인/반려 버튼 영역 =====
    detailApprovalButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: `2px solid ${theme.colors.border}`,
    },

    detailApprovalButtonWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      maxWidth: '400px',
    },

    detailApproveButton: {
      flex: 1,
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      color: isDark ? '#81c784' : '#388e3c',
      backgroundColor: 'transparent',
      border: `2px solid ${isDark ? '#81c784' : '#388e3c'}`,
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: isDark
          ? 'rgba(76, 175, 80, 0.1)'
          : 'rgba(76, 175, 80, 0.05)',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    detailRejectButton: {
      flex: 1,
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      color: isDark ? '#ef5350' : '#d32f2f',
      backgroundColor: 'transparent',
      border: `2px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
      borderRadius: '8px',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: isDark
          ? 'rgba(244, 67, 54, 0.1)'
          : 'rgba(244, 67, 54, 0.05)',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    // ===== 하단 승인/반려 버튼 영역 (기존) =====
    bottomApprovalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px',
      marginTop: '12px',
    },

    bottomApprovalButtonWrapper: {
      display: 'flex',
      gap: '10px',
    },

    bottomApproveButton: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: isDark ? '#2e7d32' : '#4caf50',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      opacity: 1,
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    bottomRejectButton: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: isDark ? '#d32f2f' : '#f44336',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      opacity: 1,
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    approvalMessage: {
      padding: '10px 16px',
      backgroundColor: isDark ? 'rgba(33, 150, 243, 0.15)' : '#e3f2fd',
      color: isDark ? '#90caf9' : '#1976d2',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '500',
      textAlign: 'center',
    },

    // ===== 상세 정보 스타일 =====
    detailSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },

    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },

    detailLabel: {
      fontSize: '14px',
      fontWeight: '700',
      color: theme.colors.brand || '#2196F3',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },

    detailText: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.7',
      paddingLeft: '4px',
    },

    detailList: {
      margin: 0,
      paddingLeft: '24px',
      listStyleType: 'disc',
    },

    detailListItem: {
      fontSize: '14px',
      color: theme.colors.text,
      lineHeight: '1.8',
      marginBottom: '6px',
    },

    assigneeList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },

    assigneeItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px',
      backgroundColor: isDark ? '#222222' : '#f8f9fa',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
    },

    assigneeName: {
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.text,
    },

    assigneeDept: {
      fontSize: '13px',
      color: theme.colors.textSecondary,
    },

    riskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    riskItem: {
      padding: '14px',
      borderRadius: '6px',
    },

    riskDescription: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      marginBottom: '8px',
      lineHeight: '1.6',
    },

    riskMitigation: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.6',
    },

    serviceList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },

    serviceTag: {
      padding: '6px 12px',
      backgroundColor: isDark ? 'rgba(33, 150, 243, 0.15)' : '#e3f2fd',
      color: isDark ? '#90caf9' : '#1976d2',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '500',
      border: `1px solid ${isDark ? 'rgba(33, 150, 243, 0.3)' : '#bbdefb'}`,
    },

    dependencyList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },

    dependencyTag: {
      padding: '8px 12px',
      backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
      color: theme.colors.text,
      borderRadius: '6px',
      fontSize: '13px',
      fontFamily: 'monospace',
      border: `1px solid ${theme.colors.border}`,
    },

    // ===== 승인 의견 스타일 =====
    approvalSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    approvalItem: {
      padding: '16px',
      backgroundColor: isDark ? '#222222' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
    },

    approvalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },

    approvalInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },

    approvalOrder: {
      padding: '4px 10px',
      backgroundColor: isDark ? 'rgba(33, 150, 243, 0.2)' : '#e3f2fd',
      color: isDark ? '#90caf9' : '#1976d2',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
    },

    approvalName: {
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.text,
    },

    approvalRole: {
      fontSize: '13px',
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },

    approvalStatus: (status) => {
      let bgColor, textColor;

      if (status === '승인') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (status === '대기') {
        bgColor = isDark ? 'rgba(255, 152, 0, 0.2)' : '#fff3e0';
        textColor = isDark ? '#ffb74d' : '#f57c00';
      } else if (status === '반려') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        padding: '6px 14px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        backgroundColor: bgColor,
        color: textColor,
      };
    },

    approvalTime: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
      marginBottom: '8px',
    },

    approvalComment: {
      padding: '12px',
      backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
      borderLeft: `3px solid ${theme.colors.brand || '#2196F3'}`,
      borderRadius: '4px',
      marginTop: '8px',
    },

    approvalCommentLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: '4px',
      display: 'block',
    },

    approvalCommentText: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.5',
      fontStyle: 'italic',
    },

    // ===== 타임라인 카드 스타일 =====
    timelineCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isDark
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.1)',
    },

    timelineTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: theme.colors.text,
      margin: 0,
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${theme.colors.border}`,
    },

    // ===== 타임라인 스타일 =====
    timelineWrapper: {
      display: 'flex',
      gap: '0',
      justifyContent: 'space-between',
      marginBottom: '16px',
      position: 'relative',
      paddingTop: '8px',
    },

    timelineStep: (disabled) => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      opacity: disabled ? 0.4 : 1,
      position: 'relative',
    }),

    timelineIconWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      zIndex: 2,
    },

    timelineIcon: (type) => {
      let backgroundColor, borderColor, iconColor;

      switch (type) {
        case 'completed':
          backgroundColor = isDark ? '#2e7d32' : '#4caf50';
          borderColor = isDark ? '#2e7d32' : '#4caf50';
          iconColor = '#ffffff';
          break;
        case 'inProgress':
          backgroundColor = isDark ? '#f57c00' : '#ff9800';
          borderColor = isDark ? '#f57c00' : '#ff9800';
          iconColor = '#ffffff';
          break;
        case 'rejected':
          backgroundColor = isDark ? '#d32f2f' : '#f44336';
          borderColor = isDark ? '#d32f2f' : '#f44336';
          iconColor = '#ffffff';
          break;
        case 'warning':
          backgroundColor = isDark ? '#f57c00' : '#ff9800';
          borderColor = isDark ? '#f57c00' : '#ff9800';
          iconColor = '#ffffff';
          break;
        case 'pending':
        default:
          backgroundColor = isDark ? '#424242' : '#ffffff';
          borderColor = isDark ? '#616161' : '#d0d0d0';
          iconColor = isDark ? '#9e9e9e' : '#999999';
      }

      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor,
        border: `3px solid ${borderColor}`,
        color: iconColor,
        fontSize: '20px',
        fontWeight: 'bold',
        position: 'relative',
        boxShadow: isDark
          ? '0 2px 8px rgba(0,0,0,0.3)'
          : '0 2px 8px rgba(0,0,0,0.15)',
      };
    },

    timelineLine: (lineColor) => ({
      position: 'absolute',
      left: 'calc(50% + 22px)',
      right: 'calc(-50% + 22px)',
      top: '22px',
      height: '3px',
      backgroundColor: lineColor,
      zIndex: 1,
    }),

    timelineStepName: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      marginTop: '0px',
    },

    timelineStepTime: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      minHeight: '0px',
      lineHeight: '18px',
      marginTop: '0px',
    },

    timelineStepStatus: (warning, rejected) => ({
      fontSize: '12px',
      color: warning
        ? isDark
          ? '#ffb74d'
          : '#f57c00'
        : rejected
          ? isDark
            ? '#ef5350'
            : '#d32f2f'
          : theme.colors.textSecondary,
      textAlign: 'center',
      fontWeight: warning || rejected ? '600' : '400',
      marginTop: '-1px',
    }),

    timelineStepComment: {
      fontSize: '11px',
      color: theme.colors.textSecondary,
      marginTop: '4px',
      fontStyle: 'italic',
      lineHeight: '1.4',
    },

    timelineLink: (warning) => ({
      fontSize: '12px',
      color: warning
        ? isDark
          ? '#ef5350'
          : '#d32f2f'
        : isDark
          ? '#90caf9'
          : '#1976d2',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '-1px',
    }),

    // ===== 반려/거절 메시지 박스 스타일 =====
    rejectionBox: {
      marginTop: '20px',
      padding: '16px 20px',
      backgroundColor: isDark ? 'rgba(244, 67, 54, 0.08)' : '#ffebee',
      borderLeft: `4px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    rejectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.text,
      flexWrap: 'wrap',
    },

    rejectionIcon: {
      fontSize: '18px',
    },

    rejectionActorLabel: {
      color: isDark ? '#ef5350' : '#d32f2f',
      fontWeight: '600',
    },

    rejectionActor: {
      color: theme.colors.text,
      fontWeight: '600',
    },

    rejectionDivider: {
      color: theme.colors.textSecondary,
      margin: '0 4px',
    },

    rejectionTime: {
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },

    rejectionReasonBox: {
      padding: '12px',
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : '#ffffff',
      borderLeft: `2px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
      borderRadius: '4px',
    },

    rejectionReasonLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: isDark ? '#ef5350' : '#d32f2f',
      marginBottom: '6px',
    },

    rejectionReasonText: {
      fontSize: '14px',
      color: theme.colors.text,
      lineHeight: '1.5',
      fontStyle: 'italic',
    },

    // ===== Jenkins 로그 스타일 =====
    // Pipeline 스타일
    pipelineContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 0',
      gap: '0',
    },

    pipelineStage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },

    pipelineStageIcon: () => ({
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      border: `2px solid ${theme.colors.border}`,
      boxShadow: isDark
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.1)',
    }),

    pipelineStageName: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      maxWidth: '120px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    pipelineLine: {
      flex: 1,
      height: '2px',
      backgroundColor: theme.colors.border,
      margin: '0 -12px',
      position: 'relative',
      top: '-24px',
    },

    // Stats 스타일
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    },

    statsItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      borderRadius: '8px',
      border: `1px solid ${theme.colors.border}`,
    },

    statsIcon: {
      fontSize: '24px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      borderRadius: '8px',
    },

    statsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
    },

    statsLabel: {
      fontSize: '12px',
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },

    statsValue: (status) => {
      let color = theme.colors.text;

      if (status === 'SUCCESS') {
        color = isDark ? '#81c784' : '#388e3c';
      } else if (status === 'FAILURE') {
        color = isDark ? '#ef5350' : '#d32f2f';
      } else if (status === 'IN_PROGRESS') {
        color = isDark ? '#90caf9' : '#1976d2';
      } else if (status === 'ABORTED') {
        color = isDark ? '#ffb74d' : '#f57c00';
      }

      return {
        fontSize: '16px',
        fontWeight: '700',
        color: color,
      };
    },

    // Console Output 스타일
    consoleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: isDark ? '#0d0d0d' : '#f5f5f5',
      borderBottom: `1px solid ${theme.colors.border}`,
      marginBottom: '16px',
    },

    consoleTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.text,
    },

    consoleActions: {
      display: 'flex',
      gap: '8px',
    },

    consoleButton: {
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: '500',
      color: theme.colors.text,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: isDark ? '#2a2a2a' : '#e0e0e0',
      },
    },

    consoleOutput: {
      backgroundColor: isDark ? '#0d0d0d' : '#fafafa',
      padding: '16px',
      borderRadius: '8px',
      maxHeight: '600px',
      overflowY: 'auto',
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: '1.6',
      border: `1px solid ${theme.colors.border}`,
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
      if (level === 'ERROR') {
        color = isDark ? '#ef5350' : '#d32f2f';
      } else if (level === 'WARN') {
        color = isDark ? '#ffb74d' : '#f57c00';
      } else if (level === 'INFO') {
        color = isDark ? '#90caf9' : '#1976d2';
      } else {
        color = theme.colors.textSecondary;
      }

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

    // 문제 요약 스타일
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
      marginBottom: '16px',
      lineHeight: '1.6',
      fontWeight: '500',
    },

    issuesDetails: {
      marginTop: '16px',
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
      marginBottom: '12px',
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

    // ===== 레포트 스타일 =====
    reportSection: {
      marginBottom: '24px',
      paddingBottom: '20px',
      borderBottom: `1px solid ${theme.colors.border}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    },

    reportSectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: 0,
      marginBottom: '12px',
    },

    reportText: {
      fontSize: '14px',
      color: theme.colors.text,
      margin: 0,
      lineHeight: '1.7',
    },

    reportResultBadge: (result) => {
      let bgColor, textColor;

      if (result === '성공') {
        bgColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        textColor = isDark ? '#81c784' : '#388e3c';
      } else if (result === '실패') {
        bgColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        textColor = isDark ? '#ef5350' : '#d32f2f';
      } else {
        bgColor = isDark ? '#2a2a2a' : '#f5f5f5';
        textColor = theme.colors.text;
      }

      return {
        display: 'inline-block',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '700',
        backgroundColor: bgColor,
        color: textColor,
      };
    },

    reportMetricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },

    reportMetricItem: {
      padding: '16px',
      backgroundColor: isDark ? '#1e1e1e' : '#fafafa',
      borderRadius: '8px',
      border: `1px solid ${theme.colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },

    reportMetricLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },

    reportMetricValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: theme.colors.text,
    },

    reportMetricImprovement: {
      fontSize: '16px',
      fontWeight: '700',
    },

    reportList: {
      margin: 0,
      paddingLeft: '24px',
      listStyleType: 'disc',
    },

    reportListItem: {
      fontSize: '14px',
      color: theme.colors.text,
      lineHeight: '1.8',
      marginBottom: '8px',
    },

    // ===== 간단한 리스트 형식 승인 프로세스 UI =====
    approvalListContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 24px 16px',
      maxHeight: 'calc(10 * 60px)', // 최대 10개 항목 높이
    },

    approverListItem: (isCurrentTurn, isCancelled, isRejected) => ({
      padding: '12px 16px',
      borderBottom: `1px solid ${theme.colors.border}`,
      backgroundColor: isCancelled
        ? isDark
          ? 'rgba(255, 152, 0, 0.12)'
          : 'rgba(255, 152, 0, 0.08)'
        : isRejected
          ? isDark
            ? 'rgba(244, 67, 54, 0.12)'
            : 'rgba(244, 67, 54, 0.08)'
          : isCurrentTurn
            ? isDark
              ? 'rgba(33, 150, 243, 0.12)'
              : 'rgba(33, 150, 243, 0.08)'
            : 'transparent',
      borderLeft: isCancelled
        ? `3px solid ${isDark ? '#ff9800' : '#f57c00'}`
        : isRejected
          ? `3px solid ${isDark ? '#ef5350' : '#f44336'}`
          : isCurrentTurn
            ? `3px solid ${isDark ? '#2196f3' : '#1976d2'}`
            : '3px solid transparent',
      transition: 'all 0.2s',
      opacity: 1,
    }),

    approverListName: (isCurrentTurn, isCancelled, isApproved, isRejected) => ({
      fontSize: '14px',
      fontWeight: '600',
      color: isApproved
        ? isDark
          ? '#ffffff'
          : '#000000'
        : isCancelled
          ? isDark
            ? '#ffb74d'
            : '#f57c00'
          : isRejected
            ? isDark
              ? '#ef5350'
              : '#d32f2f'
            : isCurrentTurn
              ? isDark
                ? '#ffffff'
                : '#000000'
              : isDark
                ? '#666666'
                : '#999999',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),

    approverListInfo: (isCurrentTurn, isCancelled, isApproved, isRejected) => ({
      fontSize: '13px',
      color: isApproved
        ? isDark
          ? '#e0e0e0'
          : '#333333'
        : isCancelled
          ? isDark
            ? '#ffb74d'
            : '#e65100'
          : isRejected
            ? isDark
              ? '#ef5350'
              : '#d32f2f'
            : isCurrentTurn
              ? isDark
                ? '#cccccc'
                : '#333333'
              : isDark
                ? '#555555'
                : '#aaaaaa',
      marginBottom: '2px',
      lineHeight: '1.4',
    }),

    approverListWaiting: {
      fontSize: '12px',
      color: isDark ? '#ffb74d' : '#f57c00',
      marginTop: '4px',
    },

    checkMark: {
      color: isDark ? '#4caf50' : '#2e7d32',
      fontSize: '16px',
      fontWeight: 'bold',
    },

    rejectMark: {
      color: isDark ? '#f44336' : '#d32f2f',
      fontSize: '16px',
      fontWeight: 'bold',
    },

    cancelMark: {
      color: isDark ? '#ff9800' : '#f57c00',
      fontSize: '16px',
      fontWeight: 'bold',
    },

    approvalButtonsContainer: {
      display: 'flex',
      gap: '12px',
      padding: '16px 24px',
      borderTop: `1px solid ${theme.colors.border}`,
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    },

    approvalActionButton: (type) => ({
      flex: 1,
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor:
        type === 'approve'
          ? isDark
            ? '#2e7d32'
            : '#4caf50'
          : isDark
            ? '#d32f2f'
            : '#f44336',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor:
          type === 'approve'
            ? isDark
              ? '#388e3c'
              : '#66bb6a'
            : isDark
              ? '#e53935'
              : '#ef5350',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    }),
  };
};
