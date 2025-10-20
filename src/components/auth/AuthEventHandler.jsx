import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { AUTH_EVENTS, subscribeAuthEvent } from '@/events/authEvents';

/**
 * 인증 이벤트를 감지하고 라우팅 처리
 * (UI 없음 - 이벤트 핸들러 전용 컴포넌트)
 */
export function AuthEventHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // ⭐ 인증 실패 시 로그인 페이지로 이동
    const unsubscribe = subscribeAuthEvent(AUTH_EVENTS.UNAUTHORIZED, () => {
      console.log('인증 실패 이벤트 수신 → /auth로 이동');
      navigate(PATHS.AUTH, { replace: true });
    });

    return unsubscribe;
  }, [navigate]);

  return null;
}

export default AuthEventHandler;
