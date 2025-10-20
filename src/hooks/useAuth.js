import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/api/axios';
import { PATHS } from '@/app/routes/paths';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/stores/authStore';
import { extractErrorInfo, getErrorMessage } from '@/utils/errorHandler';

export const useAuth = () => {
  const navigate = useNavigate();

  // GitHub OAuth 로그인
  const loginWithGithub = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.GITHUB_LOGIN}`;
  };

  // 기존 사용자 로그인
  const signin = async (code) => {
    try {
      // 1. 토큰 발급
      const { data } = await axiosInstance.post(API_ENDPOINTS.SIGNIN, {
        code,
      });

      // 2. 토큰 저장
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

      // 3. 사용자 정보 로드 (signup과 동일)
      await fetchUserInfo();

      // 4. 페이지 이동 (replace: true로 뒤로가기 방지)
      navigate(PATHS.DEPLOY, { replace: true });
    } catch (error) {
      console.error('로그인 실패:', error);

      const errorInfo = extractErrorInfo(error);
      const userMessage = getErrorMessage(errorInfo);
      throw new Error(userMessage);
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

      // 2. 토큰 저장
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

      // 3. 사용자 정보 로드
      await fetchUserInfo();

      // 4. 페이지 이동
      navigate(PATHS.DEPLOY, { replace: true });
    } catch (error) {
      console.error('회원가입 실패:', error);

      const errorInfo = extractErrorInfo(error);
      const userMessage = getErrorMessage(errorInfo);
      throw new Error(userMessage);
    }
  };

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

  const logout = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      useAuthStore.getState().logout();

      if (useAuthStore.persist?.clearStorage) {
        useAuthStore.persist.clearStorage();
      }

      navigate(PATHS.AUTH, { replace: true });
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
