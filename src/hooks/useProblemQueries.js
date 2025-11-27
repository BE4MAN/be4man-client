// 작성자 : 김민호
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import * as problemAPI from '@/api/problem';

export function useAllProblemCategoriesQuery() {
  return useQuery({
    queryKey: ['problemCategories', 'all'],
    queryFn: problemAPI.fetchAllProblemCategories,
  });
}

export function useProblemCategoryQuery(categoryId, options) {
  return useQuery({
    queryKey: ['problemCategories', categoryId],
    queryFn: () => problemAPI.fetchProblemCategory(categoryId),
    enabled: !!categoryId && (options?.enabled ?? true),
  });
}

export function useAllProblemsQuery() {
  return useQuery({
    queryKey: ['problems', 'all'],
    queryFn: problemAPI.fetchAllProblems,
  });
}

export function useProblemQuery(problemId, options) {
  return useQuery({
    queryKey: ['problems', problemId],
    queryFn: () => problemAPI.fetchProblem(problemId),
    enabled: !!problemId && (options?.enabled ?? true),
  });
}

export function useCreateProblemCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: problemAPI.createProblemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problemCategories'] });
    },
  });
}

export function useCreateProblemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: problemAPI.createProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    },
  });
}

export function useUpdateProblemMutation(problemId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => problemAPI.updateProblem(problemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
      queryClient.invalidateQueries({ queryKey: ['problems', problemId] });
    },
  });
}

export function useDeleteProblemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: problemAPI.deleteProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    },
  });
}

export function useDeploymentsQuery() {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: problemAPI.fetchDeployments,
  });
}
