// 작성자 : 이원석
import { parseISO } from 'date-fns';

/**
 * 시간 형식 변환 유틸리티
 * 'HH:mm:ss' 또는 'HH:mm' 형식을 '오전/오후 H시 M분' 형식으로 변환
 * 날짜 형식: 'YYYY-MM-DD' → 'YYYY년 MM월 DD일'
 */

/**
 * 날짜 부분을 한국어 형식으로 변환
 * @param {string} datePart - 날짜 문자열 ('YYYY-MM-DD')
 * @returns {string} 한국어 형식 ('YYYY년 MM월 DD일')
 */
const formatDatePart = (datePart) => {
  if (!datePart) return datePart;

  const dateMatch = datePart.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (dateMatch) {
    const year = dateMatch[1];
    const month = parseInt(dateMatch[2], 10);
    const day = parseInt(dateMatch[3], 10);
    return `${year}년 ${month}월 ${day}일`;
  }

  return datePart;
};

/**
 * 시간 부분을 12시간제 한국어 형식으로 변환 (초 제거, 오전/오후 추가)
 * @param {string} timePart - 시간 부분 ('HH:mm:ss' 또는 'HH:mm')
 * @returns {string} 한국어 형식 ('오전/오후 H시 M분')
 */
const formatTimePart = (timePart) => {
  if (!timePart) return timePart;

  let hours = 0;
  let minutes = 0;

  // HH:mm:ss 형식
  const timeWithSecondsMatch = timePart.match(
    /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
  );
  if (timeWithSecondsMatch) {
    hours = parseInt(timeWithSecondsMatch[1], 10);
    minutes = parseInt(timeWithSecondsMatch[2], 10);
    // seconds는 무시
  } else {
    // HH:mm 형식
    const timeMatch = timePart.match(/^(\d{1,2}):(\d{1,2})$/);
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = parseInt(timeMatch[2], 10);
    } else {
      // 형식이 맞지 않으면 그대로 반환
      return timePart;
    }
  }

  // 12시간제 변환 및 오전/오후 결정
  let period = '오전';
  let displayHours = hours;

  if (hours === 0) {
    // 0시 → 오전 00시
    period = '오전';
    displayHours = 0;
  } else if (hours === 12) {
    // 12시 → 오후 12시
    period = '오후';
    displayHours = 12;
  } else if (hours > 12) {
    // 13-23시 → 오후 1-11시
    period = '오후';
    displayHours = hours - 12;
  } else {
    // 1-11시 → 오전 1-11시
    period = '오전';
    displayHours = hours;
  }

  // 시와 분을 문자열로 변환 (0 → 00)
  const hoursStr = displayHours === 0 ? '00' : displayHours.toString();
  const minutesStr = minutes === 0 ? '00' : minutes.toString();

  return `${period} ${hoursStr}시 ${minutesStr}분`;
};

/**
 * 시간 문자열을 한국어 형식으로 변환
 * @param {string} timeString - 시간 문자열 ('HH:mm:ss', 'HH:mm', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm')
 * @returns {string} 한국어 형식 시간 문자열
 */
export const formatTimeToKorean = (timeString) => {
  if (!timeString || typeof timeString !== 'string') return timeString;

  // 날짜+시간 형식인 경우 (YYYY-MM-DD HH:mm:ss 또는 YYYY-MM-DD HH:mm)
  const dateTimeMatch = timeString.match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/);
  if (dateTimeMatch) {
    const datePart = dateTimeMatch[1];
    const timePart = dateTimeMatch[2];
    const formattedDate = formatDatePart(datePart);
    const formattedTime = formatTimePart(timePart);
    return `${formattedDate} ${formattedTime}`;
  }

  // 시간만 있는 경우 (HH:mm:ss 또는 HH:mm)
  return formatTimePart(timeString);
};

/**
 * ISO 8601 형식 또는 날짜+시간 문자열을 한국어 형식으로 변환 (초 포함)
 * '2025-11-20T09:05:56.061695' 또는 '2025-11-20 09:05:56' → '2025년 11월 20일 09:05:56'
 * @param {string} dateTimeString - ISO 8601 형식 또는 'YYYY-MM-DD HH:mm:ss' 형식의 날짜+시간 문자열
 * @returns {string} 한국어 형식 ('YYYY년 MM월 DD일 HH:MM:SS')
 */
export const formatDateTimeToKoreanWithSeconds = (dateTimeString) => {
  if (!dateTimeString || typeof dateTimeString !== 'string')
    return dateTimeString;

  try {
    // ISO 8601 형식 파싱 (예: '2025-11-20T09:05:56.061695')
    let date;
    if (dateTimeString.includes('T')) {
      date = parseISO(dateTimeString);
    } else {
      // 'YYYY-MM-DD HH:mm:ss' 형식 파싱
      const dateTimeMatch = dateTimeString.match(
        /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/,
      );
      if (dateTimeMatch) {
        const [, year, month, day, hour, minute, second] = dateTimeMatch;
        date = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10),
          parseInt(hour, 10),
          parseInt(minute, 10),
          parseInt(second, 10),
        );
      } else {
        return dateTimeString;
      }
    }

    // 유효한 날짜인지 확인
    if (Number.isNaN(date.getTime())) {
      return dateTimeString;
    }

    // '2025년 11월 20일 09:05:56' 형식으로 변환
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
  } catch {
    // 파싱 실패 시 원본 문자열 반환
    return dateTimeString;
  }
};

/**
 * 시간 문자열에서 밀리초를 제거하고 "HH:mm:ss" 형식으로 변환
 * '12:00:00.123' → '12:00:00'
 * '12:00:00' → '12:00:00'
 * '12:00' → '12:00:00'
 * @param {string} timeString - 시간 문자열 (밀리초 포함 가능)
 * @returns {string} "HH:mm:ss" 형식의 시간 문자열
 */
export const removeMillisecondsFromTime = (timeString) => {
  if (!timeString || typeof timeString !== 'string') return timeString;

  // 밀리초 제거 (예: '12:00:00.123' → '12:00:00')
  const withoutMs = timeString.replace(/\.\d+$/, '');

  // "HH:mm:ss" 형식인지 확인
  if (/^\d{2}:\d{2}:\d{2}$/.test(withoutMs)) {
    return withoutMs;
  }

  // "HH:mm" 형식이면 ":00" 추가
  if (/^\d{2}:\d{2}$/.test(withoutMs)) {
    return `${withoutMs}:00`;
  }

  // 그 외 형식은 그대로 반환
  return withoutMs;
};

/**
 * 시간 문자열에서 밀리초와 초를 제거하고 "HH:mm" 형식으로 변환
 * '12:00:00.123' → '12:00'
 * '12:00:00' → '12:00'
 * '12:00' → '12:00'
 * @param {string} timeString - 시간 문자열 (밀리초 및 초 포함 가능)
 * @returns {string} "HH:mm" 형식의 시간 문자열
 */
export const removeSecondsFromTime = (timeString) => {
  if (!timeString || typeof timeString !== 'string') return timeString;

  // 밀리초 제거 (예: '12:00:00.123' → '12:00:00')
  const withoutMs = timeString.replace(/\.\d+$/, '');

  // "HH:mm:ss" 형식이면 초 제거
  if (/^\d{2}:\d{2}:\d{2}$/.test(withoutMs)) {
    return withoutMs.substring(0, 5); // "HH:mm" 부분만 반환
  }

  // "HH:mm" 형식이면 그대로 반환
  if (/^\d{2}:\d{2}$/.test(withoutMs)) {
    return withoutMs;
  }

  // 그 외 형식은 그대로 반환
  return withoutMs;
};
