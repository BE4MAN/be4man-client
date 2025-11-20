import { useQuery } from '@tanstack/react-query';

import { fetchAccountById } from '@/api/user';

export function useAccountByIdQuery(accountId, options) {
  const { enabled, ...rest } = options || {};

  return useQuery({
    queryKey: ['account', accountId],
    queryFn: () => fetchAccountById(accountId),
    enabled: !!accountId && (enabled ?? true),
    ...rest,
  });
}
