/**
 * 인증 관련 커스텀 이벤트
 */
export const AUTH_EVENTS = {
  UNAUTHORIZED: 'auth:unauthorized',
};

/**
 * 인증 이벤트 발행
 */
export const emitAuthEvent = (eventType) => {
  window.dispatchEvent(new CustomEvent(eventType));
};

/**
 * 인증 이벤트 구독
 */
export const subscribeAuthEvent = (eventType, handler) => {
  window.addEventListener(eventType, handler);
  return () => window.removeEventListener(eventType, handler);
};
