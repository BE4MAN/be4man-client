import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

export const getProjectById = (id) =>
  axiosInstance.get(API_ENDPOINTS.PROJECT_BY_ID(id)).then((r) => r.data);

export const getAllProjects = () =>
  axiosInstance.get(API_ENDPOINTS.PROJECTS).then((r) => r.data);

export const getAccountProjectsByAccountId = (accountId) =>
  axiosInstance
    .get(API_ENDPOINTS.PROJECT_MEMBERSHIPS_BY_ACCOUNT(accountId))
    .then((r) => r.data);
