// 작성자 : 김민호, 이원석
import { useTheme } from '@emotion/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';
import { Bell, CalendarOff, ClipboardClock, ClipboardList } from 'lucide-react';
import React, { useMemo, useState, useEffect, useRef } from 'react';

import { dashboardAPI } from '@/api/dashboard';
import ServiceTag from '@/components/common/ServiceTag';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import WeeklyCalendar from '@/components/schedule/WeeklyCalendar';
import { useBans } from '@/features/schedule/hooks/useBans';
import { useDeployments } from '@/features/schedule/hooks/useDeployments';
import { useHolidays } from '@/features/schedule/hooks/useHolidays';
import { getDeploymentIcon } from '@/features/schedule/utils/deploymentIconMapper';
import {
  formatDuration,
  getDurationInMinutes,
} from '@/features/schedule/utils/durationUtils';
import {
  enumToBanType,
  enumToStage,
  enumToStatus,
  enumToWeekday,
} from '@/features/schedule/utils/enumConverter';
import {
  formatTimeToKorean,
  formatDateTimeToKoreanWithSeconds,
  removeMillisecondsFromTime,
} from '@/features/schedule/utils/timeFormatter';
import {
  useApproveApprovalMutation,
  useRejectApprovalMutation,
} from '@/hooks/useApprovalQueries';
import { useAuthStore } from '@/stores/authStore';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

// 주간 캘린더는 API를 사용하므로 mock 데이터 제거

import * as S from './Dashboard.styles';

function isDateInRangeByDay(date, startIso, endIso) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  const start = new Date(startIso);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endIso);
  end.setHours(0, 0, 0, 0);

  return day.getTime() >= start.getTime() && day.getTime() <= end.getTime();
}

export default function Dashboard() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  // 공휴일 데이터 조회
  const currentYear = new Date().getFullYear();
  const { data: holidays = [] } = useHolidays(currentYear);

  // Dashboard API 호출
  const {
    data: pendingApprovalsData,
    isLoading: isLoadingPendingApprovals,
    isError: isErrorPendingApprovals,
  } = useQuery({
    queryKey: ['dashboard', 'pending-approvals'],
    queryFn: () => dashboardAPI.getPendingApprovals(),
  });

  const {
    data: inProgressTasksData,
    isLoading: isLoadingInProgressTasks,
    isError: isErrorInProgressTasks,
  } = useQuery({
    queryKey: ['dashboard', 'in-progress-tasks'],
    queryFn: () => dashboardAPI.getInProgressTasks(),
  });

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
  } = useQuery({
    queryKey: ['dashboard', 'notifications'],
    queryFn: () => dashboardAPI.getNotifications(),
  });

  // 복구현황 pagination
  const [recoveryPage, setRecoveryPage] = useState(1);
  const recoveryPageSize = 5;
  const {
    data: recoveryData,
    isLoading: isLoadingRecovery,
    isError: isErrorRecovery,
  } = useQuery({
    queryKey: ['dashboard', 'recovery', recoveryPage, recoveryPageSize],
    queryFn: () =>
      dashboardAPI.getRecovery({
        page: recoveryPage,
        pageSize: recoveryPageSize,
      }),
  });

  // API 데이터 추출 및 변환
  // API 응답이 { data: [...] } 형태이거나 배열을 직접 반환할 수 있으므로 두 경우 모두 처리
  const pendingApprovals = Array.isArray(pendingApprovalsData)
    ? pendingApprovalsData
    : pendingApprovalsData?.data || [];
  const inProgressTasks = Array.isArray(inProgressTasksData)
    ? inProgressTasksData
    : inProgressTasksData?.data || [];
  const notifications = Array.isArray(notificationsData)
    ? notificationsData
    : notificationsData?.data || [];
  // 복구현황은 pagination도 포함되므로 항상 객체 형태
  const recoveryItems = recoveryData?.data || [];
  const recoveryPagination = recoveryData?.pagination || {
    total: 0,
    page: 1,
    pageSize: 5,
    totalPages: 1,
  };

  // 복구현황 상태 한글 변환
  const getRecoveryStatusLabel = (status) => {
    switch (status) {
      case 'COMPLETED':
        return '복구 완료';
      case 'IN_PROGRESS':
        return '진행중';
      case 'PENDING':
        return '대기중';
      default:
        return status;
    }
  };

  // 복구일 포맷팅 (recoveredAt 또는 null)
  const formatRecoveryDate = (recoveredAt) => {
    if (!recoveredAt) return '—';
    return formatDateTimeToKoreanWithSeconds(recoveredAt);
  };

  // 통계 계산
  const stats = useMemo(
    () => [
      {
        id: 'pending',
        label: '승인 대기',
        value: pendingApprovals.length,
        desc: '결재가 필요한 문서',
        color: '#0066cc',
      },
      {
        id: 'tasks',
        label: '진행중인 업무',
        value: inProgressTasks.length,
        desc: '내가 승인한 후 배포 대기',
        color: '#7c3aed',
      },
      {
        id: 'notifications',
        label: '알림',
        value: notifications.length,
        desc: '취소/반려 알림',
        color: '#dc2626',
      },
    ],
    [pendingApprovals.length, inProgressTasks.length, notifications.length],
  );

  const recoveryTotal = recoveryPagination.total;
  const recoveryTotalPages = recoveryPagination.totalPages;
  const recoverySafePage = Math.min(recoveryPage, recoveryTotalPages);

  const recoveryPageWindow = useMemo(() => {
    if (recoveryTotalPages <= 9)
      return Array.from({ length: recoveryTotalPages }, (_, i) => i + 1);
    const win = new Set([
      1,
      2,
      recoveryTotalPages - 1,
      recoveryTotalPages,
      recoverySafePage,
      recoverySafePage - 1,
      recoverySafePage + 1,
    ]);
    const arr = Array.from(
      { length: recoveryTotalPages },
      (_, i) => i + 1,
    ).filter((n) => win.has(n));
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
    }
    return out;
  }, [recoverySafePage, recoveryTotalPages]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayDetail, setSelectedDayDetail] = useState(null);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedRecovery, setSelectedRecovery] = useState(null);
  const overlayRef = useRef(null);

  // 승인/반려 모달 상태 (ApprovalDetail과 동일)
  const [actionModal, setActionModal] = useState(null); // { type: 'approve' | 'reject' } | null
  const [actionComment, setActionComment] = useState('');

  // 작업 취소 모달 상태 (기존 유지)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState(null); // 'cancel'
  const [confirmModalData, setConfirmModalData] = useState(null);

  // 사용자 정보 및 mutation 훅
  const user = useAuthStore((s) => s.user);
  const currentUserId = user?.accountId || user?.id;
  const approveMut = useApproveApprovalMutation();
  const rejectMut = useRejectApprovalMutation();

  const openPanel = (mode, options) => {
    setPanelMode(mode);
    setPanelOpen(true);
    setViewMode('list');
    setSelectedTask(null);
    setSelectedApproval(null);
    setSelectedNotification(null);
    setSelectedDay(null);
    setSelectedDayDetail(null);
    setSelectedRecovery(null);

    if (mode === 'tasks' && options?.task) {
      setSelectedTask(options.task);
      setViewMode('detail');
    }

    if (mode === 'day' && options?.dateKey) {
      setSelectedDay({
        dateKey: options.dateKey,
        blackoutItems: options.blackoutItems || [],
        deployments: options.deployments || [],
      });
    }

    if (mode === 'recovery' && options?.item) {
      setSelectedRecovery(options.item);
      setViewMode('detail');
    }
  };

  useEffect(() => {
    if (!panelOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [panelOpen]);

  const closePanel = () => {
    setPanelOpen(false);
    setPanelMode(null);
    setSelectedTask(null);
    setSelectedDay(null);
    setSelectedDayDetail(null);
    setSelectedApproval(null);
    setSelectedNotification(null);
    setSelectedRecovery(null);
    setViewMode('list');
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (overlayRef.current && e.target === overlayRef.current) {
        closePanel();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  // 주간 캘린더 현재 주 추적
  const [calendarCurrentDate, setCalendarCurrentDate] = useState(new Date());

  // 주의 시작일(월요일)과 종료일(일요일) 계산
  const weekDateRange = useMemo(() => {
    // WeeklyCalendar는 일요일을 주의 시작으로 사용하므로, 월요일을 계산
    const weekStart = startOfWeek(calendarCurrentDate, { weekStartsOn: 0 }); // 일요일
    const monday = addDays(weekStart, 1); // 월요일
    const sunday = addDays(weekStart, 6); // 일요일

    return {
      startDate: format(monday, 'yyyy-MM-dd'),
      endDate: format(sunday, 'yyyy-MM-dd'),
    };
  }, [calendarCurrentDate]);

  // 배포 작업 목록 조회
  const { data: deploymentsData = [] } = useDeployments(
    weekDateRange.startDate,
    weekDateRange.endDate,
  );

  // 작업 금지 기간 목록 조회
  const { data: bansData = [] } = useBans({
    startDate: weekDateRange.startDate,
    endDate: weekDateRange.endDate,
  });

  // 배포 작업 데이터 변환 (WeeklyCalendar 형식)
  const deployments = useMemo(() => {
    if (!deploymentsData || deploymentsData.length === 0) return [];

    return deploymentsData.map((d) => ({
      id: d.id,
      title: d.title,
      service: d.projectName || '알 수 없음',
      date: d.scheduledDate || null,
      scheduledTime: d.scheduledTime
        ? removeMillisecondsFromTime(d.scheduledTime)
        : null,
      status: d.status,
      stage: d.stage,
      isDeployed:
        (d.stage === 'PLAN' || d.stage === 'DEPLOYMENT') &&
        d.status === 'PENDING'
          ? null
          : d.isDeployed,
    }));
  }, [deploymentsData]);

  // 작업 금지 기간 데이터 변환 (WeeklyCalendar 형식)
  const restrictedPeriods = useMemo(() => {
    if (!bansData || bansData.length === 0) return [];

    return bansData
      .filter((ban) => ban.startDate && ban.startTime) // 필수 필드 확인
      .map((ban) => ({
        id: ban.id,
        title: ban.title,
        description: ban.description,
        startDate: ban.startDate,
        startTime: ban.startTime
          ? removeMillisecondsFromTime(ban.startTime)
          : null,
        endTime:
          ban.endTime || ban.startTime
            ? removeMillisecondsFromTime(ban.endTime || ban.startTime)
            : null,
        endedAt: ban.endedAt,
        durationMinutes: ban.durationMinutes,
        type: enumToBanType(ban.type) || ban.type,
        services: ban.services || [],
        registrant: ban.registrant,
        registrantDepartment: ban.registrantDepartment,
        recurrenceType: ban.recurrenceType,
        recurrenceWeekday: ban.recurrenceWeekday,
        recurrenceWeekOfMonth: ban.recurrenceWeekOfMonth,
        recurrenceEndDate: ban.recurrenceEndDate,
      }));
  }, [bansData]);

  const handleDayCellClick = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    // 해당 날짜의 작업 금지 기간 필터링
    const blackoutItems = restrictedPeriods.filter((ban) => {
      const banStart = new Date(`${ban.startDate}T${ban.startTime}`);
      const banEnd = ban.endedAt
        ? new Date(ban.endedAt)
        : new Date(`${ban.startDate}T${ban.endTime || ban.startTime}`);
      return isDateInRangeByDay(
        day,
        banStart.toISOString(),
        banEnd.toISOString(),
      );
    });
    // 해당 날짜의 배포 작업 필터링
    const dayDeployments = deployments.filter((d) => d.date === dateKey);
    openPanel('day', {
      dateKey,
      blackoutItems,
      deployments: dayDeployments,
    });
  };

  const handleCalendarDateChange = (newDate) => {
    setCalendarCurrentDate(newDate);
  };

  const handleDeploymentClick = () => {
    // 필요시 구현
  };

  const handleRestrictedPeriodClick = () => {
    // 필요시 구현
  };

  const isDetailHeader =
    viewMode === 'detail' &&
    (panelMode === 'tasks' ||
      panelMode === 'pending' ||
      panelMode === 'notifications' ||
      panelMode === 'day' ||
      panelMode === 'recovery');

  return (
    <>
      <S.Wrap>
        <S.StatGrid>
          {stats.map((s) => {
            const getIcon = () => {
              if (s.id === 'pending') return ClipboardList;
              if (s.id === 'tasks') return ClipboardClock;
              if (s.id === 'notifications') return Bell;
              return null;
            };
            const Icon = getIcon();
            return (
              <S.StatCard key={s.id} onClick={() => openPanel(s.id)}>
                <S.CardTop>
                  <S.CardTopLeft>
                    {Icon ? (
                      <S.IconBox style={{ color: s.color }}>
                        <Icon size={20} />
                      </S.IconBox>
                    ) : (
                      <S.IconBox style={{ color: s.color }}>●</S.IconBox>
                    )}
                    <S.StatLabel>{s.label}</S.StatLabel>
                  </S.CardTopLeft>
                  <S.StatValue>{s.value}</S.StatValue>
                </S.CardTop>
                <S.StatDesc>{s.desc}</S.StatDesc>
              </S.StatCard>
            );
          })}
        </S.StatGrid>

        <S.WeekBlock>
          <WeeklyCalendar
            deployments={deployments}
            restrictedPeriods={restrictedPeriods}
            holidays={holidays}
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
            onDateChange={handleCalendarDateChange}
            onDayCellClick={handleDayCellClick}
            enableExpansion={true}
            expandButtonType="plus"
          />
        </S.WeekBlock>

        <S.RecoveryBlock>
          <S.SectionTitle>복구 현황</S.SectionTitle>
          <S.Table>
            <thead>
              <tr>
                <th>제목</th>
                <th>서비스명</th>
                <th>상태</th>
                <th>소요시간</th>
                <th>복구일</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingRecovery ? (
                <tr>
                  <td colSpan={5}>로딩 중...</td>
                </tr>
              ) : isErrorRecovery ? (
                <tr>
                  <td colSpan={5}>데이터를 불러오는 중 오류가 발생했습니다.</td>
                </tr>
              ) : recoveryItems.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                recoveryItems.map((r) => (
                  <S.RecoveryRow
                    key={r.id}
                    onClick={() => openPanel('recovery', { item: r })}
                  >
                    <td>{r.title || '—'}</td>
                    <td>{r.service || '—'}</td>
                    <td>
                      <S.Status $status={r.status}>
                        {getRecoveryStatusLabel(r.status)}
                      </S.Status>
                    </td>
                    <td>{r.duration || '—'}</td>
                    <td>{formatRecoveryDate(r.recoveredAt)}</td>
                  </S.RecoveryRow>
                ))
              )}
            </tbody>
          </S.Table>

          <S.Pagination role="navigation" aria-label="페이지네이션">
            <S.PageInfo>
              총 {recoveryTotal}개 · {recoverySafePage}/{recoveryTotalPages}
              페이지
            </S.PageInfo>
            <S.PageBtns>
              <S.PageBtn
                onClick={() => setRecoveryPage(1)}
                disabled={recoverySafePage === 1}
              >
                «
              </S.PageBtn>
              <S.PageBtn
                onClick={() => setRecoveryPage((p) => Math.max(1, p - 1))}
                disabled={recoverySafePage === 1}
              >
                ‹
              </S.PageBtn>
              {recoveryPageWindow.map((n, i) =>
                n === '…' ? (
                  <S.Ellipsis key={`e-${i}`}>…</S.Ellipsis>
                ) : (
                  <S.PageBtn
                    key={n}
                    data-active={n === recoverySafePage || undefined}
                    aria-current={n === recoverySafePage ? 'page' : undefined}
                    onClick={() => setRecoveryPage(n)}
                  >
                    {n}
                  </S.PageBtn>
                ),
              )}
              <S.PageBtn
                onClick={() =>
                  setRecoveryPage((p) => Math.min(recoveryTotalPages, p + 1))
                }
                disabled={recoverySafePage === recoveryTotalPages}
              >
                ›
              </S.PageBtn>
              <S.PageBtn
                onClick={() => setRecoveryPage(recoveryTotalPages)}
                disabled={recoverySafePage === recoveryTotalPages}
              >
                »
              </S.PageBtn>
            </S.PageBtns>
          </S.Pagination>
        </S.RecoveryBlock>
      </S.Wrap>

      {panelOpen && <S.Overlay ref={overlayRef} />}

      {panelOpen && panelMode && (
        <S.SidePanel>
          {isDetailHeader ? (
            <S.PanelHeader $dark>
              <S.PanelTitleWrap>
                {panelMode === 'day' &&
                viewMode === 'detail' &&
                selectedDayDetail ? (
                  <>
                    {selectedDayDetail.kind === 'blackout' ? (
                      <>
                        <S.PanelTitleIcon>
                          <CalendarOff
                            size={20}
                            color={
                              theme.colors.schedule?.restrictedDanger ||
                              '#EF4444'
                            }
                          />
                        </S.PanelTitleIcon>
                        <S.PanelTitle>
                          {selectedDayDetail.data.title ||
                            selectedDayDetail.data.name}
                        </S.PanelTitle>
                      </>
                    ) : (
                      (() => {
                        const deploymentData = selectedDayDetail.data;
                        // event type을 isDeployed로 변환
                        const getIsDeployed = () => {
                          if (deploymentData.type === '성공') return true;
                          if (deploymentData.type === '실패') return false;
                          return null;
                        };
                        const iconConfig = getDeploymentIcon(
                          deploymentData.stage || '배포',
                          deploymentData.status || deploymentData.type,
                          getIsDeployed(),
                          theme,
                          20,
                        );
                        const { Icon, color } = iconConfig;
                        return (
                          <>
                            <S.PanelTitleIcon>
                              <Icon size={20} color={color} />
                            </S.PanelTitleIcon>
                            <S.PanelTitle>
                              {deploymentData.title || deploymentData.label}
                            </S.PanelTitle>
                          </>
                        );
                      })()
                    )}
                  </>
                ) : (
                  <S.PanelTitle>
                    {panelMode === 'pending' && '승인 상세'}
                    {panelMode === 'tasks' && '업무 상세'}
                    {panelMode === 'notifications' &&
                      selectedNotification &&
                      `[${selectedNotification.kind}] ${selectedNotification.serviceName}`}
                    {panelMode === 'day' && '주간 일정 상세'}
                    {panelMode === 'recovery' &&
                      selectedRecovery &&
                      selectedRecovery.title}
                  </S.PanelTitle>
                )}
              </S.PanelTitleWrap>
              <S.PanelRight>
                <S.BackBtn onClick={() => setViewMode('list')}>뒤로</S.BackBtn>
                <S.CloseBtn onClick={closePanel}>닫기</S.CloseBtn>
              </S.PanelRight>
            </S.PanelHeader>
          ) : (
            <S.PanelHeader>
              <div>
                <S.PanelTitle>
                  {panelMode === 'pending' && '승인 대기 문서'}
                  {panelMode === 'tasks' && '진행중인 업무'}
                  {panelMode === 'notifications' && '알림'}
                  {panelMode === 'day' && '주간 일정 상세'}
                  {panelMode === 'recovery' &&
                    (viewMode === 'detail' ? '복구 현황 상세' : '복구 현황')}
                </S.PanelTitle>
                <S.PanelSub>
                  {panelMode === 'pending' &&
                    `총 ${pendingApprovals.length}건의 승인 대기 문서`}
                  {panelMode === 'tasks' &&
                    `총 ${inProgressTasks.length}건의 업무`}
                  {panelMode === 'notifications' &&
                    `총 ${notifications.length}건의 알림`}
                  {panelMode === 'day' &&
                    selectedDay &&
                    `날짜: ${selectedDay.dateKey}`}
                  {panelMode === 'recovery' &&
                    selectedRecovery &&
                    `${selectedRecovery.service} 복구 상세`}
                </S.PanelSub>
              </div>
              <S.CloseBtn onClick={closePanel}>닫기</S.CloseBtn>
            </S.PanelHeader>
          )}

          {panelMode === 'pending' && (
            <>
              {viewMode === 'list' && (
                <S.TaskList>
                  {isLoadingPendingApprovals ? (
                    <S.Empty>로딩 중...</S.Empty>
                  ) : isErrorPendingApprovals ? (
                    <S.Empty>데이터를 불러오는 중 오류가 발생했습니다.</S.Empty>
                  ) : pendingApprovals.length === 0 ? (
                    <S.Empty>승인 대기 문서가 없습니다.</S.Empty>
                  ) : (
                    pendingApprovals.map((p) => (
                      <S.TaskItem
                        key={p.id}
                        onClick={() => {
                          setSelectedApproval(p);
                          setViewMode('detail');
                        }}
                      >
                        <div>
                          <S.TaskTitle>{p.title}</S.TaskTitle>
                          <S.TaskMeta>
                            <div>문서유형: {p.docType}</div>
                            <div>
                              서비스:{' '}
                              {Array.isArray(p.serviceName)
                                ? p.serviceName.join(', ')
                                : p.serviceName}
                            </div>
                            <div>
                              승인 예정자:{' '}
                              {Array.isArray(p.currentApprover)
                                ? p.currentApprover.join(', ')
                                : p.currentApprover}
                            </div>
                            <div>
                              요청일자:{' '}
                              {p.requestedAt
                                ? formatDateTimeToKoreanWithSeconds(
                                    p.requestedAt,
                                  )
                                : '—'}
                            </div>
                          </S.TaskMeta>
                        </div>
                        <S.TaskBadge $variant="pending">승인 대기</S.TaskBadge>
                      </S.TaskItem>
                    ))
                  )}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedApproval && (
                <S.DetailContent>
                  <S.InfoTable role="table">
                    <S.InfoColGroup>
                      <col />
                      <col />
                      <col />
                      <col />
                    </S.InfoColGroup>

                    <S.InfoRow>
                      <S.InfoTh>제목</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.title || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>등록자</S.InfoTh>
                      <S.InfoTd>{selectedApproval.registrant || '—'}</S.InfoTd>
                      <S.InfoTh>등록부서</S.InfoTh>
                      <S.InfoTd>
                        {selectedApproval.registrantDepartment || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>서비스</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.serviceName &&
                        Array.isArray(selectedApproval.serviceName) &&
                        selectedApproval.serviceName.length > 0 ? (
                          <S.ServicesContainer>
                            {selectedApproval.serviceName.map((service) => (
                              <ServiceTag key={service} service={service} />
                            ))}
                          </S.ServicesContainer>
                        ) : selectedApproval.serviceName ? (
                          selectedApproval.serviceName
                        ) : (
                          '—'
                        )}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>승인 예정자</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.currentApprover &&
                        Array.isArray(selectedApproval.currentApprover) &&
                        selectedApproval.currentApprover.length > 0
                          ? selectedApproval.currentApprover.join(', ')
                          : selectedApproval.currentApprover || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>요청일자</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.requestedAt
                          ? formatDateTimeToKoreanWithSeconds(
                              selectedApproval.requestedAt,
                            )
                          : '—'}
                      </S.InfoTd>
                    </S.InfoRow>
                  </S.InfoTable>

                  <S.ButtonRow>
                    <S.PrimaryButton
                      onClick={() => {
                        setActionModal({ type: 'approve' });
                        setActionComment('');
                      }}
                    >
                      승인
                    </S.PrimaryButton>
                    <S.DangerButton
                      onClick={() => {
                        setActionModal({ type: 'reject' });
                        setActionComment('');
                      }}
                    >
                      반려
                    </S.DangerButton>
                  </S.ButtonRow>
                </S.DetailContent>
              )}
            </>
          )}

          {panelMode === 'notifications' && (
            <>
              {viewMode === 'list' && (
                <S.TaskList>
                  {isLoadingNotifications ? (
                    <S.Empty>로딩 중...</S.Empty>
                  ) : isErrorNotifications ? (
                    <S.Empty>데이터를 불러오는 중 오류가 발생했습니다.</S.Empty>
                  ) : notifications.length === 0 ? (
                    <S.Empty>알림이 없습니다.</S.Empty>
                  ) : (
                    notifications.map((n) => {
                      // API 응답 형식에 맞게 변환
                      const notificationDate = n.canceledAt || n.rejectedAt;
                      const formattedDate = notificationDate
                        ? formatDateTimeToKoreanWithSeconds(notificationDate)
                        : '-';

                      return (
                        <S.TaskItem
                          key={n.id}
                          onClick={() => {
                            setSelectedNotification(n);
                            setViewMode('detail');
                          }}
                        >
                          <div>
                            <S.TaskTitle>
                              [{n.kind}] {n.serviceName}
                            </S.TaskTitle>
                            <S.TaskMeta>
                              <div>{n.reason}</div>
                              <div>발생 시각: {formattedDate}</div>
                            </S.TaskMeta>
                          </div>
                          <S.TaskBadge $variant="alert">{n.kind}</S.TaskBadge>
                        </S.TaskItem>
                      );
                    })
                  )}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedNotification && (
                <S.DetailContent>
                  <S.InfoTable role="table" $singleColumn>
                    <S.InfoColGroup $singleColumn>
                      <col />
                      <col />
                    </S.InfoColGroup>

                    <S.InfoRow>
                      <S.InfoTh $noBorder>제목</S.InfoTh>
                      <S.InfoTd>
                        {selectedNotification.deploymentTitle || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh $noBorder>서비스</S.InfoTh>
                      <S.InfoTd>
                        {selectedNotification.serviceName || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh $noBorder>사유</S.InfoTh>
                      <S.InfoTd>{selectedNotification.reason || '—'}</S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh $noBorder>발생 시각</S.InfoTh>
                      <S.InfoTd>
                        {selectedNotification.canceledAt ||
                        selectedNotification.rejectedAt
                          ? formatDateTimeToKoreanWithSeconds(
                              selectedNotification.canceledAt ||
                                selectedNotification.rejectedAt,
                            )
                          : '—'}
                      </S.InfoTd>
                    </S.InfoRow>
                  </S.InfoTable>
                  <S.ButtonRow>
                    <S.TaskBadge $variant="alert">
                      {selectedNotification.kind}
                    </S.TaskBadge>
                  </S.ButtonRow>
                </S.DetailContent>
              )}
            </>
          )}

          {panelMode === 'tasks' && (
            <>
              {viewMode === 'list' && (
                <S.TaskList>
                  {isLoadingInProgressTasks ? (
                    <S.Empty>로딩 중...</S.Empty>
                  ) : isErrorInProgressTasks ? (
                    <S.Empty>데이터를 불러오는 중 오류가 발생했습니다.</S.Empty>
                  ) : inProgressTasks.length === 0 ? (
                    <S.Empty>진행중인 업무가 없습니다.</S.Empty>
                  ) : (
                    inProgressTasks.map((t) => (
                      <S.TaskItem
                        key={t.id}
                        onClick={() => {
                          setSelectedTask(t);
                          setViewMode('detail');
                        }}
                      >
                        <div>
                          <S.TaskTitle>{t.title}</S.TaskTitle>
                          <S.TaskMeta>
                            <div>등록자: {t.registrant}</div>
                            <div>
                              작업일자:{' '}
                              {t.date && t.scheduledTime
                                ? formatDateTimeToKoreanWithSeconds(
                                    `${t.date} ${t.scheduledTime}`,
                                  )
                                : t.date
                                  ? formatDateTimeToKoreanWithSeconds(
                                      `${t.date} 00:00:00`,
                                    )
                                  : '—'}
                            </div>
                          </S.TaskMeta>
                        </div>
                        <S.TaskBadge>
                          {t.status
                            ? enumToStatus(t.status) || t.status
                            : '진행중'}
                        </S.TaskBadge>
                      </S.TaskItem>
                    ))
                  )}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedTask && (
                <S.DetailContent>
                  <S.InfoTable role="table">
                    <S.InfoColGroup>
                      <col />
                      <col />
                      <col />
                      <col />
                    </S.InfoColGroup>

                    <S.InfoRow>
                      <S.InfoTh>제목</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedTask.title || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>등록자</S.InfoTh>
                      <S.InfoTd>{selectedTask.registrant || '—'}</S.InfoTd>
                      <S.InfoTh>등록부서</S.InfoTh>
                      <S.InfoTd>
                        {selectedTask.registrantDepartment || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>작업 상태</S.InfoTh>
                      <S.InfoTd>
                        {(() => {
                          const stageLabel = selectedTask.stage
                            ? enumToStage(selectedTask.stage) ||
                              selectedTask.stage
                            : null;
                          const statusLabel = selectedTask.status
                            ? enumToStatus(selectedTask.status) ||
                              selectedTask.status
                            : null;
                          if (stageLabel && statusLabel) {
                            return `${stageLabel} ${statusLabel}`;
                          }
                          if (stageLabel) return stageLabel;
                          if (statusLabel) return statusLabel;
                          return '—';
                        })()}
                      </S.InfoTd>
                      <S.InfoTh>배포 상태</S.InfoTh>
                      <S.InfoTd>
                        {selectedTask.isDeployed === true
                          ? '성공'
                          : selectedTask.isDeployed === false
                            ? '실패'
                            : '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>작업일자</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedTask.date && selectedTask.scheduledTime
                          ? formatDateTimeToKoreanWithSeconds(
                              `${selectedTask.date} ${selectedTask.scheduledTime}`,
                            )
                          : selectedTask.date
                            ? formatDateTimeToKoreanWithSeconds(
                                `${selectedTask.date} 00:00:00`,
                              )
                            : '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>연관 서비스</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedTask.relatedServices &&
                        selectedTask.relatedServices.length > 0 ? (
                          <S.ServicesContainer>
                            {selectedTask.relatedServices.map((service) => (
                              <ServiceTag key={service} service={service} />
                            ))}
                          </S.ServicesContainer>
                        ) : (
                          '—'
                        )}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>설명</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedTask.description || '—'}
                      </S.InfoTd>
                    </S.InfoRow>
                  </S.InfoTable>

                  <S.ButtonRow>
                    <S.StatusBadge>
                      {selectedTask.status
                        ? enumToStatus(selectedTask.status) ||
                          selectedTask.status
                        : '진행중'}
                    </S.StatusBadge>
                    <S.DangerButton
                      onClick={() => {
                        setConfirmModalType('cancel');
                        setConfirmModalData(selectedTask);
                        setConfirmModalOpen(true);
                      }}
                    >
                      작업 취소
                    </S.DangerButton>
                  </S.ButtonRow>
                </S.DetailContent>
              )}
            </>
          )}

          {panelMode === 'day' && selectedDay && (
            <>
              {viewMode === 'list' && (
                <S.TaskList>
                  {selectedDay.blackoutItems.map((b) => (
                    <S.TaskItem
                      key={b.id}
                      onClick={() => {
                        setSelectedDayDetail({
                          kind: 'blackout',
                          data: b,
                          dateKey: selectedDay.dateKey,
                        });
                        setViewMode('detail');
                      }}
                    >
                      <div>
                        <S.TaskTitle>
                          <S.TaskIcon>
                            <CalendarOff
                              size={16}
                              color={theme.colors.schedule?.restrictedDanger}
                            />
                          </S.TaskIcon>
                          {b.title || b.name}
                        </S.TaskTitle>
                        <S.TaskMeta>
                          <div>사유: {b.description || b.reason}</div>
                          <div>
                            시작:{' '}
                            {b.startDate && b.startTime
                              ? `${b.startDate} ${b.startTime}`
                              : b.start || '—'}
                          </div>
                          <div>
                            종료:{' '}
                            {b.endedAt
                              ? formatTimeToKorean(b.endedAt)
                              : b.end || '—'}
                          </div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge $variant="alert">작업 금지</S.TaskBadge>
                    </S.TaskItem>
                  ))}

                  {(selectedDay.deployments || []).map((deployment) => {
                    const iconConfig = getDeploymentIcon(
                      deployment.stage || 'DEPLOYMENT',
                      deployment.status,
                      deployment.isDeployed,
                      theme,
                      16,
                    );
                    const { Icon, color } = iconConfig;
                    return (
                      <S.TaskItem
                        key={deployment.id}
                        onClick={() => {
                          setSelectedDayDetail({
                            kind: 'deployment',
                            data: deployment,
                            dateKey: selectedDay.dateKey,
                          });
                          setViewMode('detail');
                        }}
                      >
                        <div>
                          <S.TaskTitle>
                            <S.TaskIcon>
                              <Icon size={16} color={color} />
                            </S.TaskIcon>
                            {deployment.title}
                          </S.TaskTitle>
                          <S.TaskMeta>
                            <div>서비스: {deployment.service}</div>
                            <div>
                              날짜:{' '}
                              {deployment.date && deployment.scheduledTime
                                ? formatDateTimeToKoreanWithSeconds(
                                    `${deployment.date} ${deployment.scheduledTime}`,
                                  )
                                : deployment.date
                                  ? formatDateTimeToKoreanWithSeconds(
                                      `${deployment.date} 00:00:00`,
                                    )
                                  : '—'}
                            </div>
                          </S.TaskMeta>
                        </div>
                        <S.TaskBadge>
                          {deployment.status
                            ? enumToStatus(deployment.status) ||
                              deployment.status
                            : '대기'}
                        </S.TaskBadge>
                      </S.TaskItem>
                    );
                  })}

                  {selectedDay.blackoutItems.length === 0 &&
                    (selectedDay.deployments || []).length === 0 && (
                      <S.Empty>해당 날짜의 일정이 없습니다.</S.Empty>
                    )}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedDayDetail && (
                <S.DetailContent>
                  {selectedDayDetail.kind === 'blackout'
                    ? (() => {
                        const period = selectedDayDetail.data;
                        const getRestrictedTime = () => {
                          const durationMinutes = getDurationInMinutes(period);
                          if (durationMinutes > 0) {
                            return formatDuration(durationMinutes);
                          }
                          return '—';
                        };

                        const getStartDateTime = () => {
                          if (!period.startDate || !period.startTime)
                            return '—';
                          const dateTime = `${period.startDate} ${period.startTime}:00`;
                          return formatTimeToKorean(dateTime);
                        };

                        const getEndedAt = () => {
                          if (period.endedAt) {
                            const ended = parseISO(period.endedAt);
                            if (!Number.isNaN(ended.getTime())) {
                              const formatted = format(
                                ended,
                                'yyyy-MM-dd HH:mm',
                              );
                              return formatTimeToKorean(formatted);
                            }
                          }
                          return '—';
                        };

                        const getRecurrenceLabel = () => {
                          if (
                            !period.recurrenceType ||
                            period.recurrenceType === 'NONE'
                          ) {
                            return '—';
                          }
                          if (period.recurrenceType === 'DAILY') return '매일';
                          if (period.recurrenceType === 'WEEKLY') {
                            const weekdayKorean = period.recurrenceWeekday
                              ? enumToWeekday(period.recurrenceWeekday) ||
                                period.recurrenceWeekday
                              : null;
                            return weekdayKorean
                              ? `매주 ${weekdayKorean}`
                              : '매주';
                          }
                          if (period.recurrenceType === 'MONTHLY') {
                            const week =
                              period.recurrenceWeekOfMonth === 'FIRST'
                                ? '첫째 주'
                                : period.recurrenceWeekOfMonth === 'SECOND'
                                  ? '둘째 주'
                                  : period.recurrenceWeekOfMonth === 'THIRD'
                                    ? '셋째 주'
                                    : period.recurrenceWeekOfMonth === 'FOURTH'
                                      ? '넷째 주'
                                      : period.recurrenceWeekOfMonth === 'FIFTH'
                                        ? '다섯째 주'
                                        : '';
                            const weekdayKorean = period.recurrenceWeekday
                              ? enumToWeekday(period.recurrenceWeekday) ||
                                period.recurrenceWeekday
                              : '';
                            return `${week} ${weekdayKorean}`.trim() || '매월';
                          }
                          return period.recurrenceCycle || '—';
                        };

                        const truncateDescription = (text) => {
                          if (!text || text.trim() === '') return '—';
                          const sentences = text
                            .split(/([.!?]+\s*)/)
                            .filter((s) => s.trim().length > 0)
                            .reduce((acc, curr, idx) => {
                              if (idx % 2 === 0) {
                                acc.push(curr);
                              } else {
                                acc[acc.length - 1] += curr;
                              }
                              return acc;
                            }, [])
                            .map((s) => s.trim())
                            .filter((s) => s.length > 0);

                          if (sentences.length <= 2) {
                            return text;
                          }

                          return sentences.slice(0, 2).join(' ') + '...';
                        };

                        return (
                          <>
                            <S.InfoTable role="table">
                              <S.InfoColGroup>
                                <col />
                                <col />
                                <col />
                                <col />
                              </S.InfoColGroup>

                              <S.InfoRow>
                                <S.InfoTh>제목</S.InfoTh>
                                <S.InfoTd>
                                  {period.title || period.name}
                                </S.InfoTd>
                                <S.InfoTh>유형</S.InfoTh>
                                <S.InfoTd>{period.type || '—'}</S.InfoTd>
                              </S.InfoRow>

                              <S.InfoRow>
                                <S.InfoTh>등록자</S.InfoTh>
                                <S.InfoTd>{period.registrant || '—'}</S.InfoTd>
                                <S.InfoTh>등록부서</S.InfoTh>
                                <S.InfoTd>
                                  {period.registrantDepartment || '—'}
                                </S.InfoTd>
                              </S.InfoRow>

                              <S.InfoRow>
                                <S.InfoTh>시작일자</S.InfoTh>
                                <S.InfoTd>{getStartDateTime()}</S.InfoTd>
                                <S.InfoTh>종료일자</S.InfoTh>
                                <S.InfoTd>{getEndedAt()}</S.InfoTd>
                              </S.InfoRow>

                              <S.InfoRow>
                                <S.InfoTh>지속시간</S.InfoTh>
                                <S.InfoTd>{getRestrictedTime()}</S.InfoTd>
                                <S.InfoTh>반복 주기</S.InfoTh>
                                <S.InfoTd>{getRecurrenceLabel()}</S.InfoTd>
                              </S.InfoRow>
                            </S.InfoTable>

                            <S.InfoTable role="table">
                              <S.InfoColGroup>
                                <col />
                                <col />
                                <col />
                                <col />
                              </S.InfoColGroup>

                              <S.InfoRow>
                                <S.InfoTh>연관 서비스</S.InfoTh>
                                <S.InfoTd colSpan={3}>
                                  {period.services &&
                                  period.services.length > 0 ? (
                                    <S.ServicesContainer>
                                      {period.services.map((service) => (
                                        <ServiceTag
                                          key={service}
                                          service={service}
                                        />
                                      ))}
                                    </S.ServicesContainer>
                                  ) : (
                                    '—'
                                  )}
                                </S.InfoTd>
                              </S.InfoRow>

                              <S.InfoRow>
                                <S.InfoTh>설명</S.InfoTh>
                                <S.InfoTd colSpan={3}>
                                  {truncateDescription(
                                    period.description || period.reason,
                                  )}
                                </S.InfoTd>
                              </S.InfoRow>
                            </S.InfoTable>
                          </>
                        );
                      })()
                    : (() => {
                        const deploymentData = selectedDayDetail.data;

                        return (
                          <S.InfoTable role="table">
                            <S.InfoColGroup>
                              <col />
                              <col />
                              <col />
                              <col />
                            </S.InfoColGroup>

                            <S.InfoRow>
                              <S.InfoTh>제목</S.InfoTh>
                              <S.InfoTd colSpan={3}>
                                {deploymentData.title || '—'}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>서비스</S.InfoTh>
                              <S.InfoTd colSpan={3}>
                                {deploymentData.service ? (
                                  <S.ServicesContainer>
                                    <ServiceTag
                                      service={deploymentData.service}
                                    />
                                  </S.ServicesContainer>
                                ) : (
                                  '—'
                                )}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>작업 상태</S.InfoTh>
                              <S.InfoTd>
                                {(() => {
                                  const stageLabel = deploymentData.stage
                                    ? enumToStage(deploymentData.stage) ||
                                      deploymentData.stage
                                    : null;
                                  const statusLabel = deploymentData.status
                                    ? enumToStatus(deploymentData.status) ||
                                      deploymentData.status
                                    : null;
                                  if (stageLabel && statusLabel) {
                                    return `${stageLabel} ${statusLabel}`;
                                  }
                                  if (stageLabel) return stageLabel;
                                  if (statusLabel) return statusLabel;
                                  return '—';
                                })()}
                              </S.InfoTd>
                              <S.InfoTh>배포 상태</S.InfoTh>
                              <S.InfoTd>
                                {deploymentData.isDeployed === true
                                  ? '성공'
                                  : deploymentData.isDeployed === false
                                    ? '실패'
                                    : '—'}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>작업일자</S.InfoTh>
                              <S.InfoTd colSpan={3}>
                                {deploymentData.date &&
                                deploymentData.scheduledTime
                                  ? formatDateTimeToKoreanWithSeconds(
                                      `${deploymentData.date} ${deploymentData.scheduledTime}`,
                                    )
                                  : deploymentData.date
                                    ? formatDateTimeToKoreanWithSeconds(
                                        `${deploymentData.date} 00:00:00`,
                                      )
                                    : '—'}
                              </S.InfoTd>
                            </S.InfoRow>
                          </S.InfoTable>
                        );
                      })()}
                </S.DetailContent>
              )}
            </>
          )}

          {panelMode === 'recovery' &&
            viewMode === 'detail' &&
            selectedRecovery && (
              <S.DetailContent>
                <S.InfoTable role="table">
                  <S.InfoColGroup>
                    <col />
                    <col />
                    <col />
                    <col />
                  </S.InfoColGroup>

                  <S.InfoRow>
                    <S.InfoTh>제목</S.InfoTh>
                    <S.InfoTd colSpan={3}>
                      {selectedRecovery.title || '—'}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>서비스명</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.service || '—'}</S.InfoTd>
                    <S.InfoTh>상태</S.InfoTh>
                    <S.InfoTd>
                      {getRecoveryStatusLabel(selectedRecovery.status) || '—'}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>등록자</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.registrant || '—'}</S.InfoTd>
                    <S.InfoTh>등록부서</S.InfoTh>
                    <S.InfoTd>
                      {selectedRecovery.registrantDepartment || '—'}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>소요시간</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.duration || '—'}</S.InfoTd>
                    <S.InfoTh>복구일</S.InfoTh>
                    <S.InfoTd>
                      {formatRecoveryDate(selectedRecovery.recoveredAt)}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>배포 ID</S.InfoTh>
                    <S.InfoTd colSpan={3}>
                      {selectedRecovery.deploymentId || '—'}
                    </S.InfoTd>
                  </S.InfoRow>
                </S.InfoTable>
              </S.DetailContent>
            )}
        </S.SidePanel>
      )}

      {/* 확인 모달 */}
      <ScheduleModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setConfirmModalType(null);
          setConfirmModalData(null);
        }}
        title="작업 취소 확인"
        maxWidth="400px"
        footer={
          <S.ConfirmFooter>
            <SecondaryBtn
              onClick={() => {
                setConfirmModalOpen(false);
                setConfirmModalType(null);
                setConfirmModalData(null);
              }}
            >
              취소
            </SecondaryBtn>
            <S.ConfirmButton
              onClick={() => {
                if (confirmModalType === 'cancel') {
                  alert(
                    `작업 취소 (mock): 진행중인 업무 ID ${confirmModalData?.id}`,
                  );
                }
                setConfirmModalOpen(false);
                setConfirmModalType(null);
                setConfirmModalData(null);
              }}
            >
              확인
            </S.ConfirmButton>
          </S.ConfirmFooter>
        }
      >
        <S.ConfirmMessage>
          {confirmModalType === 'cancel' && (
            <>
              정말로 작업을 취소하시겠습니까?
              <br />
              취소된 작업은 복구할 수 없습니다.
            </>
          )}
        </S.ConfirmMessage>
      </ScheduleModal>

      {/* 승인/반려 모달 (ApprovalDetail과 동일) */}
      {actionModal && (
        <S.ActionModalOverlay
          onClick={() => {
            setActionModal(null);
            setActionComment('');
          }}
        >
          <S.ActionModal onClick={(e) => e.stopPropagation()}>
            <S.ActionModalHeader>
              <S.ActionModalTitle>
                {actionModal.type === 'approve' && '승인'}
                {actionModal.type === 'reject' && '반려'}
              </S.ActionModalTitle>
            </S.ActionModalHeader>

            <S.ActionModalBody>
              <S.ReasonTextarea
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder="사유를 입력하세요."
              />
            </S.ActionModalBody>

            <S.ActionModalActions>
              <S.SubtleButton
                onClick={() => {
                  setActionModal(null);
                  setActionComment('');
                }}
              >
                취소
              </S.SubtleButton>
              <S.PrimaryButton
                onClick={async () => {
                  if (!selectedApproval?.id || !currentUserId) return;

                  try {
                    if (actionModal.type === 'approve') {
                      await approveMut.mutateAsync({
                        approvalId: selectedApproval.id,
                        approverAccountId: currentUserId,
                        comment: actionComment,
                      });
                    } else if (actionModal.type === 'reject') {
                      await rejectMut.mutateAsync({
                        approvalId: selectedApproval.id,
                        approverAccountId: currentUserId,
                        comment: actionComment,
                      });
                    }

                    // 성공 시 모든 관련 쿼리 무효화하여 페이지 리렌더링
                    await Promise.all([
                      queryClient.invalidateQueries({
                        queryKey: ['dashboard', 'pending-approvals'],
                      }),
                      queryClient.invalidateQueries({
                        queryKey: ['dashboard', 'in-progress-tasks'],
                      }),
                      queryClient.invalidateQueries({
                        queryKey: ['dashboard', 'notifications'],
                      }),
                    ]);

                    // 모달 닫기 및 패널 닫기
                    setActionModal(null);
                    setActionComment('');
                    setPanelOpen(false);
                    setViewMode('list');
                    setSelectedApproval(null);
                  } catch (e) {
                    console.error(e);
                    alert('요청 처리 중 오류가 발생했습니다.');
                  }
                }}
              >
                확인
              </S.PrimaryButton>
            </S.ActionModalActions>
          </S.ActionModal>
        </S.ActionModalOverlay>
      )}
    </>
  );
}
