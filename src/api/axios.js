import axios from 'axios';

import { API_BASE_URL } from '@/config/api';

import { setupAuthInterceptors } from './interceptors';

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

// 인증 인터셉터 설정
setupAuthInterceptors(axiosInstance);

export default axiosInstance;
