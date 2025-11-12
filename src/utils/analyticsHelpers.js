// Analytics 페이지용 헬퍼 함수들

/**
 * 성공률에 따른 색상 반환
 * @param {number} rate - 성공률 (0-100)
 * @returns {string} 색상 코드
 */
export const getSuccessColor = (rate) => {
  if (rate >= 95) return '#16A34A';
  if (rate >= 85) return '#FACC15';
  return '#DC2626';
};

/**
 * 극좌표를 직교좌표로 변환 (원형 차트용)
 * @param {number} centerX - 중심 X 좌표
 * @param {number} centerY - 중심 Y 좌표
 * @param {number} radius - 반지름
 * @param {number} angleInDegrees - 각도 (도 단위)
 * @returns {{x: number, y: number}} 직교좌표
 */
export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
