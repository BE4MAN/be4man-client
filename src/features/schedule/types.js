/**
 * @typedef {'scheduled' | 'success' | 'failed'} DeploymentStatus
 */

/**
 * @typedef {Object} Deployment
 * @property {string} id - 배포 ID
 * @property {string} title - 배포 제목
 * @property {string} service - 서비스 이름
 * @property {string} branch - 브랜치 이름
 * @property {string} prTitle - PR 제목
 * @property {DeploymentStatus} status - 배포 상태
 * @property {string} date - 배포 날짜 (YYYY-MM-DD)
 * @property {string} scheduledTime - 예정 시간 (HH:mm)
 * @property {string} riskLevel - 위험도
 * @property {string} prNumber - PR 번호
 * @property {string} [commitSha] - 커밋 SHA (선택)
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
 * @property {string} endDate - 종료 날짜 (YYYY-MM-DD)
 * @property {string} endTime - 종료 시간 (HH:mm)
 * @property {RestrictedPeriodType} type - 유형
 * @property {boolean} [applyToAll] - 전체 적용 여부 (선택)
 * @property {string[]} [services] - 연관 서비스 목록 (선택)
 */

export {};
