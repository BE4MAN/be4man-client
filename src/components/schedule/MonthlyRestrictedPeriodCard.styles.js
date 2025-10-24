import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.schedule.restrictedBg};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.sm};
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
  align-items: flex-start;
  gap: 0.25rem;
`;

export const BanIcon = styled.svg`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  flex-shrink: 0;
  margin-top: 2px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
