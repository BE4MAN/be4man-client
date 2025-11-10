import axiosInstance from './axios';

/**
 * 일정 관리 관련 API 함수 모음
 */
export const scheduleAPI = {
  /**
   * 일정 관리 메타데이터 조회
   * 프로젝트 목록과 작업 금지 유형 목록을 조회합니다.
   * @returns {Promise<{projects: Array<{id: number, name: string}>, banTypes: Array<{value: string, label: string}>}>}
   */
  getScheduleMetadata: async () => {
    const { data } = await axiosInstance.get('/api/schedules/metadata');
    return data;
  },

  /**
   * 작업 금지 기간 생성
   * @param {Object} banData - 작업 금지 기간 데이터
   * @param {string} banData.title - 제목 (필수)
   * @param {string} [banData.description] - 설명 (선택)
   * @param {string} banData.startDate - 시작일 (YYYY-MM-DD, 필수)
   * @param {string} banData.startTime - 시작시간 (HH:mm, 필수)
   * @param {string} [banData.endedAt] - 종료 일시 (YYYY-MM-DDTHH:mm, 선택)
   * @param {number} banData.duration - 금지 시간 (시간 단위, 필수)
   * @param {string} banData.type - 작업 금지 유형 (DB_MIGRATION, ACCIDENT, MAINTENANCE, EXTERNAL_SCHEDULE, 필수)
   * @param {number[]} banData.relatedProjectIds - 연관 프로젝트 ID 목록 (필수, 최소 1개 이상)
   * @returns {Promise<{id: string, title: string, description: string|null, startDate: string, startTime: string, endedAt: string, duration: number, type: string, relatedProjects: string[]}>}
   */
  createBan: async (banData) => {
    const { data } = await axiosInstance.post('/api/schedules/bans', banData);
    return data;
  },

  /**
   * 배포 작업 목록 조회
   * @param {string} startDate - 시작일 (YYYY-MM-DD, 필수)
   * @param {string} endDate - 종료일 (YYYY-MM-DD, 필수)
   * @returns {Promise<Array<{id: number, title: string, status: string, projectName: string, prTitle: string, prBranch: string, scheduledDate: string, scheduledTime: string}>>}
   */
  getDeployments: async (startDate, endDate) => {
    const { data } = await axiosInstance.get('/api/schedules/deployments', {
      params: {
        startDate,
        endDate,
      },
    });
    return data;
  },

  /**
   * 작업 금지 기간 목록 조회
   * @param {Object} [filters] - 필터 조건 (모두 선택사항)
   * @param {string} [filters.query] - 검색어 (제목 또는 설명에 포함)
   * @param {string} [filters.startDate] - 시작일 필터 (YYYY-MM-DD)
   * @param {string} [filters.endDate] - 종료일 필터 (YYYY-MM-DD)
   * @param {string} [filters.type] - 작업 금지 유형 필터 (DB_MIGRATION, ACCIDENT, MAINTENANCE, EXTERNAL_SCHEDULE)
   * @param {number[]} [filters.projectIds] - 프로젝트 ID 목록
   * @returns {Promise<Array<{id: string, title: string, description: string|null, startDate: string, startTime: string, endedAt: string, duration: number, type: string, relatedProjects: string[]}>>}
   */
  getBans: async (filters = {}) => {
    const params = {};

    if (filters.query) {
      params.query = filters.query;
    }

    if (filters.startDate) {
      params.startDate = filters.startDate;
    }

    if (filters.endDate) {
      params.endDate = filters.endDate;
    }

    if (filters.type) {
      params.type = filters.type;
    }

    // projectIds 배열을 여러 번 반복하여 전달 (axios는 배열을 자동으로 projectIds=1&projectIds=2 형태로 변환)
    if (filters.projectIds && filters.projectIds.length > 0) {
      params.projectIds = filters.projectIds;
    }

    const { data } = await axiosInstance.get('/api/schedules/bans', {
      params,
    });
    return data;
  },
};
