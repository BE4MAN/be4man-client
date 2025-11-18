/**
 * Ban의 duration을 분 단위로 변환
 * @param {Object} ban - Ban 객체
 * @returns {number} 분 단위 duration (0 이상)
 */
export function getDurationInMinutes(ban) {
  if (!ban) return 0;

  if (ban.durationMinutes !== undefined && ban.durationMinutes !== null) {
    const minutes = Number.parseInt(ban.durationMinutes, 10);
    if (Number.isFinite(minutes) && minutes >= 0) {
      return minutes;
    }
  }

  if (ban.duration !== undefined && ban.duration !== null) {
    const minutes = Number.parseInt(ban.duration, 10);
    if (Number.isFinite(minutes) && minutes >= 0) {
      return minutes;
    }
  }

  if (ban.durationHours !== undefined && ban.durationHours !== null) {
    const hours = Number.parseInt(ban.durationHours, 10);
    if (Number.isFinite(hours) && hours >= 0) {
      return hours * 60;
    }
  }

  return 0;
}

/**
 * 분 단위 duration을 "N시간 M분" 형태의 문자열로 변환
 * @param {number} totalMinutes - 총 분 수
 * @returns {string} "N시간 M분" 형태의 문자열 (예: "2시간 30분", "1시간", "30분")
 */
export function formatDuration(totalMinutes) {
  if (!totalMinutes || totalMinutes <= 0) return '—';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  if (hours > 0) {
    return `${hours}시간`;
  }
  if (minutes > 0) {
    return `${minutes}분`;
  }

  return '—';
}
