import { useTheme } from '@emotion/react';
import { format, parseISO } from 'date-fns';
import { Bell, CalendarOff, ClipboardClock, ClipboardList } from 'lucide-react';
import React, { useMemo, useState, useEffect, useRef } from 'react';

import ServiceTag from '@/components/common/ServiceTag';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import WeeklyCalendar from '@/components/schedule/WeeklyCalendar';
import { useHolidays } from '@/features/schedule/hooks/useHolidays';
import { getDeploymentIcon } from '@/features/schedule/utils/deploymentIconMapper';
import {
  formatDuration,
  getDurationInMinutes,
} from '@/features/schedule/utils/durationUtils';
import {
  enumToStage,
  enumToStatus,
  enumToWeekday,
} from '@/features/schedule/utils/enumConverter';
import { formatTimeToKorean } from '@/features/schedule/utils/timeFormatter';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import {
  PENDING_APPROVALS,
  IN_PROGRESS_TASKS,
  NOTIFICATIONS,
  WEEKLY_EVENTS,
  DEPLOYMENT_BLACKOUTS,
  RECOVERY,
  STATS,
} from '../../../mock/dashboard';

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
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  // 공휴일 데이터 조회
  const currentYear = new Date().getFullYear();
  const { data: holidays = [] } = useHolidays(currentYear);

  // 복구현황 pagination
  const [recoveryPage, setRecoveryPage] = useState(1);
  const recoveryPageSize = 5;
  const recoveryTotal = RECOVERY.length;
  const recoveryTotalPages = Math.max(
    1,
    Math.ceil(recoveryTotal / recoveryPageSize),
  );
  const recoverySafePage = Math.min(recoveryPage, recoveryTotalPages);
  const recoveryStart = (recoverySafePage - 1) * recoveryPageSize;
  const recoveryPageItems = RECOVERY.slice(
    recoveryStart,
    recoveryStart + recoveryPageSize,
  );

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

  // 확인 모달 상태
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState(null); // 'approve' | 'reject' | 'cancel'
  const [confirmModalData, setConfirmModalData] = useState(null);

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

  // Mock 데이터를 WeeklyCalendar 형식으로 변환
  const deployments = useMemo(() => {
    const result = [];
    Object.entries(WEEKLY_EVENTS).forEach(([dateStr, events]) => {
      events.forEach((ev, idx) => {
        result.push({
          id: ev.id || `event-${dateStr}-${idx}`,
          title: ev.label,
          service: ev.service || '알 수 없음',
          date: dateStr,
          scheduledTime: '00:00',
          status:
            ev.type === '성공'
              ? 'COMPLETED'
              : ev.type === '실패'
                ? 'REJECTED'
                : 'PENDING',
          stage: 'DEPLOYMENT',
          isDeployed:
            ev.type === '성공' ? true : ev.type === '실패' ? false : null,
        });
      });
    });
    return result;
  }, []);

  const restrictedPeriods = useMemo(() => {
    return DEPLOYMENT_BLACKOUTS.map((blackout) => {
      const startDate = new Date(blackout.start);
      const endDate = new Date(blackout.end);
      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const startTimeStr = format(startDate, 'HH:mm');
      const endTimeStr = format(endDate, 'HH:mm');
      const durationMinutes = Math.round((endDate - startDate) / (1000 * 60));

      return {
        id: blackout.id.toString(),
        title: blackout.name,
        description: blackout.reason,
        startDate: startDateStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
        endedAt: blackout.end,
        durationMinutes,
        type: 'MAINTENANCE', // 기본값
        services: [],
      };
    });
  }, []);

  const handleDayCellClick = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const blackoutItems = DEPLOYMENT_BLACKOUTS.filter((b) =>
      isDateInRangeByDay(day, b.start, b.end),
    );
    openPanel('day', {
      dateKey,
      blackoutItems,
    });
  };

  const handleCalendarDateChange = () => {
    // WeeklyCalendar 내부에서 날짜 관리
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
          {STATS.map((s) => {
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
                <th>배포작업명</th>
                <th>서비스명</th>
                <th>상태</th>
                <th>소요시간</th>
                <th>복구일</th>
              </tr>
            </thead>
            <tbody>
              {recoveryPageItems.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                recoveryPageItems.map((r, idx) => (
                  <S.RecoveryRow
                    key={idx}
                    onClick={() => openPanel('recovery', { item: r })}
                  >
                    <td>{r.title}</td>
                    <td>{r.service}</td>
                    <td>
                      <S.Status $status={r.status}>{r.status}</S.Status>
                    </td>
                    <td>{r.duration}</td>
                    <td>{r.failedAt}</td>
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
                    `총 ${PENDING_APPROVALS.length}건의 승인 대기 문서`}
                  {panelMode === 'tasks' &&
                    `총 ${IN_PROGRESS_TASKS.length}건의 업무`}
                  {panelMode === 'notifications' &&
                    `총 ${NOTIFICATIONS.length}건의 알림`}
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
                  {PENDING_APPROVALS.map((p) => (
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
                          <div>요청일: {p.requestedAt}</div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge $variant="pending">승인 대기</S.TaskBadge>
                    </S.TaskItem>
                  ))}
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
                      <S.InfoTh>요청일</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.requestedAt || '—'}
                      </S.InfoTd>
                    </S.InfoRow>

                    <S.InfoRow>
                      <S.InfoTh>설명</S.InfoTh>
                      <S.InfoTd colSpan={3}>
                        {selectedApproval.description || '—'}
                      </S.InfoTd>
                    </S.InfoRow>
                  </S.InfoTable>

                  <S.ButtonRow>
                    <S.PrimaryButton
                      onClick={() => {
                        setConfirmModalType('approve');
                        setConfirmModalData(selectedApproval);
                        setConfirmModalOpen(true);
                      }}
                    >
                      승인
                    </S.PrimaryButton>
                    <S.DangerButton
                      onClick={() => {
                        setConfirmModalType('reject');
                        setConfirmModalData(selectedApproval);
                        setConfirmModalOpen(true);
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
                  {NOTIFICATIONS.map((n) => (
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
                          {n.rejectedBy && <div>반려자: {n.rejectedBy}</div>}
                          <div>발생 시각: {n.when}</div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge $variant="alert">{n.kind}</S.TaskBadge>
                    </S.TaskItem>
                  ))}
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
                      <S.InfoTd>{selectedNotification.when || '—'}</S.InfoTd>
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
                  {IN_PROGRESS_TASKS.map((t) => (
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
                          <div>등록자: {t.registrant || t.owner}</div>
                          <div>
                            배포일: {t.due || `${t.date} ${t.scheduledTime}`}
                          </div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge>
                        {t.status
                          ? enumToStatus(t.status) || t.status
                          : '진행중'}
                      </S.TaskBadge>
                    </S.TaskItem>
                  ))}
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
                      <S.InfoTh>등록자</S.InfoTh>
                      <S.InfoTd>
                        {selectedTask.registrant || selectedTask.owner || '—'}
                      </S.InfoTd>
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
                          ? formatTimeToKorean(
                              `${selectedTask.date} ${selectedTask.scheduledTime}`,
                            )
                          : selectedTask.due
                            ? selectedTask.due
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
                        {selectedTask.description || selectedTask.desc || '—'}
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
                          {b.name}
                        </S.TaskTitle>
                        <S.TaskMeta>
                          <div>사유: {b.reason}</div>
                          <div>시작: {b.start}</div>
                          <div>종료: {b.end}</div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge $variant="alert">작업 금지</S.TaskBadge>
                    </S.TaskItem>
                  ))}

                  {(WEEKLY_EVENTS[selectedDay.dateKey] || []).map((ev) => {
                    const getIsDeployed = () => {
                      if (ev.type === '성공') return true;
                      if (ev.type === '실패') return false;
                      return null;
                    };
                    const iconConfig = getDeploymentIcon(
                      ev.stage || '배포',
                      ev.status || ev.type,
                      getIsDeployed(),
                      theme,
                      16,
                    );
                    const { Icon, color } = iconConfig;
                    return (
                      <S.TaskItem
                        key={ev.id}
                        onClick={() => {
                          setSelectedDayDetail({
                            kind: 'event',
                            data: ev,
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
                            {ev.label}
                          </S.TaskTitle>
                          <S.TaskMeta>
                            <div>유형: {ev.type}</div>
                            <div>날짜: {selectedDay.dateKey} 00:00</div>
                          </S.TaskMeta>
                        </div>
                        <S.TaskBadge>
                          {ev.type === '대기'
                            ? '대기'
                            : ev.type === '성공'
                              ? '성공'
                              : '실패'}
                        </S.TaskBadge>
                      </S.TaskItem>
                    );
                  })}

                  {selectedDay.blackoutItems.length === 0 &&
                    (WEEKLY_EVENTS[selectedDay.dateKey] || []).length === 0 && (
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
                        const getIsDeployed = () => {
                          if (deploymentData.type === '성공') return true;
                          if (deploymentData.type === '실패') return false;
                          return null;
                        };

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
                                {deploymentData.title || deploymentData.label}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>등록자</S.InfoTh>
                              <S.InfoTd>
                                {deploymentData.registrant || '—'}
                              </S.InfoTd>
                              <S.InfoTh>등록부서</S.InfoTh>
                              <S.InfoTd>
                                {deploymentData.registrantDepartment || '—'}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>작업 상태</S.InfoTh>
                              <S.InfoTd>
                                {(() => {
                                  const stageLabel = deploymentData.stage
                                    ? enumToStage(deploymentData.stage) ||
                                      deploymentData.stage
                                    : '배포';
                                  const statusLabel = deploymentData.status
                                    ? enumToStatus(deploymentData.status) ||
                                      deploymentData.status
                                    : deploymentData.type === '대기'
                                      ? '대기'
                                      : deploymentData.type === '성공'
                                        ? '완료'
                                        : deploymentData.type === '실패'
                                          ? '반려'
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
                                {getIsDeployed() === true
                                  ? '성공'
                                  : getIsDeployed() === false
                                    ? '실패'
                                    : '—'}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>작업일자</S.InfoTh>
                              <S.InfoTd colSpan={3}>
                                {selectedDayDetail.dateKey
                                  ? formatTimeToKorean(
                                      `${selectedDayDetail.dateKey} 00:00`,
                                    )
                                  : '—'}
                              </S.InfoTd>
                            </S.InfoRow>

                            <S.InfoRow>
                              <S.InfoTh>연관 서비스</S.InfoTh>
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
                    <S.InfoTh>배포작업명</S.InfoTh>
                    <S.InfoTd colSpan={3}>
                      {selectedRecovery.title || '—'}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>서비스명</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.service || '—'}</S.InfoTd>
                    <S.InfoTh>상태</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.status || '—'}</S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>사유</S.InfoTh>
                    <S.InfoTd colSpan={3}>
                      {selectedRecovery.cause || '—'}
                    </S.InfoTd>
                  </S.InfoRow>

                  <S.InfoRow>
                    <S.InfoTh>소요시간</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.duration || '—'}</S.InfoTd>
                    <S.InfoTh>복구일</S.InfoTh>
                    <S.InfoTd>{selectedRecovery.failedAt || '—'}</S.InfoTd>
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
        title={
          confirmModalType === 'approve'
            ? '승인 처리 확인'
            : confirmModalType === 'reject'
              ? '반려 처리 확인'
              : '작업 취소 확인'
        }
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
                if (confirmModalType === 'approve') {
                  alert(`승인 처리 (mock): 문서 ID ${confirmModalData?.id}`);
                } else if (confirmModalType === 'reject') {
                  alert(`반려 처리 (mock): 문서 ID ${confirmModalData?.id}`);
                } else if (confirmModalType === 'cancel') {
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
          {confirmModalType === 'approve' && (
            <>
              정말로 승인하시겠습니까?
              <br />
              승인된 문서는 수정할 수 없습니다.
            </>
          )}
          {confirmModalType === 'reject' && (
            <>
              정말로 반려하시겠습니까?
              <br />
              반려된 문서는 다시 승인 요청이 필요합니다.
            </>
          )}
          {confirmModalType === 'cancel' && (
            <>
              정말로 작업을 취소하시겠습니까?
              <br />
              취소된 작업은 복구할 수 없습니다.
            </>
          )}
        </S.ConfirmMessage>
      </ScheduleModal>
    </>
  );
}
