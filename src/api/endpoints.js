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

  // Problem
  PROBLEM_CATEGORIES: '/api/problems/categories',
  PROBLEMS: '/api/problems',
  DEPLOYMENTS: '/api/deployments',
};
