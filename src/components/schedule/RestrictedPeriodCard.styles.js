import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.schedule.restrictedBg};
  border-radius: 0.3125rem;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.schedule.restrictedBorder};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
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

export const BanIcon = styled.svg`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  flex-shrink: 0;
  margin-top: 4px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-left: 20px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const Type = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
`;

export const Time = styled.p`
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
`;
