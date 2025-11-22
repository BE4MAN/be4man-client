import { getDurationInMinutes } from './durationUtils';

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

const toDateOrNull = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getBanDateRange = (ban) => {
  if (!ban?.startDate || !ban?.startTime) {
    return null;
  }

  // startTime이 "HH:mm:ss" 형식인지 "HH:mm" 형식인지 확인
  const startTimeStr =
    ban.startTime.includes(':') && ban.startTime.split(':').length === 3
      ? ban.startTime // 이미 "HH:mm:ss" 형식
      : `${ban.startTime}:00`; // "HH:mm" 형식이면 ":00" 추가

  const startDateTime = toDateOrNull(`${ban.startDate}T${startTimeStr}`);
  if (!startDateTime) {
    return null;
  }

  let endDateTime = toDateOrNull(ban.endedAt);

  if (!endDateTime) {
    const durationMinutes = getDurationInMinutes(ban);
    if (durationMinutes > 0) {
      endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes);
    } else if (ban.endDate || ban.endTime) {
      // endTime도 동일하게 처리
      const endTimeStr =
        ban.endTime &&
        ban.endTime.includes(':') &&
        ban.endTime.split(':').length === 3
          ? ban.endTime // 이미 "HH:mm:ss" 형식
          : `${ban.endTime || ban.startTime || '00:00'}:00`; // "HH:mm" 형식이면 ":00" 추가

      const legacyEnd = ban.endDate
        ? `${ban.endDate}T${endTimeStr}`
        : `${ban.startDate}T${endTimeStr}`;
      endDateTime = toDateOrNull(legacyEnd);
    }
  }

  if (!endDateTime || endDateTime < startDateTime) {
    return { startDateTime, endDateTime: new Date(startDateTime) };
  }

  return { startDateTime, endDateTime };
};

export function calculateBanDatesFromRange(startDateTime, endDateTime) {
  if (!startDateTime || !endDateTime) return [];

  const dates = [];
  const cursor = new Date(startDateTime);
  cursor.setHours(0, 0, 0, 0);

  const endCursor = new Date(endDateTime);
  endCursor.setHours(0, 0, 0, 0);

  while (cursor <= endCursor) {
    dates.push(cursor.toISOString().split('T')[0]);
    cursor.setTime(cursor.getTime() + MILLISECONDS_IN_DAY);
  }

  return dates;
}

export function getBansForDate(restrictedPeriods, targetDate) {
  if (!restrictedPeriods || !targetDate) {
    return [];
  }

  return restrictedPeriods.filter((ban) => {
    const range = getBanDateRange(ban);
    if (!range) return false;

    const { startDateTime, endDateTime } = range;
    const target = toDateOrNull(`${targetDate}T00:00:00`);
    if (!target) return false;

    const startDay = new Date(startDateTime);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(endDateTime);
    endDay.setHours(0, 0, 0, 0);

    return target >= startDay && target <= endDay;
  });
}

export function getBanDateRangeInfo(ban) {
  return getBanDateRange(ban);
}
