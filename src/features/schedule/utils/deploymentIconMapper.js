import {
  ClipboardList,
  Calendar,
  Loader2,
  CircleCheck,
  CircleX,
} from 'lucide-react';

/**
 * 배포 아이콘 매핑 유틸리티
 * deploymentStatus를 우선적으로 확인하고, 그 외에는 stage와 status 조합으로 결정
 *
 * @param {string} stage - 진행 단계 ('계획서', '배포', '결과보고')
 * @param {string} status - 업무 상태 ('대기', '진행중', '완료', '실패')
 * @param {string} deploymentStatus - 배포 상태 ('scheduled', 'success', 'failed')
 * @param {Object} theme - Emotion theme 객체
 * @returns {Object} { Icon: Component, color: string, size: number, animated?: boolean }
 */
export const getDeploymentIcon = (
  stage,
  status,
  deploymentStatus,
  theme,
  iconSize = 14,
) => {
  const defaultSize = iconSize;

  // 우선순위 1: deploymentStatus가 'success' 또는 'failed'이면 우선 적용
  if (deploymentStatus === 'success') {
    return {
      Icon: CircleCheck,
      color: theme.colors.schedule?.successGreen || '#10B981', // 연한 초록색
      size: defaultSize,
    };
  }

  if (deploymentStatus === 'failed') {
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
    if (status === '대기') {
      return {
        Icon: Calendar,
        color: theme.colors.textPrimary,
        size: defaultSize,
      };
    }

    if (status === '진행중') {
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
