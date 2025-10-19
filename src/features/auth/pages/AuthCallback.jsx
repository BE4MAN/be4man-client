import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import { useAuth } from '@/hooks/useAuth';

import * as S from './AuthCallback.styles';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL Fragment 파싱
        const hash = window.location.hash.substring(1);
        if (!hash) {
          throw new Error('콜백 데이터가 없습니다');
        }

        const params = new URLSearchParams(hash);

        // 에러 체크
        const errorMessage = params.get('error');
        if (errorMessage) {
          setError(decodeURIComponent(errorMessage));
          setTimeout(() => navigate(PATHS.AUTH), 3000);
          return;
        }

        const requiresSignup = params.get('requires_signup') === 'true';

        if (requiresSignup) {
          // 신규 사용자: 회원가입 필요
          const signToken = params.get('sign_token');

          if (!signToken) {
            throw new Error('SignToken을 찾을 수 없습니다');
          }

          // SignToken 저장 후 회원가입 폼으로 이동
          sessionStorage.setItem('sign_token', signToken);
          navigate(PATHS.AUTH, { state: { step: 2, requiresSignup: true } });
        } else {
          // 기존 사용자: 로그인
          const code = params.get('code');

          if (!code) {
            throw new Error('Temporary Code를 찾을 수 없습니다');
          }

          // 로그인 후 Deploy로 이동 (컴포넌트 언마운트되어 재실행 안 됨)
          await signin(code);
        }
      } catch (err) {
        console.error('OAuth 콜백 처리 오류:', err);
        setError(err.message);
        setTimeout(() => navigate(PATHS.AUTH), 3000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 1회만 실행 (navigate 후 언마운트됨)

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
