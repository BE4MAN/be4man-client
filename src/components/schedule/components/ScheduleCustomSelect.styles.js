import styled from '@emotion/styled';
import { ChevronDown } from 'lucide-react';

export const SelectOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  min-width: 80px;
  flex-shrink: 0;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.2rem;
  min-width: 14.0625rem;
`;

export const SelectButton = styled.button`
  width: 100%;
  height: 2.2rem;
  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  color: ${({ $hasValue, theme }) =>
    !$hasValue ? theme.colors.textPrimary : theme.colors.textPrimary};
  padding: 0 2.5rem 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: border-color 0.2s ease;
  outline: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChevronIcon = styled(ChevronDown, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%)
    ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const OptionsPanel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.3125rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs};
  list-style: none;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const SelectAllOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  border-radius: 0.3125rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }

  svg {
    color: ${({ theme }) => theme.colors.brand};
    flex-shrink: 0;
  }
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  border-radius: 0.3125rem;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.interactiveHover : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }

  svg {
    color: ${({ theme }) => theme.colors.brand};
    flex-shrink: 0;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
