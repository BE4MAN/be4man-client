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
`;

export const SelectButton = styled.button`
  width: 100%;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  color: ${({ $hasValue, theme }) =>
    !$hasValue ? 'rgb(107 114 128 / 40%)' : theme.colors.textPrimary};
  padding: 0 2.5rem 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: border-color 0.2s ease;
  outline: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.brand};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          height: 1.875rem;
          padding: 0 2rem 0 ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return `
          height: 2.8125rem;
          padding: 0 2.5rem 0 ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
        `;
    }
  }}
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

export const OptionsPanel = styled.ul`
  position: absolute;
  z-index: 99999;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 180px;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 0;
  margin: 0;
  list-style: none;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.brand : theme.colors.textPrimary};
  font-weight: ${({ theme, $selected }) =>
    $selected
      ? theme.typography.fontWeight.medium
      : theme.typography.fontWeight.normal};
  background-color: ${({ theme, $active, $selected }) => {
    if ($selected && $active) return theme.colors.interactiveActive;
    if ($selected) return `${theme.colors.brand}08`;
    if ($active) return theme.colors.interactiveHover;
    return 'transparent';
  }};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  svg {
    color: ${({ theme }) => theme.colors.brand};
    flex-shrink: 0;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-left: 96px;
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-left: 96px;
`;
