import styled from '@emotion/styled';

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  padding: 0.5rem ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ $removeBottomPadding, theme }) =>
    $removeBottomPadding ? 0 : theme.spacing.md};

  ${({ theme, $removeBottomPadding }) => theme.mq.md`
    padding: 0.75rem ${theme.spacing.lg};
    padding-bottom: ${$removeBottomPadding ? 0 : theme.spacing.lg};
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

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4537rem;
  height: 2.2687rem;
  padding: 0 0.5rem;
  border-radius: 0.3125rem;
  font-size: 0.7936rem;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  svg {
    width: 0.9075rem;
    height: 0.9075rem;
  }

  span {
    display: none;

    ${({ theme }) => theme.mq.md`
      display: inline;
    `}
  }

  ${({ theme }) => theme.mq.md`
    padding: 0 0.75rem;
  `}
`;

export const ViewButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.surface : 'transparent'};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  font-weight: ${({ isActive, theme }) =>
    isActive
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
`;

export const AddButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.schedule.restrictedDanger};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.schedule.restrictedDanger};
    color: white;
  }
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

export const SearchFilterSection = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
`;

export const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px;
  font-size: 14px;
  border: 1px solid
    ${({ $focused, theme }) =>
      $focused ? theme.colors.brand : theme.colors.border};
  border-radius: 0.25rem;
  outline: none;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.brand};
  }
`;

export const FiltersPanel = styled.div`
  margin-top: 16px;
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

export const FilterRowItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 2.2rem;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.brand};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.interactiveActive};
  }
`;

export const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ServiceSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SelectWrapper = styled.div`
  min-width: 14.0625rem;
  width: auto;
  height: 2.2rem;
  display: flex;
  align-items: center;

  & > div {
    width: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
