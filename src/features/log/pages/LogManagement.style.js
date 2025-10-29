// src/features/log/pages/LogManagement.style.js

export const getStyles = (theme) => {
  const isDark = theme.mode === 'dark';

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      minHeight: 0,
      overflow: 'hidden',
      padding: '24px',
      backgroundColor: theme.colors.background,
    },

    // 검색 및 필터 영역
    searchFilterSection: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: isDark
        ? '0 1px 3px rgba(0,0,0,0.3)'
        : '0 1px 3px rgba(0,0,0,0.1)',
    },

    topControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
    },

    searchBar: {
      position: 'relative',
      flex: 1,
      maxWidth: '500px',
    },

    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: theme.colors.textSecondary,
      pointerEvents: 'none',
    },

    searchInput: (focused) => ({
      width: '100%',
      padding: '10px 40px 10px 40px',
      fontSize: '14px',
      border: `1px solid ${focused ? theme.colors.brand : theme.colors.border}`,
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    }),

    clearButton: (hovered) => ({
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      color: hovered ? theme.colors.danger : theme.colors.textSecondary,
      padding: '4px',
      transition: 'all 0.2s',
    }),

    resetButton: (hovered) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500',
      color: hovered ? theme.colors.brand : theme.colors.textSecondary,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
    }),

    // 필터 패널
    filtersPanel: {
      marginTop: '16px',
    },

    filtersRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    },

    filterRowItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },

    filterLabel: {
      fontSize: '13px',
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },

    dateInput: {
      padding: '8px 12px',
      fontSize: '14px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      outline: 'none',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      minWidth: '140px',
      transition: 'all 0.2s',
    },

    // 드롭다운 스타일 추가
    dropdownWrapper: {
      position: 'relative',
      minWidth: '140px',
    },

    dropdownButton: (isOpen) => ({
      width: '100%',
      padding: '8px 12px',
      fontSize: '14px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      color: theme.colors.text,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s',
      outline: isOpen ? `2px solid ${theme.colors.brand}` : 'none',
    }),

    dropdownMenu: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      right: 0,
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      boxShadow: isDark
        ? '0 4px 12px rgba(0,0,0,0.3)'
        : '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
    },

    dropdownMenuItem: (isSelected, hovered) => ({
      padding: '8px 12px',
      fontSize: '14px',
      color: theme.colors.text,
      backgroundColor: isSelected
        ? isDark
          ? 'rgba(33, 150, 243, 0.2)'
          : '#e3f2fd'
        : hovered
          ? isDark
            ? '#2a2a2a'
            : '#f5f5f5'
          : 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),

    // 날짜 선택기 스타일 추가
    dateRangePickerWrapper: {
      position: 'relative',
      maxWidth: '200px',
    },

    dateRangePickerButton: (isOpen) => ({
      width: '100%',
      padding: '8px 12px',
      fontSize: '14px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      color: theme.colors.text,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      outline: isOpen ? `2px solid ${theme.colors.brand}` : 'none',
    }),

    dateRangePickerPopup: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      right: 0,
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      boxShadow: isDark
        ? '0 8px 24px rgba(0,0,0,0.3)'
        : '0 8px 24px rgba(0,0,0,0.15)',
      zIndex: 1001,
      padding: '16px',
      maxWidth: '600px',
      width: 'max-content',
    },

    // 테이블
    tableWrapper: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: isDark
        ? '0 1px 3px rgba(0,0,0,0.3)'
        : '0 1px 3px rgba(0,0,0,0.1)',
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },

    thead: {
      backgroundColor:
        theme.colors.backgroundHover || (isDark ? '#2a2a2a' : '#f8f9fa'),
    },

    th: {
      padding: '16px',
      textAlign: 'left',
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      borderBottom: `1px solid ${theme.colors.border}`,
    },

    tr: (hovered) => ({
      backgroundColor: hovered
        ? theme.colors.backgroundHover || (isDark ? '#2a2a2a' : '#f8f9fa')
        : 'transparent',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
    }),

    td: {
      padding: '16px',
      fontSize: '14px',
      color: theme.colors.text,
      borderBottom: `1px solid ${theme.colors.border}`,
    },

    // 배지 스타일
    badge: (type, value) => {
      let backgroundColor, color;

      if (type === 'status') {
        // 처리 상태
      } else if (type === 'result') {
        // 결과
        switch (value) {
          case '성공':
            backgroundColor = isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
            color = isDark ? '#81c784' : '#388e3c';
            break;
          case '실패':
            backgroundColor = isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
            color = isDark ? '#ef5350' : '#d32f2f';
            break;
          default:
            backgroundColor =
              theme.colors.backgroundHover || (isDark ? '#333333' : '#f5f5f5');
            color = theme.colors.textSecondary;
        }
      }

      return {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '500',
        backgroundColor,
        color,
      };
    },

    // 페이지네이션
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '24px',
    },

    paginationArrow: (disabled, hovered) => ({
      padding: '8px 12px',
      fontSize: '16px',
      fontWeight: '600',
      color: disabled
        ? isDark
          ? '#424242'
          : '#bdbdbd' // 비활성화: 다크/라이트 구분
        : hovered && !disabled
          ? theme.colors.brand
          : isDark
            ? '#e0e0e0'
            : '#333333',
      backgroundColor:
        hovered && !disabled ? (isDark ? '#2a2a2a' : '#f0f0f0') : 'transparent',
      border: `1px solid ${
        disabled ? (isDark ? '#424242' : '#e0e0e0') : theme.colors.border
      }`,
      borderRadius: '6px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: disabled ? 'none' : 'all 0.2s', // 비활성화 시 transition 없음
      userSelect: 'none',
    }),

    paginationButton: (isActive, disabled, hovered) => ({
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
      color: isActive
        ? '#ffffff'
        : hovered && !disabled
          ? theme.colors.brand
          : isDark
            ? '#e0e0e0'
            : '#333333',
      backgroundColor: isActive
        ? theme.colors.brand
        : hovered && !disabled
          ? isDark
            ? '#2a2a2a'
            : '#f0f0f0'
          : 'transparent',
      border: `1px solid ${isActive ? theme.colors.brand : theme.colors.border}`,
      borderRadius: '6px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      minWidth: '36px',
      opacity: disabled ? 0.5 : 1,
      transition: disabled ? 'none' : 'all 0.2s',
      userSelect: 'none',
    }),

    // 세부 내역 카드 스타일
    detailCardWrapper: {
      padding: 0,
      backgroundColor: 'transparent',
      border: 'none',
    },

    detailCard: {
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      padding: '24px',
      margin: '8px 16px 16px 16px',
      animation: 'slideDown 0.3s ease-in-out',
    },

    detailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${theme.colors.border}`,
    },

    detailTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: theme.colors.text,
      margin: 0,
      marginBottom: '8px',
    },

    detailSubtitle: {
      fontSize: '14px',
      color: theme.colors.textSecondary,
      margin: 0,
      marginBottom: '4px',
    },

    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: theme.colors.textSecondary,
      cursor: 'pointer',
      padding: '4px 8px',
      transition: 'all 0.2s',
    },

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
        transition: 'all 0.3s ease',
      };
    },

    timelineLine: (completed, isFailure = false) => ({
      position: 'absolute',
      left: 'calc(50% + 22px)',
      right: 'calc(-50% + 22px)',
      top: '22px',
      height: '3px',
      backgroundColor: !completed
        ? isDark
          ? '#424242'
          : '#e0e0e0' // 다음 단계가 처리되지 않음: 회색
        : isFailure
          ? isDark
            ? '#f44336'
            : '#ef5350' // 실패/반려: 빨간색
          : isDark
            ? '#4caf50'
            : '#66bb6a', // 성공: 초록색
      zIndex: 1,
      transition: 'all 0.3s ease',
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
      transition: 'all 0.2s',
      marginTop: '-1px',
    }),

    rejectionMessage: {
      padding: '12px',
      backgroundColor: isDark ? 'rgba(244, 67, 54, 0.1)' : '#ffebee',
      border: `1px solid ${isDark ? '#ef5350' : '#d32f2f'}`,
      borderRadius: '8px',
      color: isDark ? '#ef5350' : '#d32f2f',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      marginTop: '16px',
    },

    // 새로운 반려/거절 메시지 박스 스타일
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

    rejectionActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginTop: '4px',
    },

    rejectionButton: (hovered) => ({
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: '500',
      color: isDark ? '#90caf9' : '#1976d2',
      backgroundColor: hovered
        ? isDark
          ? 'rgba(33, 150, 243, 0.1)'
          : '#e3f2fd'
        : 'transparent',
      border: `1px solid ${isDark ? '#90caf9' : '#1976d2'}`,
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),

    rejectionButtonPrimary: (hovered) => ({
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: hovered
        ? isDark
          ? '#f44336'
          : '#c62828'
        : isDark
          ? '#ef5350'
          : '#d32f2f',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
  };
};
