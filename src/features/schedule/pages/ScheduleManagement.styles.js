import styled from '@emotion/styled';

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.lg};
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ViewButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  ${({ theme }) => theme.mq.md`
    gap: ${theme.spacing.md};
  `}
`;

export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.schedule.deploymentPrimary : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? 'white' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    display: none;

    ${({ theme }) => theme.mq.md`
      display: inline;
    `}
  }

  &:hover {
    background: ${({ isActive, theme }) =>
      isActive
        ? theme.colors.schedule.deploymentPrimary
        : theme.colors.surface};
    color: ${({ isActive, theme }) =>
      isActive ? 'white' : theme.colors.textPrimary};
    opacity: ${({ isActive }) => (isActive ? 0.9 : 1)};
  }

  ${({ theme }) => theme.mq.md`
    padding: 0 ${theme.spacing.lg};
  `}
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    display: none;

    ${({ theme }) => theme.mq.md`
      display: inline;
    `}
  }

  &:hover {
    opacity: 0.9;
  }

  ${({ theme }) => theme.mq.md`
    padding: 0 ${theme.spacing.lg};
  `}
`;

export const Content = styled.div`
  width: 100%;
`;

export const ListContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const FilterBar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    flex-direction: row;
    align-items: center;
  `}
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;

  .search-icon {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }

  input {
    padding-left: 2.5rem;
    background: ${({ theme }) => theme.colors.inputBg};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPrimary};
    height: 40px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const SelectWrapper = styled.div`
  width: 200px;
  flex-shrink: 0;

  & > div {
    width: 100%;
  }

  button {
    width: 100%;
  }
`;
