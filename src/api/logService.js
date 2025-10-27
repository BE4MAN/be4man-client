// src/api/logService.js
import { API_ENDPOINTS } from '@/config/api';

import axiosInstance from './axios';

export const getLogs = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.LOGS); // '/api/history' 사용
  return response.data.content; // ✅ Page 객체의 content 배열 반환
};
