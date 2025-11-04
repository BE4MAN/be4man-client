import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.schedule.restrictedBg};
  border-radius: 0.3125rem;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.schedule.restrictedBorder};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
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
  margin-left: 4px;
  margin-right: 4px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
`;
