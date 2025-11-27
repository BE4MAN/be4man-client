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
  background: ${({ theme }) => theme.colors.schedule.restrictedBg};
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
`;

export const BanIcon = styled.svg`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  flex-shrink: 0;
  position: absolute;
  top: 0;
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
  margin-left: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  text-align: left;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

export const Type = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  text-align: left;
  width: 100%;
`;

export const Time = styled.p`
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  text-align: left;
  width: 100%;
`;
