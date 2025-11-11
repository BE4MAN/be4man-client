import { format, getDay, addDays, startOfMonth } from 'date-fns';

/**
 * 한국어 요일을 숫자로 변환 (date-fns getDay 형식: 0=일요일, 1=월요일, ...)
 * @param {string} weekday - 한국어 요일 ('월요일', '화요일', ...)
 * @returns {number} 요일 숫자 (0-6)
 */
const weekdayToNumber = (weekday) => {
  const map = {
    일요일: 0,
    월요일: 1,
    화요일: 2,
    수요일: 3,
    목요일: 4,
    금요일: 5,
    토요일: 6,
  };
  return map[weekday] ?? 0;
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 * @returns {string} 오늘 날짜 (YYYY-MM-DD)
 */
export const getTodayDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

/**
 * 가장 가까운 특정 요일의 날짜를 계산
 * @param {string} weekday - 한국어 요일 ('월요일', '화요일', ...)
 * @returns {string} 가장 가까운 요일 날짜 (YYYY-MM-DD)
 */
export const getNextWeekday = (weekday) => {
  if (!weekday) return getTodayDate();

  const targetDay = weekdayToNumber(weekday);
  const today = new Date();
  const currentDay = getDay(today);

  // 오늘부터 7일 내에 해당 요일 찾기
  let daysToAdd = targetDay - currentDay;
  if (daysToAdd < 0) {
    daysToAdd += 7; // 다음 주로
  }
  if (daysToAdd === 0) {
    // 오늘이 해당 요일이면 오늘 반환
    return format(today, 'yyyy-MM-dd');
  }

  const nextDate = addDays(today, daysToAdd);
  return format(nextDate, 'yyyy-MM-dd');
};

/**
 * 가장 가까운 매월 N번째 주 N요일의 날짜를 계산
 * @param {number|string} weekOfMonth - 주차 (1-4)
 * @param {string} weekday - 한국어 요일 ('월요일', '화요일', ...)
 * @returns {string} 가장 가까운 날짜 (YYYY-MM-DD)
 */
export const getNextMonthlyWeekday = (weekOfMonth, weekday) => {
  if (!weekOfMonth || !weekday) return getTodayDate();

  const weekNum = Number.parseInt(weekOfMonth, 10);
  if (!Number.isFinite(weekNum) || weekNum < 1 || weekNum > 4) {
    return getTodayDate();
  }

  const targetDay = weekdayToNumber(weekday);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // 이번 달의 첫 번째 날
  const firstDayOfMonth = startOfMonth(today);
  const firstDayWeekday = getDay(firstDayOfMonth);

  // 첫 번째 날의 요일을 기준으로 N번째 주의 해당 요일 계산
  let daysToAdd = targetDay - firstDayWeekday;
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }
  // (weekNum - 1) 주를 더함
  daysToAdd += (weekNum - 1) * 7;

  const targetDate = addDays(firstDayOfMonth, daysToAdd);

  // 계산된 날짜가 이번 달이고 오늘 이후면 반환
  if (
    targetDate.getMonth() === currentMonth &&
    targetDate.getFullYear() === currentYear &&
    targetDate >= today
  ) {
    return format(targetDate, 'yyyy-MM-dd');
  }

  // 다음 달의 해당 날짜 계산
  const nextMonth = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthFirstDay = startOfMonth(nextMonth);
  const nextMonthFirstDayWeekday = getDay(nextMonthFirstDay);

  let nextMonthDaysToAdd = targetDay - nextMonthFirstDayWeekday;
  if (nextMonthDaysToAdd < 0) {
    nextMonthDaysToAdd += 7;
  }
  nextMonthDaysToAdd += (weekNum - 1) * 7;

  const nextMonthTargetDate = addDays(nextMonthFirstDay, nextMonthDaysToAdd);
  return format(nextMonthTargetDate, 'yyyy-MM-dd');
};
