import axios from 'axios';

import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';

/**
 * 토큰 자동 주입 기능이 포함된 axios 인스턴스
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

/**
 * 요청 인터셉터
 * Access Token을 자동으로 Authorization 헤더에 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Authorization 헤더가 이미 설정되어 있으면 건너뛰기 (Signup API 등)
    if (config.headers.Authorization) {
      return config;
    }

    // accessToken이 있으면 자동으로 추가
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 응답 인터셉터
 * 401 에러 발생 시 자동으로 토큰 갱신 시도
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 + 재시도 아님 + Refresh API 호출 아님
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.REFRESH
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) {
          throw new Error('사용 가능한 Access Token이 없습니다');
        }

        // 토큰 갱신 요청 (Authorization 헤더에 만료된 Access Token 전달)
        const { data } = await axios.post(
          `${API_BASE_URL}${API_ENDPOINTS.REFRESH}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        // 새 Access Token 저장
        useAuthStore.getState().setTokens(data.accessToken);

        // 계정 정보는 ProtectedRoute에서 필요 시 로드됨
        // Refresh는 토큰만 갱신 (네트워크 효율성)

        // 원래 요청 재시도 (새 토큰으로)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 → 로그아웃 처리
        console.error('토큰 갱신 실패:', refreshError);
        useAuthStore.getState().logout();
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
