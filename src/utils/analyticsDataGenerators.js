import {
  getDeployDurationSummary,
  getDeploymentPeriodStats,
  getBanTypeStats,
  getDeploySuccessRate,
  getTimeToNextSuccess,
} from '@/api/analytics';

// services 배열은 icon이 JSX 요소이므로 컴포넌트에서 처리
// 여기서는 데이터 구조만 정의
export const servicesData = [
  {
    name: 'API Gateway',
    successRate: 98,
    avgApprovalTime: 2.3,
    violations: 0,
    totalDeployments: 145,
    trend: 12,
    trendType: 'increase',
  },
  {
    name: 'Mobile App',
    successRate: 94,
    avgApprovalTime: 4.5,
    violations: 2,
    totalDeployments: 89,
    trend: 5,
    trendType: 'increase',
  },
  {
    name: 'Web Portal',
    successRate: 96,
    avgApprovalTime: 3.2,
    violations: 1,
    totalDeployments: 112,
    trend: 8,
    trendType: 'increase',
  },
  {
    name: 'Database',
    successRate: 92,
    avgApprovalTime: 5.8,
    violations: 3,
    totalDeployments: 67,
    trend: 3,
    trendType: 'decrease',
  },
  {
    name: 'Processing Engine',
    successRate: 88,
    avgApprovalTime: 6.1,
    violations: 5,
    totalDeployments: 54,
    trend: 7,
    trendType: 'decrease',
  },
  {
    name: 'Cloud Functions',
    successRate: 97,
    avgApprovalTime: 2.8,
    violations: 0,
    totalDeployments: 178,
    trend: 15,
    trendType: 'increase',
  },
];

// Data Generation Functions
const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

/**
 * 배포 실패 결과 통계용 데이터 생성
 */
export const generateErrorData = () => {
  const data = [];
  const months = 12;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    data.push({
      date: monthNames[date.getMonth()],
      errorCount: Math.floor(Math.random() * 80) + 20,
    });
  }
  return data;
};

/**
 * 월별 배포 금지 일정 데이터 생성
 */
export const generateMonthlyBanData = () => {
  const data = [];
  const months = 12;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    data.push({
      date: monthNames[date.getMonth()],
      serverMaintenance: Math.floor(Math.random() * 8) + 2,
      dbMigration: Math.floor(Math.random() * 5) + 1,
    });
  }
  return data;
};

/**
 * 연도별 배포 금지 일정 데이터 생성
 */
export const generateYearlyBanData = () => {
  const data = [];
  const currentYear = new Date().getFullYear();

  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    data.push({
      date: `${year}년`,
      serverMaintenance: Math.floor(Math.random() * 80) + 20,
      dbMigration: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
};

const toKoreanMonth = (label) => `${Number(label)}월`;
const toKoreanYear = (label) => `${label}년`;

/**
 * API 기반 월별 배포 통계
 * @param {string|number} projectId 'all' | number
 * @returns Promise<Array<{label:string, deployments:number, success:number, failed:number}>>
 */
export async function fetchMonthlyDeploymentData(projectId = 'all') {
  const json = await getDeploymentPeriodStats({ period: 'month', projectId });
  // 백엔드 응답: items: [{label:"1".."12", deployments, success, failed}]
  const items = Array.isArray(json?.items) ? json.items : [];
  return items.map((it) => ({
    label: toKoreanMonth(it.label), // "1월"
    deployments: Number(it.deployments || 0),
    success: Number(it.success || 0),
    failed: Number(it.failed || 0),
  }));
}

/**
 * API 기반 연도별 배포 통계
 */
export async function fetchYearlyDeploymentData(projectId = 'all') {
  const json = await getDeploymentPeriodStats({ period: 'year', projectId });
  const items = Array.isArray(json?.items) ? json.items : [];
  return items.map((it) => ({
    label: toKoreanYear(it.label), // "2025년"
    deployments: Number(it.deployments || 0),
    success: Number(it.success || 0),
    failed: Number(it.failed || 0),
  }));
}

const _durationCache = new Map();
// 옵션 캐시(선택): 성공률 서비스 목록을 재사용하거나 duration 응답에 포함된 목록을 사용
let _durationOptions = null;

/**
 * 서비스 목록(드롭다운) 로드
 * - 우선 성공률의 services를 재사용해도 되지만,
 *   duration API에서 함께 내려줄 수 있으면 그걸 쓰는게 더 일관됨.
 */
export async function listDurationServices() {
  if (_durationOptions) return _durationOptions;

  // duration API가 service=all일 때 services 목록을 내려준다고 가정
  const json = await getDeployDurationSummary('all');
  const servicesFromApi = Array.isArray(json.services) ? json.services : [];

  const opts = [
    { id: 'all', name: '전체' },
    ...servicesFromApi.map((s) => ({
      id: String(s.id ?? s.name),
      name: s.name ?? String(s.id),
    })),
  ];
  _durationOptions = opts;
  return _durationOptions;
}

/**
 *   배포 소요시간(월별) 데이터
 * - 컴포넌트 인터페이스 유지: [{date, duration}] 배열을 반환
 * - 내부적으로 axios+endpoint 호출, 결과 캐시(Map) 사용
 */
export async function generateDurationData(serviceId = 'all') {
  const key = String(serviceId || 'all');

  if (_durationCache.has(key)) {
    return _durationCache.get(key);
  }

  const json = await getDeployDurationSummary(key);

  // API 응답 규약(권장):
  // { months: [{date:'1월', duration: 5.4}, ...] }
  const months = Array.isArray(json.months) ? json.months : [];

  _durationCache.set(key, months);
  return months;
}

// analyticsDataGenerators.js
let _successCache = null; // { services: [...], all: {success,failed} }

async function _fetchSuccessSummary() {
  const json = await getDeploySuccessRate();

  const services = Array.isArray(json.services) ? json.services : [];
  const all = json.all || _sumAll(services);

  _successCache = { services, all };
  return _successCache;
}

function _sumAll(services) {
  return services.reduce(
    (acc, s) => ({
      success: acc.success + (s.success || 0),
      failed: acc.failed + (s.failed || 0),
    }),
    { success: 0, failed: 0 },
  );
}

/** 최초 로딩(선호딩) 선택사항 */
export async function preloadSuccessSummary() {
  if (!_successCache) await _fetchSuccessSummary();
}

/** 동적 서비스 목록 반환 (드롭다운 등에 사용) */
export async function listSuccessServices() {
  if (!_successCache) await _fetchSuccessSummary();
  // 'all' 포함해서 옵션 만들기
  return [
    { id: 'all', name: '전체' },
    ..._successCache.services.map((s) => ({
      id: String(s.id ?? s.name),
      name: s.name ?? String(s.id),
    })),
  ];
}

/**
 * 배포 성공률 데이터 (동적 서비스)
 * @param {string} serviceId 'all' 또는 services[].id/name
 * @returns {Promise<{success:number, failed:number}>}
 */
export async function generateSuccessData(serviceId) {
  if (!_successCache) await _fetchSuccessSummary();

  if (serviceId === 'all') return _successCache.all;

  const wanted = String(serviceId);
  const found =
    _successCache.services.find((s) => String(s.id ?? s.name) === wanted) ||
    _successCache.services.find((s) => String(s.name ?? s.id) === wanted);

  return found
    ? { success: found.success || 0, failed: found.failed || 0 }
    : _successCache.all;
}

// Ban Type(작업 금지 유형) 색상 매핑 (필요시 취향대로 변경 가능)
const BAN_TYPE_COLORS = {
  DB_MIGRATION: '#3B82F6', // 파랑
  MAINTENANCE: '#FB923C', // 주황
  ACCIDENT: '#EF4444', // 빨강
  EXTERNAL_SCHEDULE: '#10B981', // 초록
};

// 라벨 변환(서버 enum → 한글 표기). 필요 없으면 그대로 type 사용해도 됨.
const BAN_TYPE_LABELS = {
  DB_MIGRATION: 'DB 마이그레이션',
  MAINTENANCE: '유지보수',
  ACCIDENT: '사고/장애',
  EXTERNAL_SCHEDULE: '외부 일정',
};

/**
 * 작업 금지 유형 통계 불러오기
 * @param {string|number} projectId 'all' | number
 * @returns Promise<{ total:number, reasons: {label:string,count:number,color:string}[] }>
 */
export async function fetchBanTypeData(projectId = 'all') {
  const json = await getBanTypeStats(projectId);
  const items = Array.isArray(json?.items) ? json.items : [];

  const reasons = items.map((it) => {
    const type = String(it.type ?? '');
    return {
      label: BAN_TYPE_LABELS[type] ?? type, // 라벨 한글화
      count: Number(it.count || 0),
      color: BAN_TYPE_COLORS[type] ?? '#9CA3AF', // 기본 회색
    };
  });
  const total =
    typeof json?.total === 'number'
      ? json.total
      : reasons.reduce((a, r) => a + r.count, 0);

  return { total, reasons };
}

/**
 * 실패 → 다음 성공까지 걸린 시간(프로젝트별) 데이터
 *
 * 백엔드 응답:
 * {
 *   thresholdMins: 120,
 *   items: [
 *     { projectId, projectName, avgMins, sampleCount, withinMinutes, overMinutes },
 *     ...
 *   ]
 * }
 *
 * 반환 형태:
 * {
 *   thresholdMins: number,
 *   projects: [
 *     { id, name, avgSuccessMins, sampleCount, withinMinutes, overMinutes },
 *     ...
 *   ]
 * }
 *
 * → FailureFollowupCharts의 StackedBarChart에 그대로 물릴 수 있게 구성
 */
export async function fetchFailureFollowupSuccessData({
  projectId = 'all',
  thresholdMins = 120,
} = {}) {
  const json = await getTimeToNextSuccess({ projectId, thresholdMins });

  const effectiveThreshold = Number(json?.thresholdMins ?? thresholdMins);
  const items = Array.isArray(json?.items) ? json.items : [];

  const projects = items.map((it) => ({
    id: it.projectId,
    name: it.projectName,
    avgSuccessMins: Number(it.avgMins ?? 0),
    sampleCount: Number(it.sampleCount ?? 0),
    withinMinutes: Number(it.withinMinutes ?? 0),
    overMinutes: Number(it.overMinutes ?? 0),
  }));

  return { thresholdMins: effectiveThreshold, projects };
}
