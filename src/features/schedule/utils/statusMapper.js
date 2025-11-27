// 작성자 : 이원석
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
        color: theme.colors.brand || '#0066cc',
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
 * @param {string} status - 배포 상태 (Enum 값 또는 영어 문자열)
 * @returns {string} 한국어 라벨 또는 '—' (PENDING인 경우)
 */
export const getDeploymentStatusLabel = (status) => {
  if (!status) return '—';

  // Enum 값 처리
  switch (status) {
    case 'PLAN_PENDING':
      return '작업계획서 승인 대기';

    case 'DEPLOYMENT_PENDING':
    case 'PENDING':
    case 'pending':
      return '—';

    case 'DEPLOYMENT_IN_PROGRESS':
      return '배포 진행중';

    case 'DEPLOYMENT_SUCCESS':
    case 'SUCCESS':
    case 'success':
      return '성공';

    case 'DEPLOYMENT_FAILURE':
    case 'FAILURE':
    case 'FAILED':
    case 'failed':
      return '실패';

    // 소문자 또는 다른 형식도 처리
    case 'scheduled':
    case 'SCHEDULED':
      return '—';

    default:
      // 이미 한국어인 경우 그대로 반환
      if (
        status === '대기' ||
        status === '진행중' ||
        status === '완료' ||
        status === '실패' ||
        status === '예정' ||
        status === '성공'
      ) {
        return status;
      }
      // 알 수 없는 상태는 그대로 반환 (PENDING일 가능성)
      return '—';
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
