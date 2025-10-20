import { PATHS } from '@/app/routes/paths';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/stores/uiStore';

import DeploymngIcon from '/icons/deploymng.svg';
import DeploymngDayIcon from '/icons/deploymng-day.svg';
import DeploymngActiveIcon from '/icons/deploymng-active.svg';

import DashboardIcon from '/icons/dashboard.svg';
import DashboardDayIcon from '/icons/dashboard-day.svg';
import DashboardActiveIcon from '/icons/dashboard-active.svg';

import LogsIcon from '/icons/search.svg';
import LogsDayIcon from '/icons/search-day.svg';
import LogsActiveIcon from '/icons/search-active.svg';

import LogoutIcon from '/icons/logout.svg';
import LogoutDayIcon from '/icons/logout-day.svg';

import * as S from './Sidebar.styles';

export default function Sidebar() {
  const { sidebarOpen, theme } = useUIStore();
  const { logout } = useAuth();
  const isDark = theme === 'dark';

  const pickIcon = (isActive, darkSrc, lightSrc, activeSrc) =>
    isActive ? (activeSrc ?? darkSrc) : isDark ? darkSrc : lightSrc;

  return (
    <S.Aside open={sidebarOpen}>
      <S.MenuWrap>
        <S.Item to={PATHS.DEPLOY} end>
          {({ isActive }) => (
            <>
              <S.IconImg
                src={pickIcon(
                  isActive,
                  DeploymngIcon,
                  DeploymngDayIcon,
                  DeploymngActiveIcon,
                )}
                alt="Deployment Management"
              />
              배포 관리
            </>
          )}
        </S.Item>

        <S.Item to={PATHS.DASHBOARD} end>
          {({ isActive }) => (
            <>
              <S.IconImg
                src={pickIcon(
                  isActive,
                  DashboardIcon,
                  DashboardDayIcon,
                  DashboardActiveIcon,
                )}
                alt="Dashboard"
              />
              대시 보드
            </>
          )}
        </S.Item>

        <S.Item to={PATHS.LOGS} end>
          {({ isActive }) => (
            <>
              <S.IconImg
                src={pickIcon(isActive, LogsIcon, LogsDayIcon, LogsActiveIcon)}
                alt="Log Management"
              />
              로그 관리
            </>
          )}
        </S.Item>
      </S.MenuWrap>

      <S.LogoutBtn type="button" onClick={logout}>
        <S.IconImg src={isDark ? LogoutIcon : LogoutDayIcon} alt="Logout" />
        로그아웃
      </S.LogoutBtn>
    </S.Aside>
  );
}
