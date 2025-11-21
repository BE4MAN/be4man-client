// src/api/endpoints.js

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
  APPROVAL_LINE_CANDIDATES: '/api/accounts/approval-line/candidates',

  // Task
  CONSOLE_LOG: '/api/console-log',
  BUILD_RESULT: '/api/build-result',
  ALL_STAGES: '/api/console-log',

  // 🔥 Jenkins 실시간 로그 SSE 엔드포인트
  JENKINS_LOG_STREAM: '/api/jenkins/log-stream',

  // Statistics
  DEPLOY_FAILURE_SERIES: '/api/statistics/deploy-failures/series',
  DEPLOY_SUCCESS_RATE: '/api/statistics/deploy-success-rate',
  DEPLOY_DURATION_SUMMARY: '/api/statistics/deploy-duration',
  DEPLOY_PERIOD_STATS: '/api/statistics/period',
  BAN_TYPE_STATS: '/api/statistics/ban-type',

  TIME_TO_NEXT_SUCCESS: '/api/statistics/follow-up/next-success',

  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id) => `/api/projects/${id}`,
  PROJECT_MEMBERSHIPS_BY_ACCOUNT: (accountId) =>
    `/api/projects/by-account/${accountId}`,

  PULL_REQUESTS: '/api/prs',
  PULL_REQUEST_BY_ID: (id) => `/api/prs/${id}`,

  // ===== Approvals =====
  APPROVALS: '/api/approvals',
  APPROVAL_BY_ID: (id) => `/api/approvals/${id}`,
  APPROVAL_DRAFTS: '/api/approvals/drafts',
  APPROVAL_CREATE_SUBMIT: '/api/approvals/submit',
  APPROVAL_SUBMIT: (id) => `/api/approvals/${id}/submit`,
  APPROVAL_CANCEL: (id) => `/api/approvals/${id}/cancel`,
  APPROVAL_APPROVE: (id) => `/api/approvals/${id}/approve`,
  APPROVAL_REJECT: (id) => `/api/approvals/${id}/reject`,

  PROBLEM_CATEGORIES: '/api/problem-categories',
  PROBLEM_CATEGORY_BY_ID: (id) => `/api/problem-categories/${id}`,
  PROBLEM_CATEGORIES_ALL: '/api/problem-categories/all',

  PROBLEMS: '/api/problems',
  PROBLEM_BY_ID: (id) => `/api/problems/${id}`,
  PROBLEMS_ALL: '/api/problems/all',
  ACCOUNT_BY_ID: (id) => `/api/accounts/${id}`,

  DEPLOYMENTS: '/api/deployments',

  // 배포 상태 조회
  DEPLOYMENT_STATUS: '/api/build-result/deployment-status',
};
