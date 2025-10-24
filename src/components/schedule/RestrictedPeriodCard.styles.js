import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.schedule.restrictedBg};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.schedule.restrictedBorder};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    box-shadow: ${({ theme }) => theme.colors.schedule.restrictedHover} 0 4px
      12px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BanIcon = styled.svg`
  width: 8px;
  height: 8px;
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  flex-shrink: 0;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const Type = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
`;

export const Time = styled.p`
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
`;
