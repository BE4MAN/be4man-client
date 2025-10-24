import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const MainContent = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DateTimeSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

export const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;
