import { useQuery } from '@tanstack/react-query';

import { scheduleAPI } from '@/api/schedule';

/**
 * 작업 금지 기간 목록 조회 Hook
 *
 * @param {Object} [filters] - 필터 조건 (모두 선택사항)
 * @param {string} [filters.query] - 검색어 (제목 또는 설명에 포함)
 * @param {string} [filters.startDate] - 시작일 필터 (YYYY-MM-DD)
 * @param {string} [filters.endDate] - 종료일 필터 (YYYY-MM-DD)
 * @param {string} [filters.type] - 작업 금지 유형 필터 (DB_MIGRATION, ACCIDENT, MAINTENANCE, EXTERNAL_SCHEDULE)
 * @param {number[]} [filters.projectIds] - 프로젝트 ID 목록
 * @param {Object} [options] - 추가 옵션
 * @param {boolean} [options.enabled] - 쿼리 활성화 여부 (기본값: true)
 *
 * @returns {Object} React Query 결과
 * @returns {Array} data - 작업 금지 기간 목록
 * @returns {boolean} isLoading - 로딩 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 */
export const useBans = (filters = {}, options = {}) => {
  const { enabled = true, ...queryOptions } = options;

  // queryKey를 직렬화 가능한 값으로 구성하여 캐시 정확성 보장
  const queryKey = [
    'schedule',
    'bans',
    filters.query || null,
    filters.startDate || null,
    filters.endDate || null,
    filters.type || null,
    filters.projectIds?.sort((a, b) => a - b).join(',') || null,
  ];

  return useQuery({
    queryKey,
    queryFn: () => scheduleAPI.getBans(filters),
    enabled,
    ...queryOptions,
  });
};
