import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/axios';
import { PATHS } from '@/app/routes/paths';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setTokens, setUser, logout: storeLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGithub = () => {
    // GitHub OAuth 페이지로 리다이렉트
    // 백엔드가 /oauth2/authorization/github에서 자동으로 GitHub으로 리다이렉트
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_LOGIN}`;
  };

  const completeRegistration = async (userData, signToken) => {
    setIsLoading(true);
    try {
      // 회원가입 API 호출 (Authorization 헤더로 signToken 전달)
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

      // Access Token 저장
      setTokens(data.accessToken);

      // 회원가입 후 계정 정보 조회
      await fetchUserInfo(); // GET /api/accounts/me

      // Deploy 페이지로 이동
      navigate(PATHS.DEPLOY);
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // 로그아웃 API 호출 (Authorization 헤더로 Access Token 전달)
      await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      // 로컬 상태 클리어 (API 실패해도 실행)
      storeLogout();
      navigate(PATHS.AUTH);
    }
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      // /api/accounts/me에서 사용자 정보 가져오기
      const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
      setUser(data);
      return data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginWithGithub,
    completeRegistration,
    logout,
    fetchUserInfo,
    isLoading,
  };
};
