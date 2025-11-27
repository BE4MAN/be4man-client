// 작성자 : 이원석
import styled from '@emotion/styled';

export const Card = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-left: 25px;
  align-items: flex-start;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  line-height: 1.4;
`;

export const Service = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  text-align: left;
  width: 100%;
`;

export const Time = styled.p`
  color: ${({ theme }) => theme.colors.schedule.deploymentPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  text-align: left;
  width: 100%;
`;
