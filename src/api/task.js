// src/api/task.js
import axiosInstance from './axios';
import { API_BASE_URL, API_ENDPOINTS } from './endpoints';

/**
 * 작업(Task) 관련 API 함수 모음
 */
export const taskAPI = {
  /**
   * Jenkins 콘솔 로그 조회 (변경): 배포ID와 빌드번호를 함께 전달
   * @param {number|string} deploymentId - 배포 ID
   * @param {number|string} buildRunId - 빌드 실행(빌드) 번호
   * @returns {Promise<{deploymentId: number, buildRunId: number, log: string}>}
   */
  fetchConsoleLog: async (deploymentId, buildRunId) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.CONSOLE_LOG}/${deploymentId}/${buildRunId}`,
    );
    return data;
  },

  /**
   * 빌드 결과 조회
   * @param {number|string} id - 배포 ID
   * @param {number|string} [buildRunId] - 빌드 실행 ID (선택)
   * @returns {Promise|Array}
   */
  fetchBuildResult: async (id, buildRunId) => {
    // If buildRunId is provided, call /api/build-result/{id}/{buildRunId}
    const target = buildRunId ? `${id}/${buildRunId}` : `${id}`;
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.BUILD_RESULT}/${target}`,
    );
    return data;
  },

  /**
   * 모든 Jenkins stage 정보 조회
   * @param {number|string} buildRunId - 빌드 실행 ID
   * @returns {Promise<Array<{deploymentId: number, buildRunId: number, stageRunId: number, stageName: string, isSuccess: boolean, orderIndex: number, log: string, problemSummary: string|null, problemSolution: string|null}>>}
   */
  fetchAllStages: async (buildRunId) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ALL_STAGES}/${buildRunId}/all-stages`,
    );
    return data;
  },

  /**
   * 배포 상태 조회 (DEPLOYMENT / IN_PROGRESS 여부 확인)
   * @param {number|string} deploymentId
   */
  async fetchDeploymentStatus(deploymentId) {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.DEPLOYMENT_STATUS}/${deploymentId}`,
    );
    return data;
  },

  /**
   * Jenkins 실시간 로그 SSE URL 생성
   * (EventSource에서 사용, axios 아님)
   * @param {number|string} deploymentId
   * @returns {string} SSE 접속 URL
   */
  getJenkinsLogStreamUrl(deploymentId) {
    // API_BASE_URL이 이미 VITE_API_BASE_URL로 설정되어 있음
    return `${API_BASE_URL}${API_ENDPOINTS.JENKINS_LOG_STREAM}?deploymentId=${deploymentId}`;
  },
};
