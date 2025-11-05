/**
 * 금지 기간이 여러 날에 걸치는 경우를 계산하여 해당 날짜들을 반환
 * @param {string} startDate - 시작 날짜 (YYYY-MM-DD)
 * @param {string} startTime - 시작 시간 (HH:mm)
 * @param {number} restrictedHours - 금지 시간 (시간 단위)
 * @returns {string[]} 금지 기간에 포함되는 날짜 배열 (YYYY-MM-DD 형식)
 */
export function calculateBanDates(startDate, startTime, restrictedHours) {
  if (!startDate || !startTime || !restrictedHours) {
    return [];
  }

  const dates = [];
  const startDateTime = new Date(`${startDate}T${startTime}:00`);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + restrictedHours);

  // 시작 날짜부터 종료 날짜까지 모든 날짜 추가
  const currentDate = new Date(startDateTime);
  currentDate.setHours(0, 0, 0, 0);

  const endDate = new Date(endDateTime);
  endDate.setHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    dates.push(dateStr);
    currentDate.setDate(currentDate.getDate() + 1);
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
    if (!ban.startDate || !ban.startTime) {
      return false;
    }

    // endTime이 있으면 금지 시간 계산
    if (ban.endTime) {
      const start = new Date(`2000-01-01T${ban.startTime}:00`);
      const end = new Date(`2000-01-01T${ban.endTime}:00`);

      // 하루를 넘어가는 경우 처리
      let endDate = new Date(end);
      if (endDate < start) {
        endDate.setDate(endDate.getDate() + 1);
      }
      const restrictedHours = Math.floor((endDate - start) / (1000 * 60 * 60));

      if (restrictedHours === 0) {
        // 금지 시간이 0이면 시작 날짜만 체크
        return ban.startDate === targetDate;
      }

      // 금지 기간이 여러 날에 걸치는 경우 체크
      const banDates = calculateBanDates(
        ban.startDate,
        ban.startTime,
        restrictedHours,
      );
      return banDates.includes(targetDate);
    }

    // endTime이 없으면 기존 endDate 기반 로직 (레거시 호환)
    if (ban.endDate) {
      const periodStart = new Date(ban.startDate);
      const periodEnd = new Date(ban.endDate);
      const currentDay = new Date(targetDate);
      return currentDay >= periodStart && currentDay <= periodEnd;
    }

    // startDate만 있으면 시작 날짜만 체크
    return ban.startDate === targetDate;
  });
}
