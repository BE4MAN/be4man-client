import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Aside = styled.aside`
  grid-area: sidebar;
  width: var(--sidebar-w);
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: var(--header-h);
  height: calc(100dvh - var(--header-h));
  overflow: auto;
  z-index: 15;

  @media (width <= 767px) {
    position: fixed;
    inset: var(--header-h) auto auto 0;
    height: calc(100dvh - var(--header-h));
    width: min(80vw, 240px);
    transform: translateX(${({ open }) => (open ? '0' : '-105%')});
    transition: transform 0.2s ease;
    will-change: transform;
    z-index: 20;
  }
`;

export const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

export const Item = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 14px 20px 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  z-index: 0;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  &:hover {
    background: rgb(100 150 255 / 8%);
    color: ${({ theme }) => theme.colors.text};
  }

  &.active,
  &[aria-current='page'],
  &[data-active='true'] {
    background: rgb(100 150 255 / 12%);
    color: ${({ theme }) => theme.colors.brand};
    font-weight: 500;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 3px;
      background: ${({ theme }) => theme.colors.brand};
      z-index: 2;
    }

    svg {
      color: ${({ theme }) => theme.colors.brand};
    }
  }
`;

export const LogoutBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 14px 20px 18px;
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  transition: all 0.2s ease;

  svg,
  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  &:hover {
    background: rgb(100 150 255 / 8%);
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const IconImg = styled.img`
  display: block;
  width: 15px;
  height: 15px;
  color: #a9b0bf;
  pointer-events: none;
  user-select: none;
`;

export const IconSvg = styled.svg`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  ${Item}.active & {
    color: ${({ theme }) => theme.colors.brand};
  }

  ${Item}:hover & {
    color: ${({ theme }) => theme.colors.text};
  }

  ${LogoutBtn}:hover & {
    color: ${({ theme }) => theme.colors.text};
  }
`;
