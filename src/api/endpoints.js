// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  GITHUB_LOGIN: '/oauth2/authorization/github',
  SIGNIN: '/api/auth/signin',
  SIGNUP: '/api/auth/signup',
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',

  // Account
  ME: '/api/accounts/me',

  // Task
  CONSOLE_LOG: '/api/console-log',
  BUILD_RESULT: '/api/build-result',
  ALL_STAGES: '/api/console-log',

  // Statistics
  DEPLOY_SUCCESS_RATE: '/api/statistics/deploy-success-rate',
  DEPLOY_DURATION_SUMMARY: '/api/statistics/deploy-duration',
  DEPLOY_PERIOD_STATS: '/api/statistics/period',
};
