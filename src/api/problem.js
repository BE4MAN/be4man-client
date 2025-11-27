// 작성자 : 김민호, 이원석
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export async function fetchAllProblemCategories() {
  const res = await axiosInstance.get(API_ENDPOINTS.PROBLEM_CATEGORIES_ALL);
  return res.data;
}

export async function fetchProblemCategory(categoryId) {
  const res = await axiosInstance.get(
    API_ENDPOINTS.PROBLEM_CATEGORY_BY_ID(categoryId),
  );
  return res.data;
}

export async function createProblemCategory(payload) {
  const res = await axiosInstance.post(
    API_ENDPOINTS.PROBLEM_CATEGORIES,
    payload,
  );
  return res.data;
}

export async function fetchAllProblems() {
  const res = await axiosInstance.get(API_ENDPOINTS.PROBLEMS_ALL);
  return res.data;
}

export async function fetchProblem(problemId) {
  const res = await axiosInstance.get(API_ENDPOINTS.PROBLEM_BY_ID(problemId));
  return res.data;
}

export async function createProblem(payload) {
  const res = await axiosInstance.post(API_ENDPOINTS.PROBLEMS, payload);
  return res.data;
}

export async function updateProblem(problemId, payload) {
  await axiosInstance.put(API_ENDPOINTS.PROBLEM_BY_ID(problemId), payload);
}

export async function deleteProblem(problemId) {
  await axiosInstance.delete(API_ENDPOINTS.PROBLEM_BY_ID(problemId));
}

export async function fetchDeployments() {
  const res = await axiosInstance.get(API_ENDPOINTS.DEPLOYMENTS);
  return res.data;
}
