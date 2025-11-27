// 작성자 : 이원석, 조윤상
// src/features/analytics/DeploymentDurationStats.jsx
import { useEffect, useState, useMemo } from 'react';

import {
  generateDurationData,
  listDurationServices,
} from '@/utils/analyticsDataGenerators';

import * as S from './DeploymentDurationStats.styles';

export default function DeploymentDurationStats() {
  const [selectedService, setSelectedService] = useState('all');
  const [options, setOptions] = useState([{ id: 'all', name: '전체' }]);
  const [durationData, setDurationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 옵션 로딩
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opts = await listDurationServices();
        if (cancelled) return;
        setOptions(opts);
        if (!opts.some((o) => o.id === selectedService)) {
          setSelectedService('all');
        }
      } catch (e) {
        // 옵션 실패해도 기본 '전체'로 동작
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 데이터 로딩
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const data = await generateDurationData(selectedService);
        if (cancelled) return;
        setDurationData(Array.isArray(data) ? data : []);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || '데이터 로딩 실패');
        setDurationData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedService]);

  // ==== 기존 렌더/스케일 로직 유지 ====
  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = useMemo(
    () =>
      durationData.length
        ? Math.max(...durationData.map((d) => d.duration))
        : 0,
    [durationData],
  );
  const minValue = useMemo(
    () =>
      durationData.length
        ? Math.min(...durationData.map((d) => d.duration))
        : 0,
    [durationData],
  );
  const valueRange = maxValue - minValue;
  const paddedMax = maxValue + valueRange * 0.1;
  const paddedMin = Math.max(0, minValue - valueRange * 0.1);

  const xScale = (index) =>
    padding.left +
    (durationData.length > 1
      ? (index / (durationData.length - 1)) * chartWidth
      : 0);

  const yScale = (value) =>
    padding.top +
    chartHeight -
    (paddedMax - paddedMin > 0
      ? ((value - paddedMin) / (paddedMax - paddedMin)) * chartHeight
      : 0);

  const createPath = () => {
    return durationData
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.duration);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const createAreaPath = () => {
    const linePath = durationData
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.duration);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const bottomRight = `L ${xScale(Math.max(0, durationData.length - 1))} ${
      padding.top + chartHeight
    }`;
    const bottomLeft = `L ${padding.left} ${padding.top + chartHeight}`;
    const closePath = 'Z';

    return `${linePath} ${bottomRight} ${bottomLeft} ${closePath}`;
  };

  return (
    <S.PanelContainer hasHeight>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>배포 소요 시간 통계</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent flex>
        {/* 서비스 필터 */}
        <S.FilterRow marginBottom="16px">
          <S.FilterLabel>서비스</S.FilterLabel>
          <S.Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name ?? o.id}
              </option>
            ))}
          </S.Select>
        </S.FilterRow>

        {/* 차트 */}
        <S.ChartWrapper height="240px">
          {error && (
            <div style={{ color: '#EF4444', marginBottom: 8 }}>
              에러: {error}
            </div>
          )}
          {loading ? (
            <div style={{ padding: 24 }}>로딩 중...</div>
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="durationGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity="0.4"
                    style={{ color: 'var(--chart-brand-color)' }}
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0"
                    style={{ color: 'var(--chart-brand-color)' }}
                  />
                </linearGradient>
              </defs>

              {[0, 25, 50, 75, 100].map((percent) => {
                const value =
                  paddedMin + (paddedMax - paddedMin) * (percent / 100);
                const y = yScale(value);
                return (
                  <line
                    key={percent}
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{ color: 'var(--chart-grid-color)' }}
                  />
                );
              })}

              <path
                d={createAreaPath()}
                fill="url(#durationGradient)"
                opacity="0.3"
              />

              <path
                d={createPath()}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ color: 'var(--chart-brand-color)' }}
              />

              {durationData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={xScale(i)}
                    cy={yScale(d.duration)}
                    r="4"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: 'var(--chart-brand-color)' }}
                  />
                </g>
              ))}

              {durationData.map((d, i) => (
                <text
                  key={i}
                  x={xScale(i)}
                  y={height - 10}
                  fontSize="11"
                  fill="currentColor"
                  textAnchor="middle"
                  style={{ color: 'var(--chart-text-color)' }}
                >
                  {d.date}
                </text>
              ))}

              {[0, 25, 50, 75, 100].map((percent) => {
                const value =
                  paddedMin + (paddedMax - paddedMin) * (percent / 100);
                const y = yScale(value);
                return (
                  <text
                    key={percent}
                    x={padding.left - 10}
                    y={y + 4}
                    fontSize="11"
                    fill="currentColor"
                    textAnchor="end"
                    style={{ color: 'var(--chart-text-color)' }}
                  >
                    {value.toFixed(1)}분
                  </text>
                );
              })}
            </svg>
          )}
        </S.ChartWrapper>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
