import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

/**
 * 작업(Task) 관련 API 함수 모음
 */
export const taskAPI = {
  /**
   * Jenkins 콘솔 로그 조회
   * @param {number|string} id - 작업 ID
   * @returns {Promise<{deploymentId: number, buildRunId: number, log: string}>}
   */
  fetchConsoleLog: async (id) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.CONSOLE_LOG}/${id}`,
    );
    return data;
  },

  /**
   * 빌드 결과 조회
   * @param {number|string} id - 배포 ID
   * @returns {Promise<{deploymentId: number, isDeployed: boolean, duration: number, startedAt: string, endedAt: string, prNumber: number, prUrl: string}>}
   */
  fetchBuildResult: async (id) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.BUILD_RESULT}/${id}`,
    );
    return data;
  },

  /**
   * 모든 Jenkins stage 정보 조회
   * @param {number|string} id - 배포 ID
   * @returns {Promise<Array<{deploymentId: number, buildRunId: number, stageRunId: number, stageName: string, isSuccess: boolean, orderIndex: number, log: string, problemSummary: string|null, problemSolution: string|null}>>}
   */
  fetchAllStages: async (id) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ALL_STAGES}/${id}/all-stages`,
    );
    return data;
  },
};
