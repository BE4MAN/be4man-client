// src/features/problem/components/ProblemCaseList.styles.jsx
import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 10px;
`;

export const FilterCard = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;

  @media (width <= 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  min-width: 70px;
  flex-shrink: 0;
`;

export const FilterSelectWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

export const SearchRow = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  width: 100%;

  @media (width <= 640px) {
    flex-direction: column;
  }
`;

export const SearchInputWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  font-size: 14px;
`;

export const SearchBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;

export const ResetBtn = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 12px;
`;

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: clip;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
`;

export const Head = styled.thead`
  display: contents;
`;

export const Body = styled.tbody`
  display: contents;
`;

export const Tr = styled.tr`
  cursor: pointer;

  &[data-selected='true'] {
    background: rgb(37 99 235 / 8%);
  }

  &:hover {
    background: rgb(148 163 184 / 12%);
  }
`;

export const Th = styled.th`
  background: ${({ theme }) => (theme.mode === 'dark' ? '#111827' : '#f7f8fa')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: 10px 12px;
  text-align: center;

  & + & {
    border-left: 0.5px solid ${({ theme }) => theme.colors.border};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Td = styled.td`
  padding: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &[data-no-ellipsis] {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
`;

export const Title = styled.span`
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pagination = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing.sm} 4px;
  margin-top: 5px;
`;

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const PageBtns = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const PageBtn = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  font-size: 13px;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-active] {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CustomSelect = styled.div`
  min-width: 140px;
`;
