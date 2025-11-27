// 작성자 : 이원석
import styled from '@emotion/styled';

export const Container = styled.div`
  width: ${({ $collapsed }) => ($collapsed ? '48px' : '240px')};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  background-color: ${({ theme }) => theme.colors.surface};
  flex-shrink: 0;
  overflow: hidden;
`;

export const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CollapseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs};
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactiveHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const TreeContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  min-height: 0;
`;

export const TreeItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.interactiveActive : 'transparent'};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  svg {
    flex-shrink: 0;
    color: ${({ $selected, theme }) =>
      $selected ? theme.colors.brand : theme.colors.textSecondary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactiveHover};
    color: ${({ theme }) => theme.colors.textPrimary};

    svg {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

export const TreeItemText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const TreeItemCount = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  flex-shrink: 0;
`;

export const ChildrenContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ChildItem = styled.button`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactiveHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
