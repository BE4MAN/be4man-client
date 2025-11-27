// 작성자 : 조윤상
import { useEffect, useState, useMemo } from 'react';

import { fetchFailureFollowupSuccessData } from '@/utils/analyticsDataGenerators';

import * as S from './FailureFollowupCharts.styles';

// 공통: 누적 막대 데이터로 변환 (within/over)
function toStacked(valMins, thresholdMins) {
  const within = Math.min(valMins, thresholdMins);
  const over = Math.max(valMins - thresholdMins, 0);
  return { within, over, total: within + over };
}

function useScaled(projects, pickValue, thresholdMins) {
  const items = useMemo(() => {
    return projects.map((p) => {
      const val = pickValue(p); // 분
      const stack = toStacked(val, thresholdMins);
      return { id: p.id, name: p.name, ...stack, raw: val };
    });
  }, [projects, pickValue, thresholdMins]);

  const maxVal = Math.max(1, ...items.map((i) => i.total));
  // y축 눈금은 0, 60, 120, 180, 240, 360… 중 적당히 자동
  const niceTicks = useMemo(() => {
    const candidates = [60, 120, 180, 240, 300, 360, 480, 600];
    const top =
      candidates.find((c) => c >= maxVal) ?? Math.ceil(maxVal / 60) * 60;
    const steps = 5;
    const step = Math.ceil(top / steps / 30) * 30; // 30분 단위 라운딩
    const axisTop = step * steps;
    const ticks = [];
    for (let t = 0; t <= axisTop; t += step) ticks.push(t);
    return { axisTop, ticks };
  }, [maxVal]);

  return { items, maxVal, niceTicks };
}

function StackedBarChart({ title, projects, pickValue, thresholdMins }) {
  // 레이아웃
  const width = 880; // 전체 viewBox width
  const height = 280;
  const pad = { top: 12, right: 20, bottom: 48, left: 65 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  // 데이터 스케일
  const { items, niceTicks } = useScaled(projects, pickValue, thresholdMins);
  const n = items.length;

  // 가로 스크롤: 12개를 넘어가면 bar 폭 고정 + 내부 width 확대
  const BAR_BASE = 30; // 막대 기본 폭
  const GAP = 18; // 막대 간격
  const minVisible = 12;
  const innerWidth = Math.max(
    chartW,
    n > minVisible ? n * (BAR_BASE + GAP) : chartW,
  );

  const xAt = (i) =>
    pad.left +
    (n > minVisible ? i * (BAR_BASE + GAP) : (i + 0.5) * (chartW / n)) +
    (n > minVisible ? 0 : (chartW / n - BAR_BASE) / 2);
  const barWidth =
    n > minVisible ? BAR_BASE : Math.min(BAR_BASE, chartW / n - GAP);

  // ── 라벨 렌더링 보조: 회전/래핑 여부 판단
  const isCompact = barWidth < 26; // 막대가 얇으면 회전
  const fontSize = isCompact ? 10 : 11;
  const labelY = height - 16;

  // 공백 기준 두 줄 래핑(없으면 길이 기준 하드 래핑)
  const wrapLabel = (name) => {
    if (!name) return [''];
    const parts = String(name).split(/\s+/);
    if (parts.length >= 2) {
      const first = parts.slice(0, Math.ceil(parts.length / 2)).join(' ');
      const second = parts.slice(Math.ceil(parts.length / 2)).join(' ');
      return [first, second];
    }
    // 단어 하나면 길이 기준으로 자르기
    const maxLen = isCompact ? 5 : 8; // 화면 좁으면 더 짧게
    if (name.length <= maxLen) return [name];
    return [name.slice(0, maxLen), name.slice(maxLen)];
  };

  const yScale = (v) => pad.top + chartH - (v / niceTicks.axisTop) * chartH;
  const thresholdY = yScale(thresholdMins);

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>{title}</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent>
        <S.ChartScroll>
          <S.ChartInner
            style={{ width: `${innerWidth + pad.left + pad.right}px` }}
          >
            <svg
              width="100%"
              height={height}
              viewBox={`0 0 ${innerWidth + pad.left + pad.right} ${height}`}
              preserveAspectRatio="xMinYMin meet"
            >
              {/* Grid & Y Axis */}
              {niceTicks.ticks.map((t, idx) => {
                const y = yScale(t);
                return (
                  <g key={idx}>
                    <line
                      x1={pad.left}
                      y1={y}
                      x2={innerWidth + pad.left}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      style={{ color: 'var(--chart-grid-color, #E5E7EB)' }}
                    />
                    <text
                      x={pad.left - 10}
                      y={y + 4}
                      fontSize="11"
                      textAnchor="end"
                      fill="currentColor"
                      style={{ color: 'var(--chart-text-color, #6B7280)' }}
                    >
                      {t}분
                    </text>
                  </g>
                );
              })}

              {/* Threshold line */}
              <line
                x1={pad.left}
                y1={thresholdY}
                x2={innerWidth + pad.left}
                y2={thresholdY}
                stroke="#EF4444"
                strokeDasharray="6 6"
                strokeWidth="1.5"
              />
              <text
                x={innerWidth + pad.left - 4}
                y={thresholdY - 6}
                fontSize="11"
                textAnchor="end"
                fill="#EF4444"
              >
                {`임계치 ${thresholdMins}분`}
              </text>

              {/* Bars */}
              {items.map((it, i) => {
                const x = xAt(i);
                const hWithin = (it.within / niceTicks.axisTop) * chartH;
                const hOver = (it.over / niceTicks.axisTop) * chartH;

                const yWithin = pad.top + chartH - hWithin;
                const yOver = yWithin - hOver;

                return (
                  <g key={it.id}>
                    {/* Over (초과, 빨강) */}
                    {it.over > 0 && (
                      <rect
                        x={x}
                        y={yOver}
                        width={barWidth}
                        height={hOver}
                        fill="#EF4444"
                        opacity="0.9"
                        rx="3"
                      />
                    )}
                    {/* Within (이내, 초록) */}
                    <rect
                      x={x}
                      y={yWithin}
                      width={barWidth}
                      height={hWithin}
                      fill="#10B981"
                      opacity="0.9"
                      rx="3"
                    />

                    {/* Responsive X Label */}
                    <g
                      transform={
                        isCompact
                          ? `rotate(-30 ${x + barWidth / 2} ${labelY})`
                          : undefined
                      }
                    >
                      <text
                        x={x + barWidth / 2}
                        y={labelY}
                        fontSize={fontSize}
                        textAnchor="middle"
                        fill="currentColor"
                        style={{ color: 'var(--chart-text-color, #6B7280)' }}
                      >
                        <title>{it.name}</title> {/* 툴팁로 전체 표시 */}
                        {wrapLabel(it.name).map((line, li) => (
                          <tspan
                            key={li}
                            x={x + barWidth / 2}
                            dy={li === 0 ? 0 : 12}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>

                    {/* Tooltip-ish value (상단) */}
                    <text
                      x={x + barWidth / 2}
                      y={yOver > 0 ? yOver - 6 : yWithin - 6}
                      fontSize="11"
                      textAnchor="middle"
                      fill="currentColor"
                      style={{ color: 'var(--chart-text-color, #6B7280)' }}
                    >
                      {it.raw}분
                    </text>
                  </g>
                );
              })}
            </svg>
          </S.ChartInner>
        </S.ChartScroll>

        <S.LegendRow>
          <S.LegendItem>
            <S.LegendColor color="#10B981" />
            <span>SLA 이내(≤ {thresholdMins}분)</span>
          </S.LegendItem>
          <S.LegendItem>
            <S.LegendColor color="#EF4444" />
            <span>
              초과({'>'} {thresholdMins}분)
            </span>
          </S.LegendItem>
        </S.LegendRow>
      </S.PanelContent>
    </S.PanelContainer>
  );
}

export default function FailureFollowupCharts() {
  const [successProjects, setSuccessProjects] = useState([]);
  const [successThreshold, setSuccessThreshold] = useState(120);

  useEffect(() => {
    (async () => {
      try {
        const { thresholdMins, projects } =
          await fetchFailureFollowupSuccessData();
        setSuccessProjects(projects || []);
        if (typeof thresholdMins === 'number') {
          setSuccessThreshold(thresholdMins);
        }
      } catch (e) {
        console.error('실패→다음 성공 통계 로드 실패', e);
      }
    })();
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <StackedBarChart
        title="빌드 실패 복구 시간"
        projects={successProjects}
        pickValue={(p) => p.avgSuccessMins}
        thresholdMins={successThreshold}
      />
    </div>
  );
}
