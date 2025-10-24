/**
 * 백엔드 에러 응답 처리 유틸리티
 */

/**
 * 에러 응답에서 에러 정보 추출
 */
export const extractErrorInfo = (error) => {
  const response = error.response?.data;

  if (response && response.code) {
    return {
      code: response.code,
      status: response.status,
      message: response.message,
      timestamp: response.timestamp,
      path: response.path,
    };
  }

  // 기존 형식 (fallback)
  return {
    code: null,
    status: error.response?.status || 500,
    message: error.message || '알 수 없는 오류가 발생했습니다.',
    timestamp: null,
    path: null,
  };
};

/**
 * 에러 코드별 사용자 친화적 메시지 반환
 */
export const getErrorMessage = (errorInfo) => {
  const { code, message } = errorInfo;

  // 임시 코드 관련
  if (code === 'INVALID_TEMP_CODE' || code === 'TEMP_CODE_EXPIRED') {
    return '인증 코드가 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.';
  }

  // SignToken 관련
  if (
    code === 'INVALID_SIGN_TOKEN' ||
    code === 'EXPIRED_SIGN_TOKEN' ||
    code === 'SIGN_TOKEN_INFO_NOT_FOUND'
  ) {
    return '인증 정보가 만료되었습니다. GitHub 로그인을 다시 진행해주세요.';
  }

  // 계정 관련
  if (code === 'ACCOUNT_NOT_FOUND') {
    return '계정을 찾을 수 없습니다. 회원가입을 진행해주세요.';
  }

  // Refresh Token 관련
  if (
    code === 'REFRESH_TOKEN_NOT_FOUND' ||
    code === 'INVALID_REFRESH_TOKEN' ||
    code === 'EXPIRED_REFRESH_TOKEN' ||
    code === 'REFRESH_TOKEN_MISMATCH'
  ) {
    return '세션이 만료되었습니다. 다시 로그인해주세요.';
  }

  // 서버 메시지가 있으면 사용, 없으면 기본 메시지
  return message || '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
};
