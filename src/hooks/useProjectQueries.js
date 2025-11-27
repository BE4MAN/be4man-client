// 작성자 : 김민호
import { useQuery } from '@tanstack/react-query';

import {
  getAllProjects,
  getProjectById,
  getAccountProjectsByAccountId,
} from '../api/projects';

export const PROJECT_QUERY_KEYS = {
  all: ['projects'],
  detail: (id) => ['projects', 'detail', id],
  membershipsByAccount: (accountId) => [
    'projects',
    'membershipsByAccount',
    accountId,
  ],
};

export function useProjectsQuery(options) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.all,
    queryFn: getAllProjects,
    ...options,
  });
}

export function useProjectDetailQuery(id, options) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.detail(id),
    queryFn: () => getProjectById(id),
    enabled: !!id,
    ...options,
  });
}

export function useAccountProjectsByAccountQuery(accountId, options) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.membershipsByAccount(accountId),
    queryFn: () => getAccountProjectsByAccountId(accountId),
    enabled: accountId != null,
    staleTime: 60000,
    ...options,
  });
}
