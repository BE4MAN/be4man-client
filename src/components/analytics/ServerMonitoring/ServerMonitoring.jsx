import { Activity, Cpu, HardDrive, Server } from 'lucide-react';

import { generateCpuData, servers } from '@/utils/analyticsDataGenerators';

import * as S from './ServerMonitoring.styles';

export default function ServerMonitoring() {
  const cpuData = generateCpuData();

  const avgCpu = (
    cpuData.reduce((sum, d) => sum + d.cpu, 0) / cpuData.length
  ).toFixed(1);
  const avgMemory = (
    cpuData.reduce((sum, d) => sum + d.memory, 0) / cpuData.length
  ).toFixed(1);
  const activeServers = servers.filter((s) => s.status === 'online').length;
  const avgUptime = (
    servers.reduce((sum, s) => sum + parseFloat(s.uptime), 0) / servers.length
  ).toFixed(1);

  const width = 800;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = 100;
  const xScale = (index) =>
    padding.left + (index / (cpuData.length - 1)) * chartWidth;
  const yScale = (value) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const createPath = (dataKey) => {
    return cpuData
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d[dataKey]);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>서버 모니터링 통계</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent>
        <S.MetricsGrid>
          <S.MetricCard bgColor="#F0F9FF">
            <S.MetricHeader>
              <Server size={16} color="#2563EB" />
              <S.MetricLabelText>활성 서버</S.MetricLabelText>
            </S.MetricHeader>
            <S.MetricValue>{activeServers}</S.MetricValue>
            <S.MetricStatus status="good">
              전체 {servers.length}대
            </S.MetricStatus>
          </S.MetricCard>

          <S.MetricCard bgColor="#FFF7ED">
            <S.MetricHeader>
              <Cpu size={16} color="#EA580C" />
              <S.MetricLabelText>평균 CPU</S.MetricLabelText>
            </S.MetricHeader>
            <S.MetricValue>{avgCpu}%</S.MetricValue>
            <S.MetricStatus status={avgCpu < 60 ? 'good' : 'warning'}>
              정상 범위
            </S.MetricStatus>
          </S.MetricCard>

          <S.MetricCard bgColor="#F0FDF4">
            <S.MetricHeader>
              <HardDrive size={16} color="#16A34A" />
              <S.MetricLabelText>평균 메모리</S.MetricLabelText>
            </S.MetricHeader>
            <S.MetricValue>{avgMemory}%</S.MetricValue>
            <S.MetricStatus status={avgMemory < 70 ? 'good' : 'warning'}>
              정상 범위
            </S.MetricStatus>
          </S.MetricCard>

          <S.MetricCard bgColor="#FEF2F2">
            <S.MetricHeader>
              <Activity size={16} color="#DC2626" />
              <S.MetricLabelText>평균 가동율</S.MetricLabelText>
            </S.MetricHeader>
            <S.MetricValue>{avgUptime}%</S.MetricValue>
            <S.MetricStatus status="good">우수</S.MetricStatus>
          </S.MetricCard>
        </S.MetricsGrid>

        <S.ChartWrapper height="180px">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = yScale(percent);
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
              d={createPath('cpu')}
              fill="none"
              stroke="#EA580C"
              strokeWidth="2"
            />

            <path
              d={createPath('memory')}
              fill="none"
              stroke="#16A34A"
              strokeWidth="2"
            />

            {cpuData.map((d, i) => (
              <circle
                key={`cpu-${i}`}
                cx={xScale(i)}
                cy={yScale(d.cpu)}
                r="3"
                fill="#EA580C"
              />
            ))}

            {cpuData.map((d, i) => (
              <circle
                key={`mem-${i}`}
                cx={xScale(i)}
                cy={yScale(d.memory)}
                r="3"
                fill="#16A34A"
              />
            ))}

            {cpuData.map((d, i) => (
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
              const y = yScale(percent);
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
                  {percent}%
                </text>
              );
            })}
          </svg>
        </S.ChartWrapper>

        <S.LegendContainer>
          <S.LegendItem>
            <S.LegendLine color="#EA580C" />
            <S.LegendLabelSmall>CPU</S.LegendLabelSmall>
          </S.LegendItem>
          <S.LegendItem>
            <S.LegendLine color="#16A34A" />
            <S.LegendLabelSmall>메모리</S.LegendLabelSmall>
          </S.LegendItem>
        </S.LegendContainer>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
