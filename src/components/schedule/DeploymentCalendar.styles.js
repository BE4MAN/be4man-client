import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const NavigationBar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.1875rem;
  padding: 0.375rem 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  width: 20%;
  min-width: fit-content;
`;

export const MonthTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin: 0;
  text-align: left;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;

  button {
    height: 28px;
    width: 28px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.interactiveHover};
    }
  }
`;

export const CalendarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.1875rem;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DayNamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const DayName = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: 0;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

export const EmptyCell = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 64px;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const DayCell = styled.div`
  background: ${({ isToday, theme }) =>
    isToday ? theme.colors.schedule.cellToday : theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm};
  transition: background-color 0.2s ease;
`;

export const DayNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ isToday, theme }) =>
    isToday ? theme.colors.textPrimary : theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
