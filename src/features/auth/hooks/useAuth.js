import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/axios';
import { PATHS } from '@/app/routes/paths';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { POSITION_MAP } from '@/constants/accounts';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setTokens, logout: storeLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGithub = () => {
    // GitHub OAuth 페이지로 리다이렉트
    // Backend가 /oauth2/authorization/github에서 자동으로 GitHub으로 리다이렉트
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_LOGIN}`;
  };

  const completeRegistration = async (userData, signToken) => {
    setIsLoading(true);
    try {
      // Position 한글 → 영문 변환
      const mappedPosition =
        POSITION_MAP[userData.position] || userData.position;

      // 회원가입 API 호출
      const { data } = await axiosInstance.post(API_ENDPOINTS.SIGNUP, {
        signToken,
        email: userData.email,
        name: userData.name,
        position: mappedPosition,
        department: userData.department,
      });

      // 토큰 저장 (authStore가 자동으로 user 정보 추출)
      setTokens(data.accessToken, data.refreshToken);

      // Deploy 페이지로 리다이렉트
      navigate(PATHS.DEPLOY);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { refreshToken } = useAuthStore.getState();

      if (refreshToken) {
        // 백엔드에 로그아웃 요청
        await axiosInstance.post(API_ENDPOINTS.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      // 로컬 상태 클리어 (API 실패해도 실행)
      storeLogout();
      navigate(PATHS.AUTH);
    }
  };

  return {
    loginWithGithub,
    completeRegistration,
    logout,
    isLoading,
  };
};
