import { useState } from 'react';

import { generateSuccessData } from '@/utils/analyticsDataGenerators';
import { polarToCartesian } from '@/utils/analyticsHelpers';

import * as S from './DeploymentSuccessRate.styles';

export default function DeploymentSuccessRate() {
  const [selectedService, setSelectedService] = useState('all');

  const data = generateSuccessData(selectedService);
  const total = data.success + data.failed;
  const successRate = ((data.success / total) * 100).toFixed(1);

  const successPercentage = data.success / total;
  const failedPercentage = data.failed / total;

  const createDonutPath = (percentage, startAngle) => {
    const angle = percentage * 360;
    const endAngle = startAngle + angle;

    const centerX = 90;
    const centerY = 90;
    const outerRadius = 70;
    const innerRadius = 50;

    const startOuter = polarToCartesian(
      centerX,
      centerY,
      outerRadius,
      endAngle,
    );
    const endOuter = polarToCartesian(
      centerX,
      centerY,
      outerRadius,
      startAngle,
    );
    const startInner = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      endAngle,
    );
    const endInner = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      startAngle,
    );

    const largeArcFlag = angle <= 180 ? '0' : '1';

    return [
      'M',
      startOuter.x,
      startOuter.y,
      'A',
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      endOuter.x,
      endOuter.y,
      'L',
      endInner.x,
      endInner.y,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      startInner.x,
      startInner.y,
      'Z',
    ].join(' ');
  };

  return (
    <S.PanelContainer hasHeight>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>배포 성공률 통계</S.PanelTitle>
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

        <S.ChartContainer>
          <S.DonutWrapper>
            <svg width="180" height="180" viewBox="0 0 180 180">
              <path
                d={createDonutPath(successPercentage, -90)}
                fill="#10B981"
                opacity="0.9"
              />

              <path
                d={createDonutPath(
                  failedPercentage,
                  -90 + successPercentage * 360,
                )}
                fill="#EF4444"
                opacity="0.9"
              />
            </svg>

            <S.CenterText>
              <S.SuccessRate>{successRate}%</S.SuccessRate>
              <S.RateLabel>성공률</S.RateLabel>
            </S.CenterText>
          </S.DonutWrapper>

          <S.LegendContainer gap="12px">
            <S.LegendItem gap="12px" noColor>
              <S.LegendColor color="#10B981" />
              <S.LegendText>
                <S.LegendLabelText>성공</S.LegendLabelText>
                <S.LegendValue>
                  {data.success}건 ({(successPercentage * 100).toFixed(1)}%)
                </S.LegendValue>
              </S.LegendText>
            </S.LegendItem>

            <S.LegendItem gap="12px" noColor>
              <S.LegendColor color="#EF4444" />
              <S.LegendText>
                <S.LegendLabelText>실패</S.LegendLabelText>
                <S.LegendValue>
                  {data.failed}건 ({(failedPercentage * 100).toFixed(1)}%)
                </S.LegendValue>
              </S.LegendText>
            </S.LegendItem>

            <S.LegendItem gap="12px" noColor>
              <S.LegendColor color="#E5E7EB" />
              <S.LegendText>
                <S.LegendLabelText>총 배포</S.LegendLabelText>
                <S.LegendValue>{total}건</S.LegendValue>
              </S.LegendText>
            </S.LegendItem>
          </S.LegendContainer>
        </S.ChartContainer>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
