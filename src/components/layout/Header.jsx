import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import logo from '/icons/logo.svg';
import { PATHS } from '@/app/routes/paths';
import SafeSvg from '@/components/common/SafeSvg';
import { useUIStore } from '@/stores/uiStore';

import * as S from './Header.styles';

import defaultAvatar from '/icons/rose.jpeg';

export default function Header() {
  const { setTheme, theme, service, setService, user } = useUIStore();
  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  const displayName = user?.name ?? '로제';
  const title = user?.title ?? '사원';
  const avatar = user?.avatar ?? defaultAvatar;

  const options = useMemo(
    () => ['Project A', 'Project B', 'Project Jenkins CI/CD'],
    [],
  );
  const selectedIndex = useMemo(
    () =>
      Math.max(
        0,
        options.findIndex((o) => o === service),
      ),
    [options, service],
  );

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [usingKeyboard, setUsingKeyboard] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) setActiveIndex(selectedIndex);
  }, [selectedIndex, open]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) {
        setUsingKeyboard(false);
        setOpen(false);
        setActiveIndex(selectedIndex);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [selectedIndex]);

  const onKey = useCallback(
    (e) => {
      setUsingKeyboard(true);

      if (
        !open &&
        (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')
      ) {
        e.preventDefault();
        setOpen(true);
        setActiveIndex(selectedIndex);
        return;
      }
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveIndex(options.length - 1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setUsingKeyboard(false);
        setOpen(false);
        setActiveIndex(selectedIndex);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setService(options[activeIndex]);
        setUsingKeyboard(false);
        setOpen(false);
      }
    },
    [open, selectedIndex, options, activeIndex, setService],
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onKeyEsc = (e) => e.key === 'Escape' && closeMobile();
    document.addEventListener('keydown', onKeyEsc);
    return () => document.removeEventListener('keydown', onKeyEsc);
  }, [closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = prev);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(min-width: 601px)');
    const handler = (e) => e.matches && setMobileOpen(false);
    handler(mql); // 초기 동기화
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  const onClickBrand = useCallback(() => {}, []);
  const onClickTheme = useCallback(
    () => setTheme(nextTheme),
    [nextTheme, setTheme],
  );
  const onToggleDropdown = useCallback(() => {
    setOpen((o) => !o);
    setUsingKeyboard(false);
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  const onToggleTheme = useCallback(
    () => setTheme(nextTheme),
    [setTheme, nextTheme],
  );

  return (
    <S.Bar>
      <S.Left>
        <S.LogoLink
          to={PATHS.PR}
          aria-label="Go to home"
          onClick={onClickBrand}
        >
          <SafeSvg src={logo} alt="BE4MAN" width={120} height={60} />
        </S.LogoLink>
        <S.BrandLink to={PATHS.PR} onClick={onClickBrand}>
          BE4MAN
        </S.BrandLink>
      </S.Left>

      <S.Right>
        <S.DesktopOnly>
          <S.SelectWrap ref={wrapRef}>
            <S.SelectButton
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls="service-listbox"
              onClick={onToggleDropdown}
              onKeyDown={onKey}
              $open={open}
            >
              {service || options[0]}
            </S.SelectButton>

            {open && (
              <S.SelectList
                id="service-listbox"
                role="listbox"
                tabIndex={-1}
                onMouseLeave={() => {
                  setUsingKeyboard(false);
                  setActiveIndex(selectedIndex);
                }}
              >
                {options.map((opt, idx) => (
                  <S.SelectOption
                    key={opt}
                    role="option"
                    aria-selected={service === opt}
                    data-active={
                      (usingKeyboard && activeIndex === idx) || undefined
                    }
                    onMouseEnter={() => setUsingKeyboard(false)}
                    onClick={() => {
                      setService(opt);
                      setOpen(false);
                      setUsingKeyboard(false);
                    }}
                  >
                    {opt}
                  </S.SelectOption>
                ))}
              </S.SelectList>
            )}
          </S.SelectWrap>
        </S.DesktopOnly>

        <S.User>
          <S.Avatar src={avatar} alt={`${displayName} 프로필`} />
          <S.NameTitle>
            <strong>{displayName}</strong>
            <small>{title}</small>
          </S.NameTitle>
        </S.User>

        <S.DesktopOnly>
          <S.ToggleWrap aria-labelledby="darkmode-label">
            <S.ToggleLabel id="darkmode-label">Dark Mode</S.ToggleLabel>
            <S.ModeToggle
              type="button"
              isDark={isDark}
              onClick={onToggleTheme}
              aria-pressed={isDark}
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
            />
          </S.ToggleWrap>
        </S.DesktopOnly>

        <S.BurgerBtn
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span />
        </S.BurgerBtn>
      </S.Right>

      {mobileOpen &&
        createPortal(
          <>
            <S.SheetOverlay onClick={closeMobile} />
            <S.Sheet role="dialog" aria-modal="true" aria-label="Main menu">
              <S.SheetHeader>
                <div>
                  <strong>Menu</strong>
                </div>
                <S.SheetClose onClick={closeMobile} aria-label="Close menu">
                  ✕
                </S.SheetClose>
              </S.SheetHeader>

              <S.SheetSection>
                <S.SheetTitle>Navigation</S.SheetTitle>
                <S.SheetNav>
                  <S.SheetNavItem
                    as={NavLink}
                    to={PATHS.DEPLOY}
                    onClick={closeMobile}
                    end
                  >
                    배포 관리
                  </S.SheetNavItem>
                  <S.SheetNavItem
                    as={NavLink}
                    to={PATHS.DASHBOARD}
                    onClick={closeMobile}
                    end
                  >
                    대시 보드
                  </S.SheetNavItem>
                  <S.SheetNavItem
                    as={NavLink}
                    to={PATHS.LOGS}
                    onClick={closeMobile}
                    end
                  >
                    로그 관리
                  </S.SheetNavItem>
                </S.SheetNav>
              </S.SheetSection>

              <S.SheetSection>
                <S.SheetTitle>Project</S.SheetTitle>
                <S.SheetList>
                  {options.map((opt) => (
                    <S.SheetOption
                      key={opt}
                      aria-selected={service === opt}
                      onClick={() => {
                        setService(opt);
                        closeMobile();
                      }}
                    >
                      {opt}
                    </S.SheetOption>
                  ))}
                </S.SheetList>
              </S.SheetSection>

              <S.SheetSection>
                <S.SheetTitle>Appearance</S.SheetTitle>
                <S.SheetToggleRow>
                  <span>Dark Mode</span>
                  <S.ModeToggle
                    type="button"
                    isDark={isDark}
                    onClick={onClickTheme}
                    aria-pressed={isDark}
                    aria-label={
                      isDark ? 'Switch to light mode' : 'Switch to dark mode'
                    }
                  />
                </S.SheetToggleRow>
              </S.SheetSection>
            </S.Sheet>
          </>,
          document.body,
        )}
    </S.Bar>
  );
}
