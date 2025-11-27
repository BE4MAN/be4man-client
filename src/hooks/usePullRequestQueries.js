// 작성자 : 김민호
import { useQuery } from '@tanstack/react-query';

import {
  getMyPullRequestsByGithubId,
  getPullRequestById,
} from '@/api/pullRequests.js';

export const PR_QUERY_KEYS = {
  mineByGithubId: (githubId) => ['prs', 'mine', { githubId }],
  detail: (id) => ['prs', 'detail', id],
};

export function useMyPullRequestsQueryByGithubId(githubId, options) {
  const enabled =
    githubId !== undefined && githubId !== null && String(githubId).length > 0;

  return useQuery({
    queryKey: PR_QUERY_KEYS.mineByGithubId(githubId),
    queryFn: () => getMyPullRequestsByGithubId(githubId),
    enabled,
    staleTime: 60000,
    ...options,
  });
}

export function usePullRequestDetailQuery(id, options) {
  return useQuery({
    queryKey: PR_QUERY_KEYS.detail(id),
    queryFn: () => getPullRequestById(id),
    enabled: !!id,
    ...options,
  });
}
