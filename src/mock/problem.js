// 작성자 : 이원석
/**
 * Problem Management Mock Data
 * 실제 백엔드 API 연동 전까지 사용할 목 데이터
 */

// 문제 카테고리 Mock Data
export const mockProblemCategories = [
  {
    id: 1,
    projectId: 1,
    accountId: 1,
    title: '배포 순서 오류',
    description: '배포 순서와 관련된 문제들',
  },
  {
    id: 2,
    projectId: 1,
    accountId: 2,
    title: '승인 프로세스 관련',
    description: '승인 프로세스와 관련된 문제들',
  },
  {
    id: 3,
    projectId: 1,
    accountId: 3,
    title: '설정 오류',
    description: '환경 설정 및 구성 오류',
  },
  {
    id: 4,
    projectId: 1,
    accountId: 4,
    title: '롤백 실패',
    description: '롤백 과정에서 발생하는 문제들',
  },
];

// 문제 Mock Data
export const mockProblems = [
  {
    id: 1,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: 'API 순서 반영 누락으로 인한 배포 실패',
    description: `발생 상황:
배포 진행 시 API Gateway → Backend API → Database 순서로 배포해야 하는데, Backend API를 먼저 배포하여 API Gateway에서 새로운 엔드포인트를 찾지 못하는 문제가 발생했습니다.

이로 인해 약 15분간 서비스 장애가 발생했으며, 사용자들은 로그인 및 주요 기능을 사용할 수 없었습니다.

예방법:
1. 배포 순서를 명확히 문서화하고 배포 체크리스트에 포함
2. 배포 자동화 스크립트에 의존성 순서 검증 로직 추가
3. 배포 전 순서 검토를 필수 승인 항목으로 추가
4. 순서가 잘못된 경우 자동으로 배포를 중단하는 안전장치 마련`,
    importance: 'HIGH',
    accountId: 1,
    createdAt: '2025-01-15T14:32:00',
    deployments: [302, 287, 265],
    services: ['유저 서비스', 'API 게이트웨이'],
  },
  {
    id: 2,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: 'DB 마이그레이션 선행 조건 미준수',
    description: `발생 상황:
데이터베이스 마이그레이션을 실행하기 전에 필요한 선행 작업(백업, 스키마 검증 등)을 수행하지 않아 마이그레이션 실패가 발생했습니다.

예방법:
1. 마이그레이션 전 자동화된 선행 조건 검증 스크립트 실행
2. 마이그레이션 체크리스트 작성 및 검토`,
    importance: 'HIGH',
    accountId: 2,
    createdAt: '2025-01-14T10:20:00',
    deployments: [301],
    services: ['결제 서비스'],
  },
  {
    id: 3,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '이중 승인 누락',
    description: `발생 상황:
중요한 배포 작업에 대해 이중 승인이 필요한데, 단일 승인만 받고 배포를 진행하여 문제가 발생했습니다.

예방법:
1. 배포 중요도에 따른 승인 단계 자동 설정
2. 승인 프로세스 검증 로직 추가`,
    importance: 'MEDIUM',
    accountId: 3,
    createdAt: '2025-01-13T16:45:00',
    deployments: [],
    services: ['검색 서비스'],
  },
  {
    id: 4,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '승인 요청 시간 초과',
    description: `발생 상황:
승인 요청 후 일정 시간 내에 승인을 받지 못하여 배포 일정이 지연되었습니다.

예방법:
1. 승인 요청 알림 시스템 개선
2. 승인 대기 시간 모니터링 및 알림`,
    importance: 'LOW',
    accountId: 4,
    createdAt: '2025-01-12T09:15:00',
    deployments: [],
    services: ['알림 서비스'],
  },
  {
    id: 5,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '환경 변수 설정 누락으로 서비스 시작 실패',
    description: `발생 상황:
필수 환경 변수가 설정되지 않아 서비스가 시작되지 않았습니다.

예방법:
1. 환경 변수 검증 스크립트 추가
2. 배포 전 환경 변수 체크리스트 검토`,
    importance: 'HIGH',
    accountId: 5,
    createdAt: '2025-01-11T11:30:00',
    deployments: [298],
    services: ['푸시 서비스'],
  },
  {
    id: 6,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '잘못된 포트 설정',
    description: `발생 상황:
포트 번호가 잘못 설정되어 서비스 간 통신이 실패했습니다.

예방법:
1. 포트 설정 검증 로직 추가
2. 포트 충돌 감지 시스템 구축`,
    importance: 'MEDIUM',
    accountId: 6,
    createdAt: '2025-01-10T15:22:00',
    deployments: [],
    services: ['API 게이트웨이'],
  },
  {
    id: 7,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '백업 데이터 손실로 롤백 불가',
    description: `발생 상황:
롤백을 시도했으나 백업 데이터가 손실되어 이전 버전으로 복구할 수 없었습니다.

예방법:
1. 정기적인 백업 자동화
2. 백업 데이터 무결성 검증
3. 여러 백업 저장소 활용`,
    importance: 'HIGH',
    accountId: 7,
    createdAt: '2025-01-09T13:50:00',
    deployments: [295],
    services: ['유저 서비스'],
  },
  {
    id: 8,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '이전 버전 호환성 문제',
    description: `발생 상황:
롤백 시도 시 이전 버전과 현재 데이터베이스 스키마 간 호환성 문제가 발생했습니다.

예방법:
1. 롤백 전 호환성 검증
2. 스키마 버전 관리 시스템 구축`,
    importance: 'MEDIUM',
    accountId: 8,
    createdAt: '2025-01-08T10:10:00',
    deployments: [290],
    services: ['결제 서비스'],
  },
  {
    id: 9,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: '캐시 서버 배포 타이밍 오류',
    description: `발생 상황:
캐시 서버를 데이터베이스 업데이트 전에 배포하여 오래된 데이터가 캐시에 남아있어 일관성 문제가 발생했습니다.

예방법:
1. 캐시 무효화 전략 수립
2. 배포 순서에 캐시 관리 단계 포함`,
    importance: 'MEDIUM',
    accountId: 9,
    createdAt: '2025-01-07T11:20:00',
    deployments: [288],
    services: ['검색 서비스', 'API 게이트웨이'],
  },
  {
    id: 10,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: '마이크로서비스 간 의존성 무시',
    description: `발생 상황:
서비스 A가 서비스 B에 의존하는데, 서비스 B를 먼저 배포하여 서비스 A가 연결 실패를 겪었습니다.

예방법:
1. 서비스 의존성 그래프 작성
2. 배포 순서 자동 검증 도구 도입`,
    importance: 'HIGH',
    accountId: 10,
    createdAt: '2025-01-06T14:15:00',
    deployments: [285, 284],
    services: ['유저 서비스', '결제 서비스'],
  },
  {
    id: 11,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: '프론트엔드와 백엔드 버전 불일치',
    description: `발생 상황:
프론트엔드를 먼저 배포하여 새로운 API를 호출했으나 백엔드가 아직 업데이트되지 않아 404 에러가 발생했습니다.

예방법:
1. API 버전 관리 체계 구축
2. 배포 순서 문서화 및 검증`,
    importance: 'MEDIUM',
    accountId: 1,
    createdAt: '2025-01-05T09:30:00',
    deployments: [283],
    services: ['유저 서비스'],
  },
  {
    id: 12,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '비상 배포 시 승인 프로세스 우회',
    description: `발생 상황:
긴급 상황에서 승인 프로세스를 우회하여 배포했으나, 이후 문제가 발생했습니다.

예방법:
1. 비상 배포 프로세스 명확화
2. 사후 승인 절차 마련`,
    importance: 'HIGH',
    accountId: 2,
    createdAt: '2025-01-04T16:45:00',
    deployments: [282],
    services: ['결제 서비스'],
  },
  {
    id: 13,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '승인자 부재 시 대체 승인자 미지정',
    description: `발생 상황:
주 승인자가 부재 중이어서 배포가 지연되었고, 대체 승인자가 지정되지 않아 문제가 발생했습니다.

예방법:
1. 대체 승인자 자동 지정 시스템
2. 승인자 부재 알림 개선`,
    importance: 'MEDIUM',
    accountId: 3,
    createdAt: '2025-01-03T13:20:00',
    deployments: [],
    services: ['검색 서비스'],
  },
  {
    id: 14,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '승인 조건 미충족 상태에서 배포 진행',
    description: `발생 상황:
필수 승인 조건을 충족하지 못한 상태에서 배포가 진행되어 문제가 발생했습니다.

예방법:
1. 승인 조건 자동 검증
2. 조건 미충족 시 배포 차단`,
    importance: 'HIGH',
    accountId: 4,
    createdAt: '2025-01-02T10:10:00',
    deployments: [281],
    services: ['알림 서비스'],
  },
  {
    id: 15,
    category: {
      id: 2,
      title: '승인 프로세스 관련',
      description: '승인 프로세스와 관련된 문제들',
    },
    title: '승인 취소 후 재승인 누락',
    description: `발생 상황:
승인이 취소된 후 재승인을 받지 않고 배포를 진행하여 문제가 발생했습니다.

예방법:
1. 승인 상태 추적 시스템
2. 승인 취소 시 알림 및 재승인 요구`,
    importance: 'MEDIUM',
    accountId: 5,
    createdAt: '2025-01-01T15:30:00',
    deployments: [],
    services: ['푸시 서비스'],
  },
  {
    id: 16,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '데이터베이스 연결 문자열 오류',
    description: `발생 상황:
데이터베이스 연결 문자열이 잘못 설정되어 서비스가 시작되지 않았습니다.

예방법:
1. 연결 문자열 검증 스크립트
2. 설정 파일 템플릿 제공`,
    importance: 'HIGH',
    accountId: 6,
    createdAt: '2024-12-31T11:00:00',
    deployments: [280],
    services: ['부사 서비스'],
  },
  {
    id: 17,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: 'SSL 인증서 만료',
    description: `발생 상황:
SSL 인증서가 만료되었는데 갱신하지 않아 HTTPS 연결이 실패했습니다.

예방법:
1. 인증서 만료 알림 시스템
2. 자동 갱신 프로세스 구축`,
    importance: 'HIGH',
    accountId: 7,
    createdAt: '2024-12-30T09:15:00',
    deployments: [279],
    services: ['API 게이트웨이'],
  },
  {
    id: 18,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '로드 밸런서 설정 오류',
    description: `발생 상황:
로드 밸런서의 헬스 체크 설정이 잘못되어 정상 서버가 다운으로 인식되었습니다.

예방법:
1. 헬스 체크 설정 검증
2. 로드 밸런서 설정 템플릿 제공`,
    importance: 'MEDIUM',
    accountId: 8,
    createdAt: '2024-12-29T14:20:00',
    deployments: [],
    services: ['유저 서비스', '결제 서비스'],
  },
  {
    id: 19,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '타임아웃 설정 부적절',
    description: `발생 상황:
API 타임아웃 설정이 너무 짧아 정상적인 요청도 실패로 처리되었습니다.

예방법:
1. 타임아웃 설정 가이드라인 수립
2. 환경별 타임아웃 값 검증`,
    importance: 'LOW',
    accountId: 9,
    createdAt: '2024-12-28T16:45:00',
    deployments: [278],
    services: ['검색 서비스'],
  },
  {
    id: 20,
    category: {
      id: 3,
      title: '설정 오류',
      description: '환경 설정 및 구성 오류',
    },
    title: '리소스 제한 설정 오류',
    description: `발생 상황:
메모리 및 CPU 리소스 제한이 너무 낮게 설정되어 서비스가 불안정했습니다.

예방법:
1. 리소스 사용량 모니터링
2. 적절한 리소스 할당 가이드 제공`,
    importance: 'MEDIUM',
    accountId: 10,
    createdAt: '2024-12-27T10:30:00',
    deployments: [],
    services: ['알림 서비스'],
  },
  {
    id: 21,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '롤백 스크립트 오류',
    description: `발생 상황:
롤백 스크립트에 버그가 있어 롤백이 제대로 실행되지 않았습니다.

예방법:
1. 롤백 스크립트 테스트 자동화
2. 롤백 프로세스 검증`,
    importance: 'HIGH',
    accountId: 1,
    createdAt: '2024-12-26T13:15:00',
    deployments: [277],
    services: ['푸시 서비스'],
  },
  {
    id: 22,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '롤백 중 데이터 손실',
    description: `발생 상황:
롤백 과정에서 일부 데이터가 손실되어 복구가 불완전했습니다.

예방법:
1. 롤백 전 데이터 백업 강화
2. 롤백 프로세스 검증 강화`,
    importance: 'HIGH',
    accountId: 2,
    createdAt: '2024-12-25T11:00:00',
    deployments: [276],
    services: ['부사 서비스'],
  },
  {
    id: 23,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '롤백 시간 초과',
    description: `발생 상황:
롤백 작업이 예상보다 오래 걸려 타임아웃이 발생했습니다.

예방법:
1. 롤백 시간 모니터링
2. 롤백 프로세스 최적화`,
    importance: 'MEDIUM',
    accountId: 3,
    createdAt: '2024-12-24T15:20:00',
    deployments: [275],
    services: ['API 게이트웨이'],
  },
  {
    id: 24,
    category: {
      id: 4,
      title: '롤백 실패',
      description: '롤백 과정에서 발생하는 문제들',
    },
    title: '롤백 후 서비스 재시작 실패',
    description: `발생 상황:
롤백은 성공했으나 서비스를 재시작하는 과정에서 문제가 발생했습니다.

예방법:
1. 롤백 후 재시작 프로세스 자동화
2. 재시작 검증 로직 추가`,
    importance: 'MEDIUM',
    accountId: 4,
    createdAt: '2024-12-23T09:45:00',
    deployments: [],
    services: ['유저 서비스'],
  },
  {
    id: 25,
    category: {
      id: 1,
      title: '배포 순서 오류',
      description: '배포 순서와 관련된 문제들',
    },
    title: '메시지 큐 배포 순서 오류',
    description: `발생 상황:
메시지 큐를 소비하는 서비스를 먼저 배포하여 큐가 준비되기 전에 연결을 시도했습니다.

예방법:
1. 메시지 큐 배포 순서 명확화
2. 큐 준비 상태 확인 로직 추가`,
    importance: 'MEDIUM',
    accountId: 5,
    createdAt: '2024-12-22T14:10:00',
    deployments: [274],
    services: ['알림 서비스', '푸시 서비스'],
  },
];

// 배포 목록 Mock Data (id, title만)
export const mockDeployments = [
  { id: 302, title: '유저 서비스 배포 계획서 상신' },
  { id: 301, title: '결제 서비스 배포 결과 보고서 상신' },
  { id: 300, title: '정산 서비스 배포 계획' },
  { id: 299, title: '검색 서비스 롤백 보고서' },
  { id: 298, title: '푸시 서비스 핫픽스 계획' },
  { id: 297, title: '알림 서비스 업데이트' },
  { id: 296, title: 'API 게이트웨이 배포' },
  { id: 295, title: '부사 서비스 배포' },
  { id: 290, title: '데이터베이스 마이그레이션' },
  { id: 287, title: '인프라 업그레이드' },
  { id: 265, title: '보안 패치 적용' },
];

// 등록자 정보 Mock Data (accountId 매핑)
export const mockRegistrants = {
  1: { name: '김민호', department: '개발1팀' },
  2: { name: '이지은', department: '개발2팀' },
  3: { name: '박지훈', department: '개발3팀' },
  4: { name: '최서연', department: '개발1팀' },
  5: { name: '정현우', department: '개발2팀' },
  6: { name: '강민지', department: '개발3팀' },
  7: { name: '윤수진', department: '개발1팀' },
  8: { name: '임동현', department: '개발2팀' },
  9: { name: '한소희', department: '개발3팀' },
  10: { name: '조성민', department: '개발1팀' },
};
