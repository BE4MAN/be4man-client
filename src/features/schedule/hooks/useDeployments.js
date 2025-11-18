import { useQuery } from '@tanstack/react-query';

import { scheduleAPI } from '@/api/schedule';

/**
 * 배포 작업 목록 조회 Hook
 *
 * @param {string} startDate - 시작일 (YYYY-MM-DD, 필수)
 * @param {string} endDate - 종료일 (YYYY-MM-DD, 필수)
 * @param {Object} [options] - 추가 옵션
 * @param {boolean} [options.enabled] - 쿼리 활성화 여부 (기본값: startDate와 endDate가 모두 있을 때)
 *
 * @returns {Object} React Query 결과
 * @returns {Array} data - 배포 작업 목록
 * @returns {boolean} isLoading - 로딩 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 */
export const useDeployments = (startDate, endDate, options = {}) => {
  const { enabled = !!(startDate && endDate), ...queryOptions } = options;

  return useQuery({
    queryKey: ['schedule', 'deployments', startDate, endDate],
    queryFn: () => scheduleAPI.getDeployments(startDate, endDate),
    enabled: enabled && !!startDate && !!endDate,
    ...queryOptions,
  });
};
