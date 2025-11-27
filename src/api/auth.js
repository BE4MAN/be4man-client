// 작성자 : 이원석
import axios from 'axios';

import axiosInstance from './axios';
import { API_BASE_URL, API_ENDPOINTS } from './endpoints';

/**
 * 인증 관련 API 함수 모음
 */
export const authAPI = {
  /**
   * GitHub OAuth 로그인 페이지로 리다이렉트
   */
  githubLogin: () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_LOGIN}`;
  },

  /**
   * 기존 사용자 로그인 (Authorization Code → Access Token)
   * @param {string} code - GitHub OAuth Authorization Code
   * @returns {Promise<{accessToken: string, refreshToken: string}>}
   */
  signin: async (code) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.SIGNIN, { code });
    return data;
  },

  /**
   * 회원가입 (SignToken + 사용자 정보 → Access Token)
   * @param {Object} userData - 사용자 정보 (name, department, position)
   * @param {string} signToken - 임시 회원가입 토큰
   * @returns {Promise<{accessToken: string, refreshToken: string}>}
   */
  signup: async (userData, signToken) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.SIGNUP,
      {
        name: userData.name,
        department: userData.department,
        position: userData.position,
      },
      {
        headers: {
          Authorization: `Bearer ${signToken}`,
        },
      },
    );
    return data;
  },

  /**
   * Refresh Token으로 Access Token 갱신
   * @param {string} refreshToken
   * @returns {Promise<{accessToken: string, refreshToken: string}>}
   */
  refresh: async (refreshToken) => {
    const { data } = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.REFRESH}`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  },

  /**
   * 로그아웃
   * @returns {Promise<void>}
   */
  logout: async () => {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT);
  },
};
