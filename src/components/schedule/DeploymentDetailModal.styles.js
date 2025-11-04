import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  /* Badge가 전체 너비를 차지하지 않도록 */
  & > span {
    align-self: flex-start;
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Value = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    ${({ status, theme }) => {
      switch (status) {
        case 'scheduled':
          return `color: ${theme.colors.textPrimary};`;
        case 'success':
          return `color: ${theme.colors.schedule.successGreen};`;
        case 'failed':
          return `color: ${theme.colors.schedule.restrictedDanger};`;
        default:
          return `color: ${theme.colors.textPrimary};`;
      }
    }}
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;
