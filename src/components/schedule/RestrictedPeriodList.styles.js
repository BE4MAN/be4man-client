import styled from '@emotion/styled';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const TableHeadOverride = styled.th`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  white-space: nowrap;

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.md};
  `}

  /* 호버 효과 제거 */
  &:hover {
    background: transparent !important;
  }
`;

export const TimeCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.md};
  `}
`;

export const PaginationWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;
