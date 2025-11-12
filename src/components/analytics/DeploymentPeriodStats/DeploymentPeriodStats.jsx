import { useState } from 'react';

import {
  generateMonthlyDeploymentData,
  generateYearlyDeploymentData,
} from '@/utils/analyticsDataGenerators';

import * as S from './DeploymentPeriodStats.styles';

export default function DeploymentPeriodStats() {
  const [period, setPeriod] = useState('month');
  const [selectedService, setSelectedService] = useState('all');

  const data =
    period === 'month'
      ? generateMonthlyDeploymentData()
      : generateYearlyDeploymentData();

  const width = 800;
  const height = 247;
  const padding = { top: 10, right: 20, bottom: 30, left: 65 };
  const chartWidth = width - padding.left - padding.right - 15;
  const chartHeight = height - padding.top - padding.bottom;
  const firstBarOffset = 15;

  const maxValue = Math.max(...data.map((d) => d.deployments));
  const xScale = (index) =>
    padding.left + firstBarOffset + (index / (data.length - 1)) * chartWidth;
  const yScale = (value) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const barWidth = (chartWidth / data.length) * 0.5;

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>기간별 배포 통계</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent>
        <S.FilterRow spaceBetween marginBottom="16px">
          <S.FilterGroup>
            <S.FilterLabel>서비스</S.FilterLabel>
            <S.Select
              noShadow
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="hr">인사 서비스</option>
              <option value="payment">결제 서비스</option>
              <option value="resource">자원 관리 서비스</option>
              <option value="aiwacs">AiWacs 서비스</option>
            </S.Select>
          </S.FilterGroup>

          <S.ToggleContainer>
            <S.ToggleButton
              active={period === 'month'}
              onClick={(e) => {
                e.stopPropagation();
                setPeriod('month');
              }}
            >
              월별
            </S.ToggleButton>
            <S.ToggleButton
              active={period === 'year'}
              onClick={(e) => {
                e.stopPropagation();
                setPeriod('year');
              }}
            >
              연도별
            </S.ToggleButton>
          </S.ToggleContainer>
        </S.FilterRow>

        <S.ChartWrapper height="247px">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = yScale(maxValue * (percent / 100));
              return (
                <line
                  key={percent}
                  x1={padding.left + firstBarOffset}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ color: 'var(--chart-grid-color)' }}
                />
              );
            })}

            {data.map((d, i) => {
              const x = xScale(i) - barWidth / 2;
              const successHeight = chartHeight * (d.success / maxValue);
              const failedHeight = chartHeight * (d.failed / maxValue);

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={padding.top + chartHeight - successHeight}
                    width={barWidth}
                    height={successHeight}
                    fill="#16A34A"
                    opacity="0.8"
                  />
                  <rect
                    x={x}
                    y={padding.top + chartHeight - successHeight - failedHeight}
                    width={barWidth}
                    height={failedHeight}
                    fill="#DC2626"
                    opacity="0.8"
                  />
                </g>
              );
            })}

            {data.map((d, i) => (
              <text
                key={i}
                x={xScale(i)}
                y={height - 10}
                fontSize="11"
                fill="currentColor"
                textAnchor="middle"
                style={{ color: 'var(--chart-text-color)' }}
              >
                {d.label}
              </text>
            ))}

            {[0, 25, 50, 75, 100].map((percent) => {
              const value = Math.round(maxValue * (percent / 100));
              const y = yScale(maxValue * (percent / 100));
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
                  {value}
                </text>
              );
            })}
          </svg>
          <S.LegendContainer>
            <S.LegendItem>
              <S.LegendColor color="#16A34A" />
              <span>성공</span>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendColor color="#DC2626" />
              <span>실패</span>
            </S.LegendItem>
          </S.LegendContainer>
        </S.ChartWrapper>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
