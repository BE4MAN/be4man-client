import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuthStore } from '@/stores/authStore';

import * as S from './AuthCallback.styles';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  // URL Fragment를 즉시 읽어서 저장 (useEffect 실행 전에 Fragment가 사라지는 것 방지)
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
          throw new Error('콜백 데이터가 없습니다');
        }

        const params = new URLSearchParams(callbackData);

        // 에러 체크
        const errorMessage = params.get('error');
        if (errorMessage) {
          setError(decodeURIComponent(errorMessage));
          setTimeout(() => navigate(PATHS.AUTH), 3000);
          return;
        }

        const requiresSignup = params.get('requires_signup') === 'true';

        if (requiresSignup) {
          // 시나리오 2: 회원가입 필요
          const signToken = params.get('sign_token');

          if (!signToken) {
            throw new Error('SignToken을 찾을 수 없습니다');
          }

          // SignToken을 sessionStorage에 임시 저장
          sessionStorage.setItem('sign_token', signToken);

          // AuthPage Step 2 (회원가입 폼)로 이동
          navigate(PATHS.AUTH, { state: { step: 2, requiresSignup: true } });
        } else {
          // 시나리오 1: 로그인 성공 (기존 회원)
          const accessToken = params.get('access_token');

          if (!accessToken) {
            throw new Error('Access Token을 찾을 수 없습니다');
          }

          // Access Token 저장
          setTokens(accessToken);

          // 사용자 정보는 ProtectedRoute에서 fetchUserInfo로 자동 로드됨
          // Deploy 페이지로 이동
          navigate(PATHS.DEPLOY);
        }
      } catch (err) {
        console.error('OAuth 콜백 처리 오류:', err);
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
