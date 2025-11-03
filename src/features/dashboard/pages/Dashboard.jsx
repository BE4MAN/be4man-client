import { useMemo, useState, useEffect, useRef } from 'react';

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

export default function Dashboard() {
  const [offset, setOffset] = useState(0);
  const baseWeek = useMemo(() => mondayOf(new Date()), []);
  const weekStart = addDays(baseWeek, offset * 7);
  const weekEnd = addDays(weekStart, 6);
  const formatDate = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const STATS = [
    {
      id: 1,
      label: '승인 대기',
      value: 5,
      desc: '결재가 필요한 문서',
      color: '#2563eb',
    },
    {
      id: 2,
      label: '진행중인 업무',
      value: 5,
      desc: '현재 처리중인 작업',
      color: '#7c3aed',
    },
    {
      id: 3,
      label: '알림',
      value: 3,
      desc: '확인이 필요한 알림',
      color: '#dc2626',
    },
  ];

  const TASKS = [
    {
      id: 1,
      title: '프로젝트 보고서 작성',
      due: '2025-10-30',
      status: '진행중',
      owner: '홍길동',
      progress: 65,
      desc: '프로젝트 보고서 작성에 대한 상세 작업 중입니다.',
      file: '업무_문서.pdf',
    },
    {
      id: 2,
      title: '고객 피드백 검토',
      due: '2025-10-29',
      status: '진행중',
      owner: '이수민',
      progress: 40,
      desc: '고객 의견을 수집 및 정리 중입니다.',
      file: '피드백_정리.xlsx',
    },
    {
      id: 3,
      title: '월간 실적 분석',
      due: '2025-10-28',
      status: '진행중',
      owner: '김민재',
      progress: 90,
      desc: '데이터 분석 결과를 보고서로 정리 중입니다.',
      file: '실적_보고서.pdf',
    },
  ];

  const WEEKLY = {
    '2025-10-27': ['10:00 팀 회의', '14:00 프로젝트 검토'],
    '2025-10-28': ['11:00 고객 미팅', '12:30 점심 약속'],
    '2025-10-29': ['10:30 코드 리뷰', '15:00 개발 세미나'],
    '2025-10-30': ['09:00 월간 보고', '11:00 예산 회의'],
    '2025-10-31': ['09:30 주간 보고', '16:00 팀 빌딩'],
  };

  const RECOVERY = [
    {
      service: '결제 서비스',
      failedAt: '10/29 15:22',
      cause: 'DB 마이그레이션 실패',
      status: '복구 완료',
      duration: '42분',
      team: 'DevOps팀',
    },
    {
      service: '알림 서비스',
      failedAt: '10/28 18:10',
      cause: 'Jenkins 단계 오류',
      status: '진행중',
      duration: '-',
      team: '백엔드팀',
    },
    {
      service: '사용자 서비스',
      failedAt: '10/27 09:50',
      cause: '배포 승인 누락',
      status: '분석중',
      duration: '-',
      team: '프론트팀',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const overlayRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (overlayRef.current && e.target === overlayRef.current) {
        setIsOpen(false);
        setViewMode('list');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <S.Wrap>
        <S.StatGrid>
          {STATS.map((s) => (
            <S.StatCard key={s.id} onClick={() => setIsOpen(true)}>
              <S.CardTop>
                <S.IconBox style={{ color: s.color }}>●</S.IconBox>
                <S.StatValue>{s.value}</S.StatValue>
              </S.CardTop>
              <S.StatLabel>{s.label}</S.StatLabel>
            </S.StatCard>
          ))}
        </S.StatGrid>

        <S.WeekBlock>
          <S.WeekHeader>
            <span>주간 일정</span>
            <span>
              {formatDate(weekStart)} – {formatDate(weekEnd)}
            </span>
            <div>
              <S.IconBtn onClick={() => setOffset((v) => v - 1)}>
                ‹ 이전
              </S.IconBtn>
              <S.IconBtn onClick={() => setOffset((v) => v + 1)}>
                다음 ›
              </S.IconBtn>
            </div>
          </S.WeekHeader>
          <S.WeekGrid>
            {days.map((d, i) => {
              const key = d.toISOString().slice(0, 10);
              const items = WEEKLY[key] || [];
              return (
                <S.DayCol key={key} onClick={() => setIsOpen(true)}>
                  <S.DayHead>
                    <span>{['월', '화', '수', '목', '금', '토', '일'][i]}</span>
                    <span>{d.getDate()}</span>
                  </S.DayHead>
                  {items.length ? (
                    items.map((it, idx) => (
                      <S.DayItem key={idx}>{it}</S.DayItem>
                    ))
                  ) : (
                    <S.Empty>일정 없음</S.Empty>
                  )}
                </S.DayCol>
              );
            })}
          </S.WeekGrid>
        </S.WeekBlock>

        <S.RecoveryBlock>
          <S.SectionTitle>배포 실패 복구 현황판</S.SectionTitle>
          <S.Table>
            <thead>
              <tr>
                <th>서비스명</th>
                <th>실패 일시</th>
                <th>원인</th>
                <th>상태</th>
                <th>소요시간</th>
                <th>담당팀</th>
              </tr>
            </thead>
            <tbody>
              {RECOVERY.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.service}</td>
                  <td>{r.failedAt}</td>
                  <td>{r.cause}</td>
                  <td>
                    <S.Status $status={r.status}>{r.status}</S.Status>
                  </td>
                  <td>{r.duration}</td>
                  <td>{r.team}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.RecoveryBlock>
      </S.Wrap>

      {isOpen && <S.Overlay ref={overlayRef} />}

      {isOpen && (
        <S.SidePanel>
          {viewMode === 'list' ? (
            <>
              <S.PanelHeader>
                <S.PanelTitle>진행중인 업무</S.PanelTitle>
                <S.PanelSub>총 업무 {TASKS.length}건</S.PanelSub>
              </S.PanelHeader>
              <S.TaskList>
                {TASKS.map((t) => (
                  <S.TaskItem
                    key={t.id}
                    onClick={() => {
                      setSelectedTask(t);
                      setViewMode('detail');
                    }}
                  >
                    <div>
                      <S.TaskTitle>{t.title}</S.TaskTitle>
                      <S.TaskDate>📅 {t.due}</S.TaskDate>
                    </div>
                    <S.TaskBadge>{t.status}</S.TaskBadge>
                  </S.TaskItem>
                ))}
              </S.TaskList>
            </>
          ) : (
            <>
              <S.PanelHeader dark>
                <S.BackBtn onClick={() => setViewMode('list')}>
                  ← 뒤로가기
                </S.BackBtn>
                <S.PanelTitle>업무 상세</S.PanelTitle>
              </S.PanelHeader>
              <S.DetailContent>
                <S.TaskStatus>{selectedTask.status}</S.TaskStatus>
                <S.DetailTitle>{selectedTask.title}</S.DetailTitle>
                <S.DetailMeta>
                  <li>담당자: {selectedTask.owner}</li>
                  <li>마감일: {selectedTask.due}</li>
                  <li>진행률: {selectedTask.progress}%</li>
                </S.DetailMeta>
                <S.Divider />
                <S.DetailDesc>{selectedTask.desc}</S.DetailDesc>
                <S.FileLink href="#">{selectedTask.file}</S.FileLink>
              </S.DetailContent>
            </>
          )}
        </S.SidePanel>
      )}
    </>
  );
}
