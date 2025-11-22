import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

/**
 * Dashboard 관련 API 함수 모음
 */
export const dashboardAPI = {
  /**
   * 승인 대기 목록 조회
   * 현재 사용자가 승인해야 하는 approval 리스트를 조회합니다.
   * @returns {Promise<{
   *   data: Array<{
   *     id: number,
   *     title: string,
   *     docType: string,
   *     serviceName: string[],
   *     requestedAt: string,
   *     currentApprover: string[],
   *     registrant: string,
   *     registrantDepartment: string,
   *     description?: string,
   *     relatedServices: string[],
   *     status: string,
   *     deployment: {
   *       id: number,
   *       title: string,
   *       status: string,
   *       stage: string,
   *       projectName: string,
   *       scheduledDate?: string|null,
   *       scheduledTime?: string|null,
   *       registrant: string,
   *       registrantDepartment: string,
   *       relatedServices: Array<{
   *         id: number,
   *         name: string,
   *         projectId: number
   *       }>
   *     }
   *   }>
   * }>}
   */
  getPendingApprovals: async () => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD_PENDING_APPROVALS,
    );
    console.log('[Pending Approvals API] Response:', data);
    console.log(
      '[Pending Approvals API] Response length:',
      data?.data?.length || 0,
    );
    if (data?.data && data.data.length > 0) {
      console.log('[Pending Approvals API] First item:', data.data[0]);
    }
    return data;
  },

  /**
   * 진행중인 업무 목록 조회
   * 현재 사용자가 승인한 deployment 중, 진행중인 상태인 항목을 조회합니다.
   * @returns {Promise<{
   *   data: Array<{
   *     id: number,
   *     title: string,
   *     date?: string|null,
   *     scheduledTime?: string|null,
   *     status: string,
   *     stage: string,
   *     isDeployed: boolean|null,
   *     service: string,
   *     registrant: string,
   *     registrantDepartment: string,
   *     description?: string,
   *     relatedServices: string[]
   *   }>
   * }>}
   */
  getInProgressTasks: async () => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD_IN_PROGRESS_TASKS,
    );
    console.log('[In Progress Tasks API] Response:', data);
    console.log(
      '[In Progress Tasks API] Response length:',
      data?.data?.length || 0,
    );
    if (data?.data && data.data.length > 0) {
      console.log('[In Progress Tasks API] First item:', data.data[0]);
    }
    return data;
  },

  /**
   * 알림 목록 조회
   * 현재 사용자와 관련된 "취소" 및 "반려" 알림을 조회합니다.
   * @returns {Promise<{
   *   data: Array<{
   *     id: number,
   *     kind: string,
   *     reason: string,
   *     serviceName: string,
   *     deploymentId: number,
   *     deploymentTitle: string,
   *     canceledAt?: string,
   *     rejectedAt?: string
   *   }>
   * }>}
   */
  getNotifications: async () => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.DASHBOARD_NOTIFICATIONS,
    );
    console.log('[Notifications API] Response:', data);
    console.log(
      '[Notifications API] Response length:',
      data?.data?.length || 0,
    );
    if (data?.data && data.data.length > 0) {
      console.log('[Notifications API] First item:', data.data[0]);
    }
    return data;
  },

  /**
   * 복구현황 목록 조회
   * approval.type = 'ROLLBACK'인 Approval과 연결된 deployment 리스트를 조회합니다.
   * @param {Object} [params] - 페이지네이션 파라미터
   * @param {number} [params.page=1] - 페이지 번호
   * @param {number} [params.pageSize=5] - 페이지당 항목 수
   * @returns {Promise<{
   *   data: Array<{
   *     id: number,
   *     title: string,
   *     service: string,
   *     status: string,
   *     duration: string|null,
   *     recoveredAt: string|null,
   *     registrant: string,
   *     registrantDepartment: string,
   *     deploymentId: number
   *   }>,
   *   pagination: {
   *     total: number,
   *     page: number,
   *     pageSize: number,
   *     totalPages: number
   *   }
   * }>}
   */
  getRecovery: async (params = {}) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.DASHBOARD_RECOVERY, {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 5,
      },
    });
    console.log('[Recovery API] Response:', data);
    console.log('[Recovery API] Response length:', data?.data?.length || 0);
    console.log('[Recovery API] Pagination:', data?.pagination);
    if (data?.data && data.data.length > 0) {
      console.log('[Recovery API] First item:', data.data[0]);
    }
    return data;
  },
};
