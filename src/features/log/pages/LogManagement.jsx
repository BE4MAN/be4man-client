// src/features/log/pages/LogManagement.jsx
import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';

import DateRangePicker from './DateRangePicker';
import { getStyles } from './LogManagement.style';

const mockData = [
  // ========== 케이스 1: 계획서 단계 - 대기 ==========
  {
    id: 250,
    drafter: '서민준',
    department: '개발1팀',
    serviceName: 'User Service',
    taskTitle: '사용자 프로필 개선',
    stage: '계획서',
    status: '대기',
    completionTime: null,
    result: null,
    approver: '이과장(개발3팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-25 14:30',
        link: '/approval/250',
      },
      { step: '작업 승인', status: '대기', time: null },
      { step: '배포 시작', status: '대기', time: null, disabled: true },
      { step: '배포 종료', status: '대기', time: null, disabled: true },
      { step: '결과 보고', status: '대기', time: null, disabled: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 3: 계획서 단계 - 반려 ==========
  {
    id: 249,
    drafter: '이영희',
    department: '개발2팀',
    serviceName: 'Payment Gateway',
    taskTitle: '결제 API 보안 개선',
    stage: '계획서',
    status: '반려',
    completionTime: '2025.07.25 09:30',
    result: null,
    approver: '박과장(개발5팀)',
    rejectionInfo: {
      type: 'planRejection',
      actor: { name: '박과장', department: '개발5팀' },
      processedAt: '2025-07-25 09:30',
      reason:
        '요구사항이 불명확합니다. 작업 범위와 목적을 명확히 작성해주세요.',
    },
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-24 16:45',
        link: '/approval/249',
      },
      {
        step: '작업 승인',
        status: '반려',
        time: '2025-07-25 09:30',
        rejected: true,
        reason: '요구사항 불명확',
      },
      { step: '배포 시작', status: '대기', time: null, disabled: true },
      { step: '배포 종료', status: '대기', time: null, disabled: true },
      { step: '결과 보고', status: '대기', time: null, disabled: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 4: 배포 단계 - 배포 완료 (성공) ==========
  {
    id: 245,
    drafter: '이재운',
    department: '개발2팀',
    serviceName: 'Analytics Dashboard',
    taskTitle: '데이터 시각화 부상 통계',
    stage: '배포',
    status: '완료',
    completionTime: '2025.07.24 11:30',
    result: '성공',
    approver: '박과장(개발5팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-23 14:00',
        link: '/approval/245',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-23 16:00' },
      { step: '배포 시작', status: '완료', time: '2025-07-24 10:00' },
      {
        step: '배포 종료',
        status: '성공',
        time: '2025-07-24 11:30',
        link: '/jenkins/245',
      },
      { step: '결과 보고', status: '대기', time: null, warning: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 5: 배포 단계 - 배포 완료 (실패) ==========
  {
    id: 248,
    drafter: '최민지',
    department: '개발1팀',
    serviceName: 'Search Service',
    taskTitle: '검색 엔진 최적화',
    stage: '배포',
    status: '완료',
    completionTime: '2025.07.23 15:45',
    result: '실패',
    approver: '김팀장(개발2팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-22 11:20',
        link: '/approval/248',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-22 13:00' },
      { step: '배포 시작', status: '완료', time: '2025-07-23 15:00' },
      {
        step: '배포 종료',
        status: '실패',
        time: '2025-07-23 15:45',
        link: '/jenkins/248',
      },
      { step: '결과 보고', status: '대기', time: null, warning: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 6: 배포 단계 - 배포 거절 (취소) ==========
  {
    id: 247,
    drafter: '정수진',
    department: '개발1팀',
    serviceName: 'Notification Service',
    taskTitle: '알림서 발송 기능 추가',
    stage: '배포',
    status: '거절',
    completionTime: '2025.07.24 18:30',
    result: null,
    approver: '이과장(개발3팀)',
    rejectionInfo: {
      type: 'deploymentCancellation',
      actor: { name: '이과장', department: '개발3팀' },
      processedAt: '2025-07-24 18:30',
      reason:
        '긴급 버그가 발견되어 배포를 중단합니다. 버그 수정 후 재배포 요청 바랍니다.',
    },
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-24 17:00',
        link: '/approval/247',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-24 17:30' },
      {
        step: '배포 시작',
        status: '거절',
        time: '2025-07-24 18:30',
        rejected: true,
        reason: '긴급 버그 발견',
      },
      { step: '배포 종료', status: '대기', time: null, disabled: true },
      { step: '결과 보고', status: '대기', time: null, disabled: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 7: 배포 단계 - 배포 완료 (성공) - 결과 보고 미작성 ==========
  {
    id: 244,
    drafter: '박지준',
    department: '개발1팀',
    serviceName: 'API Gateway',
    taskTitle: 'API 엔드포인트 최적화',
    stage: '배포',
    status: '완료',
    completionTime: '2025.07.25 17:22',
    result: '성공',
    approver: '박과장(개발5팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-22 09:00',
        link: '/approval/244',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-22 10:30' },
      { step: '배포 시작', status: '완료', time: '2025-07-23 14:00' },
      {
        step: '배포 종료',
        status: '성공',
        time: '2025-07-23 15:20',
        link: '/jenkins/244',
      },
      {
        step: '결과 보고',
        status: '미작성',
        time: '미작성 (경과 2일)',
        warning: true,
      },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 8: 배포 + 결과 보고 - 대기 (승인 대기) ==========
  {
    id: 243,
    drafter: '조민수',
    department: '개발2팀',
    serviceName: 'User Management',
    taskTitle: '권한 분리 시스템 구축',
    stage: '레포트',
    status: '대기',
    completionTime: null,
    result: '성공',
    approver: '이과장(개발3팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-21 10:15',
        link: '/approval/243',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-21 11:45' },
      { step: '배포 시작', status: '완료', time: '2025-07-22 14:00' },
      {
        step: '배포 종료',
        status: '성공',
        time: '2025-07-22 16:30',
        link: '/jenkins/243',
      },
      {
        step: '결과 보고',
        status: '작성완료',
        time: '2025-07-24 10:00',
        link: '/report/view/243',
      },
      { step: '결과 승인', status: '대기', time: null },
    ],
  },

  // ========== 케이스 9: 완전 종료 (결과 승인 완료) ==========
  {
    id: 242,
    drafter: '김효호',
    department: '개발2팀',
    serviceName: 'REHMAN Portal',
    taskTitle: 'UI/UX 최종 작업',
    stage: '레포트',
    status: '승인',
    completionTime: '2025.07.25 14:00',
    result: '성공',
    approver: '박과장(개발5팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-20 09:00',
        link: '/approval/242',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-20 10:30' },
      { step: '배포 시작', status: '완료', time: '2025-07-21 13:00' },
      {
        step: '배포 종료',
        status: '성공',
        time: '2025-07-21 14:15',
        link: '/jenkins/242',
      },
      {
        step: '결과 보고',
        status: '작성완료',
        time: '2025-07-23 11:30',
        link: '/report/view/242',
      },
      { step: '결과 승인', status: '승인', time: '2025-07-25 14:00' },
    ],
  },

  // ========== 케이스 10: 결과 보고 - 반려 (수정 필요) ==========
  {
    id: 241,
    drafter: '차민지',
    department: '개발1팀',
    serviceName: 'Payment Gateway',
    taskTitle: '결제 모듈 보안 강화',
    stage: '레포트',
    status: '반려',
    completionTime: '2025.07.24 16:45',
    result: '실패',
    approver: '김팀장(개발2팀)',
    rejectionInfo: {
      type: 'reportRejection',
      actor: { name: '김팀장', department: '개발2팀' },
      processedAt: '2025-07-24 16:45',
      reason:
        '해결 방안이 불충분합니다. 재발 방지 대책과 구체적인 수정 계획을 추가해주세요.',
      jenkinsLogUrl: '/jenkins/241',
    },
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-19 15:00',
        link: '/approval/241',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-19 16:20' },
      { step: '배포 시작', status: '완료', time: '2025-07-20 10:00' },
      {
        step: '배포 종료',
        status: '실패',
        time: '2025-07-20 11:30',
        link: '/jenkins/241',
        failureReason: '보안 검증 실패',
      },
      {
        step: '결과 보고',
        status: '작성완료',
        time: '2025-07-23 09:00',
        link: '/report/view/241',
      },
      {
        step: '결과 승인',
        status: '반려',
        time: '2025-07-24 16:45',
        rejected: true,
        reason: '해결 방안 불충분',
      },
    ],
  },

  // ========== 케이스 11: 배포 실패 후 결과 보고 미작성 ==========
  {
    id: 240,
    drafter: '홍길동',
    department: '개발2팀',
    serviceName: 'Database Service',
    taskTitle: '쿼리 최적화 작업',
    stage: '배포',
    status: '완료',
    completionTime: '2025.07.25 16:52',
    result: '실패',
    approver: '이과장(개발3팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-18 11:00',
        link: '/approval/240',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-18 12:30' },
      { step: '배포 시작', status: '완료', time: '2025-07-19 14:00' },
      {
        step: '배포 종료',
        status: '실패',
        time: '2025-07-19 14:45',
        link: '/jenkins/240',
        failureReason: '인덱스 테이블 오류',
      },
      {
        step: '결과 보고',
        status: '미작성',
        time: '미작성 (경과 3일)',
        warning: true,
      },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 12: 정상 완료 케이스 ==========
  {
    id: 239,
    drafter: '이순신',
    department: '개발1팀',
    serviceName: 'Auth Service',
    taskTitle: 'OAuth 2.0 통합',
    stage: '배포',
    status: '승인',
    completionTime: '2025.07.25 13:30',
    result: '성공',
    approver: '박과장(개발5팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-17 10:00',
        link: '/approval/239',
      },
      { step: '작업 승인', status: '승인', time: '2025-07-17 11:15' },
      { step: '배포 시작', status: '완료', time: '2025-07-18 15:30' },
      {
        step: '배포 종료',
        status: '성공',
        time: '2025-07-18 16:00',
        link: '/jenkins/239',
      },
      {
        step: '결과 보고',
        status: '작성완료',
        time: '2025-07-23 14:00',
        link: '/report/view/239',
      },
      { step: '결과 승인', status: '승인', time: '2025-07-25 13:30' },
    ],
  },

  // ========== 케이스 13: 배포 거절 후 재신청 ==========
  {
    id: 238,
    drafter: '우민준',
    department: '개발2팀',
    serviceName: 'Cache Service',
    taskTitle: 'Redis 캐시 최적화',
    stage: '계획서',
    status: '대기',
    completionTime: null,
    result: null,
    approver: '김팀장(개발2팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-25 15:00',
        link: '/approval/238',
      },
      {
        step: '작업 승인',
        status: '대기',
        time: null,
        note: '재신청 (이전 배포 거절: 2025-07-24 18:00)',
      },
      { step: '배포 시작', status: '대기', time: null, disabled: true },
      { step: '배포 종료', status: '대기', time: null, disabled: true },
      { step: '결과 보고', status: '대기', time: null, disabled: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },

  // ========== 케이스 14: 신청 반려 후 재신청 ==========
  {
    id: 237,
    drafter: '박수현',
    department: '개발1팀',
    serviceName: 'Logging Service',
    taskTitle: '로그 수집 시스템 개선',
    stage: '계획서',
    status: '대기',
    completionTime: null,
    result: null,
    approver: '이과장(개발3팀)',
    timeline: [
      {
        step: '작업 신청',
        status: '완료',
        time: '2025-07-25 16:00',
        link: '/approval/237',
      },
      {
        step: '작업 승인',
        status: '대기',
        time: null,
        note: '재신청 (이전 반려: 2025-07-24 15:30)',
      },
      { step: '배포 시작', status: '대기', time: null, disabled: true },
      { step: '배포 종료', status: '대기', time: null, disabled: true },
      { step: '결과 보고', status: '대기', time: null, disabled: true },
      { step: '결과 승인', status: '대기', time: null, disabled: true },
    ],
  },
];

// 드롭다운 컴포넌트 (이전 코드 동일)
const CustomDropdown = ({ label, options, value, onChange }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownStyles = {
    container: {
      position: 'relative',
      minWidth: '140px',
    },
    button: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: theme.mode === 'dark' ? '#ffffff' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: theme.colors.text,
    },
    menu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '4px',
      backgroundColor: theme.mode === 'dark' ? '#2a2a2a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      boxShadow:
        theme.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.5)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
    },
    option: (isSelected) => ({
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: isSelected
        ? theme.mode === 'dark'
          ? 'rgba(33, 150, 243, 0.3)'
          : theme.colors.brandLight || 'rgba(33, 150, 243, 0.1)'
        : 'transparent',
      color: isSelected ? theme.colors.brand : theme.colors.text,
    }),
  };

  return (
    <div ref={dropdownRef} style={dropdownStyles.container}>
      <button
        type="button"
        style={dropdownStyles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || label}</span>
        <span style={{ fontSize: '12px' }}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div style={dropdownStyles.menu}>
          {options.map((option) => (
            <div
              key={option}
              style={dropdownStyles.option(value === option)}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (value !== option) {
                  e.currentTarget.style.backgroundColor =
                    theme.mode === 'dark'
                      ? '#3a3a3a'
                      : theme.colors.backgroundHover || '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 타임라인 상세 카드 컴포넌트
const TimelineDetailCard = ({ item, onClose }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  //   const [hoveredBtn, setHoveredBtn] = useState(null);

  const renderStepIcon = (step, isLastStep) => {
    // 비활성화된 단계 - 대기 상태에서 시계 아이콘 표시
    if (step.disabled) {
      return (
        <span style={styles.timelineIcon('pending', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M12 6v6l4 2.4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    }

    // 대기 상태 (활성화됨) - 시계 아이콘 표시
    if (step.status === '대기' && !step.disabled) {
      return (
        <span style={styles.timelineIcon('pending', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M12 6v6l4 2.4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    }

    // 반려
    if (step.rejected) {
      return (
        <span style={styles.timelineIcon('rejected', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
      );
    }

    // 완료, 승인, 성공, 작성완료
    if (
      step.status === '완료' ||
      step.status === '승인' ||
      step.status === '성공' ||
      step.status === '작성완료'
    ) {
      return (
        <span style={styles.timelineIcon('completed', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </span>
      );
    }

    // 진행 중
    if (step.status === '진행중') {
      return (
        <span style={styles.timelineIcon('inProgress', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
          </svg>
        </span>
      );
    }

    // 실패
    if (step.status === '실패') {
      return (
        <span style={styles.timelineIcon('rejected', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
      );
    }

    // 미작성 (경고)
    if (step.status === '미작성' && step.warning) {
      return (
        <span style={styles.timelineIcon('warning', isLastStep)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </span>
      );
    }

    // 기본 대기 상태 - 시계 아이콘
    return (
      <span style={styles.timelineIcon('pending', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 6v6l4 2.4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  };

  return (
    <tr>
      <td colSpan="9" style={styles.detailCardWrapper}>
        <div style={styles.detailCard}>
          {/* 헤더 */}
          <div style={styles.detailHeader}>
            <div>
              <h3 style={styles.detailTitle}>
                {item.serviceName} | {item.taskTitle}
              </h3>
              <p style={styles.detailSubtitle}>
                기안자: {item.drafter}({item.department}) | 승인자:{' '}
                {item.approver}
              </p>
              <p style={styles.detailBranch}>{item.branch}</p>
            </div>
            <button style={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          </div>

          {/* 타임라인 */}
          <div style={styles.timelineWrapper}>
            {item.timeline.map((step, index) => {
              const isLastStep = index === item.timeline.length - 1;
              const nextStep = !isLastStep ? item.timeline[index + 1] : null;

              // 다음 단계가 처리되었는지 확인
              const isNextStepProcessed =
                nextStep && !nextStep.disabled && nextStep.status !== '대기';

              // 현재 단계가 실패/반려인지 확인
              const isCurrentStepFailure =
                step.status === '실패' || step.rejected;

              return (
                <div key={index} style={styles.timelineStep(step.disabled)}>
                  {/* 아이콘 + 연결선 */}
                  <div style={styles.timelineIconWrapper}>
                    {renderStepIcon(step, isLastStep)}

                    {/* 연결선 (마지막 단계 제외) */}
                    {!isLastStep && (
                      <div
                        style={styles.timelineLine(
                          isNextStepProcessed,
                          isCurrentStepFailure,
                        )}
                      />
                    )}
                  </div>

                  {/* 단계명 */}
                  <div style={styles.timelineStepName}>{step.step}</div>

                  {/* 시간 */}
                  <div style={styles.timelineStepTime}>
                    {step.time || <span>-</span>}
                  </div>

                  {/* 상태 */}
                  <div
                    style={styles.timelineStepStatus(
                      step.warning,
                      step.rejected,
                    )}
                  >
                    {step.status}
                    {step.result && ` (${step.result})`}
                  </div>

                  {/* 링크 */}
                  {step.link && (
                    <a
                      href={step.link}
                      style={styles.timelineLink(step.warning)}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`이동: ${step.link}`);
                      }}
                    >
                      {step.warning ? '[작성하기]' : '[보기]'}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* 반려/거절 메시지 박스 */}
          {item.rejectionInfo && (
            <div style={styles.rejectionBox}>
              <div style={styles.rejectionHeader}>
                <span style={styles.rejectionIcon}>
                  {item.rejectionInfo.type === 'deploymentCancellation'
                    ? '⏹️'
                    : '⚠️'}
                </span>
                <span style={styles.rejectionActorLabel}>
                  {item.rejectionInfo.type === 'planRejection' && '반려자: '}
                  {item.rejectionInfo.type === 'deploymentCancellation' &&
                    '거절자: '}
                  {item.rejectionInfo.type === 'reportRejection' && '반려자: '}
                </span>
                <span style={styles.rejectionActor}>
                  {item.rejectionInfo.actor.name}(
                  {item.rejectionInfo.actor.department})
                </span>
                <span style={styles.rejectionDivider}>|</span>
                <span style={styles.rejectionTime}>
                  {item.rejectionInfo.processedAt}
                </span>
              </div>
              <div style={styles.rejectionReasonBox}>
                <div style={styles.rejectionReasonLabel}>
                  {item.rejectionInfo.type === 'planRejection' && '반려 사유:'}
                  {item.rejectionInfo.type === 'deploymentCancellation' &&
                    '거절 사유:'}
                  {item.rejectionInfo.type === 'reportRejection' &&
                    '반려 사유:'}
                </div>
                <div style={styles.rejectionReasonText}>
                  &ldquo;{item.rejectionInfo.reason}&rdquo;
                </div>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default function LogManagement() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    처리단계: '전체',
    처리상태: '전체',
    결과: '전체',
    시작일: '',
    종료일: '',
    순서: '최신순',
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null); // 펼쳐진 행 추적
  const [searchFocused, setSearchFocused] = useState(false);
  const [clearBtnHovered, setClearBtnHovered] = useState(false);
  const [resetBtnHovered, setResetBtnHovered] = useState(false);
  const [hoveredPaginationBtn, setHoveredPaginationBtn] = useState(null);

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setFilters((prev) => ({
      ...prev,
      시작일: startDate,
      종료일: endDate,
    }));
  };

  const resetFilters = () => {
    setFilters({
      처리단계: '전체',
      처리상태: '전체',
      결과: '전체',
      시작일: '',
      종료일: '',
      순서: '최신순',
    });
    setSortOrder('desc');
    setSearchQuery('');
    setExpandedRow(null); // 필터 초기화 시 펼친 행도 닫기
  };

  const filteredData = mockData
    .filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.id.toString().includes(searchQuery) ||
        item.drafter.includes(searchQuery) ||
        item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage =
        filters.처리단계 === '전체' || item.stage === filters.처리단계;
      const matchesStatus =
        filters.처리상태 === '전체' || item.status === filters.처리상태;
      const matchesResult =
        filters.결과 === '전체' ||
        (item.result && item.result === filters.결과);

      let matchesDateRange = true;
      if (filters.시작일 && filters.종료일 && item.completionTime) {
        const itemDate = new Date(item.completionTime.replace(/\./g, '-'));
        const startDate = new Date(filters.시작일);
        const endDate = new Date(filters.종료일 + ' 23:59:59');
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return (
        matchesSearch &&
        matchesStage &&
        matchesStatus &&
        matchesResult &&
        matchesDateRange
      );
    })
    .sort((a, b) => {
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    });

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredData.slice(start, start + PAGE_SIZE);

  const renderBadge = (text, type) => {
    return <span style={styles.badge(type, text)}>{text}</span>;
  };

  const renderResult = (result) => {
    if (result) {
      return renderBadge(result, 'result');
    }
    return <span style={{ color: theme.colors.textSecondary }}>-</span>;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  // 행 클릭 핸들러
  const handleRowClick = (itemId) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  };

  return (
    <div style={styles.container}>
      {/* 검색 및 필터 영역 (이전 코드 동일) */}
      <div style={styles.searchFilterSection}>
        <div style={styles.topControls}>
          <div style={styles.searchBar}>
            <svg
              style={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="작업번호, 기안자, 서비스명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={styles.searchInput(searchFocused)}
            />
            {searchQuery && (
              <button
                style={styles.clearButton(clearBtnHovered)}
                onClick={() => setSearchQuery('')}
                onMouseEnter={() => setClearBtnHovered(true)}
                onMouseLeave={() => setClearBtnHovered(false)}
              >
                ✕
              </button>
            )}
          </div>
          <button
            style={styles.resetButton(resetBtnHovered)}
            onClick={resetFilters}
            onMouseEnter={() => setResetBtnHovered(true)}
            onMouseLeave={() => setResetBtnHovered(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35z"
                fill="currentColor"
              />
            </svg>
            필터 초기화
          </button>
        </div>

        <div style={styles.filtersPanel}>
          <div style={styles.filtersRow}>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>처리 단계</label>
              <CustomDropdown
                label=""
                options={['전체', '계획서', '배포', '레포트']}
                value={filters.처리단계}
                onChange={(val) => handleFilter('처리단계', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>처리 상태</label>
              <CustomDropdown
                label=""
                options={['전체', '대기', '반려', '거절', '승인']}
                value={filters.처리상태}
                onChange={(val) => handleFilter('처리상태', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>결과</label>
              <CustomDropdown
                label=""
                options={['전체', '성공', '실패']}
                value={filters.결과}
                onChange={(val) => handleFilter('결과', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>정렬</label>
              <CustomDropdown
                label=""
                options={['최신순', '오래된순']}
                value={filters.순서}
                onChange={(val) => {
                  handleFilter('순서', val);
                  setSortOrder(val === '최신순' ? 'desc' : 'asc');
                }}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>기간</label>
              <DateRangePicker
                startDate={filters.시작일}
                endDate={filters.종료일}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>작업 번호</th>
              <th style={styles.th}>기안자</th>
              <th style={styles.th}>부서</th>
              <th style={styles.th}>서비스명</th>
              <th style={styles.th}>작업 제목</th>
              <th style={styles.th}>처리 단계</th>
              <th style={styles.th}>처리 상태</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>완료 시각</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>배포 결과</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((item) => (
                <React.Fragment key={item.id}>
                  {/* 로그 행 */}
                  <tr
                    style={styles.tr(
                      hoveredRow === item.id || expandedRow === item.id,
                    )}
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td
                      style={{
                        ...styles.td,
                        color: theme.colors.text,
                        fontWeight: '500',
                      }}
                    >
                      {item.id}
                    </td>
                    <td style={styles.td}>{item.drafter}</td>
                    <td style={styles.td}>{item.department}</td>
                    <td style={styles.td}>{item.serviceName}</td>
                    <td style={styles.td}>{item.taskTitle}</td>
                    <td style={styles.td}>
                      {renderBadge(item.stage, 'stage')}
                    </td>
                    <td style={styles.td}>
                      {renderBadge(item.status, 'status')}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      {item.completionTime || (
                        <span style={{ color: theme.colors.textSecondary }}>
                          -
                        </span>
                      )}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      {renderResult(item.result)}
                    </td>
                  </tr>

                  {/* 세부 내역 카드 */}
                  {expandedRow === item.id && (
                    <TimelineDetailCard
                      item={item}
                      onClose={() => setExpandedRow(null)}
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ ...styles.td, padding: '40px' }}>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 (이전 코드 동일) */}
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.paginationArrow(
              currentPage === 1,
              hoveredPaginationBtn === 'prev',
            ),
            pointerEvents: currentPage === 1 ? 'none' : 'auto', // ← 추가
          }}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          onMouseEnter={() => {
            if (currentPage !== 1) {
              setHoveredPaginationBtn('prev');
            }
          }}
          onMouseLeave={() => {
            if (currentPage !== 1) {
              setHoveredPaginationBtn(null);
            }
          }}
        >
          &lt;
        </button>

        {(() => {
          const pageSize = 5;
          const currentGroup = Math.floor((currentPage - 1) / pageSize);
          const startPage = currentGroup * pageSize + 1;
          const endPage = Math.min(startPage + pageSize - 1, totalPages);

          const pages = [];
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }

          return pages.map((page) => (
            <button
              key={page}
              style={styles.paginationButton(
                page === currentPage,
                false,
                hoveredPaginationBtn === page,
              )}
              onClick={() => setCurrentPage(page)}
              onMouseEnter={() => setHoveredPaginationBtn(page)}
              onMouseLeave={() => setHoveredPaginationBtn(null)}
            >
              {page}
            </button>
          ));
        })()}

        {/* 다음 페이지 버튼 */}
        <button
          style={{
            ...styles.paginationArrow(
              currentPage === totalPages,
              hoveredPaginationBtn === 'next',
            ),
            pointerEvents: currentPage === totalPages ? 'none' : 'auto', // ← 추가
          }}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          onMouseEnter={() => {
            if (currentPage !== totalPages) {
              setHoveredPaginationBtn('next');
            }
          }}
          onMouseLeave={() => {
            if (currentPage !== totalPages) {
              setHoveredPaginationBtn(null);
            }
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
