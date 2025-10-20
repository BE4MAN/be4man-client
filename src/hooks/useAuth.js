import { useNavigate } from 'react-router-dom';

import { authAPI } from '@/api/auth';
import { userAPI } from '@/api/user';
import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';
import { extractErrorInfo, getErrorMessage } from '@/utils/errorHandler';

export const useAuth = () => {
  const navigate = useNavigate();

  /**
   * 공통 로그인 후처리 로직
   */
  const postLoginFlow = async (accessToken, refreshToken) => {
    useAuthStore.getState().setTokens(accessToken, refreshToken);

    const userData = await userAPI.fetchUserInfo();
    useAuthStore.getState().setUser(userData);

    navigate(PATHS.DEPLOY, { replace: true });
  };

  /**
   * GitHub OAuth 로그인
   */
  const loginWithGithub = () => {
    authAPI.githubLogin();
  };

  /**
   * 기존 사용자 로그인
   * @param {string} code - GitHub OAuth Authorization Code
   */
  const signin = async (code) => {
    try {
      const data = await authAPI.signin(code);
      await postLoginFlow(data.accessToken, data.refreshToken);
    } catch (error) {
      console.error('로그인 실패:', error);

      const errorInfo = extractErrorInfo(error);
      const userMessage = getErrorMessage(errorInfo);
      throw new Error(userMessage);
    }
  };

  /**
   * 회원가입
   * @param {Object} userData - 사용자 정보 (name, department, position)
   * @param {string} signToken - 임시 회원가입 토큰
   */
  const completeRegistration = async (userData, signToken) => {
    try {
      const data = await authAPI.signup(userData, signToken);
      await postLoginFlow(data.accessToken, data.refreshToken);
    } catch (error) {
      console.error('회원가입 실패:', error);

      const errorInfo = extractErrorInfo(error);
      const userMessage = getErrorMessage(errorInfo);
      throw new Error(userMessage);
    }
  };

  /**
   * 사용자 정보 조회
   * @returns {Promise<Object>} 사용자 정보
   */
  const fetchUserInfo = async () => {
    try {
      return await userAPI.fetchUserInfo();
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    }
  };

  /**
   * 로그아웃
   */
  const logout = async () => {
    try {
      await authAPI.logout();
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
