// 작성자 : 이원석
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleAPI } from '@/api/schedule';

/**
 * 작업 금지 기간 생성 Hook
 *
 * @returns {Object} React Query mutation 결과
 * @returns {Function} mutate - 작업 금지 기간 생성 함수
 * @returns {Function} mutateAsync - 비동기 작업 금지 기간 생성 함수
 * @returns {boolean} isPending - 생성 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 * @returns {Object} data - 생성된 작업 금지 기간 데이터
 */
export const useCreateBan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (banData) => scheduleAPI.createBan(banData),
    onSuccess: () => {
      // 작업 금지 기간 목록 쿼리 무효화하여 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['schedule', 'bans'] });
      // 배포 작업 목록도 무효화 (날짜 범위에 따라 영향받을 수 있음)
      queryClient.invalidateQueries({ queryKey: ['schedule', 'deployments'] });
    },
  });
};
