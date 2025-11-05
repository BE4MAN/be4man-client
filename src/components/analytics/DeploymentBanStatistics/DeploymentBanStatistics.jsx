import { useState } from 'react';

import {
  generateMonthlyBanData,
  generateYearlyBanData,
} from '@/utils/analyticsDataGenerators';

import * as S from './DeploymentBanStatistics.styles';

export default function DeploymentBanStatistics() {
  const [selectedService, setSelectedService] = useState('all');
  const [period, setPeriod] = useState('month');
  const banData =
    period === 'month' ? generateMonthlyBanData() : generateYearlyBanData();

  const width = 800;
  const height = 250;
  const padding = { top: 10, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(
    ...banData.map((d) => d.serverMaintenance + d.dbMigration),
  );
  const xScale = (index) =>
    padding.left + (index / (banData.length - 1)) * chartWidth;
  const yScale = (value) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const barWidth = (chartWidth / banData.length) * 0.6;

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>배포 금지 일정 통계</S.PanelTitle>
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

        <S.ChartWrapper>
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

            {banData.map((d, i) => {
              const x = xScale(i) - barWidth / 2;
              const serverMaintenanceHeight =
                chartHeight * (d.serverMaintenance / maxValue);
              const dbMigrationHeight =
                chartHeight * (d.dbMigration / maxValue);

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={padding.top + chartHeight - serverMaintenanceHeight}
                    width={barWidth}
                    height={serverMaintenanceHeight}
                    fill="#FB923C"
                    opacity="0.8"
                  />
                  <rect
                    x={x}
                    y={
                      padding.top +
                      chartHeight -
                      serverMaintenanceHeight -
                      dbMigrationHeight
                    }
                    width={barWidth}
                    height={dbMigrationHeight}
                    fill="#3B82F6"
                    opacity="0.8"
                  />
                </g>
              );
            })}

            {banData.map((d, i) => (
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
          <S.LegendContainer>
            <S.LegendItem>
              <S.LegendColor color="#FB923C" />
              <span>서버 점검</span>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendColor color="#3B82F6" />
              <span>DB 마이그레이션</span>
            </S.LegendItem>
          </S.LegendContainer>
        </S.ChartWrapper>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
