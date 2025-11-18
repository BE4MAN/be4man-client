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

import * as S from './DeploymentFailureChart.styles';

// If you want nice time axis ticks, you could add the adapter:
// import 'chartjs-adapter-date-fns';

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

// Problem type constants (module-level so useMemo won't need to include them in deps)
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

// Return an array of month keys YYYY-MM for the last N months (including current)
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
 *   projectId: number (required)
 *   from?: string (YYYY-MM-DD)
 *   to?: string (YYYY-MM-DD)
 *   endpoint?: string  (default: `/api/projects/{projectId}/deploy-failures/stats`)
 */
export default function DeploymentFailureCharts({
  projectId,
  from,
  to,
  endpoint,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const url = useMemo(() => {
    const base =
      endpoint || `/api/statistics/${projectId}/deploy-failures/series`;
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [projectId, from, to, endpoint]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await axiosInstance.get(url);
        const respData = res.data;
        // If server returned HTML (e.g., an auth redirect or error page), abort with clearer message
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

  // Normalize API data → ensure all 5 types exist, fill 0
  const { doughnutData, doughnutOptions, lineData, lineOptions } =
    useMemo(() => {
      if (!data) return {};
      // Build counts for doughnut from summary.typeCounts
      const countsByType = [];
      for (let i = 0; i < PROBLEM_TYPES.length; i++) {
        const key = PROBLEM_TYPES[i];
        countsByType.push(data.summary?.typeCounts?.[key] ?? 0);
      }
      const total = countsByType.reduce((a, b) => a + b, 0);

      const last12 = getLastNMonths(12);

      // series is now an object keyed by type and 'ALL' -> array of {month, count}
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

      // Monthly trend → ensure chronological sort and gap-friendly labels (YYYY-MM)
      // line dataset: if a type is selected show that type's series, otherwise show total failures
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
              callback: (v, idx, ticks) => lineData.labels[idx], // keep YYYY-MM
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

  if (loading) return <div className="p-4">Loading…</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">
        Failed to load stats: {String(error.message || error)}
      </div>
    );
  if (!data) return null;

  return (
    <S.Container>
      <S.Panel>
        <S.Header>
          <S.Title>배포 실패 결과 통계</S.Title>
        </S.Header>

        <S.PanelContent>
          <S.ChartsRow>
            <S.ChartCard>
              <S.CardTitle>유형별 실패 건수</S.CardTitle>
              <S.ChartWrapper>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </S.ChartWrapper>
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
        </S.PanelContent>
      </S.Panel>
    </S.Container>
  );
}

function Card({ title, children }) {
  return (
    <section className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      {children}
    </section>
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
