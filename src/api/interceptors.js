// 작성자 : 이원석
import { useAuthStore } from '@/stores/authStore';
import { extractErrorInfo } from '@/utils/errorHandler';

import { authAPI } from './auth';
import { API_ENDPOINTS } from './endpoints';

/**
 * Refresh 시도하면 안 되는 URL 목록
 * 로그인/회원가입 관련 API는 interceptor에서 제외
 */
const NO_RETRY_URLS = [
  API_ENDPOINTS.SIGNIN,
  API_ENDPOINTS.SIGNUP,
  API_ENDPOINTS.REFRESH,
  API_ENDPOINTS.GITHUB_LOGIN,
];

/**
 * Refresh Token 갱신 중복 방지를 위한 전역 변수
 */
let isRefreshing = false;
let failedQueue = [];

/**
 * 대기 중인 요청 큐 처리
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * axios 인스턴스에 인증 인터셉터 설정
 * @param {AxiosInstance} axiosInstance
 */
export const setupAuthInterceptors = (axiosInstance) => {
  /**
   * 요청 인터셉터
   * Access Token을 자동으로 Authorization 헤더에 추가
   */
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.headers.Authorization) {
        return config;
      }

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

      if (NO_RETRY_URLS.includes(originalRequest.url)) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { refreshToken } = useAuthStore.getState();

          if (!refreshToken) {
            throw new Error('사용 가능한 Refresh Token이 없습니다');
          }

          const data = await authAPI.refresh(refreshToken);

          useAuthStore
            .getState()
            .setTokens(data.accessToken, data.refreshToken);

          processQueue(null, data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          const errorInfo = extractErrorInfo(refreshError);
          const isRefreshTokenError =
            errorInfo.code === 'REFRESH_TOKEN_NOT_FOUND' ||
            errorInfo.code === 'INVALID_REFRESH_TOKEN' ||
            errorInfo.code === 'EXPIRED_REFRESH_TOKEN' ||
            errorInfo.code === 'REFRESH_TOKEN_MISMATCH';

          if (isRefreshTokenError) {
            console.error('토큰 갱신 실패:', errorInfo);
            useAuthStore.getState().logout();
            window.location.href = '/auth';
          } else {
            console.error('토큰 갱신 중 예상치 못한 오류:', errorInfo);
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
