// 작성자 : 이원석
import { useState } from 'react';

import {
  errorTypes,
  filterOptions,
  generateErrorData,
} from '@/utils/analyticsDataGenerators';
import { polarToCartesian } from '@/utils/analyticsHelpers';

import * as S from './ErrorAnalyticsPanel.styles';

export default function ErrorAnalyticsPanel() {
  const [activeFilters, setActiveFilters] = useState([]);
  const errorData = generateErrorData();

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const totalErrors = errorTypes.reduce((sum, e) => sum + e.count, 0);

  const createPieSlices = () => {
    const total = totalErrors;
    let currentAngle = -90;

    return errorTypes.map((error) => {
      const percentage = error.count / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      currentAngle = endAngle;

      return {
        ...error,
        percentage,
        startAngle,
        endAngle,
      };
    });
  };

  const createArcPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      centerX,
      centerY,
      'L',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'Z',
    ].join(' ');
  };

  const width = 800;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...errorData.map((d) => d.errorCount));
  const xScale = (index) =>
    padding.left + (index / (errorData.length - 1)) * chartWidth;
  const yScale = (value) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const createPath = () => {
    return errorData
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.errorCount);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>배포 실패 결과 통계</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent>
        <S.SubSection>
          <S.FilterRow>
            <S.FilterLabel>실패 유형</S.FilterLabel>
            <S.FilterChipsContainer>
              {filterOptions.map((filter) => (
                <S.FilterChip
                  key={filter}
                  active={activeFilters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </S.FilterChip>
              ))}
            </S.FilterChipsContainer>
          </S.FilterRow>
        </S.SubSection>

        <S.SubSection>
          <S.SectionSubtitle>최근 12개월간 발생 건수 추이</S.SectionSubtitle>
          <S.ChartsContainer>
            <S.LineChartWrapper>
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
              >
                {[0, 25, 50, 75, 100].map((percent) => {
                  const y = yScale(maxValue * (percent / 100));
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
                  d={createPath()}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--chart-error-color)' }}
                />

                {errorData.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(i)}
                    cy={yScale(d.errorCount)}
                    r="3"
                    fill="currentColor"
                    style={{ color: 'var(--chart-error-color)' }}
                  />
                ))}

                {errorData.map((d, i) => (
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
            </S.LineChartWrapper>

            <S.PieChartWrapper>
              <S.PieChartTitle>실패 유형별 통계</S.PieChartTitle>
              <S.PieChartContent>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {createPieSlices().map((slice, index) => (
                    <path
                      key={index}
                      d={createArcPath(
                        80,
                        80,
                        70,
                        slice.startAngle,
                        slice.endAngle,
                      )}
                      fill={slice.color}
                      opacity="0.85"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--chart-bg-color)' }}
                    />
                  ))}
                </svg>
                <S.LegendContainer>
                  {errorTypes.map((error) => (
                    <S.LegendItem key={error.name}>
                      <S.LegendColor color={error.color} />
                      <span>
                        {error.name} ({error.count})
                      </span>
                    </S.LegendItem>
                  ))}
                </S.LegendContainer>
              </S.PieChartContent>
            </S.PieChartWrapper>
          </S.ChartsContainer>
        </S.SubSection>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
