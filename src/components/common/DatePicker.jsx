import { useTheme } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react';

const DatePicker = ({ value, onChange }) => {
  const theme = useTheme();
  const isDark = theme.mode === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date(),
  );
  const [hoveredNavBtn, setHoveredNavBtn] = useState(null);
  const [hoveredActionBtn, setHoveredActionBtn] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navButton = (isHovered) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: isDark ? '#e0e0e0' : theme.colors.text,
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: isHovered
      ? isDark
        ? '#2a2a2a'
        : theme.colors.backgroundHover
      : 'transparent',
    transition: 'background-color 0.2s',
  });

  const getStyles = () => ({
    container: {
      position: 'relative',
      width: '280px',
    },
    inputButton: {
      width: '100%',
      padding: '8px 36px 8px 12px',
      fontSize: '14px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      backgroundColor: theme.colors.bg,
      color: theme.colors.textPrimary,
      cursor: 'pointer',
      textAlign: 'left',
      position: 'relative',
    },
    calendarIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: theme.colors.textSecondary,
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      right: 0,
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '12px',
      boxShadow: isDark
        ? '0 8px 24px rgba(0,0,0,0.5)'
        : '0 8px 24px rgba(0,0,0,0.15)',
      zIndex: 1001,
      padding: '10px',
      minWidth: '280px',
      width: 'max-content',
    },
    monthSection: {
      flex: 1,
    },
    monthHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      padding: '0 4px',
    },
    monthTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.colors.text,
    },
    weekdays: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '2px',
      marginBottom: '4px',
    },
    weekday: {
      textAlign: 'center',
      fontSize: '11px',
      fontWeight: '600',
      color: theme.colors.textSecondary,
      padding: '4px 0',
    },
    daysGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '2px',
    },
    dayCell: (isToday, isSelected, isDisabled, isHovered) => ({
      padding: '6px',
      textAlign: 'center',
      fontSize: '12px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      borderRadius: '4px',
      backgroundColor: isSelected
        ? theme.colors.brand
        : isHovered
          ? isDark
            ? '#2a2a2a'
            : theme.colors.backgroundHover
          : 'transparent',
      color: isSelected
        ? '#ffffff'
        : isDisabled
          ? theme.colors.textSecondary
          : isToday
            ? theme.colors.brand
            : theme.colors.text,
      fontWeight: isToday ? '600' : '400',
      opacity: isDisabled ? 0.4 : 1,
    }),
    footer: {
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: `1px solid ${theme.colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
    },
    selectedDate: {
      fontSize: '12px',
      color: isDark ? '#e0e0e0' : theme.colors.textSecondary,
    },
    buttons: {
      display: 'flex',
      gap: '6px',
    },
    button: (isPrimary, isHovered) => ({
      padding: '5px 12px',
      fontSize: '13px',
      fontWeight: '500',
      border: isPrimary ? 'none' : `1px solid ${theme.colors.border}`,
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: isPrimary
        ? isHovered
          ? '#1565c0'
          : theme.colors.brand
        : isHovered
          ? isDark
            ? '#2a2a2a'
            : theme.colors.backgroundHover
          : 'transparent',
      color: isPrimary ? '#ffffff' : isDark ? '#e0e0e0' : theme.colors.text,
      transition: 'background-color 0.2s',
    }),
  });

  const styles = getStyles();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateSelected = (date) => {
    if (!date || !value) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === value;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    onChange(dateStr);
  };

  const handleClear = () => {
    onChange('');
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const renderMonth = () => {
    const days = getDaysInMonth(currentMonth);
    const monthName = `${currentMonth.getFullYear()}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

    return (
      <div style={styles.monthSection}>
        <div style={styles.monthHeader}>
          <button
            style={navButton(hoveredNavBtn === 'prev')}
            onClick={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentMonth(newDate);
            }}
            onMouseEnter={() => setHoveredNavBtn('prev')}
            onMouseLeave={() => setHoveredNavBtn(null)}
          >
            ‹
          </button>
          <span style={styles.monthTitle}>{monthName}</span>
          <button
            style={navButton(hoveredNavBtn === 'next')}
            onClick={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentMonth(newDate);
            }}
            onMouseEnter={() => setHoveredNavBtn('next')}
            onMouseLeave={() => setHoveredNavBtn(null)}
          >
            ›
          </button>
        </div>

        <div style={styles.weekdays}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <div key={idx} style={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        <div style={styles.daysGrid}>
          {days.map((day, idx) => (
            <div
              key={idx}
              style={styles.dayCell(
                isToday(day),
                isDateSelected(day),
                false,
                hoveredDate &&
                  day &&
                  day.toDateString() === hoveredDate.toDateString(),
              )}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => day && setHoveredDate(day)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              {day ? day.getDate() : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} style={styles.container}>
      <button
        type="button"
        style={styles.inputButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? formatDate(value) : '날짜 선택'}
        <svg
          style={styles.calendarIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.667 2.667h-9.334c-.736 0-1.333.597-1.333 1.333v9.333c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333zM10.667 1.333v2.667M5.333 1.333v2.667M2 6.667h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {renderMonth()}

          <div style={styles.footer}>
            <div style={styles.selectedDate}>
              {value
                ? `선택된 날짜: ${formatDate(value)}`
                : '날짜를 선택하세요'}
            </div>
            <div style={styles.buttons}>
              <button
                style={styles.button(false, hoveredActionBtn === 'clear')}
                onClick={handleClear}
                onMouseEnter={() => setHoveredActionBtn('clear')}
                onMouseLeave={() => setHoveredActionBtn(null)}
              >
                초기화
              </button>
              <button
                style={styles.button(true, hoveredActionBtn === 'apply')}
                onClick={handleApply}
                onMouseEnter={() => setHoveredActionBtn('apply')}
                onMouseLeave={() => setHoveredActionBtn(null)}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
