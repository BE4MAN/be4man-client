/**
 * Enum 변환 유틸리티 함수
 * 한글 UI 값 ↔ 백엔드 Enum 값 변환
 */

// ========== 한글 → 백엔드 Enum ==========

/**
 * 반복 유형 한글 → Enum 변환
 * @param {string} recurrenceType - '매일', '매주', '매월'
 * @returns {string|null} - 'DAILY', 'WEEKLY', 'MONTHLY', null
 */
export const recurrenceTypeToEnum = (recurrenceType) => {
  const map = {
    매일: 'DAILY',
    매주: 'WEEKLY',
    매월: 'MONTHLY',
  };
  return map[recurrenceType] ?? null;
};

/**
 * 요일 한글 → Enum 변환
 * @param {string} weekday - '월요일', '화요일', ...
 * @returns {string|null} - 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', null
 */
export const weekdayToEnum = (weekday) => {
  const map = {
    월요일: 'MON',
    화요일: 'TUE',
    수요일: 'WED',
    목요일: 'THU',
    금요일: 'FRI',
    토요일: 'SAT',
    일요일: 'SUN',
  };
  return map[weekday] ?? null;
};

/**
 * 주차 한글 → Enum 변환
 * @param {string} weekOfMonth - '첫째 주', '둘째 주', ...
 * @returns {string|null} - 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', null
 */
export const weekOfMonthToEnum = (weekOfMonth) => {
  const map = {
    '첫째 주': 'FIRST',
    '둘째 주': 'SECOND',
    '셋째 주': 'THIRD',
    '넷째 주': 'FOURTH',
    '다섯째 주': 'FIFTH',
  };
  return map[weekOfMonth] ?? null;
};

/**
 * 작업 금지 유형 한글 → Enum 변환
 * @param {string} banType - 'DB 마이그레이션', '서버 점검', '외부 일정', '재난 재해'
 * @returns {string|null} - 'DB_MIGRATION', 'MAINTENANCE', 'EXTERNAL_SCHEDULE', 'ACCIDENT', null
 */
export const banTypeToEnum = (banType) => {
  const map = {
    'DB 마이그레이션': 'DB_MIGRATION',
    '서버 점검': 'MAINTENANCE',
    '외부 일정': 'EXTERNAL_SCHEDULE',
    '재난 재해': 'ACCIDENT',
  };
  return map[banType] ?? null;
};

// ========== 백엔드 Enum → 한글 ==========

/**
 * 반복 유형 Enum → 한글 변환
 * @param {string} enumValue - 'DAILY', 'WEEKLY', 'MONTHLY'
 * @returns {string|null} - '매일', '매주', '매월', null
 */
export const enumToRecurrenceType = (enumValue) => {
  const map = {
    DAILY: '매일',
    WEEKLY: '매주',
    MONTHLY: '매월',
  };
  return map[enumValue] ?? null;
};

/**
 * 요일 Enum → 한글 변환
 * @param {string} enumValue - 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'
 * @returns {string|null} - '월요일', '화요일', ..., null
 */
export const enumToWeekday = (enumValue) => {
  const map = {
    MON: '월요일',
    TUE: '화요일',
    WED: '수요일',
    THU: '목요일',
    FRI: '금요일',
    SAT: '토요일',
    SUN: '일요일',
  };
  return map[enumValue] ?? null;
};

/**
 * 주차 Enum → 한글 변환
 * @param {string} enumValue - 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'
 * @returns {string|null} - '첫째 주', '둘째 주', ..., null
 */
export const enumToWeekOfMonth = (enumValue) => {
  const map = {
    FIRST: '첫째 주',
    SECOND: '둘째 주',
    THIRD: '셋째 주',
    FOURTH: '넷째 주',
    FIFTH: '다섯째 주',
  };
  return map[enumValue] ?? null;
};

/**
 * 작업 금지 유형 Enum → 한글 변환
 * @param {string} enumValue - 'DB_MIGRATION', 'MAINTENANCE', 'EXTERNAL_SCHEDULE', 'ACCIDENT'
 * @returns {string|null} - 'DB 마이그레이션', '서버 점검', '외부 일정', '재난 재해', null
 */
export const enumToBanType = (enumValue) => {
  const map = {
    DB_MIGRATION: 'DB 마이그레이션',
    MAINTENANCE: '서버 점검',
    EXTERNAL_SCHEDULE: '외부 일정',
    ACCIDENT: '재난 재해',
  };
  return map[enumValue] ?? null;
};

/**
 * 작업 단계 Enum → 한글 변환
 * @param {string} enumValue - 'PLAN', 'DEPLOYMENT', 'REPORT', 'RETRY', 'ROLLBACK', 'DRAFT'
 * @returns {string|null} - '계획서', '배포', '결과보고', '재배포', '복구', '임시저장', null
 */
export const enumToStage = (enumValue) => {
  const map = {
    PLAN: '계획서',
    DEPLOYMENT: '배포',
    REPORT: '결과보고',
    RETRY: '재배포',
    ROLLBACK: '복구',
    DRAFT: '임시저장',
  };
  return map[enumValue] ?? null;
};

/**
 * 배포 상태 Enum → 한글 변환
 * @param {string} enumValue - 'PENDING', 'REJECTED', 'IN_PROGRESS', 'CANCELED', 'COMPLETED', 'APPROVED'
 * @returns {string|null} - '대기', '반려', '진행중', '취소', '완료', '승인', null
 */
export const enumToStatus = (enumValue) => {
  const map = {
    PENDING: '대기',
    REJECTED: '반려',
    IN_PROGRESS: '진행중',
    CANCELED: '취소',
    COMPLETED: '완료',
    APPROVED: '승인',
  };
  return map[enumValue] ?? null;
};
