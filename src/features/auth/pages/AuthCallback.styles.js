// 작성자 : 이원석
import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Content = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-width: 400px;
  width: 90%;

  ${({ theme }) => theme.mq.md`
    padding: calc(${theme.spacing.lg} * 2);
  `}
`;

export const ErrorIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;

  ${({ theme }) => theme.mq.md`
    font-size: ${theme.typography.fontSize['2xl']};
  `}
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;

  ${({ theme }) => theme.mq.md`
    font-size: ${theme.typography.fontSize.lg};
  `}
`;

export const SubMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
  opacity: 0.8;
`;

export const ErrorDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
`;

export const ErrorCode = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ErrorPath = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ErrorTime = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
