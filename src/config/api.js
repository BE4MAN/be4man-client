// API Base URLs (환경별 자동 선택)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  GITHUB_LOGIN: '/oauth2/authorization/github',
  OAUTH_CALLBACK: '/oauth/callback/github',
  SIGNUP: '/api/auth/signup',
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',

  // Account
  ME: '/api/accounts/me',
};
