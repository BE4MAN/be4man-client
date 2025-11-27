// 작성자 : 이원석
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleAPI } from '@/api/schedule';

/**
 * 작업 금지 기간 취소 Hook
 *
 * @returns {Object} React Query mutation 결과
 * @returns {Function} mutate - 작업 금지 기간 취소 함수
 * @returns {Function} mutateAsync - 비동기 작업 금지 기간 취소 함수
 * @returns {boolean} isPending - 취소 중 여부
 * @returns {boolean} isError - 에러 발생 여부
 * @returns {Object} error - 에러 객체
 */
export const useCancelBan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (banId) => scheduleAPI.cancelBan(banId),
    onSuccess: () => {
      // 작업 금지 기간 목록 쿼리 무효화하여 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['schedule', 'bans'] });
      // 배포 작업 목록도 무효화 (취소된 Ban으로 인해 Deployment가 다시 활성화될 수 있음)
      queryClient.invalidateQueries({ queryKey: ['schedule', 'deployments'] });
    },
  });
};
