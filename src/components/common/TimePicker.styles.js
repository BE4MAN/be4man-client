import styled from '@emotion/styled';
import { Clock, ChevronDown } from 'lucide-react';

const ITEM_HEIGHT = 34;
const COLUMN_HEIGHT = 169;
const PADDING_HEIGHT = ITEM_HEIGHT; // 1 items height

export const TimePickerContainer = styled.div`
  position: relative;
  width: 50%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ClockIcon = styled(Clock)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
  pointer-events: none;
  z-index: 1;
`;

export const TimePickerInput = styled.input`
  width: 100%;
  height: 2.2rem;
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.textPrimary : theme.colors.textSecondary};
  padding: 0 2.5rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: border-color 0.2s ease;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-align: left;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChevronButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChevronIcon = styled(ChevronDown)`
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

export const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
`;

export const PickerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  align-items: center;
`;

export const ColumnContainer = styled.div`
  position: relative;
  height: ${COLUMN_HEIGHT}px;
  width: 64px;
  overflow: hidden;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
`;

export const TopGradient = styled.div`
  height: ${PADDING_HEIGHT + 34}px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surface}00 100%
  );
`;

export const SelectionIndicator = styled.div`
  height: ${ITEM_HEIGHT}px;
  border-top: 2px solid ${({ theme }) => theme.colors.brand}33;
  border-bottom: 2px solid ${({ theme }) => theme.colors.brand}33;
`;

export const BottomGradient = styled.div`
  height: ${PADDING_HEIGHT - 34}px;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surface}00 100%
  );
`;

export const ScrollColumn = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  scroll-snap-type: y proximity;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PaddingSpacer = styled.div`
  height: ${PADDING_HEIGHT}px;
  flex-shrink: 0;
`;

export const ColumnItem = styled.div`
  height: ${ITEM_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  scroll-snap-align: start;
  flex-shrink: 0;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.brand : theme.colors.textSecondary};
  transform: ${({ $selected }) => ($selected ? 'scale(1.1)' : 'scale(1)')};
  font-weight: ${({ $selected, theme }) =>
    $selected
      ? theme.typography.fontWeight.semibold
      : theme.typography.fontWeight.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ColumnSeparator = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex-shrink: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ConfirmButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.brand};
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.brand}dd;
  }
`;

export const CancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.brand};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactiveHover};
  }
`;
