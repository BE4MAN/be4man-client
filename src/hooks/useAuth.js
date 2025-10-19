import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/axios';
import { PATHS } from '@/app/routes/paths';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const navigate = useNavigate();

  // GitHub OAuth 로그인
  const loginWithGithub = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_LOGIN}`;
  };

  // 기존 사용자 로그인
  const signin = async (code) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.SIGNIN, {
        code,
      });

      // authStore에 직접 저장
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

      // Deploy 페이지로 이동 (ProtectedRoute에서 user 로드)
      navigate(PATHS.DEPLOY);
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  // 회원가입
  const completeRegistration = async (userData, signToken) => {
    try {
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

      // authStore에 직접 저장
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

      // 사용자 정보 조회
      await fetchUserInfo();

      // Deploy 페이지로 이동
      navigate(PATHS.DEPLOY);
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  };

  // 사용자 정보 조회
  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.ME);
      useAuthStore.getState().setUser(data);
      return data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      // authStore 직접 클리어
      useAuthStore.getState().logout();
      navigate(PATHS.AUTH);
    }
  };

  return {
    loginWithGithub,
    signin,
    completeRegistration,
    logout,
    fetchUserInfo,
  };
};
