import styled from '@emotion/styled';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
