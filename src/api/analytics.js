import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

/**
 * Deployment failure statistics (used by DeploymentFailureCharts)
 */
export const DEPLOY_FAILURE_STATS = (projectId) =>
  `/api/statistics/${projectId}/deploy-failures/stats`;

export async function getDeploySuccessRate() {
  const { data } = await axiosInstance.get(API_ENDPOINTS.DEPLOY_SUCCESS_RATE);
  return data;
}

export async function getDeployDurationSummary(serviceId = 'all') {
  const params = serviceId ? { service: serviceId } : undefined;
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.DEPLOY_DURATION_SUMMARY,
    { params },
  );
  return data;
}

export async function getDeploymentPeriodStats({ period, projectId } = {}) {
  if (!period) throw new Error('period is required: "month" or "year"');
  const params = { period };
  if (projectId != null && projectId !== 'all') params.projectId = projectId;
  const { data } = await axiosInstance.get(API_ENDPOINTS.DEPLOY_PERIOD_STATS, {
    params,
  });
  return data;
}

export async function getBanTypeStats(projectId = 'all') {
  const params =
    projectId != null && projectId !== 'all' ? { projectId } : undefined;
  const { data } = await axiosInstance.get(API_ENDPOINTS.BAN_TYPE_STATS, {
    params,
  });
  return data;
}

export async function getTimeToNextSuccess({
  projectId = 'all',
  thresholdMins,
} = {}) {
  const params = {};
  if (projectId != null && projectId !== 'all') params.projectId = projectId;
  if (typeof thresholdMins === 'number') params.thresholdMins = thresholdMins;

  const { data } = await axiosInstance.get(API_ENDPOINTS.TIME_TO_NEXT_SUCCESS, {
    params,
  });
  return data;
}

export default {
  DEPLOY_FAILURE_STATS,
  getDeploySuccessRate,
  getDeployDurationSummary,
  getDeploymentPeriodStats,
  getBanTypeStats,
  getTimeToNextSuccess,
};
