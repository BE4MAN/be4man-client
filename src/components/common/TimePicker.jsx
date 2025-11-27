// 작성자 : 이원석
import { Clock, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import * as S from './TimePicker.styles';

const ITEM_HEIGHT = 34;
const COLUMN_HEIGHT = 109;
const PADDING_HEIGHT = ITEM_HEIGHT * 2;

export default function TimePicker({
  value,
  onChange,
  onBlur,
  disabled = false,
  $hasError = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const containerRef = useRef(null);
  const hoursColumnRef = useRef(null);
  const minutesColumnRef = useRef(null);
  const inputRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const REPEAT_COUNT = 3;
  const repeatedHours = Array(REPEAT_COUNT).fill(hours).flat();
  const repeatedMinutes = Array(REPEAT_COUNT).fill(minutes).flat();

  useEffect(() => {
    if (value && value.includes(':')) {
      const [h, m] = value.split(':');
      const hourNum = parseInt(h, 10);
      const minuteNum = parseInt(m, 10);
      if (!isNaN(hourNum) && !isNaN(minuteNum)) {
        setTempHours(hourNum);
        setTempMinutes(minuteNum);
      }
    } else if (!value) {
      setTempHours(0);
      setTempMinutes(0);
    }
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      isScrollingRef.current = true;
      scrollToValue(hoursColumnRef, tempHours, hours);
      scrollToValue(minutesColumnRef, tempMinutes, minutes);
      isScrollingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, tempHours, tempMinutes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const scrollToValue = (ref, value, values) => {
    if (!ref.current) return;
    const index = values.indexOf(value);
    if (index !== -1) {
      const centerStartIndex = values.length * Math.floor(REPEAT_COUNT / 2);
      const targetScrollTop =
        PADDING_HEIGHT -
        3 * ITEM_HEIGHT +
        (centerStartIndex + index) * ITEM_HEIGHT;
      ref.current.scrollTop = targetScrollTop;
    }
  };

  const formatTimeDisplay = () => {
    const h = tempHours.toString().padStart(2, '0');
    const m = tempMinutes.toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const handleInputKeyDown = (e) => {
    const input = e.key;

    if (e.key === 'Enter') {
      setIsOpen(false);
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cursorPosition === 4) {
        setTempMinutes(0);
        setCursorPosition(2);
      } else if (cursorPosition === 3) {
        setTempMinutes(0);
        setCursorPosition(2);
      } else if (cursorPosition === 2) {
        setTempHours(0);
        setCursorPosition(0);
      } else if (cursorPosition === 1) {
        setTempHours(0);
        setCursorPosition(0);
      }
      return;
    }

    if (!/^\d$/.test(input)) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const digit = parseInt(input, 10);

    if (cursorPosition === 0) {
      if (digit <= 2) {
        setTempHours(digit);
        setCursorPosition(1);
      } else {
        setTempHours(digit);
        setTempMinutes(0);
        setCursorPosition(2);
        scrollToValue(hoursColumnRef, digit, hours);
        scrollToValue(minutesColumnRef, 0, minutes);
      }
    } else if (cursorPosition === 1) {
      const firstDigit = tempHours || 0;
      let newHour = firstDigit * 10 + digit;
      if (newHour >= 24) {
        newHour = newHour % 24;
      }
      if (newHour >= 0 && newHour <= 23) {
        setTempHours(newHour);
        setTempMinutes(0);
        scrollToValue(hoursColumnRef, newHour, hours);
        scrollToValue(minutesColumnRef, 0, minutes);
      } else if (digit >= 0 && digit <= 9) {
        setTempHours(digit);
        setTempMinutes(0);
        scrollToValue(hoursColumnRef, digit, hours);
        scrollToValue(minutesColumnRef, 0, minutes);
      }
      setCursorPosition(2);
    } else if (cursorPosition === 2) {
      if (digit <= 5) {
        setTempMinutes(digit * 10);
        setCursorPosition(3);
        scrollToValue(minutesColumnRef, digit * 10, minutes);
      }
    } else if (cursorPosition === 3) {
      const firstDigit = Math.floor((tempMinutes || 0) / 10);
      let newMinute = firstDigit * 10 + digit;
      if (newMinute > 55) {
        newMinute = newMinute % 60;
      }
      newMinute = Math.round(newMinute / 5) * 5;
      if (newMinute >= 60) newMinute = 55;
      setTempMinutes(newMinute);
      scrollToValue(minutesColumnRef, newMinute, minutes);
      setCursorPosition(4);
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
    setCursorPosition(0);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setCursorPosition(0);
  };

  const handleScroll = (ref, setter, values) => {
    if (!ref.current) return;
    if (isScrollingRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!ref.current) return;
      if (isScrollingRef.current) return;

      const scrollTop = ref.current.scrollTop;
      const adjustedScrollTop = Math.max(
        0,
        scrollTop - (PADDING_HEIGHT - 3 * ITEM_HEIGHT),
      );
      const totalIndex = Math.round(adjustedScrollTop / ITEM_HEIGHT);
      const actualIndex = totalIndex % values.length;
      const actualValue = values[actualIndex];

      if (actualValue !== undefined) {
        const targetScrollTop =
          PADDING_HEIGHT - 3 * ITEM_HEIGHT + totalIndex * ITEM_HEIGHT;
        setter(actualValue);
        ref.current.scrollTop = targetScrollTop;
      }
    }, 50);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleItemClick = (type, val) => {
    if (type === 'hours') {
      setTempHours(val);
      isScrollingRef.current = true;
      scrollToValue(hoursColumnRef, val, hours);
      isScrollingRef.current = false;
    } else {
      setTempMinutes(val);
      isScrollingRef.current = true;
      scrollToValue(minutesColumnRef, val, minutes);
      isScrollingRef.current = false;
    }
  };

  const handleConfirm = () => {
    const timeValue = `${tempHours.toString().padStart(2, '0')}:${tempMinutes.toString().padStart(2, '0')}`;
    onChange?.(timeValue);
    onBlur?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    // 원래 값으로 복원
    if (value && value.includes(':')) {
      const [h, m] = value.split(':');
      const hourNum = parseInt(h, 10);
      const minuteNum = parseInt(m, 10);
      if (!isNaN(hourNum) && !isNaN(minuteNum)) {
        setTempHours(hourNum);
        setTempMinutes(minuteNum);
      }
    } else {
      setTempHours(0);
      setTempMinutes(0);
    }
    setIsOpen(false);
  };

  const displayValue = formatTimeDisplay();
  const placeholder = '--:--';

  return (
    <S.TimePickerContainer ref={containerRef}>
      <S.InputWrapper>
        <S.ClockIcon size={16} />
        <S.TimePickerInput
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={placeholder}
          onKeyDown={handleInputKeyDown}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          readOnly
          disabled={disabled}
          $hasError={$hasError}
          $hasValue={!!value}
        />
        <S.ChevronButton
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <S.ChevronIcon $open={isOpen} size={16} />
        </S.ChevronButton>
      </S.InputWrapper>

      {isOpen && (
        <S.DropdownPanel>
          <S.PickerContainer>
            <S.ColumnsWrapper>
              {/* Hours Column */}
              <S.ColumnContainer>
                <S.Overlay>
                  <S.TopGradient />
                  <S.SelectionIndicator />
                  <S.BottomGradient />
                </S.Overlay>
                <S.ScrollColumn
                  ref={hoursColumnRef}
                  onScroll={() =>
                    handleScroll(hoursColumnRef, setTempHours, hours)
                  }
                  onWheel={handleWheel}
                >
                  <S.PaddingSpacer />
                  {repeatedHours.map((hour, idx) => (
                    <S.ColumnItem
                      key={`hour-${idx}-${hour}`}
                      data-value={hour}
                      $selected={tempHours === hour}
                      onClick={() => handleItemClick('hours', hour)}
                    >
                      {hour.toString().padStart(2, '0')}
                    </S.ColumnItem>
                  ))}
                  <S.PaddingSpacer />
                </S.ScrollColumn>
              </S.ColumnContainer>

              <S.ColumnSeparator>:</S.ColumnSeparator>

              {/* Minutes Column */}
              <S.ColumnContainer>
                <S.Overlay>
                  <S.TopGradient />
                  <S.SelectionIndicator />
                  <S.BottomGradient />
                </S.Overlay>
                <S.ScrollColumn
                  ref={minutesColumnRef}
                  onScroll={() =>
                    handleScroll(minutesColumnRef, setTempMinutes, minutes)
                  }
                  onWheel={(e) => handleWheel(e, minutesColumnRef)}
                >
                  <S.PaddingSpacer />
                  {repeatedMinutes.map((minute, idx) => (
                    <S.ColumnItem
                      key={`minute-${idx}-${minute}`}
                      data-value={minute}
                      $selected={tempMinutes === minute}
                      onClick={() => handleItemClick('minutes', minute)}
                    >
                      {minute.toString().padStart(2, '0')}
                    </S.ColumnItem>
                  ))}
                  <S.PaddingSpacer />
                </S.ScrollColumn>
              </S.ColumnContainer>
            </S.ColumnsWrapper>
          </S.PickerContainer>

          <S.ButtonContainer>
            <S.CancelButton type="button" onClick={handleCancel}>
              취소
            </S.CancelButton>
            <S.ConfirmButton type="button" onClick={handleConfirm}>
              확인
            </S.ConfirmButton>
          </S.ButtonContainer>
        </S.DropdownPanel>
      )}
    </S.TimePickerContainer>
  );
}
