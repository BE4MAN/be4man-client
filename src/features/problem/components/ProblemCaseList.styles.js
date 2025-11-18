import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  gap: 1rem;
`;

export const SearchFilterSection = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  flex-shrink: 0;
`;

export const FiltersPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;

  ${({ theme }) => theme.mqMax.md`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const FiltersLabel = styled.span`
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-right: 10px;
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

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  cursor: pointer;
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.brand};
  }

  ${({ theme }) => theme.mqMax.md`
    width: 100%;
  `}
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  ${({ theme }) => theme.mqMax.md`
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.sm};
  `}
`;

export const SearchLabel = styled.span`
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-right: 26px;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 765px;

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
  font-family: Arial, sans-serif;
  border: 1px solid
    ${({ $focused, theme }) =>
      $focused ? theme.colors.brand : theme.colors.border};
  border-radius: 0.25rem;
  outline: none;
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

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const SearchButton = styled.button`
  height: 2.5rem;
  min-width: 5.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.onPrimary || '#ffffff'};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.9);
  }

  ${({ theme }) => theme.mqMax.md`
    width: 100%;
  `}
`;

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 0;
`;

export const TitleCell = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PaginationWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
`;
