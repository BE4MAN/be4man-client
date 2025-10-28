import { useMemo, useState } from 'react';

import * as S from './Dashboard.styles';

const STAT = {
  requested: { title: '배포 신청', value: 286, diff: +12 },
  pending: { title: '승인 대기', value: 18, diff: +5 },
  done: { title: '완료한 배포', value: 245, diff: +18 },
  failed: { title: '실패한 배포', value: 23, diff: +8 },
};

const TODAY_DEPLOYS = [
  {
    id: 1,
    icon: 'success',
    title: 'v2.3.1 배포',
    team: '프론트엔드팀',
    time: '14:30',
    status: '성공',
  },
  {
    id: 2,
    icon: 'success',
    title: 'API 서버 업데이트',
    team: '백엔드팀',
    time: '15:20',
    status: '성공',
  },
  {
    id: 3,
    icon: 'wait',
    title: '데이터베이스 마이그레이션',
    team: 'DevOps팀',
    time: '16:45',
    status: '대기중',
  },
];

const FAILED_7D = [
  {
    id: 'f1',
    title: '긴급 보안 패치',
    team: '백엔드팀',
    at: '2025-10-22 14:20',
    status: '실패',
  },
  {
    id: 'f2',
    title: 'v2.2.9 배포',
    team: '프론트엔드팀',
    at: '2025-10-21 11:30',
    status: '실패',
  },
  {
    id: 'f3',
    title: '인프라 업데이트',
    team: 'DevOps팀',
    at: '2025-10-20 09:15',
    status: '실패',
  },
];

const WEEK_ITEMS = [
  {
    id: 'w1',
    datetime: '2025-10-23T18:48:00+09:00',
    title: 'Hotfix 배포',
    team: '결제 서비스',
  },
  {
    id: 'w2',
    datetime: '2025-10-24T09:50:00+09:00',
    title: 'v1.9.2 배포',
    team: '코어 서비스',
  },
  {
    id: 'w3',
    datetime: '2025-10-25T14:20:00+09:00',
    title: '긴급 보안 패치',
    team: '백엔드팀',
    danger: true,
  },
  {
    id: 'w4',
    datetime: '2025-10-26T10:15:00+09:00',
    title: '긴급 보안 패치',
    team: '백엔드팀',
    danger: true,
  },
  {
    id: 'w5',
    datetime: '2025-10-27T11:30:00+09:00',
    title: '긴급 보안 패치',
    team: '백엔드팀',
    danger: true,
  },
];

function mondayOf(d) {
  const x = new Date(d);
  const diff = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}
function ymd(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    .toISOString()
    .slice(0, 10);
}

function WeekCarousel({ items }) {
  const thisWeek = useMemo(() => mondayOf(new Date()), []);
  const [offset, setOffset] = useState(0);
  const DOW = (d) =>
    ['월', '화', '수', '목', '금', '토', '일'][(d.getDay() + 6) % 7];

  const bucket = useMemo(() => {
    const start = addDays(thisWeek, offset * 7);
    const end = addDays(start, 7);
    const b = Array.from({ length: 7 }, (_, k) => {
      const date = addDays(start, k);
      return { key: ymd(date), date, items: [] };
    });
    items.forEach((it) => {
      const d = new Date(it.datetime);
      if (d >= start && d < end) {
        const k = ymd(d);
        const cell = b.find((x) => x.key === k);
        if (cell) cell.items.push(it);
      }
    });
    b.forEach((cell) =>
      cell.items.sort((a, c) => +new Date(a.datetime) - +new Date(c.datetime)),
    );
    return b;
  }, [items, thisWeek, offset]);

  return (
    <S.Block>
      <S.BlockHead>
        <S.BlockTitle>주단위 일정</S.BlockTitle>
        <S.HeadBtns>
          <S.IconBtn onClick={() => setOffset((v) => v - 1)}>‹</S.IconBtn>
          <S.IconBtn onClick={() => setOffset((v) => v + 1)}>›</S.IconBtn>
        </S.HeadBtns>
      </S.BlockHead>

      <S.WeekViewport>
        <S.WeekPage>
          {bucket.map((b) => (
            <S.DayCol key={b.key}>
              <S.SlideHead>
                <span className="dow">{DOW(b.date)}</span>
                <span className="date">
                  {String(b.date.getMonth() + 1).padStart(2, '0')}.
                  {String(b.date.getDate()).padStart(2, '0')}
                </span>
              </S.SlideHead>

              {b.items.length === 0 ? (
                <S.Empty>일정 없음</S.Empty>
              ) : (
                <S.DayList>
                  {b.items.map((it) => {
                    const t = new Date(it.datetime);
                    const hh = String(t.getHours()).padStart(2, '0');
                    const mm = String(t.getMinutes()).padStart(2, '0');
                    return (
                      <S.DayItem
                        key={it.id}
                        data-danger={it.danger || undefined}
                      >
                        <div className="title">{it.title}</div>
                        <div className="meta">
                          <span>{it.team}</span>
                          <span>
                            {hh}:{mm}
                          </span>
                        </div>
                      </S.DayItem>
                    );
                  })}
                </S.DayList>
              )}
            </S.DayCol>
          ))}
        </S.WeekPage>
      </S.WeekViewport>
    </S.Block>
  );
}

export default function Dashboard() {
  return (
    <S.Wrap>
      <S.SectionTitle>작업 현황</S.SectionTitle>
      <S.StatGrid>
        {Object.entries(STAT).map(([key, v]) => (
          <S.StatCard key={key}>
            <S.StatHead>
              <S.StatTitle>{v.title}</S.StatTitle>
            </S.StatHead>
            <S.StatFoot>
              <S.StatValue>{v.value}</S.StatValue>
              <S.StatDiff data-up={v.diff > 0 || undefined}>
                {v.diff > 0 ? `+${v.diff}` : v.diff}
              </S.StatDiff>
            </S.StatFoot>
          </S.StatCard>
        ))}
      </S.StatGrid>

      <S.TwoCol>
        <S.Block>
          <S.BlockHead>
            <S.BlockTitle>오늘 배포 목록</S.BlockTitle>
          </S.BlockHead>
          <S.List>
            {TODAY_DEPLOYS.map((r) => (
              <S.ListItem key={r.id}>
                <S.Left>
                  <S.StatusIcon data-type={r.icon} />
                  <div>
                    <div className="title">{r.title}</div>
                    <div className="sub">{r.team}</div>
                  </div>
                </S.Left>
                <S.Right>
                  <div className="time">{r.time}</div>
                  <S.Pill data-kind={r.status}>{r.status}</S.Pill>
                </S.Right>
              </S.ListItem>
            ))}
          </S.List>
        </S.Block>

        <S.Block>
          <S.BlockHead>
            <S.BlockTitle>배포 실패 목록 최근 7일</S.BlockTitle>
          </S.BlockHead>
          <S.List>
            {FAILED_7D.map((r) => (
              <S.ListItem key={r.id}>
                <S.Left>
                  <S.StatusIcon data-type="error" />
                  <div>
                    <div className="title">{r.title}</div>
                    <div className="sub">{r.team}</div>
                  </div>
                </S.Left>
                <S.Right>
                  <div className="time">{r.at}</div>
                  <S.Pill data-kind="실패">실패</S.Pill>
                </S.Right>
              </S.ListItem>
            ))}
          </S.List>
        </S.Block>
      </S.TwoCol>

      <WeekCarousel items={WEEK_ITEMS} />
    </S.Wrap>
  );
}
