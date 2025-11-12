import { useState } from 'react';

import { generateDurationData } from '@/utils/analyticsDataGenerators';

import * as S from './DeploymentDurationStats.styles';

export default function DeploymentDurationStats() {
  const [selectedService, setSelectedService] = useState('all');

  const durationData = generateDurationData(selectedService);

  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...durationData.map((d) => d.duration));
  const minValue = Math.min(...durationData.map((d) => d.duration));
  const valueRange = maxValue - minValue;
  const paddedMax = maxValue + valueRange * 0.1;
  const paddedMin = Math.max(0, minValue - valueRange * 0.1);

  const xScale = (index) =>
    padding.left + (index / (durationData.length - 1)) * chartWidth;
  const yScale = (value) =>
    padding.top +
    chartHeight -
    ((value - paddedMin) / (paddedMax - paddedMin)) * chartHeight;

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

    const bottomRight = `L ${xScale(durationData.length - 1)} ${padding.top + chartHeight}`;
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
        <S.FilterRow marginBottom="16px">
          <S.FilterLabel>서비스</S.FilterLabel>
          <S.Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="hr">인사 서비스</option>
            <option value="payment">결제 서비스</option>
            <option value="resource">자원 관리 서비스</option>
            <option value="aiwacs">AiWacs 서비스</option>
          </S.Select>
        </S.FilterRow>

        <S.ChartWrapper height="240px">
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
        </S.ChartWrapper>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
