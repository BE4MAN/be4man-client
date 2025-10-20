import axios from 'axios';

import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';
import { extractErrorInfo } from '@/utils/errorHandler';

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
 * ⭐ Refresh 시도하면 안 되는 URL 목록
 * (로그인/회원가입 관련 API는 interceptor에서 제외)
 */
const NO_RETRY_URLS = [
  API_ENDPOINTS.SIGNIN, // POST /api/auth/signin
  API_ENDPOINTS.SIGNUP, // POST /api/auth/signup
  API_ENDPOINTS.REFRESH, // POST /api/auth/refresh
  API_ENDPOINTS.GITHUB_LOGIN, // GET /oauth2/authorization/github
];

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
 * 응답 인터셉터
 * 401 에러 발생 시 자동으로 토큰 갱신 시도
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ⭐ 1. 로그인/회원가입 관련 API는 interceptor 제외
    if (NO_RETRY_URLS.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    // ⭐ 2. 401 에러 + 재시도 아님
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Refresh 진행 중이면 큐에 추가
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

        // 토큰 갱신 요청 (Body에 refreshToken 전달)
        const { data } = await axios.post(
          `${API_BASE_URL}${API_ENDPOINTS.REFRESH}`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        // 새 Access Token & Refresh Token 저장 (Rotation)
        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

        // 대기 중인 요청들 처리
        processQueue(null, data.accessToken);

        // 원래 요청 재시도 (새 토큰으로)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 대기 중인 요청들 에러 처리
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

export default axiosInstance;
