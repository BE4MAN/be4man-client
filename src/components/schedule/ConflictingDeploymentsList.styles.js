import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TableWrapper = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 0.3125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const WarningMessage = styled.div`
  color: ${({ theme }) => theme.colors.schedule?.restrictedDanger || '#EF4444'};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

export const ServiceTagWrapper = styled.div`
  display: flex;
  align-items: center;
`;
