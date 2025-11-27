// 작성자 : 허겸, 조윤상
const mockData = [
  // ========== 3. 레포트: 1명만 승인, 계획서는 5명 모두 승인 ==========
  {
    id: 2,
    drafter: '정서진',
    department: '개발3팀',
    serviceName: 'Frontend Framework',
    taskTitle: '프론트엔드 프레임워크 업그레이드',
    stage: '결과보고',
    status: '승인대기',
    completionTime: null,
    result: '성공',

    planInfo: {
      type: 'Feature',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '중간' },
      assignee: '정서진',
      draftDate: '2025-08-12',
      deploymentDateTime: {
        start: '2025-08-13 14:00',
        end: '2025-08-13 16:00',
      },
    },

    detailInfo: `1. 개요
프론트엔드 프레임워크를 최신 버전으로 업그레이드하여 빌드 성능과 번들 크기를 최적화합니다.

2. 목표
- 빌드 시간 40% 단축
- 번들 크기 30% 감소
- 최신 기능 활용 및 보안 패치 적용

3. 일정
시작: 2025-08-13 14:00
종료: 2025-08-13 16:00

4. 수행 내용
- 프레임워크 업그레이드 (v16 → v18)
- 의존성 패키지 최신화
- 테스트 코드 실행 및 검증
- 배포 스크립트 업데이트

5. 리스크
특이사항 없음

6. 백업 계획
이전 버전 유지 및 Git 태그 생성

7. 실패 시 복구 방안
- 즉시 이전 버전으로 롤백
- Git 태그를 이용한 신속한 복구`,

    approval: {
      canApprove: false,

      // 계획서: 5명 모두 승인
      planApprovalHistory: [
        {
          approver: '강팀장',
          department: '개발3팀',
          role: '팀장',
          email: 'kang.fe@company.com',
          phone: '02-1234-7011',
          status: '승인',
          approvedAt: '2025-08-12 15:00',
          comment: '기술 검토.',
          order: 1,
        },
        {
          approver: '윤개발리더',
          department: '개발본부',
          role: '개발리더',
          email: 'yoon.fe@company.com',
          phone: '02-1234-7012',
          status: '승인',
          approvedAt: '2025-08-12 15:30',
          comment: '프레임워크 검토.',
          order: 2,
        },
        {
          approver: '조팀장',
          department: 'QA팀',
          role: '팀장',
          email: 'cho.qa@company.com',
          phone: '02-1234-7013',
          status: '승인',
          approvedAt: '2025-08-12 16:00',
          comment: 'QA 검토.',
          order: 3,
        },
        {
          approver: '윤개발리더2',
          department: '개발본부',
          role: '개발리더',
          email: 'yoon.lead@company.com',
          phone: '02-1234-7014',
          status: '승인',
          approvedAt: '2025-08-12 16:30',
          comment: '기술리더 검토.',
          order: 4,
        },
        {
          approver: '이이사',
          department: '개발본부',
          role: '이사',
          email: 'lee.fe@company.com',
          phone: '02-1234-7015',
          status: '승인',
          approvedAt: '2025-08-12 17:00',
          comment: '최종 승인.',
          order: 5,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,

      // 레포트: 1명만 승인
      reportApprovalHistory: [
        {
          approver: '송팀장',
          department: '개발3팀',
          role: '팀장',
          email: 'song.fe@company.com',
          phone: '02-1234-7016',
          status: '승인',
          approvedAt: '2025-08-13 15:00',
          comment: '배포 결과 우수.',
          order: 1,
        },
        {
          approver: '최개발리더',
          department: '개발본부',
          role: '개발리더',
          email: 'choi.lead2@company.com',
          phone: '02-1234-7017',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 2,
        },
        {
          approver: '이팀장',
          department: 'QA팀',
          role: '팀장',
          email: 'lee.qa@company.com',
          phone: '02-1234-7018',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 3,
        },
        {
          approver: '박이사',
          department: '개발본부',
          role: '이사',
          email: 'park.fe@company.com',
          phone: '02-1234-7019',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 4,
        },
      ],
      nextReportApprover: {
        name: '최개발리더',
        department: '개발본부',
        role: '개발리더',
        order: 2,
        email: 'choi.lead2@company.com',
        phone: '02-1234-7017',
        waitingTime: '45분',
        notificationSent: true,
        notificationSentAt: '2025-08-13 15:05',
      },
    },

    report: `요약
프론트엔드 프레임워크 업그레이드 배포가 성공적으로 완료되었습니다. 목표했던 성능 개선이 모두 달성되었습니다.

성능 지표
- 이전: 빌드 시간 60초, 번들 크기 500KB
- 현재: 빌드 시간 36초, 번들 크기 350KB
- 개선율: 빌드 시간 40% 단축, 번들 크기 30% 감소

발견된 이슈
특이사항 없음

다음 단계
- 프로덕션 성능 모니터링 지속
- 사용자 피드백 수집`,

    jenkinsLog: {
      buildNumber: '2872',
      status: '성공',
      duration: '45분',
      branch: 'main',
      pr: '#4542 - Frontend Upgrade',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Prod', status: '성공' },
      ],
      logs: [
        { time: '14:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '14:45:00', level: 'INFO', message: '[Deploy] 완료' },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-12 14:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-12 17:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-13 14:00' },
      {
        step: '배포 종료',
        status: '완료',
        time: '2025-08-13 14:45',
        result: '성공',
      },
      { step: '결과 보고', status: '작성완료', time: '2025-08-13 15:00' },
      { step: '결과 승인', status: '진행중', time: null, disabled: false },
    ],
  },

  {
    id: 505,
    drafter: '이준호',
    department: '개발5팀',
    serviceName: 'Machine Learning',
    taskTitle: 'ML 모델 배포',
    stage: '배포',
    status: '취소',
    completionTime: '2025-08-14 11:30',
    result: null,

    planInfo: {
      type: 'Feature',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '중간' },
      assignee: '이준호',
      draftDate: '2025-08-13',
      deploymentDateTime: {
        start: '2025-08-14 09:00',
        end: '2025-08-14 11:00',
      },
    },

    detailInfo: `1. 개요
ML 모델 실시간 배포

2. 목표
- 모델 정확도 95% 달성

3. 일정
시작: 2025-08-14 09:00
종료: 2025-08-14 11:00

4. 수행 내용
- 모델 로드
- 검증

5. 리스크
특이사항 없음

6. 백업 계획
이전 모델 유지

7. 실패 시 복구 방안
- 즉시 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '도팀장',
          department: '개발5팀',
          role: '팀장',
          email: 'do.ml@company.com',
          phone: '02-1234-7022',
          status: '승인',
          approvedAt: '2025-08-13 15:00',
          comment: '기술 검토.',
          order: 1,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,
      reportApprovalHistory: [],

      // ✅ 취소 이력을 별도의 객체로 분리 (승인 이력과 동일 구조)
      cancellationHistory: {
        cancelledBy: '이준호', // 취소한 사람 (이름)
        department: '개발5팀', // 취소한 사람의 부서
        role: '개발자', // 취소한 사람의 역할
        email: 'junho.lee@company.com', // 취소한 사람의 이메일
        phone: '02-1234-5678', // 취소한 사람의 전화
        cancelledAt: '2025-08-14 11:30', // 취소 시간
        reason:
          '배포 중 모델 검증에서 예상치 못한 오류 발견. 안정성 검토 필요.',
        stage: '배포 중', // 취소 단계 (배포 중, 배포 전 등)
        type: 'MANUAL', // 취소 타입 (MANUAL, SYSTEM, AUTO_ROLLBACK 등)
      },

      // ✅ 기존 필드는 하위 호환성을 위해 유지 (선택사항)
      cancellationReason: {
        actor: '이준호(개발5팀)',
        processedAt: '2025-08-14 11:30',
        reason:
          '배포 중 모델 검증에서 예상치 못한 오류 발견. 안정성 검토 필요.',
      },
    },

    report: null,
    jenkinsLog: {
      buildNumber: '2873',
      status: '중단',
      duration: '120분',
      branch: 'main',
      pr: '#4543 - ML Model Deploy',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Model Validation', status: '실패' },
        { name: 'Deploy to Prod', status: '중단' },
      ],
      logs: [
        { time: '09:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '09:30:00', level: 'INFO', message: '[Build] 완료' },
        {
          time: '10:00:00',
          level: 'INFO',
          message: '[Validation] 모델 검증 중',
        },
        { time: '10:45:00', level: 'ERROR', message: '[Validation] 오류 발생' },
        { time: '11:30:00', level: 'INFO', message: '[Deploy] 중단' },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-13 14:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-13 15:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-14 09:00' },
      {
        step: '배포 종료',
        status: '취소',
        time: '2025-08-14 11:30',
        rejected: true,
        cancelledBy: '이준호',
      },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 6. 배포 실패 후 롤백 ==========
  {
    id: 506,
    drafter: '김석주',
    department: '개발6팀',
    serviceName: 'Real-time Analytics',
    taskTitle: '실시간 분석 시스템 배포',
    stage: '배포',
    status: '종료',
    completionTime: '2025-08-14 15:45',
    result: '실패',

    planInfo: {
      type: 'Update',
      environment: 'PROD',
      impact: '높음',
      risk: { level: '높음' },
      assignee: '김석주',
      draftDate: '2025-08-13',
      deploymentDateTime: {
        start: '2025-08-14 14:00',
        end: '2025-08-14 16:00',
      },
    },

    detailInfo: `1. 개요
실시간 분석 시스템 배포

2. 목표
- 응답시간 100ms 이하

3. 일정
시작: 2025-08-14 14:00
종료: 2025-08-14 16:00

4. 수행 내용
- 시스템 배포

5. 리스크
특이사항 없음

6. 백업 계획
이전 시스템 유지

7. 실패 시 복구 방안
- 즉시 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '강팀장',
          department: '개발6팀',
          role: '팀장',
          email: 'kang.analytics@company.com',
          phone: '02-1234-7023',
          status: '승인',
          approvedAt: '2025-08-13 16:00',
          comment: '기술 검토.',
          order: 1,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,
      reportApprovalHistory: [],
    },

    report: null,

    jenkinsLog: {
      buildNumber: '2874',
      status: '실패',
      duration: '45분',
      branch: 'main',
      pr: '#4544 - Analytics Deploy',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Prod', status: '실패' },
        { name: 'Rollback', status: '성공' },
      ],
      logs: [
        { time: '14:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '14:20:00', level: 'INFO', message: '[Build] 완료' },
        { time: '14:30:00', level: 'INFO', message: '[Deploy] 배포 시작' },
        {
          time: '14:40:00',
          level: 'ERROR',
          message: '[Deploy] 데이터 연결 실패',
        },
        { time: '14:45:00', level: 'INFO', message: '[Rollback] 롤백 완료' },
      ],

      // ✅ 추가: 에러 요약 및 상세 정보
      errorSummary:
        'Deploy to Prod 단계에서 데이터 연결 실패로 배포가 중단되었습니다. 자동 롤백이 수행되어 이전 버전이 복구되었습니다.',
      issueDetails: [
        'Database connection timeout: 데이터베이스 연결 시간 초과 (시도 시간: 10초)',
        'Connection pool exhausted: 연결 풀이 소진되어 새로운 연결을 할 수 없음',
        '원인: 신규 배포된 쿼리 최적화 코드가 DB 연결을 과도하게 소비',
        '해결 방안: 쿼리 성능 테스트 강화, 스트레스 테스트 단계 추가 필요',
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-13 15:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-13 16:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-14 14:00' },
      {
        step: '배포 종료',
        status: '완료',
        time: '2025-08-14 14:45',
        result: '실패',
        rejected: true,
      },
      { step: '결과 보고', status: '대기', time: null, disabled: false }, // ✅ 변경: '' → '대기'
      { step: '결과 승인', status: '대기', time: null, disabled: true }, // ✅ 변경: '' → '대기'
    ],
  },

  // ========== 8. 배포 완료 후 레포트 대기 ==========
  {
    id: 508,
    drafter: '임영준',
    department: '개발8팀',
    serviceName: 'Message Queue',
    taskTitle: '메시지 큐 최적화',
    stage: '결과보고', // ✅ 변경: '배포' → '레포트'
    status: '승인대기',
    completionTime: null,
    result: '성공',

    planInfo: {
      type: 'Update',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '중간' },
      assignee: '임영준',
      draftDate: '2025-08-14',
      deploymentDateTime: {
        start: '2025-08-15 10:00',
        end: '2025-08-15 11:00',
      },
    },

    detailInfo: `1. 개요
메시지 큐 성능 최적화

2. 목표
- 처리량 50% 향상

3. 일정
시작: 2025-08-15 10:00
종료: 2025-08-15 11:00

4. 수행 내용
- 성능 튜닝

5. 리스크
특이사항 없음

6. 백업 계획
이전 큐 유지

7. 실패 시 복구 방안
- 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '정팀장',
          department: '개발8팀',
          role: '팀장',
          email: 'jung.queue@company.com',
          phone: '02-1234-7027',
          status: '승인',
          approvedAt: '2025-08-14 15:00',
          comment: '검토 완료.',
          order: 1,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,

      // ✅ 추가: 레포트 승인 이력
      reportApprovalHistory: [
        {
          approver: '김팀장',
          department: '품질보증팀',
          role: '팀장',
          email: 'kim.qa@company.com',
          phone: '02-1234-8020',
          status: '승인',
          approvedAt: '2025-08-15 11:30',
          comment: '배포 결과 검토 완료.',
          order: 1,
        },
        {
          approver: '박이사',
          department: '운영본부',
          role: '이사',
          email: 'park.ops@company.com',
          phone: '02-1234-8021',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 2,
        },
      ],
      nextReportApprover: {
        name: '박이사',
        order: 2,
        email: 'park.ops@company.com',
        phone: '02-1234-8021',
        waitingTime: '15분',
      },
    },

    report: `요약
메시지 큐 최적화 배포 완료.

성능 지표
- 이전: 처리량 1000/s
- 현재: 처리량 1500/s
- 개선율: 50% 향상

발견된 이슈
특이사항 없음

다음 단계
- 모니터링`,

    jenkinsLog: {
      buildNumber: '2875',
      status: '성공',
      duration: '35분',
      branch: 'main',
      pr: '#4545 - Queue Optimization',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Prod', status: '성공' },
      ],
      logs: [
        { time: '10:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '10:35:00', level: 'INFO', message: '[Deploy] 완료' },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-14 14:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-14 15:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-15 10:00' },
      {
        step: '배포 종료',
        status: '완료',
        time: '2025-08-15 10:35',
        result: '성공',
      },
      { step: '결과 보고', status: '완료', time: '2025-08-15 12:00' },
      { step: '결과 승인', status: '진행중', time: null }, // ✅ 변경: '대기' → '진행중'
    ],
  },

  // ========== 9. 레포트 모든 단계 승인 완료 ==========
  {
    id: 1,
    drafter: '강명수',
    department: '개발9팀',
    serviceName: 'Data Pipeline',
    taskTitle: '데이터 파이프라인 확장',
    stage: '결과보고',
    status: '완료',
    completionTime: '2025-08-15 16:00',
    result: '성공',

    planInfo: {
      type: 'Feature',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '중간' },
      assignee: '강명수',
      draftDate: '2025-08-14',
      deploymentDateTime: {
        start: '2025-08-15 14:00',
        end: '2025-08-15 15:00',
      },
    },

    detailInfo: `1. 개요
데이터 파이프라인 확장

2. 목표
- 데이터 처리량 2배

3. 일정
시작: 2025-08-15 14:00
종료: 2025-08-15 15:00

4. 수행 내용
- 파이프라인 확장

5. 리스크
특이사항 없음

6. 백업 계획
이전 파이프라인

7. 실패 시 복구 방안
- 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '최팀장',
          department: '개발9팀',
          role: '팀장',
          email: 'choi.data@company.com',
          phone: '02-1234-7028',
          status: '승인',
          approvedAt: '2025-08-14 16:00',
          comment: '검토 완료.',
          order: 1,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,

      reportApprovalHistory: [
        {
          approver: '이팀장',
          department: '개발9팀',
          role: '팀장',
          email: 'lee.data@company.com',
          phone: '02-1234-7029',
          status: '승인',
          approvedAt: '2025-08-15 15:00',
          comment: '배포 결과 우수.',
          order: 1,
        },
        {
          approver: '박개발리더',
          department: '개발본부',
          role: '개발리더',
          email: 'park.data@company.com',
          phone: '02-1234-7030',
          status: '승인',
          approvedAt: '2025-08-15 15:30',
          comment: '기술 검토 완료.',
          order: 2,
        },
        {
          approver: '정이사',
          department: '개발본부',
          role: '이사',
          email: 'jung.data@company.com',
          phone: '02-1234-7031',
          status: '승인',
          approvedAt: '2025-08-15 16:00',
          comment: '최종 승인.',
          order: 3,
        },
      ],
      nextReportApprover: null,
    },

    report: `요약
데이터 파이프라인 확장 완료.

성능 지표
- 이전: 처리량 100GB/day
- 현재: 처리량 200GB/day
- 개선율: 2배 처리량 증가

발견된 이슈
특이사항 없음

다음 단계
- 추가 모니터링`,

    jenkinsLog: {
      buildNumber: '2876',
      status: '성공',
      duration: '40분',
      branch: 'main',
      pr: '#4546 - Data Pipeline',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Prod', status: '성공' },
      ],
      logs: [
        { time: '14:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '14:40:00', level: 'INFO', message: '[Deploy] 완료' },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-14 15:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-14 16:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-15 14:00' },
      {
        step: '배포 종료',
        status: '완료',
        time: '2025-08-15 14:40',
        result: '성공',
      },
      { step: '결과 보고', status: '완료', time: '2025-08-15 15:00' },
      { step: '결과 승인', status: '완료', time: '2025-08-15 16:00' },
    ],
  },

  // ========== 10. 계획서 3명 모두 승인, 배포 단계 진행 중 ==========
  {
    id: 510,
    drafter: '한동준',
    department: '개발10팀',
    serviceName: 'Monitoring System',
    taskTitle: '모니터링 시스템 업그레이드',
    stage: '배포',
    status: '진행중',
    completionTime: null,
    result: null,

    planInfo: {
      type: 'Update',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '낮음' },
      assignee: '한동준',
      draftDate: '2025-08-15',
      deploymentDateTime: {
        start: '2025-08-16 09:00',
        end: '2025-08-16 11:00',
      },
    },

    detailInfo: `1. 개요
모니터링 시스템 업그레이드

2. 목표
- 모니터링 응답시간 50% 단축

3. 일정
시작: 2025-08-16 09:00
종료: 2025-08-16 11:00

4. 수행 내용
- 메트릭 수집 개선

5. 리스크
특이사항 없음

6. 백업 계획
이전 모니터링

7. 실패 시 복구 방안
- 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '손팀장',
          department: '개발10팀',
          role: '팀장',
          email: 'son.monitor@company.com',
          phone: '02-1234-7032',
          status: '승인',
          approvedAt: '2025-08-15 15:00',
          comment: '기술 검토 완료.',
          order: 1,
        },
        {
          approver: '유개발리더',
          department: '개발본부',
          role: '개발리더',
          email: 'yu.monitor@company.com',
          phone: '02-1234-7033',
          status: '승인',
          approvedAt: '2025-08-15 15:30',
          comment: '검토 완료.',
          order: 2,
        },
        {
          approver: '김이사',
          department: '개발본부',
          role: '이사',
          email: 'kim.monitor@company.com',
          phone: '02-1234-7034',
          status: '승인',
          approvedAt: '2025-08-15 16:00',
          comment: '최종 승인.',
          order: 3,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,
      reportApprovalHistory: [],
    },

    report: null,
    jenkinsLog: {
      buildNumber: '2877',
      status: '진행중',
      duration: '25분 경과',
      branch: 'main',
      pr: '#4547 - Monitoring Upgrade',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Staging', status: '성공' },
        { name: 'Deploy to Prod', status: '진행중' },
      ],
      logs: [
        { time: '09:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '09:15:00', level: 'INFO', message: '[Build] 완료' },
        {
          time: '09:20:00',
          level: 'INFO',
          message: '[Deploy to Staging] 완료',
        },
        {
          time: '09:25:00',
          level: 'INFO',
          message: '[Deploy to Prod] 진행 중 (40%)',
        },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-15 14:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-15 16:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-16 09:00' },
      { step: '배포 종료', status: '진행중', time: null },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 1. 계획서 단계 - 승인자 대기 중 (나 아님) ==========
  {
    id: 511,
    drafter: '최준우',
    department: '개발4팀',
    serviceName: 'Batch Service',
    taskTitle: '배치 작업 개선',
    stage: '계획서',
    status: '승인대기',
    completionTime: null,
    result: null,

    planInfo: {
      type: 'Maintenance',
      environment: 'PROD',
      impact: '낮음',
      risk: { level: '낮음' },
      assignee: '최준우',
      draftDate: '2025-08-13',
      deploymentDateTime: {
        start: '2025-08-14 01:00',
        end: '2025-08-14 03:00',
      },
    },

    detailInfo: `1. 개요
배치 작업 성능 개선

2. 목표
- 배치 실행 시간 30% 단축

3. 일정
시작: 2025-08-14 01:00
종료: 2025-08-14 03:00

4. 수행 내용
- 병렬 처리 개선

5. 리스크
특이사항 없음

6. 백업 계획
이전 배치 유지

7. 실패 시 복구 방안
- 즉시 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '정팀장',
          department: '개발4팀',
          role: '팀장',
          email: 'jung.batch@company.com',
          phone: '02-1234-7020',
          status: '승인',
          approvedAt: '2025-08-13 14:00',
          comment: '기술 검토 완료.',
          order: 1,
        },
        {
          approver: '수이사',
          department: '개발본부',
          role: '이사',
          email: 'soo.batch@company.com',
          phone: '02-1234-7021',
          status: '승인',
          approvedAt: '2025-08-13 15:00',
          comment: '최종 승인.',
          order: 2,
        },
        {
          approver: '박이사',
          department: '운영본부',
          role: '이사',
          email: 'park.ops@company.com',
          phone: '02-1234-8021',
          status: '승인대기',
          approvedAt: null,
          comment: null,
          order: 3,
        },
        {
          approver: '이사장',
          department: '경영진',
          role: '사장',
          email: 'lee.ceo@company.com',
          phone: '02-1234-9000',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 4,
        },
      ],
      pendingApprovers: [],
      nextApprover: {
        name: '박이사',
        order: 3,
        email: 'park.ops@company.com',
        phone: '02-1234-8021',
        waitingTime: '20분',
      },
      reportApprovalHistory: [],

      cancellationDetails: {
        cancelledBy: '최준우',
        department: '개발4팀',
        role: '개발자',
        email: 'junho.choi@company.com',
        phone: '02-1234-5555',
        cancelledAt: '2025-08-13 16:00',
        stage: '계획서 단계',
        type: 'MANUAL',
      },
    },

    report: null,
    jenkinsLog: null,

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-13 13:00' },
      { step: '작업 승인', status: '진행중', time: null },
      { step: '배포 시작', status: '', time: null, disabled: true },
      { step: '배포 종료', status: '', time: null, disabled: true },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 2. 계획서 단계 - 마지막 승인자는 나 (승인/반려 버튼 표시) ==========
  {
    id: 512,
    drafter: '이준호',
    department: '개발5팀',
    serviceName: 'Payment API',
    taskTitle: 'Payment Gateway 업그레이드',
    stage: '계획서',
    status: '승인대기',
    completionTime: null,
    result: null,

    planInfo: {
      type: 'Upgrade',
      environment: 'PROD',
      impact: '높음',
      risk: { level: '중간' },
      assignee: '이준호',
      draftDate: '2025-08-12',
      deploymentDateTime: {
        start: '2025-08-14 02:00',
        end: '2025-08-14 06:00',
      },
    },

    detailInfo: `1. 개요
결제 게이트웨이를 최신 버전으로 업그레이드

2. 목표
- 결제 성공률 개선
- 보안 강화
- 응답 속도 개선

3. 일정
시작: 2025-08-14 02:00
종료: 2025-08-14 06:00

4. 수행 내용
- 라이브러리 업데이트
- 테스트
- 배포
- 모니터링

5. 리스크
- 결제 서비스 중단 위험
  → 무중단 배포(Blue-Green) 전략 사용

6. 백업 계획
이전 버전 즉시 롤백

7. 실패 시 복구 방안
- 즉시 롤백
- 고객 통보`,

    approval: {
      canApprove: true, // ✅ 나(로그인한 사용자)가 승인할 수 있음
      planApprovalHistory: [
        {
          approver: '박팀장',
          department: '개발5팀',
          role: '팀장',
          email: 'park.payment@company.com',
          phone: '02-1234-7030',
          status: '승인',
          approvedAt: '2025-08-12 15:00',
          comment: '기술 검토 완료.',
          order: 1,
        },
        {
          approver: '김이사',
          department: '개발본부',
          role: '이사',
          email: 'kim.dev@company.com',
          phone: '02-1234-7031',
          status: '승인',
          approvedAt: '2025-08-12 16:00',
          comment: '승인합니다.',
          order: 2,
        },
        {
          approver: '허팀장',
          department: '품질보증팀',
          role: '팀장',
          email: 'current.user@company.com',
          phone: '02-1234-8030',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 3,
        },
      ],
      pendingApprovers: [],
      nextApprover: {
        name: '허팀장',
        order: 3,
        email: 'current.user@company.com',
        phone: '02-1234-8030',
        waitingTime: '45분',
      },
      reportApprovalHistory: [],
    },

    report: null,
    jenkinsLog: null,

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-12 14:00' },
      { step: '작업 승인', status: '진행중', time: null },
      { step: '배포 시작', status: '', time: null, disabled: true },
      { step: '배포 종료', status: '', time: null, disabled: true },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 12. 계획서 단계 - 2번째 승인자 승인 완료, 취소 버튼만 표시 ==========
  {
    id: 514,
    drafter: '정서연',
    department: '개발12팀',
    serviceName: 'User Service',
    taskTitle: '사용자 서비스 확장',
    stage: '계획서',
    status: '승인대기',
    completionTime: null,
    result: null,

    planInfo: {
      type: 'Feature',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '낮음' },
      assignee: '정서연',
      draftDate: '2025-08-16',
      deploymentDateTime: {
        start: '2025-08-17 14:00',
        end: '2025-08-17 16:00',
      },
    },

    detailInfo: `1. 개요
사용자 서비스 확장 및 신규 기능 추가

2. 목표
- 사용자 프로필 기능 추가
- 알림 시스템 개선

3. 일정
시작: 2025-08-17 14:00
종료: 2025-08-17 16:00

4. 수행 내용
- 프로필 모듈 개발
- 알림 API 개선
- 테스트

5. 리스크
특이사항 없음

6. 백업 계획
이전 버전 유지

7. 실패 시 복구 방안
- 롤백`,

    approval: {
      canApprove: false,
      canCancel: true, // ✅ 2번째 승인자(현재 로그인 사용자)가 취소 가능
      planApprovalHistory: [
        {
          approver: '송팀장',
          department: '개발12팀',
          role: '팀장',
          email: 'song.user@company.com',
          phone: '02-1234-7038',
          status: '승인',
          approvedAt: '2025-08-16 15:00',
          comment: '기능 검토 완료.',
          order: 1,
        },
        {
          approver: '허팀장',
          department: '개발본부',
          role: '개발리더',
          email: 'current.user@company.com',
          phone: '02-1234-7039',
          status: '승인',
          approvedAt: '2025-08-16 15:30',
          comment: '기술 검토 완료. 승인합니다.',
          order: 2,
        },
        {
          approver: '윤이사',
          department: '개발본부',
          role: '이사',
          email: 'yoon.director@company.com',
          phone: '02-1234-7040',
          status: '승인 대기',
          approvedAt: null,
          comment: null,
          order: 3,
        },
      ],
      pendingApprovers: [],
      nextApprover: {
        name: '윤이사',
        order: 3,
        email: 'yoon.director@company.com',
        phone: '02-1234-7040',
        waitingTime: '15분',
      },
      reportApprovalHistory: [],
    },

    report: null,
    jenkinsLog: null,

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-16 14:00' },
      { step: '작업 승인', status: '진행중', time: null },
      { step: '배포 시작', status: '', time: null, disabled: true },
      { step: '배포 종료', status: '', time: null, disabled: true },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 13. 계획서 단계 - 내가 2번째로 승인했는데 3번째가 반려해서 취소됨 ==========
  {
    id: 515,
    drafter: '박민수',
    department: '개발11팀',
    serviceName: 'Payment API',
    taskTitle: 'Payment Gateway 업그레이드',
    stage: '계획서',
    status: '취소',
    completionTime: '2025-08-13 14:30',
    result: null,

    planInfo: {
      type: 'Upgrade',
      environment: 'PROD',
      impact: '높음',
      risk: { level: '중간' },
      assignee: '박민수',
      draftDate: '2025-08-12',
      deploymentDateTime: {
        start: '2025-08-14 02:00',
        end: '2025-08-14 06:00',
      },
    },

    detailInfo: `1. 개요
결제 게이트웨이를 최신 버전으로 업그레이드

2. 목표
- 결제 성공률 개선
- 보안 강화
- 응답 속도 개선

3. 일정
시작: 2025-08-14 02:00
종료: 2025-08-14 06:00

4. 수행 내용
- 라이브러리 업데이트
- 테스트
- 배포
- 모니터링

5. 리스크
- 결제 서비스 중단 위험
  → 무중단 배포(Blue-Green) 전략 사용

6. 백업 계획
이전 버전 즉시 롤백

7. 실패 시 복구 방안
- 즉시 롤백
- 고객 통보`,

    approval: {
      canApprove: false,
      canCancel: false,
      planApprovalHistory: [
        {
          approver: '정팀장',
          department: '개발11팀',
          role: '팀장',
          email: 'jung.payment@company.com',
          phone: '02-1234-7041',
          status: '승인',
          approvedAt: '2025-08-12 15:00',
          comment: '기술 검토 완료.',
          order: 1,
        },
        {
          approver: '허팀장',
          department: '품질보증팀',
          role: '팀장',
          email: 'current.user@company.com',
          phone: '02-1234-8030',
          status: '승인',
          approvedAt: '2025-08-13 10:00',
          comment: '품질 검토 완료. 승인합니다.',
          order: 2,
        },
        {
          approver: '김이사',
          department: '개발본부',
          role: '이사',
          email: 'kim.director@company.com',
          phone: '02-1234-7042',
          status: '반려',
          approvedAt: '2025-08-13 14:30',
          comment: '보안 검토 미흡. 추가 검증 필요.',
          order: 3,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,
      reportApprovalHistory: [],

      cancellationHistory: {
        cancelledBy: '김이사',
        department: '개발본부',
        role: '이사',
        email: 'kim.director@company.com',
        phone: '02-1234-7042',
        cancelledAt: '2025-08-13 14:30',
        reason: '보안 검토 미흡. 추가 검증 필요.',
        stage: '계획서 승인',
        type: 'REJECTED',
      },
    },

    report: null,
    jenkinsLog: null,

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-12 14:00' },
      {
        step: '작업 승인',
        status: '반려',
        time: '2025-08-13 14:30',
        rejected: true,
        rejectedBy: '김이사',
      },
      { step: '배포 시작', status: '', time: null, disabled: true },
      { step: '배포 종료', status: '', time: null, disabled: true },
      { step: '결과 보고', status: '', time: null, disabled: true },
      { step: '결과 승인', status: '', time: null, disabled: true },
    ],
  },

  // ========== 14. 결과보고 단계 - 2명 승인했는데 3번째가 반려해서 모두에게 반려로 표시 ==========
  {
    id: 516,
    drafter: '최수영',
    department: '개발13팀',
    serviceName: 'Notification Service',
    taskTitle: '알림 서비스 확장',
    stage: '결과보고',
    status: '반려',
    completionTime: '2025-08-17 16:00',
    result: '성공',

    planInfo: {
      type: 'Feature',
      environment: 'PROD',
      impact: '중간',
      risk: { level: '중간' },
      assignee: '최수영',
      draftDate: '2025-08-15',
      deploymentDateTime: {
        start: '2025-08-17 10:00',
        end: '2025-08-17 12:00',
      },
    },

    detailInfo: `1. 개요
알림 서비스 확장

2. 목표
- 푸시 알림 기능 추가
- 알림 발송률 개선

3. 일정
시작: 2025-08-17 10:00
종료: 2025-08-17 12:00

4. 수행 내용
- 알림 API 개발
- 푸시 연동
- 테스트

5. 리스크
특이사항 없음

6. 백업 계획
이전 알림 시스템 유지

7. 실패 시 복구 방안
- 롤백`,

    approval: {
      canApprove: false,
      planApprovalHistory: [
        {
          approver: '유팀장',
          department: '개발13팀',
          role: '팀장',
          email: 'yoo.noti@company.com',
          phone: '02-1234-7043',
          status: '승인',
          approvedAt: '2025-08-15 16:00',
          comment: '기술 검토 완료.',
          order: 1,
        },
      ],
      pendingApprovers: [],
      nextApprover: null,

      reportApprovalHistory: [
        {
          approver: '송팀장',
          department: '개발13팀',
          role: '팀장',
          email: 'song.noti@company.com',
          phone: '02-1234-7044',
          status: '승인',
          approvedAt: '2025-08-17 13:00',
          comment: '배포 결과 확인.',
          order: 1,
        },
        {
          approver: '허팀장',
          department: '품질보증팀',
          role: '팀장',
          email: 'current.user@company.com',
          phone: '02-1234-8030',
          status: '승인',
          approvedAt: '2025-08-17 14:00',
          comment: '품질 검토 완료. 승인합니다.',
          order: 2,
        },
        {
          approver: '정이사',
          department: '개발본부',
          role: '이사',
          email: 'jung.director@company.com',
          phone: '02-1234-7045',
          status: '반려',
          approvedAt: '2025-08-17 16:00',
          comment: '성능 모니터링 데이터 부족. 추가 분석 후 재보고 필요.',
          order: 3,
        },
      ],
      nextReportApprover: null,
    },

    report: `요약
알림 서비스 확장 배포 완료.

성능 지표
- 이전: 푸시 발송률 70%
- 현재: 푸시 발송률 85%
- 개선율: 15% 향상

발견된 이슈
특이사항 없음

다음 단계
- 성능 모니터링 강화`,

    jenkinsLog: {
      buildNumber: '2878',
      status: '성공',
      duration: '50분',
      branch: 'main',
      pr: '#4548 - Notification Service',
      pipeline: [
        { name: 'Build', status: '성공' },
        { name: 'Deploy to Prod', status: '성공' },
      ],
      logs: [
        { time: '10:00:00', level: 'INFO', message: '[Build] 시작' },
        { time: '10:50:00', level: 'INFO', message: '[Deploy] 완료' },
      ],
    },

    timeline: [
      { step: '작업 신청', status: '완료', time: '2025-08-15 15:00' },
      { step: '작업 승인', status: '완료', time: '2025-08-15 16:00' },
      { step: '배포 시작', status: '완료', time: '2025-08-17 10:00' },
      {
        step: '배포 종료',
        status: '완료',
        time: '2025-08-17 10:50',
        result: '성공',
      },
      { step: '결과 보고', status: '완료', time: '2025-08-17 13:00' },
      {
        step: '결과 승인',
        status: '반려',
        time: '2025-08-17 16:00',
        rejected: true,
        rejectedBy: '정이사',
      },
    ],
  },
];

export default mockData;
