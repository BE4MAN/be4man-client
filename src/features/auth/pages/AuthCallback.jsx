import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';

import * as S from './AuthCallback.styles';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  // Fragment를 즉시 읽어서 저장 (useEffect 전에!)
  const [callbackData] = useState(() => {
    const hash = window.location.hash.substring(1);
    return hash;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = () => {
      try {
        // 저장된 Fragment 데이터 사용
        if (!callbackData) {
          throw new Error('No callback data received');
        }

        const params = new URLSearchParams(callbackData);

        // Error 체크
        const errorMessage = params.get('error');
        if (errorMessage) {
          setError(decodeURIComponent(errorMessage));
          setTimeout(() => navigate(PATHS.AUTH), 3000);
          return;
        }

        const requiresSignup = params.get('requires_signup') === 'true';

        if (requiresSignup) {
          // Scenario 2: 회원가입 필요
          const signToken = params.get('sign_token');
          if (!signToken) {
            throw new Error('SignToken not found');
          }

          // SignToken을 sessionStorage에 임시 저장
          sessionStorage.setItem('sign_token', signToken);

          // AuthPage Step 2로 이동
          navigate(PATHS.AUTH, { state: { step: 2, requiresSignup: true } });
        } else {
          // Scenario 1: 로그인 성공
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (!accessToken || !refreshToken) {
            throw new Error('Tokens not found');
          }

          // 토큰 저장 (authStore가 자동으로 user 정보 추출)
          setTokens(accessToken, refreshToken);

          // Deploy 페이지로 이동
          navigate(PATHS.DEPLOY);
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err.message);
        setTimeout(() => navigate(PATHS.AUTH), 3000);
      }
    };

    handleCallback();
  }, [callbackData, navigate, setTokens]);

  return (
    <S.Container>
      <S.Content>
        {error ? (
          <>
            <S.ErrorIcon>⚠️</S.ErrorIcon>
            <S.Title>인증 오류</S.Title>
            <S.Message>{error}</S.Message>
            <S.SubMessage>잠시 후 로그인 페이지로 이동합니다...</S.SubMessage>
          </>
        ) : (
          <>
            <S.Spinner />
            <S.Title>인증 처리 중...</S.Title>
            <S.Message>잠시만 기다려주세요</S.Message>
          </>
        )}
      </S.Content>
    </S.Container>
  );
}
