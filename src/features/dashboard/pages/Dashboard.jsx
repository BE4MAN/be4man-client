import React, { useMemo, useState, useEffect, useRef } from 'react';

import {
  PENDING_APPROVALS,
  IN_PROGRESS_TASKS,
  NOTIFICATIONS,
  WEEKLY_EVENTS,
  DEPLOYMENT_BLACKOUTS,
  RECOVERY,
} from '../../../mock/dashboard';

import * as S from './Dashboard.styles';

function mondayOf(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

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
  const [offset, setOffset] = useState(0);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const baseWeek = useMemo(() => mondayOf(new Date()), []);
  const weekStart = addDays(baseWeek, offset * 7);
  const weekEnd = addDays(weekStart, 6);
  const formatDate = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

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

  const STATS = [
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

  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const isDetailHeader =
    viewMode === 'detail' &&
    (panelMode === 'tasks' ||
      panelMode === 'pending' ||
      panelMode === 'notifications' ||
      panelMode === 'day');

  return (
    <>
      <S.Wrap>
        <S.StatGrid>
          {STATS.map((s) => (
            <S.StatCard key={s.id} onClick={() => openPanel(s.id)}>
              <S.CardTop>
                <S.CardTopLeft>
                  <S.IconBox style={{ color: s.color }}>●</S.IconBox>
                  <S.StatLabel>{s.label}</S.StatLabel>
                </S.CardTopLeft>
                <S.StatValue>{s.value}</S.StatValue>
              </S.CardTop>
              <S.StatDesc>{s.desc}</S.StatDesc>
            </S.StatCard>
          ))}
        </S.StatGrid>

        <S.WeekBlock>
          <S.WeekHeader>
            <S.SectionTitle>주간 일정</S.SectionTitle>
            <span>
              {formatDate(weekStart)} – {formatDate(weekEnd)}
            </span>
            <div>
              <S.IconBtn onClick={() => setOffset((v) => v - 1)}>
                ‹ 이전
              </S.IconBtn>
              <S.IconBtn onClick={() => setOffset(0)}>이번 주</S.IconBtn>
              <S.IconBtn onClick={() => setOffset((v) => v + 1)}>
                다음 ›
              </S.IconBtn>
            </div>
          </S.WeekHeader>

          <S.WeekGrid>
            {days.map((d, i) => {
              const key = d.toISOString().slice(0, 10);

              const blackoutItems = DEPLOYMENT_BLACKOUTS.filter((b) =>
                isDateInRangeByDay(d, b.start, b.end),
              );
              const dailyEvents = WEEKLY_EVENTS[key] || [];
              const hasBlackout = blackoutItems.length > 0;

              const cellDate = new Date(d);
              cellDate.setHours(0, 0, 0, 0);

              const isActiveBlackoutNow = blackoutItems.some((b) => {
                const end = new Date(b.end);
                return (
                  now <= end && cellDate.getTime() >= todayMidnight.getTime()
                );
              });

              const MAX_ITEMS_PER_DAY = 3;
              const totalItems = blackoutItems.length + dailyEvents.length;

              const maxEventsToShow = Math.max(
                0,
                MAX_ITEMS_PER_DAY - blackoutItems.length,
              );
              const eventsToShow = dailyEvents.slice(0, maxEventsToShow);
              const shownCount = blackoutItems.length + eventsToShow.length;
              const showMoreCount = Math.max(0, totalItems - shownCount);

              return (
                <S.DayCol
                  key={key}
                  $hasBlackout={hasBlackout}
                  $active={isActiveBlackoutNow}
                  onClick={() =>
                    openPanel('day', {
                      dateKey: key,
                      blackoutItems,
                    })
                  }
                >
                  <S.DayHead>
                    <S.DayHeadLeft>
                      <span>
                        {['월', '화', '수', '목', '금', '토', '일'][i]}
                      </span>
                      {showMoreCount > 0 && (
                        <S.MoreBadge>+{showMoreCount}</S.MoreBadge>
                      )}
                    </S.DayHeadLeft>
                    <S.DayDate>
                      <span>{d.getDate()}</span>
                    </S.DayDate>
                  </S.DayHead>

                  {blackoutItems.map((b, idx) => {
                    if (idx >= MAX_ITEMS_PER_DAY) return null;
                    return (
                      <S.DayItem key={b.id} $variant="blackout">
                        🚫 작업 금지: {b.name}
                      </S.DayItem>
                    );
                  })}

                  {eventsToShow.map((ev) => (
                    <S.DayItem key={ev.id}>
                      {ev.type === '대기'
                        ? '⏱ '
                        : ev.type === '성공'
                          ? '✅ '
                          : '❌ '}
                      {ev.label}
                    </S.DayItem>
                  ))}

                  {totalItems === 0 && <S.Empty>일정 없음</S.Empty>}
                </S.DayCol>
              );
            })}
          </S.WeekGrid>
        </S.WeekBlock>

        <S.RecoveryBlock>
          <S.SectionTitle>복구 현황</S.SectionTitle>
          <S.Table>
            <thead>
              <tr>
                <th>서비스명</th>
                <th>복구일</th>
                <th>사유</th>
                <th>상태</th>
                <th>소요시간</th>
                <th>담당팀</th>
              </tr>
            </thead>
            <tbody>
              {RECOVERY.map((r, idx) => (
                <S.RecoveryRow
                  key={idx}
                  onClick={() => openPanel('recovery', { item: r })}
                >
                  <td>{r.service}</td>
                  <td>{r.failedAt}</td>
                  <td>{r.cause}</td>
                  <td>
                    <S.Status $status={r.status}>{r.status}</S.Status>
                  </td>
                  <td>{r.duration}</td>
                  <td>{r.team}</td>
                </S.RecoveryRow>
              ))}
            </tbody>
          </S.Table>
        </S.RecoveryBlock>
      </S.Wrap>

      {panelOpen && <S.Overlay ref={overlayRef} />}

      {panelOpen && panelMode && (
        <S.SidePanel>
          {isDetailHeader ? (
            <S.PanelHeader $dark>
              <S.PanelTitleWrap>
                <S.PanelTitle>
                  {panelMode === 'pending' && '승인 상세'}
                  {panelMode === 'tasks' && '업무 상세'}
                  {panelMode === 'notifications' && '알림 상세'}
                  {panelMode === 'day' && '주간 일정 상세'}
                </S.PanelTitle>
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
                          <div>서비스: {p.serviceName}</div>
                          <div>승인 예정자: {p.currentApprover}</div>
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
                  <S.TaskStatus>승인 대기</S.TaskStatus>
                  <S.DetailTitle>{selectedApproval.title}</S.DetailTitle>
                  <S.DetailMeta>
                    <li>문서유형: {selectedApproval.docType}</li>
                    <li>서비스: {selectedApproval.serviceName}</li>
                    <li>승인 예정자: {selectedApproval.currentApprover}</li>
                    <li>요청일: {selectedApproval.requestedAt}</li>
                  </S.DetailMeta>
                  <S.Divider />
                  <S.DetailDesc></S.DetailDesc>
                  <S.ButtonRow>
                    <S.PrimaryButton
                      onClick={() =>
                        alert(
                          `승인 처리 (mock): 문서 ID ${selectedApproval.id}`,
                        )
                      }
                    >
                      승인
                    </S.PrimaryButton>
                    <S.DangerButton
                      onClick={() =>
                        alert(
                          `반려 처리 (mock): 문서 ID ${selectedApproval.id}`,
                        )
                      }
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
                  <S.TaskStatus>{selectedNotification.kind}</S.TaskStatus>
                  <S.DetailTitle>
                    [{selectedNotification.kind}]{' '}
                    {selectedNotification.serviceName}
                  </S.DetailTitle>
                  <S.DetailMeta>
                    <li>서비스: {selectedNotification.serviceName}</li>
                    <li>사유: {selectedNotification.reason}</li>
                    {selectedNotification.rejectedBy && (
                      <li>반려자: {selectedNotification.rejectedBy}</li>
                    )}
                    <li>발생 시각: {selectedNotification.when}</li>
                  </S.DetailMeta>
                  <S.Divider />
                  <S.DetailDesc>
                    이 알림은{' '}
                    <strong>{selectedNotification.serviceName}</strong> 관련
                    작업에서 발생했습니다.
                  </S.DetailDesc>
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
                          <div>담당자: {t.owner}</div>
                          <div>배포일: {t.due}</div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge>{t.status}</S.TaskBadge>
                    </S.TaskItem>
                  ))}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedTask && (
                <S.DetailContent>
                  <S.TaskStatus>{selectedTask.status}</S.TaskStatus>
                  <S.DetailTitle>{selectedTask.title}</S.DetailTitle>
                  <S.DetailMeta>
                    <li>담당자: {selectedTask.owner}</li>
                    <li>배포일: {selectedTask.due}</li>
                  </S.DetailMeta>
                  <S.Divider />
                  <S.DetailDesc>{selectedTask.desc}</S.DetailDesc>
                  <S.FileLink href="#">{selectedTask.file}</S.FileLink>
                  <S.ButtonRow>
                    <S.DangerButton
                      onClick={() =>
                        alert(
                          `작업 취소 (mock): 진행중인 업무 ID ${selectedTask.id}`,
                        )
                      }
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
                        <S.TaskTitle>🚫 작업 금지: {b.name}</S.TaskTitle>
                        <S.TaskMeta>
                          <div>사유: {b.reason}</div>
                          <div>시작: {b.start}</div>
                          <div>종료: {b.end}</div>
                        </S.TaskMeta>
                      </div>
                      <S.TaskBadge $variant="alert">작업 금지</S.TaskBadge>
                    </S.TaskItem>
                  ))}

                  {(WEEKLY_EVENTS[selectedDay.dateKey] || []).map((ev) => (
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
                        <S.TaskTitle>{ev.label}</S.TaskTitle>
                        <S.TaskMeta>
                          <div>유형: {ev.type}</div>
                          <div>날짜: {selectedDay.dateKey}</div>
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
                  ))}

                  {selectedDay.blackoutItems.length === 0 &&
                    (WEEKLY_EVENTS[selectedDay.dateKey] || []).length === 0 && (
                      <S.Empty>해당 날짜의 일정이 없습니다.</S.Empty>
                    )}
                </S.TaskList>
              )}

              {viewMode === 'detail' && selectedDayDetail && (
                <S.DetailContent>
                  {selectedDayDetail.kind === 'blackout' ? (
                    <>
                      <S.TaskStatus>작업 금지</S.TaskStatus>
                      <S.DetailTitle>
                        🚫 작업 금지: {selectedDayDetail.data.name}
                      </S.DetailTitle>
                      <S.DetailMeta>
                        <li>날짜: {selectedDayDetail.dateKey}</li>
                        <li>사유: {selectedDayDetail.data.reason}</li>
                        <li>시작: {selectedDayDetail.data.start}</li>
                        <li>종료: {selectedDayDetail.data.end}</li>
                      </S.DetailMeta>
                      <S.Divider />
                      <S.DetailDesc>
                        해당 기간에는 안정성을 위해 배포 작업이 제한됩니다.
                      </S.DetailDesc>
                    </>
                  ) : (
                    <>
                      <S.TaskStatus>
                        {selectedDayDetail.data.type === '대기'
                          ? '대기'
                          : selectedDayDetail.data.type === '성공'
                            ? '성공'
                            : '실패'}
                      </S.TaskStatus>
                      <S.DetailTitle>
                        {selectedDayDetail.data.label}
                      </S.DetailTitle>
                      <S.DetailMeta>
                        <li>날짜: {selectedDayDetail.dateKey}</li>
                        <li>유형: {selectedDayDetail.data.type}</li>
                      </S.DetailMeta>
                      <S.Divider />
                      <S.DetailDesc>
                        이 일정은 <strong>{selectedDayDetail.data.type}</strong>{' '}
                        상태로 등록된 배포 작업입니다.
                      </S.DetailDesc>
                    </>
                  )}
                </S.DetailContent>
              )}
            </>
          )}

          {panelMode === 'recovery' &&
            viewMode === 'detail' &&
            selectedRecovery && (
              <S.DetailContent>
                <S.TaskStatus>{selectedRecovery.status}</S.TaskStatus>
                <S.DetailTitle>{selectedRecovery.service}</S.DetailTitle>
                <S.DetailMeta>
                  <li>복구 일시: {selectedRecovery.failedAt}</li>
                  <li>사유: {selectedRecovery.cause}</li>
                  <li>소요 시간: {selectedRecovery.duration}</li>
                  <li>담당 팀: {selectedRecovery.team}</li>
                </S.DetailMeta>
                <S.Divider />
                <S.DetailDesc>
                  이 이력은 <strong>{selectedRecovery.service}</strong> 서비스에
                  대한 장애 및 복구 상세 정보입니다. 추후 재발 방지를 위해 원인
                  분석 및 후속 조치가 필요합니다.
                </S.DetailDesc>
              </S.DetailContent>
            )}
        </S.SidePanel>
      )}
    </>
  );
}
