export const MOCK_RISKS = [
  {
    text: 'Project C의 서버가 점검 중으로 배포 중 운영상의 위험이 있을 수 있음',
    sub: '(Project C 서버 점검 시간 : 16:00 - 18:00)',
  },
  {
    text: '정부24의 외부 API를 활용하는 서비스로, 24:00 이후 배포 진행 권장',
  },
];

export const MOCK_LIST = [
  {
    id: '1',
    branch: 'feature/auth-improvements',
    title: 'feat: Oauth 2.0 구현',
    votes: '+24',
    comments: 8,
    hours: '2 hours ago',
    status: '승인대기',
    risk: 'Low',
  },
  {
    id: '2',
    branch: 'feature/dashboard-redesign',
    title: 'feat: 대시보드 UI 구현',
    votes: '+156',
    comments: 7,
    hours: '4 hours ago',
    status: '승인완료',
    risk: 'Medium',
  },
  {
    id: '3',
    branch: 'hotfix/security-patch',
    title: 'feat: 스프링 시큐리티 구현',
    votes: '+12',
    comments: 2,
    hours: '6 hours ago',
    status: '반려',
    risk: 'High',
  },
  {
    id: '4',
    branch: 'feature/api-optimization',
    title: 'feat: api 최적화',
    votes: '+67',
    comments: 1,
    hours: '8 hours ago',
    status: '배포완료',
    risk: 'Low',
  },
  {
    id: '5',
    branch: 'feature/api-optimization',
    title: 'feat: api 최적화',
    votes: '+67',
    comments: 1,
    hours: '8 hours ago',
    status: '배포완료',
    risk: 'Low',
  },
  {
    id: '6',
    branch: 'feature/api-optimization',
    title: 'feat: api 최적화',
    votes: '+67',
    comments: 1,
    hours: '8 hours ago',
    status: '배포완료',
    risk: 'Low',
  },
  {
    id: '7',
    branch: 'feature/api-optimization',
    title: 'feat: api 최적화',
    votes: '+67',
    comments: 1,
    hours: '8 hours ago',
    status: '배포완료',
    risk: 'Low',
  },
];

export const MOCK_DETAIL = {
  title: 'feat: Oauth 2.0 구현',
  branchFrom: 'feature/user-auth',
  branchTo: 'main',
  status: '승인대기',
  author: '김민호',
  createdAt: 'Jan 15, 2025 at 2:30 PM',
  description: '깃허브 ID로 서비스 이용을 위한 깃허브 Oauth 2.0 구현',
  metrics: [
    { label: '파일 변경 개수', value: 12 },
    { label: '라인 추가 개수', value: '+247' },
    { label: '라인 제거 개수', value: '-89' },
    { label: '커밋 개수', value: 8 },
  ],
  riskScore: 45,
  riskLevel: 'Medium',
  riskBreakdown: [
    { k: '코드 보전성', v: '중간' },
    { k: '테스트 개수', v: '30회' },
    { k: '테스트 커버리지', v: '충족 (89%)' },
    { k: '의존성', v: '2개 의존성' },
  ],
  riskSummary: [
    '코드 복잡성이 중간값으로 위험성 낮음',
    '2개의 의존성으로 위험성 보통',
    '테스트 커버리지 높음으로 위험성 낮음',
  ],
  relatedProjects: [
    { name: 'user-service', active: true },
    { name: 'billing-api', active: true },
    { name: 'notification', active: true },
    { name: 'legacy-', time: '16:00 - 18:00', active: false },
    { name: 'Project B', time: '17:00 - 19:00', active: false },
  ],
  risks: MOCK_RISKS,
};

export const statusKey = (label) => {
  switch (label) {
    case '승인대기':
      return 'pending';
    case '승인완료':
      return 'approved';
    case '반려':
      return 'rejected';
    case '배포완료':
      return 'deployed';
    default:
      return undefined;
  }
};

export const buildDetailFromItem = (item, base = MOCK_DETAIL) => ({
  ...base,
  title: item?.title ?? base.title,
  status: item?.status ?? base.status,
  branchFrom: item?.branch?.split('/')[0] || base.branchFrom,
  branchTo: 'main',
});
