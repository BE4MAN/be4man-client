// 작성자 : 이원석
import axiosInstance from './axios';

/**
 * 일정 관리 관련 API 함수 모음
 */
export const scheduleAPI = {
  /**
   * 일정 관리 메타데이터 조회
   * 프로젝트 목록, 작업 금지 유형, 반복 유형, 요일, 주차 목록을 조회합니다.
   * @returns {Promise<{
   *   projects: Array<{id: number, name: string}>,
   *   restrictedPeriodTypes: Array<{value: string, label: string}>,
   *   recurrenceTypes: Array<{value: string, label: string}>,
   *   recurrenceWeekdays: Array<{value: string, label: string}>,
   *   recurrenceWeeksOfMonth: Array<{value: string, label: string}>
   * }>}
   */
  getScheduleMetadata: async () => {
    const { data } = await axiosInstance.get('/api/schedules/metadata');
    return data;
  },

  /**
   * 작업 금지 기간 생성
   * @param {Object} banData - 작업 금지 기간 데이터
   * @param {string} banData.title - 제목 (필수)
   * @param {string} banData.description - 설명 (필수)
   * @param {string} banData.startDate - 시작일 (YYYY-MM-DD, 필수)
   * @param {string} banData.startTime - 시작시간 (HH:mm, 필수)
   * @param {number} banData.durationMinutes - 금지 시간 (분 단위, 필수)
   * @param {string} banData.type - 작업 금지 유형 (DB_MIGRATION, ACCIDENT, MAINTENANCE, EXTERNAL_SCHEDULE, 필수)
   * @param {number[]} banData.relatedProjectIds - 연관 프로젝트 ID 목록 (필수, 최소 1개 이상)
   * @param {string|null} [banData.recurrenceType] - 반복 유형 (DAILY, WEEKLY, MONTHLY, null)
   * @param {string|null} [banData.recurrenceWeekday] - 반복 요일 (MON, TUE, WED, THU, FRI, SAT, SUN, null)
   * @param {string|null} [banData.recurrenceWeekOfMonth] - 반복 주차 (FIRST, SECOND, THIRD, FOURTH, FIFTH, null)
   * @param {string|null} [banData.recurrenceEndDate] - 반복 종료일 (YYYY-MM-DD, null)
   * @param {string|null} [banData.endedAt] - 종료 일시 (YYYY-MM-DDTHH:mm:ss, 선택, null 권장)
   * @returns {Promise<{
   *   id: string,
   *   title: string,
   *   description: string,
   *   startDate: string,
   *   startTime: string,
   *   endedAt: string,
   *   durationMinutes: number,
   *   type: string,
   *   services: string[],
   *   registrant: string,
   *   registrantDepartment: string,
   *   recurrenceType: string|null,
   *   recurrenceWeekday: string|null,
   *   recurrenceWeekOfMonth: string|null,
   *   recurrenceEndDate: string|null
   * }>}
   */
  createBan: async (banData) => {
    const { data } = await axiosInstance.post('/api/schedules/bans', banData);
    return data;
  },

  /**
   * 배포 작업 목록 조회
   * @param {string} startDate - 시작일 (YYYY-MM-DD, 필수)
   * @param {string} endDate - 종료일 (YYYY-MM-DD, 필수)
   * @returns {Promise<Array<{
   *   id: number,
   *   title: string,
   *   status: string, // DeploymentStatus enum: PENDING, REJECTED, IN_PROGRESS, CANCELED, COMPLETED, APPROVED
   *   stage: string, // DeploymentStage enum: PLAN, DEPLOYMENT, REPORT, RETRY, ROLLBACK, DRAFT
   *   isDeployed: boolean|null, // Jenkins 배포 성공 여부 (null: 배포 전, true: 성공, false: 실패)
   *   projectName: string,
   *   scheduledDate: string,
   *   scheduledTime: string,
   *   registrant: string,
   *   registrantDepartment: string
   * }>>}
   */
  getDeployments: async (startDate, endDate) => {
    const { data } = await axiosInstance.get('/api/schedules/deployments', {
      params: {
        startDate,
        endDate,
      },
    });
    console.log('[Deployment List API] Response:', data);
    console.log('[Deployment List API] Response length:', data?.length || 0);
    if (data && data.length > 0) {
      console.log('[Deployment List API] First item:', data[0]);
    }
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
   * @returns {Promise<Array<{
   *   id: string,
   *   title: string,
   *   description: string,
   *   startDate: string,
   *   startTime: string,
   *   endedAt: string,
   *   durationMinutes: number,
   *   type: string,
   *   services: string[],
   *   registrant: string,
   *   registrantDepartment: string,
   *   recurrenceType: string|null,
   *   recurrenceWeekday: string|null,
   *   recurrenceWeekOfMonth: string|null,
   *   recurrenceEndDate: string|null
   * }>>}
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

  /**
   * Ban 등록 전 충돌 Deployment 조회
   * @param {Object} params - 충돌 확인 파라미터
   * @param {number[]} params.projectIds - 연관 프로젝트 ID 목록 (필수)
   * @param {string} params.startDate - 시작일 (YYYY-MM-DD, 필수)
   * @param {string} params.startTime - 시작시간 (HH:mm, 필수)
   * @param {number} params.durationMinutes - 금지 시간 (분 단위, 필수)
   * @param {string|null} [params.recurrenceType] - 반복 유형 (DAILY, WEEKLY, MONTHLY, null)
   * @param {string|null} [params.recurrenceWeekday] - 반복 요일 (MON, TUE, WED, THU, FRI, SAT, SUN, null)
   * @param {string|null} [params.recurrenceWeekOfMonth] - 반복 주차 (FIRST, SECOND, THIRD, FOURTH, FIFTH, null)
   * @param {string|null} [params.recurrenceEndDate] - 반복 종료일 (YYYY-MM-DD, null)
   * @param {string} params.queryStartDate - 조회 시작일 (YYYY-MM-DD, 필수)
   * @param {string} params.queryEndDate - 조회 종료일 (YYYY-MM-DD, 필수)
   * @returns {Promise<{
   *   conflictingDeployments: Array<{
   *     id: number,
   *     title: string,
   *     relatedProjects: string[],
   *     scheduledAt: string,
   *     scheduledToEndedAt: string|null
   *   }>,
   *   conflictCount: number
   * }>}
   */
  getConflictingDeployments: async (params) => {
    const queryParams = {
      projectIds: params.projectIds,
      startDate: params.startDate,
      startTime: params.startTime,
      durationMinutes: params.durationMinutes,
      queryStartDate: params.queryStartDate,
      queryEndDate: params.queryEndDate,
    };

    if (params.recurrenceType) {
      queryParams.recurrenceType = params.recurrenceType;
    }
    if (params.recurrenceWeekday) {
      queryParams.recurrenceWeekday = params.recurrenceWeekday;
    }
    if (params.recurrenceWeekOfMonth) {
      queryParams.recurrenceWeekOfMonth = params.recurrenceWeekOfMonth;
    }
    if (params.recurrenceEndDate) {
      queryParams.recurrenceEndDate = params.recurrenceEndDate;
    }

    const { data } = await axiosInstance.get('/api/schedules/bans/conflicts', {
      params: queryParams,
    });
    return data;
  },

  /**
   * 작업 금지 기간 취소
   * @param {number|string} banId - 취소할 작업 금지 기간 ID
   * @returns {Promise<void>}
   */
  cancelBan: async (banId) => {
    await axiosInstance.delete(`/api/schedules/bans/${banId}`);
  },
};
