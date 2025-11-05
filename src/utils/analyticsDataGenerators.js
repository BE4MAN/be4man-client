// Analytics 페이지용 데이터 생성 함수들 및 상수

// Constants
export const errorTypes = [
  { name: '서버 긴급 점검', count: 18, color: '#3B82F6' },
  { name: '리소스 제약', count: 42, color: '#FB923C' },
  { name: '배포 스크립트 오류', count: 25, color: '#EF4444' },
  { name: '의존성 충돌', count: 38, color: '#9CA3AF' },
  { name: '기타 헬스체크 실패', count: 12, color: '#10B981' },
];

export const filterOptions = [
  '서버 긴급 점검',
  '리소스 제약',
  '배포 스크립트 오류',
  '의존성 충돌',
  '기타 헬스체크 실패',
];

export const servers = [
  {
    name: '인사 서비스',
    status: 'online',
    cpu: 45,
    memory: 62,
    uptime: '99.8%',
  },
  {
    name: '결제 서비스',
    status: 'online',
    cpu: 38,
    memory: 58,
    uptime: '99.9%',
  },
  {
    name: '자원 관리 서비스',
    status: 'online',
    cpu: 72,
    memory: 84,
    uptime: '99.7%',
  },
  {
    name: 'AiWacs 서비스',
    status: 'online',
    cpu: 54,
    memory: 71,
    uptime: '99.5%',
  },
];

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
      errorRate: 3 + Math.random() * 8,
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

/**
 * 월별 배포 통계 데이터 생성
 */
export const generateMonthlyDeploymentData = () => {
  const data = [];
  const months = 12;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    data.push({
      label: monthNames[date.getMonth()],
      deployments: Math.floor(Math.random() * 50) + 30,
      success: Math.floor(Math.random() * 45) + 25,
      failed: Math.floor(Math.random() * 10) + 2,
    });
  }
  return data;
};

/**
 * 연도별 배포 통계 데이터 생성
 */
export const generateYearlyDeploymentData = () => {
  const data = [];
  const currentYear = new Date().getFullYear();

  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    data.push({
      label: `${year}년`,
      deployments: Math.floor(Math.random() * 500) + 300,
      success: Math.floor(Math.random() * 450) + 250,
      failed: Math.floor(Math.random() * 80) + 20,
    });
  }
  return data;
};

/**
 * 배포 소요 시간 데이터 생성
 * @param {string} service - 서비스 이름 ('hr', 'payment', 'resource', 'aiwacs', 'all')
 */
export const generateDurationData = (service) => {
  const data = [];
  const months = 12;

  const baseValues = {
    hr: 4.5,
    payment: 6.2,
    resource: 5.1,
    aiwacs: 3.8,
    all: 5.0,
  };

  const base = baseValues[service] || baseValues.all;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    data.push({
      date: monthNames[date.getMonth()],
      duration: base + Math.random() * 2 - 1,
    });
  }
  return data;
};

/**
 * 배포 성공률 데이터 생성
 * @param {string} service - 서비스 이름 ('hr', 'payment', 'resource', 'aiwacs', 'all')
 */
export const generateSuccessData = (service) => {
  const dataByService = {
    hr: { success: 142, failed: 18 },
    payment: { success: 156, failed: 24 },
    resource: { success: 98, failed: 15 },
    aiwacs: { success: 165, failed: 12 },
    all: { success: 561, failed: 69 },
  };

  return dataByService[service] || dataByService.all;
};

/**
 * 서버 모니터링 CPU/메모리 데이터 생성
 */
export const generateCpuData = () => {
  const data = [];
  const months = 12;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    data.push({
      date: monthNames[date.getMonth()],
      cpu: 40 + Math.random() * 30,
      memory: 50 + Math.random() * 25,
    });
  }
  return data;
};
