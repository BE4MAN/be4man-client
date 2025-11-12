const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

const toDateOrNull = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseDurationHours = (duration) => {
  if (duration === undefined || duration === null) return 0;
  if (typeof duration === 'number') {
    return Number.isFinite(duration) ? duration : 0;
  }
  const parsed = Number.parseFloat(duration);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getBanDateRange = (ban) => {
  if (!ban?.startDate || !ban?.startTime) {
    return null;
  }

  const startDateTime = toDateOrNull(`${ban.startDate}T${ban.startTime}:00`);
  if (!startDateTime) {
    return null;
  }

  let endDateTime = toDateOrNull(ban.endedAt);

  if (!endDateTime) {
    // durationHours 또는 duration 필드 확인
    const durationHours = parseDurationHours(ban.durationHours ?? ban.duration);
    if (durationHours > 0) {
      endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + durationHours);
    } else if (ban.endDate || ban.endTime) {
      // Legacy fallback
      const legacyEnd = ban.endDate
        ? `${ban.endDate}T${ban.endTime || ban.startTime || '00:00'}:00`
        : `${ban.startDate}T${ban.endTime}:00`;
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

/**
 * 특정 날짜에 해당하는 금지 기간들을 필터링
 * @param {Array} restrictedPeriods - 금지 기간 배열
 * @param {string} targetDate - 대상 날짜 (YYYY-MM-DD)
 * @returns {Array} 해당 날짜에 포함되는 금지 기간 배열
 */
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
