import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
} from 'chart.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

import { axiosInstance } from '@/api/axios';
import { listSuccessServices } from '@/utils/analyticsDataGenerators';

import * as S from './DeploymentFailureChart.styles';

// Chart.js 기본 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
);

// 문제 유형 상수
const PROBLEM_TYPES = [
  'BUILD_AND_PACKAGING_FAILURES',
  'AUTOMATION_TEST_FAILED',
  'DEPLOYMENT_AND_EXECUTION_ERRORS',
  'JENKINS_ENVIRONMENT_AND_CONFIGURATION_ERRORS',
  'OTHERS',
];

const PROBLEM_LABELS = {
  BUILD_AND_PACKAGING_FAILURES: '빌드/패키징 실패',
  AUTOMATION_TEST_FAILED: '자동화 테스트 실패',
  DEPLOYMENT_AND_EXECUTION_ERRORS: '배포/실행 오류',
  JENKINS_ENVIRONMENT_AND_CONFIGURATION_ERRORS: '젠킨스 환경/설정 오류',
  OTHERS: '기타',
};

const COLORS = [
  '#2563eb', // blue-600
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#10b981', // emerald-500
  '#6b7280', // gray-500
];

// 최근 N개월(포함) YYYY-MM 라벨 생성
function getLastNMonths(n) {
  const res = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    res.push(`${y}-${m}`);
  }
  return res;
}

/**
 * Props:
 *   from?: string (YYYY-MM-DD)
 *   to?: string   (YYYY-MM-DD)
 *   endpoint?: string  (기본값: `/api/statistics/deploy-failures/series`)
 *
 * 백엔드 규약(예시):
 *  GET /api/statistics/deploy-failures/series?serviceId={id|all}&from=YYYY-MM-DD&to=YYYY-MM-DD
 *  → 응답:
 *  {
 *    projectId: 1, // (선택)
 *    summary: {
 *      total: 12,
 *      typeCounts: {
 *        BUILD_AND_PACKAGING_FAILURES: 10,
 *        ...
 *      }
 *    },
 *    series: {
 *      ALL: [{month:"2025-01", count:5}, ...],
 *      BUILD_AND_PACKAGING_FAILURES: [...],
 *      ...
 *    }
 *  }
 */
export default function DeploymentFailureCharts({ from, to, endpoint }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // 서비스 필터 상태
  const [selectedService, setSelectedService] = useState('all');
  const [serviceOptions, setServiceOptions] = useState([
    { id: 'all', name: '전체' },
  ]);

  // 서비스 목록 로딩 (성공률 서비스 목록 재사용)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opts = await listSuccessServices();
        if (cancelled) return;
        setServiceOptions(opts);
      } catch (e) {
        // 실패해도 기본 "전체"만 있는 상태로 동작
        console.error('Failed to load failure services', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 호출할 URL (path variable 없이 고정 endpoint + query string 사용)
  const url = useMemo(() => {
    const base = endpoint || '/api/statistics/deploy-failures/series';
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    // 전체(프로젝트 전체)는 쿼리 생략, 특정 서비스 선택 시에만 쿼리 전송
    if (selectedService && selectedService !== 'all') {
      params.set('serviceId', selectedService);
    }
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [from, to, endpoint, selectedService]);

  // 데이터 로딩
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await axiosInstance.get(url);
        const respData = res.data;
        // 서버가 HTML을 돌려준 경우(예: 인증 리다이렉트) 방어
        if (typeof respData === 'string' && respData.trim().startsWith('<')) {
          throw new Error('Invalid JSON response (HTML received)');
        }
        if (alive) setData(respData);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [url]);

  // API 응답 → 차트용 데이터 변환
  const { doughnutData, doughnutOptions, lineData, lineOptions } =
    useMemo(() => {
      if (!data) {
        return {
          doughnutData: null,
          doughnutOptions: null,
          lineData: null,
          lineOptions: null,
        };
      }

      // 도넛 차트: summary.typeCounts 기준으로 5개 유형 정규화
      const countsByType = [];
      for (let i = 0; i < PROBLEM_TYPES.length; i++) {
        const key = PROBLEM_TYPES[i];
        countsByType.push(data.summary?.typeCounts?.[key] ?? 0);
      }
      const total = countsByType.reduce((a, b) => a + b, 0);

      const last12 = getLastNMonths(12);
      const seriesObj = data.series || {};
      const monthLabels = last12;

      const seriesFor = (typeKey) => {
        const arr = seriesObj[typeKey] || [];
        const map = new Map((arr || []).map((e) => [e.month, e.count]));
        return last12.map((m) => map.get(m) ?? 0);
      };

      const doughnutData = {
        labels: PROBLEM_TYPES.map((k) => PROBLEM_LABELS[k] || k),
        datasets: [
          {
            data: countsByType,
            backgroundColor: COLORS,
            borderWidth: 0,
          },
        ],
      };

      const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { usePointStyle: true, pointStyle: 'circle' },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed;
                const pct = total ? ((v / total) * 100).toFixed(1) : 0;
                return `${ctx.label}: ${v} (${pct}%)`;
              },
            },
          },
        },
        cutout: '60%',
      };

      // 라인 차트: 선택된 유형만, 없으면 ALL
      const selectedIndex = selectedType
        ? PROBLEM_TYPES.indexOf(selectedType)
        : -1;
      const lineColor = selectedIndex >= 0 ? COLORS[selectedIndex] : '#ef4444';

      const lineData = {
        labels: monthLabels,
        datasets: [
          {
            label: selectedType
              ? PROBLEM_LABELS[selectedType] || selectedType
              : 'Failures',
            data: selectedType ? seriesFor(selectedType) : seriesFor('ALL'),
            borderColor: lineColor,
            backgroundColor: 'transparent',
            pointBackgroundColor: lineColor,
            pointBorderColor: lineColor,
            fill: false,
            tension: 0.25,
            pointRadius: 4,
          },
        ],
      };

      const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            intersect: false,
            mode: 'index',
          },
        },
        scales: {
          x: {
            ticks: {
              // eslint-disable-next-line no-unused-vars
              callback: (v, idx, ticks) => lineData.labels[idx], // YYYY-MM 그대로 사용
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      };

      return {
        doughnutData,
        doughnutOptions,
        lineData,
        lineOptions,
      };
    }, [data, selectedType]);

  const hasChartData =
    !!doughnutData &&
    !!lineData &&
    Array.isArray(doughnutData.labels) &&
    Array.isArray(doughnutData.datasets) &&
    doughnutData.datasets.length > 0;

  return (
    <S.Container>
      <S.Panel>
        <S.Header>
          <S.Title>배포 실패 결과 통계</S.Title>
        </S.Header>

        <S.PanelContent>
          {/* 상단 서비스 필터 (DeploymentPeriodStats와 유사) */}
          <S.FilterRow>
            <S.FilterGroup>
              <S.FilterLabel>서비스</S.FilterLabel>
              <S.Select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {serviceOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name ?? o.id}
                  </option>
                ))}
              </S.Select>
            </S.FilterGroup>
          </S.FilterRow>

          {/* 상태 메시지들: 레이아웃 유지한 채로 표시 */}
          {loading && (
            <div style={{ padding: '4px 0', fontSize: 13 }}>
              선택한 서비스 통계를 불러오는 중입니다…
            </div>
          )}
          {error && (
            <div style={{ padding: '4px 0', fontSize: 13, color: 'tomato' }}>
              통계 불러오기 실패: {String(error.message || error)}
            </div>
          )}

          {!hasChartData && !loading && !error && (
            <div style={{ padding: '8px 0', fontSize: 13, color: '#6b7280' }}>
              표시할 데이터가 없습니다.
            </div>
          )}

          {hasChartData && (
            <S.ChartsRow>
              <S.ChartCard>
                <S.CardTitle>유형별 실패 건수</S.CardTitle>
                <S.DoughnutWrapper>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </S.DoughnutWrapper>
                <LegendList
                  labels={doughnutData.labels}
                  values={doughnutData.datasets[0].data}
                  colors={COLORS}
                />
              </S.ChartCard>

              <S.ChartCard>
                <S.CardTitle>월별 실패 추이</S.CardTitle>

                <S.ChipsRow>
                  {PROBLEM_TYPES.map((k) => (
                    <S.ChipButton
                      key={k}
                      type="button"
                      onClick={() =>
                        setSelectedType((prev) => (prev === k ? null : k))
                      }
                      className={selectedType === k ? 'active' : ''}
                    >
                      {PROBLEM_LABELS[k]}
                    </S.ChipButton>
                  ))}
                </S.ChipsRow>

                <S.ChartWrapper>
                  <Line data={lineData} options={lineOptions} />
                </S.ChartWrapper>
              </S.ChartCard>
            </S.ChartsRow>
          )}
        </S.PanelContent>
      </S.Panel>
    </S.Container>
  );
}

function LegendList({ labels, values, colors }) {
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <S.LegendList>
      {labels.map((label, i) => {
        const v = values[i] ?? 0;
        const pct = total ? ((v / total) * 100).toFixed(1) : 0;
        return (
          <div key={label} className="legend-item">
            <span className="legend-color" style={{ background: colors[i] }} />
            <span className="legend-label" title={label}>
              {label}
            </span>
            <span className="legend-value">{v}</span>
            <span className="legend-pct">({pct}%)</span>
          </div>
        );
      })}
    </S.LegendList>
  );
}
