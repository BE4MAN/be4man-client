// 작성자 : 김민호
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
    deployTitle: '인증 모듈 신규 배포',
    deployBody: 'OAuth 2.0 기반 인증 모듈을 서비스에 반영합니다.',
    scheduledAt: '2025-10-21 22:00',
    expectedDuration: '30분',

    deployMetrics: [
      { label: '배포 전략', value: 'Canary' },
      { label: '예상 다운타임', value: '0분' },
      { label: '배포 상태', value: '긴급' },
      { label: '버전', value: 'v1.2.3' },
    ],

    reviewSummary: {
      approved: 2,
      changesRequested: 1,
      commented: 5,
      dismissed: 0,
      latestApprovalAt: '2025-10-19T12:30:00Z',
      approvers: [
        {
          login: 'alice',
          avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
        {
          login: 'bob',
          avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
        },
      ],
      requestedReviewers: ['carol', 'dave'],
    },
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
    deployTitle: '대시보드 UI 개편 배포',
    deployBody: '신규 위젯/차트 추가 및 레이아웃 개선 반영.',
    scheduledAt: '2025-10-22 01:00',
    expectedDuration: '45분',

    deployMetrics: [
      { label: '배포 전략', value: 'Rolling' },
      { label: '예상 다운타임', value: '0분' },
      { label: '빌드 번호', value: '#146' },
      { label: '릴리스 태그', value: 'v1.2.4' },
    ],
    reviewSummary: {
      approved: 2,
      changesRequested: 1,
      commented: 5,
      dismissed: 0,
      latestApprovalAt: '2025-10-19T12:30:00Z',
      approvers: [
        {
          login: 'alice',
          avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
        {
          login: 'bob',
          avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
        },
      ],
      requestedReviewers: ['carol', 'dave'],
    },
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
  relatedProjects: [
    { name: 'user-service', active: true },
    { name: 'billing-api', active: true },
    { name: 'notification', active: true },
    { name: 'legacy-', time: '16:00 - 18:00', active: false },
    { name: 'Project B', time: '17:00 - 19:00', active: false },
  ],
  risks: MOCK_RISKS,

  deployTitle: '인증 모듈 신규 배포',
  deployBody: 'OAuth 2.0 기반 인증 모듈을 서비스에 반영합니다.',
  scheduledAt: '2025-10-21 22:00',
  expectedDuration: '30분',

  deployMetrics: [
    { label: '배포 전략', value: 'Canary' },
    { label: '예상 다운타임', value: '0분' },
    { label: '빌드 번호', value: '#145' },
    { label: '릴리스 태그', value: 'v1.2.3' },
  ],
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

  deployTitle: item?.deployTitle ?? base.deployTitle,
  deployBody: item?.deployBody ?? base.deployBody,
  scheduledAt: item?.scheduledAt ?? base.scheduledAt,
  expectedDuration: item?.expectedDuration ?? base.expectedDuration,
  deployMetrics: item?.deployMetrics ?? base.deployMetrics,
  reviewSummary: item?.reviewSummary ?? base.reviewSummary,
});

export const MOCK_APPLY_LIST = [
  {
    id: 'ap-1',
    branch: 'feature/new-payment',
    title: '배포 작업 신청: 결제 모듈 추가',
    votes: '+12',
    comments: 3,
    hours: '1 hour ago',
    status: '신청전',
    risk: 'Low',

    reviewSummary: {
      approved: 2,
      changesRequested: 1,
      commented: 5,
      dismissed: 0,
      latestApprovalAt: 'Jan 15, 2025 at 2:30 PM',
      approvers: [
        {
          login: 'alice',
          avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
        {
          login: 'bob',
          avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
        },
      ],
      requestedReviewers: ['carol', 'dave'],
    },
  },
  {
    id: 'ap-2',
    branch: 'chore/log-rotation',
    title: '배포 작업 신청: 로그 로테이션 주기 변경',
    votes: '+3',
    comments: 0,
    hours: '5 hours ago',
    status: '신청전',
    risk: 'Low',

    reviewSummary: {
      approved: 2,
      changesRequested: 1,
      commented: 5,
      dismissed: 0,
      latestApprovalAt: 'Jan 15, 2025 at 2:30 PM',
      approvers: [
        {
          login: 'alice',
          avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
        {
          login: 'bob',
          avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
        },
      ],
      requestedReviewers: ['carol', 'dave'],
    },
  },
];
