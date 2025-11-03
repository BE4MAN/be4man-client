import styled from '@emotion/styled';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  position: relative;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? '#2a2a2a' : '#f8f9fa'};
`;

export const TableBody = styled.tbody`
  & > tr:last-child {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
  `}

  /* thead 내부 tr은 hover 효과 없음 */
  thead & {
    &:hover {
      background: transparent !important;
    }
  }

  /* tbody 내부 tr만 hover 효과 */
  tbody & {
    &:hover {
      background: ${({ theme }) => theme.colors.interactiveHover};
    }
  }
`;

export const TableHead = styled.th`
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
    background-color: transparent !important;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.md};
  `}
`;
