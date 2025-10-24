import styled from '@emotion/styled';

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PaginationContent = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PaginationItem = styled.li`
  display: flex;
  align-items: center;
`;

export const PaginationLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.brand : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? 'white' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.brand : theme.colors.interactiveHover};
    color: ${({ isActive, theme }) =>
      isActive ? 'white' : theme.colors.textPrimary};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgb(37 99 235 / 20%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  svg {
    width: 16px;
    height: 16px;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgb(37 99 235 / 20%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.interactiveHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  ${({ theme }) => theme.mq.md`
    padding: 0 ${theme.spacing.md};
  `}
`;

export const PaginationText = styled.span`
  display: none;

  ${({ theme }) => theme.mq.md`
    display: inline;
  `}
`;
