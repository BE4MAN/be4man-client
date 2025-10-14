import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

const R = (t, key = 'md', def = 8) =>
  (typeof t?.radius === 'number' ? t.radius : t?.radius?.[key]) ?? def;

export const Bar = styled.header`
  grid-area: header;
  height: 72px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: saturate(180%) blur(8px);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Logo = styled.img`
  display: block;
  width: 120px;
  height: 60px;
  cursor: pointer;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`;

export const BrandLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => theme.mqMax.sm`
    display: none;
  `}
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  justify-self: end;
  min-width: 0;

  ${({ theme }) => theme.mqMax.md`
    gap: 6px;
  `}
`;

export const DesktopOnly = styled.div`
  ${({ theme }) => theme.mqMax.md`
    display: none;
  `}
`;

export const SelectWrap = styled.div`
  position: relative;
`;

export const SelectButton = styled.button`
  position: relative;
  height: 32px;
  padding: 0 28px 0 12px;
  font-size: 0.9375rem;
  border-radius: ${(p) => R(p.theme, 'md', 10)}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  width: max-content;
  cursor: pointer;
  transition: none !important;
  -webkit-tap-highlight-color: transparent;
  appearance: none;

  &:focus,
  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%)
      rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid currentcolor;
  }
`;

export const SelectList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: max-content;
  min-width: 100%;
  max-height: 280px;
  margin: 0;
  padding: 6px;
  list-style: none;
  overflow: auto;
  z-index: 40;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${(p) => R(p.theme, 'md', 10)}px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.skeletonBase};
    border-radius: 10px;
  }
`;

export const SelectOption = styled.li`
  padding: 8px 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  user-select: none;

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.brand};
    background: rgb(100 150 255 / 12%);
  }

  &:hover,
  &[data-active='true'] {
    color: ${({ theme }) => theme.colors.text};
    background: rgb(100 150 255 / 8%);
  }
`;

export const User = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 220px;

  ${({ theme }) => theme.mqMax.md`
    max-width: 160px;
  `}
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: block;
`;

export const NameTitle = styled.div`
  display: grid;
  gap: 2px;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.9;
  }

  ${({ theme }) => theme.mqMax.sm`
     display: none;
   `}
`;

export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;
`;

export const ToggleLabel = styled.span`
  font-size: 11px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textSecondary};
  user-select: none;
  white-space: nowrap;
  opacity: 0.9;
`;

export const ModeToggle = styled.button`
  --h: 30px;
  --b: 1px;
  --gap: 2px;
  --k: calc(var(--h) - 2 * var(--b) - 2 * var(--gap));

  position: relative;
  width: 64px;
  height: var(--h);
  border-radius: 999px;
  border: var(--b) solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  background: ${({ theme, isDark }) =>
    isDark ? theme.colors.surface : theme.colors.textPrimary};
  transition: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: ${({ $displayOnly }) => ($displayOnly ? 'none' : 'auto')};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ isDark }) =>
      isDark ? 'var(--b)' : 'calc(100% - var(--b) - var(--k))'};
    width: var(--k);
    height: var(--k);
    border-radius: 50%;
    background: ${({ theme, isDark }) =>
      isDark ? theme.colors.textPrimary : theme.colors.bg};
    box-shadow:
      0 1px 2px rgb(0 0 0 / 16%),
      inset 0 0 0 1px rgb(0 0 0 / 12%);
    transition: left 0.25s ease;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  ${({ theme }) => theme.mqMax.md`
    --h: 28px;
    width: 56px;
  `}
`;

export const BurgerBtn = styled.button`
  position: relative;
  width: 40px;
  height: 32px;
  border: none;
  background: transparent;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  span,
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 2px;
    background: ${({ theme }) => theme.colors.textPrimary};
    border-radius: 2px;
    left: 50%;
    transform: translateX(-50%);
  }

  span {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    top: 10px;
  }

  &::after {
    bottom: 10px;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  ${({ theme }) => theme.mqMax.md`
     display: inline-flex;
   `}
`;

export const SheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 35%);
  z-index: 1990;
`;

export const Sheet = styled.aside`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(88vw, 360px);
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  animation: slide-in 0.18s ease both;
  will-change: transform;

  @keyframes slide-in {
    from {
      transform: translateX(102%);
      opacity: 0.8;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  strong {
    font-size: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SheetFooter = styled.div`
  margin-top: auto;
  padding: 12px 16px;
`;

export const SheetClose = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-size-adjust: 100%;
  display: inline-block;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 2px;
    background: ${({ theme }) => theme.colors.textPrimary};
    border-radius: 2px;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

export const SheetSection = styled.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SheetTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

export const SheetNav = styled.nav`
  display: grid;
  gap: 6px;
`;

export const SheetNavItem = styled(NavLink)`
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgb(100 150 255 / 8%);
    color: ${({ theme }) => theme.colors.text};
  }

  &.active,
  &[aria-current='page'] {
    background: rgb(100 150 255 / 12%);
    color: ${({ theme }) => theme.colors.brand};
    font-weight: 500;
  }
`;

export const SheetList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
`;

export const SheetOption = styled.li`
  padding: 10px 12px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.brand};
    background: rgb(100 150 255 / 12%);
    font-weight: 500;
  }

  &:hover {
    background: rgb(100 150 255 / 8%);
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SheetToggleItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgb(100 150 255 / 8%);
    color: ${({ theme }) => theme.colors.text};
  }

  @media (hover: none) {
    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  span {
    color: inherit;
    font: inherit;
  }
`;

export const SheetActions = styled.div`
  display: grid;
  gap: 8px;
`;

export const SheetLogoutButton = styled.button`
  width: 100%;
  height: 48px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius}px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
