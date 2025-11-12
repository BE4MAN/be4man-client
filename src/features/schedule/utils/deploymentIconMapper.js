import {
  ClipboardList,
  Calendar,
  Loader2,
  CircleCheck,
  CircleX,
} from 'lucide-react';

/**
 * 배포 아이콘 매핑 유틸리티
 * isDeployed를 우선적으로 확인하고, 그 외에는 stage와 status 조합으로 결정
 *
 * @param {string} stage - 진행 단계 ('계획서', '배포', '결과보고', '재배포', '복구', '임시저장')
 * @param {string} status - 업무 상태 enum ('PENDING', 'REJECTED', 'IN_PROGRESS', 'CANCELED', 'COMPLETED', 'APPROVED') 또는 한국어 ('대기', '반려', '진행중', '취소', '완료', '승인')
 * @param {boolean|null} isDeployed - 배포 완료 여부 (true: 성공, false: 실패, null/undefined: 미확정)
 * @param {Object} theme - Emotion theme 객체
 * @param {number} iconSize - 아이콘 크기 (기본값: 14)
 * @returns {Object} { Icon: Component, color: string, size: number, animated?: boolean }
 */
export const getDeploymentIcon = (
  stage,
  status,
  isDeployed,
  theme,
  iconSize = 14,
) => {
  const defaultSize = iconSize;

  // 우선순위 1: isDeployed가 boolean이면 우선 적용
  if (isDeployed === true) {
    return {
      Icon: CircleCheck,
      color: theme.colors.schedule?.successGreen || '#10B981', // 연한 초록색
      size: defaultSize,
    };
  }

  if (isDeployed === false) {
    return {
      Icon: CircleX,
      color: theme.colors.schedule?.restrictedDanger || '#EF4444', // 연한 빨간색
      size: defaultSize,
    };
  }

  // 우선순위 2: stage와 status 조합으로 결정
  if (stage === '계획서') {
    return {
      Icon: ClipboardList,
      color: theme.colors.textPrimary,
      size: defaultSize,
    };
  }

  if (stage === '배포') {
    // status가 enum이거나 한국어일 수 있으므로 둘 다 체크
    if (status === '대기' || status === 'PENDING') {
      return {
        Icon: Calendar,
        color: theme.colors.textPrimary,
        size: defaultSize,
      };
    }

    if (status === '진행중' || status === 'IN_PROGRESS') {
      return {
        Icon: Loader2,
        color: '#FBBF24', // 노란색 (yellow-400)
        size: defaultSize,
        animated: true, // 느린 애니메이션 플래그
      };
    }
  }

  // 기본값
  return {
    Icon: Calendar,
    color: theme.colors.textPrimary,
    size: defaultSize,
  };
};
