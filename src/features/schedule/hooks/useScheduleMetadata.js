import { useQuery } from '@tanstack/react-query';

import { scheduleAPI } from '@/api/schedule';

/**
 * 일정 관리 메타데이터 조회 Hook
 * 프로젝트 목록과 작업 금지 유형 목록을 조회합니다.
 * 메타데이터는 자주 변경되지 않으므로 캐싱됩니다.
 *
 * @returns {Object} React Query 결과
 * @returns {Object} data - 메타데이터 {projects: Array, banTypes: Array}
 * @returns {boolean} isLoading - 로딩 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 */
export const useScheduleMetadata = () => {
  return useQuery({
    queryKey: ['schedule', 'metadata'],
    queryFn: () => scheduleAPI.getScheduleMetadata(),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });
};
