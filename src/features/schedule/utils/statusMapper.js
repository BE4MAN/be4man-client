import {
  FileText,
  Calendar,
  Loader2,
  CircleCheck,
  CircleX,
} from 'lucide-react';

/**
 * 배포 상태에 따른 아이콘 정보 반환
 * @param {string} status - 배포 상태
 * @param {Object} theme - Emotion theme 객체
 * @returns {Object} { Icon: Component, color: string, size: number }
 */
export const getDeploymentStatusIcon = (status, theme) => {
  const defaultSize = 16;

  switch (status) {
    case 'PLAN_PENDING':
      return {
        Icon: FileText,
        color: theme.colors.brand || '#2563EB',
        size: defaultSize,
      };

    case 'DEPLOYMENT_PENDING':
      return {
        Icon: Calendar,
        color: theme.colors.textPrimary,
        size: defaultSize,
      };

    case 'DEPLOYMENT_IN_PROGRESS':
      return {
        Icon: Loader2,
        color: '#F97316', // 주황색 (orange-500)
        size: defaultSize,
      };

    case 'DEPLOYMENT_SUCCESS':
      return {
        Icon: CircleCheck,
        color: theme.colors.schedule?.successGreen || '#10B981',
        size: defaultSize,
      };

    case 'DEPLOYMENT_FAILURE':
      return {
        Icon: CircleX,
        color: theme.colors.schedule?.restrictedDanger || '#EF4444',
        size: defaultSize,
      };

    default:
      return {
        Icon: Calendar,
        color: theme.colors.textPrimary,
        size: defaultSize,
      };
  }
};

/**
 * 배포 상태에 따른 한국어 라벨 반환
 * @param {string} status - 배포 상태
 * @returns {string} 한국어 라벨
 */
export const getDeploymentStatusLabel = (status) => {
  switch (status) {
    case 'PLAN_PENDING':
      return '작업계획서 승인 대기';

    case 'DEPLOYMENT_PENDING':
      return '배포 대기';

    case 'DEPLOYMENT_IN_PROGRESS':
      return '배포 진행중';

    case 'DEPLOYMENT_SUCCESS':
      return '배포 성공';

    case 'DEPLOYMENT_FAILURE':
      return '배포 실패';

    default:
      return status || '알 수 없음';
  }
};

/**
 * BanType enum 값에 따른 한국어 라벨 반환
 * @param {string} type - BanType enum 값 (DB_MIGRATION, ACCIDENT, MAINTENANCE, EXTERNAL_SCHEDULE)
 * @param {Array<{value: string, label: string}>} banTypesMetadata - 메타데이터 API의 banTypes 배열
 * @returns {string} 한국어 라벨
 */
export const getBanTypeLabel = (type, banTypesMetadata = []) => {
  if (!type || !banTypesMetadata || banTypesMetadata.length === 0) {
    return type || '알 수 없음';
  }

  const banType = banTypesMetadata.find((bt) => bt.value === type);
  return banType?.label || type;
};
