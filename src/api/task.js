import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

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
   * @returns {Promise<{deploymentId: number, isDeployed: boolean, duration: number, startedAt: string, endedAt: string, prNumber: number, prUrl: string}>}
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
   * @param {number|string} id - 배포 ID
   * @returns {Promise<Array<{deploymentId: number, buildRunId: number, stageRunId: number, stageName: string, isSuccess: boolean, orderIndex: number, log: string, problemSummary: string|null, problemSolution: string|null}>>}
   */
  fetchAllStages: async (buildRunId) => {
    // If buildRunId is provided, use it in the URL (new API expects buildRunId in path)
    const target = buildRunId;
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ALL_STAGES}/${target}/all-stages`,
    );
    return data;
  },
};
