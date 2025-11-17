import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchApprovals,
  fetchApprovalDetail,
  saveApprovalDraft,
  createAndSubmitApproval,
  submitApproval,
  cancelApproval,
  approveApproval,
  rejectApproval,
  deleteApproval,
  updateApproval,
} from '../api/approval';

export const APPROVAL_QUERY_KEYS = {
  all: ['approvals'],
  list: (accountId, status) => [
    'approvals',
    'list',
    { accountId, status: status || null },
  ],
  detail: (id) => ['approvals', 'detail', id],
};

export function useApprovalsQuery(accountId, status) {
  return useQuery({
    queryKey: APPROVAL_QUERY_KEYS.list(accountId, status),
    queryFn: () => fetchApprovals(accountId, status),
    enabled: !!accountId,
  });
}

export function useApprovalDetailQuery(approvalId) {
  return useQuery({
    queryKey: APPROVAL_QUERY_KEYS.detail(approvalId),
    queryFn: () => fetchApprovalDetail(approvalId),
    enabled: !!approvalId,
  });
}

export function useSaveDraftApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => saveApprovalDraft(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
    },
  });
}

export function useCreateAndSubmitApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createAndSubmitApproval(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
    },
  });
}

export function useSubmitApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ approvalId }) => submitApproval(approvalId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: APPROVAL_QUERY_KEYS.detail(variables.approvalId),
      });
    },
  });
}

/** 상신 취소 */
export function useCancelApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    // body는 옵션 (서버가 null 허용)
    mutationFn: ({ approvalId, body }) => cancelApproval(approvalId, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: APPROVAL_QUERY_KEYS.detail(variables.approvalId),
      });
    },
  });
}

export function useApproveApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ approvalId, approverAccountId, comment }) =>
      approveApproval(approvalId, approverAccountId, comment),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: APPROVAL_QUERY_KEYS.detail(variables.approvalId),
      });
    },
  });
}

export function useRejectApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ approvalId, approverAccountId, comment }) =>
      rejectApproval(approvalId, approverAccountId, comment),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: APPROVAL_QUERY_KEYS.detail(variables.approvalId),
      });
    },
  });
}

export function useDeleteApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ approvalId }) => deleteApproval(approvalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
    },
  });
}

export function useUpdateApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ approvalId, payload }) =>
      updateApproval(approvalId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: APPROVAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: APPROVAL_QUERY_KEYS.detail(variables.approvalId),
      });
    },
  });
}
