// src/features/log/pages/LogManagement.style.js

export const getStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    overflow: 'hidden',
    padding: '24px',
    backgroundColor: theme.colors.background,
  },

  searchFilterSection: {
    // position: 'relative', ← 제거
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginLeft: '12px',
    marginTop: '8px',
    marginBottom: '18px',
    flex: '0 0 auto',
  },

  topControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '48px',
  },

  //  filterToggleButton: () => ({
  //
  //  }),

  toggleArrow: (isOpen) => ({
    transition: 'transform 0.2s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),

  searchBar: {
    position: 'relative',
    flex: 1,
    maxWidth: '500px',
  },

  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    pointerEvents: 'none',
  },

  searchInput: (isFocused) => ({
    width: '100%',
    height: '40px',
    padding: '10px 44px',
    border:
      theme.mode === 'dark'
        ? `1px solid ${isFocused ? '#60A5FA' : '#374151'}`
        : `1px solid ${isFocused ? '#3B82F6' : '#E5E7EB'}`,
    borderRadius: '8px',
    fontSize: '14px',
    background:
      theme.mode === 'dark' ? '#1F2937' : isFocused ? '#FFFFFF' : '#F9FAFB',
    color: theme.colors.text,
    transition: 'border 0.2s, box-shadow 0.2s',
    boxShadow: 'none', // ← 이렇게 수정
    outline: 'none',
  }),

  clearButton: (isHovered) => ({
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: theme.mode === 'dark' && isHovered ? '#374151' : 'none',
    border: 'none',
    color: isHovered
      ? theme.mode === 'dark'
        ? '#D1D5DB'
        : '#EF4444'
      : '#9CA3AF',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px',
    transition: 'color 0.2s, background 0.2s',
    borderRadius: '4px',
  }),

  // 필터 패널 - 절대 위치 제거 ← 수정
  filtersPanel: {
    //
  },

  // 필터 행
  filtersRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: '12px',
    padding: '16px',
    background: theme.mode === 'dark' ? '#111827' : '#F9FAFB',
    border: theme.mode === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
    borderRadius: '8px',
  },

  // 필터 행 아이템
  filterRowItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '140px',
    flex: '0 0 auto',
  },

  // 필터 라벨
  filterLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: theme.mode === 'dark' ? '#D1D5DB' : theme.colors.textSecondary, // ← 수정
  },

  customDropdown: {
    position: 'relative',
    minWidth: '140px',
  },

  dropdownTrigger: (isFocused, isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 12px',
    background:
      theme.mode === 'dark'
        ? isHovered
          ? '#374151'
          : '#1F2937' // ← 더 밝은 배경
        : isHovered
          ? '#F9FAFB'
          : '#FFFFFF',
    border:
      theme.mode === 'dark'
        ? `1px solid ${isFocused ? '#60A5FA' : '#4B5563'}` // ← 더 밝은 테두리
        : `1px solid ${isFocused ? '#3B82F6' : isHovered ? '#D1D5DB' : '#E5E7EB'}`,
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: isFocused
      ? theme.mode === 'dark'
        ? '0 0 0 2px rgba(96,165,250,0.1)'
        : '0 0 0 2px rgba(59,130,246,0.1)'
      : 'none',
    outline: 'none',
  }),

  dropdownLabel: {
    color: theme.colors.textSecondary,
    fontSize: '12px',
  },

  dropdownValue: {
    flex: 1,
    textAlign: 'left',
    color: theme.mode === 'dark' ? '#F9FAFB' : theme.colors.text, // ← 수정
    fontWeight: '500',
  },

  dropdownArrow: (isOpen) => ({
    color: '#9CA3AF',
    transition: 'transform 0.2s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    background: theme.mode === 'dark' ? '#1F2937' : '#FFFFFF',
    border: theme.mode === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
    borderRadius: '8px',
    boxShadow:
      theme.mode === 'dark'
        ? '0 4px 12px rgba(0,0,0,0.3)'
        : '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1000, // ← 충분히 높은 값으로 변경
    maxHeight: '200px',
    overflowY: 'auto',
  },

  dropdownItem: (isSelected, isHovered) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    background:
      theme.mode === 'dark'
        ? isSelected
          ? '#1E3A8A'
          : isHovered
            ? '#374151'
            : 'transparent'
        : isSelected
          ? '#EFF6FF'
          : isHovered
            ? '#F9FAFB'
            : 'transparent',
    color:
      theme.mode === 'dark'
        ? isSelected
          ? '#60A5FA'
          : '#F9FAFB'
        : isSelected
          ? '#2563EB'
          : '#111827',
    fontWeight: isSelected ? '500' : 'normal',
  }),

  dateInput: {
    padding: '8px 12px',
    border: theme.mode === 'dark' ? '1px solid #4B5563' : '1px solid #E5E7EB', // ← 수정
    borderRadius: '6px',
    background: theme.mode === 'dark' ? '#1F2937' : '#FFFFFF', // ← 수정
    fontSize: '13px',
    color: theme.mode === 'dark' ? '#F9FAFB' : theme.colors.text, // ← 수정
    cursor: 'pointer',
    width: '100%',
    transition: 'border 0.2s',
  },

  resetButton: (isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginLeft: 'auto',
    padding: '8px 14px',
    background: isHovered
      ? theme.mode === 'dark'
        ? '#7F1D1D'
        : '#FEF2F2'
      : 'transparent',
    border:
      theme.mode === 'dark'
        ? `1px solid ${isHovered ? '#991B1B' : '#374151'}`
        : `1px solid ${isHovered ? '#FCA5A5' : '#E5E7EB'}`,
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: isHovered
      ? theme.mode === 'dark'
        ? '#FCA5A5'
        : '#EF4444'
      : theme.mode === 'dark'
        ? '#9CA3AF'
        : '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  }),

  tableWrapper: {
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    background: theme.colors.surface,
    borderRadius: '12px',
    boxShadow:
      theme.mode === 'dark'
        ? '0 1px 3px rgba(0,0,0,0.3)'
        : '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    marginLeft: '12px',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: theme.colors.surface,
  },

  thead: {
    position: 'sticky',
    top: 0,
    background: theme.mode === 'dark' ? '#1F2937' : '#F9FAFB',
    borderBottom:
      theme.mode === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
    zIndex: 10,
  },

  th: {
    padding: '14px 16px',
    fontSize: '12px',
    textAlign: 'center',
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    verticalAlign: 'middle',
  },

  tr: (isHovered) => ({
    borderBottom: theme.mode === 'dark' ? 'none' : '1px solid #F3F4F6',
    transition: 'background 0.15s',
    background:
      theme.mode === 'dark'
        ? isHovered
          ? '#374151'
          : '#1F2937'
        : isHovered
          ? '#F9FAFB'
          : '#FFFFFF',
  }),

  td: {
    padding: '14px 16px',
    fontSize: '14px',
    textAlign: 'center',
    color: theme.colors.text,
    verticalAlign: 'middle',
  },

  badge: (type, status) => {
    const baseStyles = {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'capitalize',
    };

    if (type === 'status') {
      if (status === 'Deployed') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#1E3A8A' : '#DBEAFE',
          color: theme.mode === 'dark' ? '#60A5FA' : '#1E40AF',
        };
      } else if (status === 'Approved') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#713F12' : '#FDE047',
          color: theme.mode === 'dark' ? '#FDE047' : '#713F12',
        };
      } else if (status === 'Rejected') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#7F1D1D' : '#FCA5A5',
          color: theme.mode === 'dark' ? '#FCA5A5' : '#7F1D1D',
        };
      } else if (status === 'Pending') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#14532D' : '#86EFAC',
          color: theme.mode === 'dark' ? '#86EFAC' : '#14532D',
        };
      }
    } else if (type === 'result') {
      if (status === 'Success') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#059669' : '#D1FAE5',
          color: theme.mode === 'dark' ? '#FFFFFF' : '#065F46',
        };
      } else if (status === 'Failed') {
        return {
          ...baseStyles,
          background: theme.mode === 'dark' ? '#DC2626' : '#FEE2E2',
          color: theme.mode === 'dark' ? '#FFFFFF' : '#991B1B',
        };
      }
    }
    return baseStyles;
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 0',
    flex: '0 0 auto',
    height: 'auto',
  },

  // 페이지 버튼 스타일 (border 제거)
  paginationButton: (isActive, isDisabled, isHovered) => ({
    padding: '8px 12px',
    background: 'transparent', // 배경 투명
    border: 'none', // border 완전 제거
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    color:
      theme.mode === 'dark'
        ? isActive
          ? '#60A5FA'
          : '#9CA3AF'
        : isActive
          ? '#3B82F6'
          : '#6B7280',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isDisabled ? 0.4 : 1,
    minWidth: '36px',

    // hover 효과
    ...(isHovered &&
      !isDisabled &&
      !isActive && {
        background: theme.mode === 'dark' ? '#374151' : '#F3F4F6',
        color: theme.mode === 'dark' ? '#60A5FA' : '#3B82F6',
      }),

    // 활성 페이지 스타일
    ...(isActive && {
      background: theme.mode === 'dark' ? '#1E40AF' : '#DBEAFE',
      color: theme.mode === 'dark' ? '#FFFFFF' : '#1E40AF',
    }),
  }),

  // 화살표 버튼 스타일 (새로 추가)
  paginationArrow: (isDisabled, isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    color: theme.mode === 'dark' ? '#9CA3AF' : '#6B7280',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isDisabled ? 0.3 : 1,
    minWidth: '36px',

    // hover 효과
    ...(isHovered &&
      !isDisabled && {
        background: theme.mode === 'dark' ? '#374151' : '#F3F4F6',
        color: theme.mode === 'dark' ? '#60A5FA' : '#3B82F6',
      }),
  }),
});
