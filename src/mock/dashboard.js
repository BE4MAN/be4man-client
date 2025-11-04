export const PENDING_APPROVALS = [
  {
    id: 101,
    title: '결제 서비스 배포 작업 계획서',
    docType: '작업계획서',
    serviceName: '결제 서비스',
    requestedAt: '2025-10-27 10:30',
    currentApprover: '김리뷰',
    status: '승인 대기',
  },
  {
    id: 102,
    title: '알림 서비스 야간 배포 계획서',
    docType: '작업계획서',
    serviceName: '알림 서비스',
    requestedAt: '2025-10-28 09:10',
    currentApprover: '박리뷰',
    status: '승인 대기',
  },
];

export const IN_PROGRESS_TASKS = [
  {
    id: 201,
    title: '사용자 서비스 신규 배포',
    due: '2025-10-30',
    status: '배포 대기',
    owner: '김민호',
    progress: 65,
    desc: '승인은 완료되었고, 배포 시간까지 대기 중입니다.',
    file: 'user-service-deploy-plan.pdf',
  },
  {
    id: 202,
    title: '검색 서비스 인덱스 재구성',
    due: '2025-10-31',
    status: '배포 준비',
    owner: '김민호',
    progress: 40,
    desc: '사전 점검 작업 진행 중입니다.',
    file: 'search-service-reindex.xlsx',
  },
];

export const NOTIFICATIONS = [
  {
    id: 301,
    kind: '취소',
    reason: '작업 금지 기간에 해당되어 자동 취소되었습니다.',
    serviceName: '결제 서비스',
    when: '2025-10-27 11:00',
  },
  {
    id: 302,
    kind: '반려',
    reason: '모니터링 계획이 부족하여 팀장에 의해 반려되었습니다.',
    serviceName: '알림 서비스',
    when: '2025-10-28 16:20',
    rejectedBy: '팀장 이수민',
  },
];

export const WEEKLY_EVENTS = {
  '2025-10-27': [
    { id: 1, type: '대기', label: '결제 서비스 배포 대기' },
    { id: 2, type: '성공', label: '알림 서비스 배포 성공' },
  ],
  '2025-10-28': [{ id: 3, type: '실패', label: '검색 서비스 배포 실패' }],
  '2025-10-30': [
    { id: 4, type: '대기', label: '사용자 서비스 야간 배포 대기' },
  ],
  '2025-11-03': [
    { id: 5, type: '대기', label: '사용자 서비스 야간 배포 대기' },
    { id: 6, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 7, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 8, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 9, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 10, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 11, type: '성공', label: '알림 서비스 배포 성공' },
    { id: 12, type: '성공', label: '알림 서비스 배포 성공' },
  ],
};

export const DEPLOYMENT_BLACKOUTS = [
  {
    id: 1,
    name: '월말 정산 작업 금지',
    start: '2025-10-31 00:00:00',
    end: '2025-10-31 23:59:59',
    reason: '월말 정산으로 인한 배포 제한',
  },
  {
    id: 2,
    name: '금요일 야간 배포 금지',
    start: '2025-10-24 18:00:00',
    end: '2025-10-25 06:00:00',
    reason: '야간 안정성 확보',
  },
  {
    id: 3,
    name: '금요일 야간 배포 금지',
    start: '2025-11-03 18:00:00',
    end: '2025-11-05 06:00:00',
    reason: '야간 안정성 확보',
  },
];

export const RECOVERY = [
  {
    service: '결제 서비스',
    failedAt: '25.10.29 15:22',
    cause: 'DB 마이그레이션 실패',
    status: '복구 완료',
    duration: '42분',
    team: 'DevOps팀',
  },
  {
    service: '알림 서비스',
    failedAt: '25.10.28 18:10',
    cause: '배포 버전 오류로 인한 롤백',
    status: '진행중',
    duration: '-',
    team: '백엔드팀',
  },
  {
    service: '사용자 서비스',
    failedAt: '25.10.27 09:50',
    cause: '긴급 롤백',
    status: '분석중',
    duration: '-',
    team: '프론트팀',
  },
];

export const STATS = [
  {
    id: 'pending',
    label: '승인 대기',
    value: PENDING_APPROVALS.length,
    desc: '결재가 필요한 문서',
    color: '#2563eb',
  },
  {
    id: 'tasks',
    label: '진행중인 업무',
    value: IN_PROGRESS_TASKS.length,
    desc: '내가 승인한 후 배포 대기',
    color: '#7c3aed',
  },
  {
    id: 'notifications',
    label: '알림',
    value: NOTIFICATIONS.length,
    desc: '취소/반려 알림',
    color: '#dc2626',
  },
];
