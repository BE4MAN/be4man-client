// src/api/analytics.js
// Small helper for analytics-related endpoints.
// Add more analytics endpoints or fetch helpers here as needed.

/**
 * Deployment failure statistics (used by DeploymentFailureCharts)
 * Example: /api/projects/{projectId}/deploy-failures/stats?from=2025-01-01&to=2025-02-01
 */
export const DEPLOY_FAILURE_STATS = (projectId) =>
  `/api/projects/${projectId}/deploy-failures/stats`;

export default {
  DEPLOY_FAILURE_STATS,
};
