// src/features/log/pages/LogManagement.style.js

export const getStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    overflow: 'hidden',
    padding: '16px',
    backgroundColor: theme.colors.background,
    boxSizing: 'border-box', // ✅ 추가: padding 포함 계산
  },

  searchFilterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginLeft: '0',
    marginTop: '0',
    marginBottom: '12px',
    flex: '0 0 auto',
  },

  topControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '48px',
  },

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
    color: theme.mode === 'dark' ? '#F9FAFB' : '#111827',
    boxShadow: 'none',
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
    borderRadius: '4px',
  }),

  filtersPanel: {},

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

  filterRowItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '140px',
    flex: '0 0 auto',
  },

  filterLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: theme.mode === 'dark' ? '#D1D5DB' : theme.colors.textSecondary,
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
          : '#1F2937'
        : isHovered
          ? '#F9FAFB'
          : '#FFFFFF',
    border:
      theme.mode === 'dark'
        ? `1px solid ${isFocused ? '#60A5FA' : '#4B5563'}`
        : `1px solid ${isFocused ? '#3B82F6' : isHovered ? '#D1D5DB' : '#E5E7EB'}`,
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
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
    color: theme.mode === 'dark' ? '#F9FAFB' : theme.colors.text,
    fontWeight: '500',
  },

  dropdownArrow: (isOpen) => ({
    color: '#9CA3AF',
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
    zIndex: 1000,
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
    border: theme.mode === 'dark' ? '1px solid #4B5563' : '1px solid #E5E7EB',
    borderRadius: '6px',
    background: theme.mode === 'dark' ? '#1F2937' : '#FFFFFF',
    fontSize: '13px',
    cursor: 'pointer',
    width: '100%',
    colorScheme: theme.mode === 'dark' ? 'dark' : 'light',
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
    whiteSpace: 'nowrap',
  }),

  tableWrapper: {
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    background: theme.colors.surface,
    border: theme.mode === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB', // ✅ 추가
    borderRadius: '12px',
    boxShadow:
      theme.mode === 'dark'
        ? '0 1px 3px rgba(0,0,0,0.3)'
        : '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '12px',
    marginLeft: '0',
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

  paginationButton: (isActive, isDisabled, isHovered) => ({
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
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
    opacity: isDisabled ? 0.4 : 1,
    minWidth: '36px',

    ...(isHovered &&
      !isDisabled &&
      !isActive && {
        background: theme.mode === 'dark' ? '#374151' : '#F3F4F6',
        color: theme.mode === 'dark' ? '#60A5FA' : '#3B82F6',
      }),

    ...(isActive && {
      background: theme.mode === 'dark' ? '#1E40AF' : '#DBEAFE',
      color: theme.mode === 'dark' ? '#FFFFFF' : '#1E40AF',
    }),
  }),

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
    opacity: isDisabled ? 0.3 : 1,
    minWidth: '36px',

    ...(isHovered &&
      !isDisabled && {
        background: theme.mode === 'dark' ? '#374151' : '#F3F4F6',
        color: theme.mode === 'dark' ? '#60A5FA' : '#3B82F6',
      }),
  }),
});
