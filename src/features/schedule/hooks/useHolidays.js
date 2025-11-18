import { useQuery } from '@tanstack/react-query';

import { getHolidays } from '@/api/holidays';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000; // 1년 (밀리초)

/**
 * 공휴일 데이터 조회 Hook
 * 공공데이터 포털 한국천문연구원_특일 정보 API를 사용하여 공휴일 데이터를 조회합니다.
 * React Query와 localStorage를 통해 1년간 캐싱됩니다.
 *
 * @param {number} year - 조회할 연도 (기본값: 현재 연도)
 * @returns {Object} React Query 결과
 * @returns {Array<{date: string, name: string}>} data - 공휴일 배열
 * @returns {boolean} isLoading - 로딩 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 */
export const useHolidays = (year = new Date().getFullYear()) => {
  return useQuery({
    queryKey: ['holidays', year],
    queryFn: () => getHolidays(year),
    staleTime: ONE_YEAR_MS, // 1년간 fresh 상태 유지
    gcTime: ONE_YEAR_MS, // 1년간 캐시 유지
    retry: 2, // 실패 시 2번 재시도
    retryDelay: 1000, // 재시도 간격 1초
  });
};
