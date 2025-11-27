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
  align-items: flex-start;
  gap: 0.25rem;
  position: relative;
`;

export const BanIcon = styled.svg`
  width: 14px;
  height: 14px;
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 4px;
  position: absolute;
  top: 0;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
  margin-left: 22px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
  text-align: left;
`;
