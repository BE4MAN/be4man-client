import { ThemeProvider } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import Button from '@/components/auth/Button';
import { useAuth } from '@/hooks/useAuth';
import { light } from '@/styles/theme';
import { extractErrorInfo } from '@/utils/errorHandler';

import * as S from './AuthCallback.styles';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      console.log('[AuthCallback] 이미 처리됨 (Strict Mode 2번째 실행)');
      return;
    }

    const handleCallback = async () => {
      try {
        hasProcessed.current = true;

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
          setTimeout(() => navigate(PATHS.AUTH, { replace: true }), 3000);
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
          navigate(PATHS.AUTH, {
            state: { step: 2, requiresSignup: true },
            replace: true,
          });
        } else {
          // 기존 사용자: 로그인
          const code = params.get('code');

          if (!code) {
            throw new Error('Temporary Code를 찾을 수 없습니다');
          }

          await signin(code);
        }
      } catch (err) {
        console.error('OAuth 콜백 처리 오류:', err);

        const errorInfo = extractErrorInfo(err);
        setErrorDetails(errorInfo);
        setError(err.message);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의존성 배열 비움 (1회만 실행 의도)

  const handleConfirm = () => {
    navigate(PATHS.AUTH, { replace: true });
  };

  return (
    <ThemeProvider theme={light}>
      <S.Container>
        <S.Content>
          {error ? (
            <>
              <S.ErrorIcon>⚠️</S.ErrorIcon>
              <S.Title>인증 오류</S.Title>
              <S.Message>{error}</S.Message>

              {errorDetails && (
                <S.ErrorDetails>
                  <S.ErrorCode>코드: {errorDetails.code}</S.ErrorCode>
                  <S.ErrorPath>경로: {errorDetails.path}</S.ErrorPath>
                  <S.ErrorTime>시간: {errorDetails.timestamp}</S.ErrorTime>
                </S.ErrorDetails>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleConfirm}
                style={{ marginTop: '24px' }}
              >
                확인
              </Button>
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
    </ThemeProvider>
  );
}
