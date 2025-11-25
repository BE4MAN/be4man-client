import { LibraryBig } from 'lucide-react';
import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/stores/uiStore';

import HomeDayIcon from '/icons/home-day.svg';
import HomeNightIcon from '/icons/home-night.svg';
import HomeActiveIcon from '/icons/home-active.svg';

import ApprovalDayIcon from '/icons/approval-day.svg';
import ApprovalNightIcon from '/icons/approval-night.svg';
import ApprovalActiveIcon from '/icons/approval-active.svg';

import ScheduleDayIcon from '/icons/schedule-day.svg';
import ScheduleNightIcon from '/icons/schedule-night.svg';
import ScheduleActiveIcon from '/icons/schedule-active.svg';

import TaskDayIcon from '/icons/task-day.svg';
import TaskNightIcon from '/icons/task-night.svg';
import TaskActiveIcon from '/icons/task-active.svg';

import AnalyticsDayIcon from '/icons/analytics-day.svg';
import AnalyticsNightIcon from '/icons/analytics-night.svg';
import AnalyticsActiveIcon from '/icons/analytics-active.svg';

import LogoutIcon from '/icons/logout.svg';
import LogoutDayIcon from '/icons/logout-day.svg';

import * as S from './Sidebar.styles';

export default function Sidebar() {
  const { sidebarOpen, theme } = useUIStore();
  const { logout } = useAuth();
  const isDark = theme === 'dark';
  const { pathname } = useLocation();

  const items = useMemo(
    () => [
      {
        key: 'home',
        to: PATHS.HOME,
        label: '홈',
        icons: {
          dark: HomeNightIcon,
          light: HomeDayIcon,
          active: HomeActiveIcon,
        },
        end: true,
      },
      {
        key: 'approvals',
        to: PATHS.APPROVALS,
        label: '결재함',
        icons: {
          dark: ApprovalNightIcon,
          light: ApprovalDayIcon,
          active: ApprovalActiveIcon,
        },
        end: true,
      },

      {
        key: 'tasks',
        to: PATHS.TASKS,
        label: '작업관리',
        icons: {
          dark: TaskNightIcon,
          light: TaskDayIcon,
          active: TaskActiveIcon,
        },
        end: true,
      },
      {
        key: 'schedule',
        to: PATHS.SCHEDULE,
        label: '일정관리',
        icons: {
          dark: ScheduleNightIcon,
          light: ScheduleDayIcon,
          active: ScheduleActiveIcon,
        },
        end: true,
      },
      {
        key: 'analytics',
        to: PATHS.ANALYTICS,
        label: '통계',
        icons: {
          dark: AnalyticsNightIcon,
          light: AnalyticsDayIcon,
          active: AnalyticsActiveIcon,
        },
        end: true,
      },
      {
        key: 'problems',
        to: PATHS.PROBLEMS,
        label: '문제관리',
        iconComponent: LibraryBig,
        end: true,
      },
    ],
    [],
  );

  const iconSrc = useCallback(
    (isActive, icons) => {
      if (!icons) return null;
      const { dark, light, active } = icons;
      if (isActive && active) return active;
      return isDark ? dark : light;
    },
    [isDark],
  );

  const isApprovalFamily =
    pathname === PATHS.APPROVALS ||
    pathname === PATHS.APPROVAL_NEW ||
    pathname.startsWith('/approval/');

  const isScheduleFamily =
    pathname === PATHS.SCHEDULE || pathname.startsWith(`${PATHS.SCHEDULE}/`);

  const isTasksFamily =
    pathname === PATHS.TASKS || pathname.startsWith('/tasks/');

  const isProblemsFamily =
    pathname === PATHS.PROBLEMS || pathname.startsWith('/problems/');

  return (
    <S.Aside open={sidebarOpen}>
      <S.MenuWrap>
        {items.map((it) => {
          const forceActive =
            it.key === 'approvals'
              ? isApprovalFamily
              : it.key === 'schedule'
                ? isScheduleFamily
                : it.key === 'tasks'
                  ? isTasksFamily
                  : it.key === 'problems'
                    ? isProblemsFamily
                    : false;

          return (
            <S.Item
              key={it.key}
              to={it.to}
              end={it.end}
              data-active={forceActive ? 'true' : undefined}
            >
              {({ isActive }) => {
                const src = iconSrc(isActive || forceActive, it.icons);
                const IconComponent = it.iconComponent;
                const isItemActive = isActive || forceActive;
                return (
                  <>
                    {IconComponent ? (
                      <IconComponent
                        size={18}
                        style={{ flexShrink: 0 }}
                        color={isItemActive ? undefined : 'currentColor'}
                      />
                    ) : src ? (
                      <S.IconImg src={src} alt="" aria-hidden="true" />
                    ) : null}
                    {it.label}
                  </>
                );
              }}
            </S.Item>
          );
        })}
      </S.MenuWrap>

      <S.LogoutBtn type="button" onClick={logout}>
        <S.IconImg
          src={isDark ? LogoutIcon : LogoutDayIcon}
          alt=""
          aria-hidden="true"
        />
        로그아웃
      </S.LogoutBtn>
    </S.Aside>
  );
}
