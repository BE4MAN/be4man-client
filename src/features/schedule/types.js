/**
 * @typedef {Object} Deployment
 * @property {string} id - 배포 ID
 * @property {string} title - 배포 제목
 * @property {string} service - 서비스 이름
 * @property {string} status - 배포 상태 enum (PENDING, REJECTED, IN_PROGRESS, CANCELED, COMPLETED, APPROVED)
 * @property {string} stage - 진행 단계 (한국어: '계획서', '배포', '결과보고', '재배포', '복구', '임시저장')
 * @property {boolean|null} [isDeployed] - 배포 완료 여부 (true: 성공, false: 실패, null: 미확정)
 * @property {string} date - 배포 날짜 (YYYY-MM-DD)
 * @property {string} scheduledTime - 예정 시간 (HH:mm)
 * @property {string} registrant - 등록자
 * @property {string} registrantDepartment - 등록 부서
 */

/**
 * @typedef {'DB 마이그레이션' | '서버 점검' | '외부 일정' | '재난 재해'} RestrictedPeriodType
 */

/**
 * @typedef {Object} RestrictedPeriod
 * @property {string} id - 작업 금지 기간 ID
 * @property {string} title - 제목
 * @property {string} description - 설명
 * @property {string} startDate - 시작 날짜 (YYYY-MM-DD)
 * @property {string} startTime - 시작 시간 (HH:mm)
 * @property {string} endedAt - 종료 일시 (YYYY-MM-DDTHH:mm)
 * @property {number} duration - 금지 시간 (시간 단위)
 * @property {RestrictedPeriodType} type - 유형
 * @property {boolean} [applyToAll] - 전체 적용 여부 (선택)
 * @property {string[]} [services] - 연관 서비스 목록 (선택)
 */

export {};
