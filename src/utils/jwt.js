import { jwtDecode } from 'jwt-decode';

/**
 * JWT AccessToken 디코딩
 * @param {string} token - JWT AccessToken
 * @returns {object|null} Decoded token payload or null if invalid
 */
export const decodeAccessToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
};

/**
 * JWT 토큰 만료 여부 확인
 * @param {string} token - JWT Token
 * @returns {boolean} true if expired, false if valid
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // Invalid token is considered expired
  }
};

/**
 * AccessToken에서 User 정보 추출
 * @param {string} token - JWT AccessToken
 * @returns {object|null} User info or null
 */
export const extractUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.userName,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Failed to extract user from token:', error);
    return null;
  }
};

/**
 * 토큰 유효성 검증
 * @param {string} token - JWT Token
 * @returns {boolean} true if valid and not expired
 */
export const isTokenValid = (token) => {
  if (!token) return false;
  return !isTokenExpired(token);
};
