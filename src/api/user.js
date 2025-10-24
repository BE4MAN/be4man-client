import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

/**
 * 사용자 관련 API 함수 모음
 */
export const userAPI = {
  /**
   * 현재 사용자 정보 조회
   * @returns {Promise<Object>} 사용자 정보
   */
  fetchUserInfo: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
    return data;
  },
};
