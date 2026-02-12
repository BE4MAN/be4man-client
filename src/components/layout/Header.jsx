// 작성자 : 김민호, 이원석
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import logo from '/icons/aiwacs_logo.png';
import { PATHS } from '@/app/routes/paths';
import { POSITION_REVERSE_MAP } from '@/constants/accounts';
import { useAuth } from '@/hooks/useAuth';
import { useAccountProjectsByAccountQuery } from '@/hooks/useProjectQueries';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

import * as S from './Header.styles';

export default function Header() {
  const ui = useUIStore();
  const { setTheme, theme, service, setService } = ui;
  const setProjectId = ui.setProjectId;

  const { user } = useAuthStore();
  const { logout } = useAuth();
  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  const displayName = user?.name;
  const position = user?.position ? POSITION_REVERSE_MAP[user.position] : null;
  const avatar = user?.profileImageUrl;

  const accountId = user?.accountId ?? user?.id;

  const {
    data: memberships = [],
    isLoading: isLoadingProjects,
    isError: isProjectsError,
  } = useAccountProjectsByAccountQuery(accountId);

  const projects = useMemo(() => {
    if (!memberships?.length) return [];
    return memberships
      .map((m) => ({
        id: m.projectId ?? m.project?.id ?? m.project_id,
        name: m.projectName ?? m.project?.name ?? m.project_name,
      }))
      .filter((p) => p.id && p.name);
  }, [memberships]);

  const ALL_PROJECTS_LABEL = '전체 프로젝트';
  const EMPTY_LABEL = '(프로젝트 없음)';

  const options = useMemo(() => {
    const names = projects.map((p) => p.name);
    return [ALL_PROJECTS_LABEL, ...(names.length ? names : [EMPTY_LABEL])];
  }, [projects]);

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

  const selectProjectByName = useCallback(
    (name) => {
      if (name === EMPTY_LABEL) return;
      setService(name);
      if (name === ALL_PROJECTS_LABEL) {
        if (typeof setProjectId === 'function') setProjectId(null);
        return;
      }
      const selected = projects.find((p) => p.name === name);
      if (selected && typeof setProjectId === 'function') {
        setProjectId(selected.id);
      }
    },
    [projects, setService, setProjectId],
  );

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
        selectProjectByName(options[activeIndex]);
        setUsingKeyboard(false);
        setOpen(false);
      }
    },
    [open, selectedIndex, options, activeIndex, selectProjectByName],
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
    handler(mql);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  const onClickBrand = useCallback(() => {}, []);
  const onClickTheme = useCallback(
    (e) => {
      setTheme(nextTheme);
      if (e?.currentTarget && typeof e.currentTarget.blur === 'function') {
        requestAnimationFrame(() => e.currentTarget.blur());
      }
    },
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

  const onLogout = useCallback(async () => {
    setMobileOpen(false);
    await logout();
  }, [logout]);

  useEffect(() => {
    if (!isLoadingProjects && !service) {
      selectProjectByName(ALL_PROJECTS_LABEL);
    }
  }, [isLoadingProjects, service, selectProjectByName]);

  return (
    <S.Bar>
      <S.Left>
        <S.LogoLink
          to={PATHS.PR}
          aria-label="Go to home"
          onClick={onClickBrand}
        >
          <S.Logo src={logo} alt="ITSM" />
        </S.LogoLink>
        <S.BrandLink to={PATHS.PR} onClick={onClickBrand}>
          ITSM
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
              {isLoadingProjects
                ? '불러오는 중...'
                : isProjectsError
                  ? '프로젝트 조회 실패'
                  : service || options[0]}
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
                      selectProjectByName(opt);
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
            <small>{position}</small>
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
                        selectProjectByName(opt);
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
                <S.SheetToggleItem
                  type="button"
                  onClick={onClickTheme}
                  aria-pressed={isDark}
                  aria-label={
                    isDark ? 'Switch to light mode' : 'Switch to dark mode'
                  }
                >
                  Dark Mode
                  <S.ModeToggle
                    isDark={isDark}
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </S.SheetToggleItem>
              </S.SheetSection>

              <S.SheetFooter>
                <S.SheetLogoutButton
                  type="button"
                  role="menuitem"
                  onClick={onLogout}
                  aria-label="로그아웃"
                >
                  로그아웃
                </S.SheetLogoutButton>
              </S.SheetFooter>
            </S.Sheet>
          </>,
          document.body,
        )}
    </S.Bar>
  );
}
