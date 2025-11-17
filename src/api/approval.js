import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

export async function fetchApprovals(accountId, status) {
  const res = await axiosInstance.get(API_ENDPOINTS.APPROVALS, {
    params: { accountId, status: status || undefined },
  });
  return res.data;
}

export async function fetchApprovalDetail(approvalId) {
  const res = await axiosInstance.get(API_ENDPOINTS.APPROVAL_BY_ID(approvalId));
  return res.data;
}

export async function saveApprovalDraft(payload) {
  const res = await axiosInstance.post(API_ENDPOINTS.APPROVAL_DRAFTS, payload);
  return res.data;
}

export function createAndSubmitApproval(payload) {
  return axiosInstance
    .post(API_ENDPOINTS.APPROVAL_CREATE_SUBMIT, payload)
    .then((res) => res.data); // newApprovalId
}

export function submitApproval(approvalId) {
  return axiosInstance.patch(API_ENDPOINTS.APPROVAL_SUBMIT(approvalId));
}

export function cancelApproval(approvalId, body) {
  return axiosInstance.patch(
    API_ENDPOINTS.APPROVAL_CANCEL(approvalId),
    body ?? {},
  );
}

export function approveApproval(approvalId, approverAccountId, comment) {
  return axiosInstance.patch(API_ENDPOINTS.APPROVAL_APPROVE(approvalId), {
    approverAccountId,
    comment: comment || '',
  });
}

export function rejectApproval(approvalId, approverAccountId, comment) {
  return axiosInstance.patch(API_ENDPOINTS.APPROVAL_REJECT(approvalId), {
    approverAccountId,
    comment: comment || '',
  });
}

export function deleteApproval(approvalId) {
  return axiosInstance.delete(API_ENDPOINTS.APPROVAL_BY_ID(approvalId));
}

export function updateApproval(approvalId, payload) {
  return axiosInstance
    .put(API_ENDPOINTS.APPROVAL_BY_ID(approvalId), payload)
    .then((res) => res.data);
}
