import { useEffect, useState } from 'react';

import {
  generateSuccessData,
  listSuccessServices,
} from '@/utils/analyticsDataGenerators';
import { polarToCartesian } from '@/utils/analyticsHelpers';

import * as S from './DeploymentSuccessRate.styles';

export default function DeploymentSuccessRate() {
  // 선택된 서비스(id), 서비스 옵션 목록
  const [selectedService, setSelectedService] = useState('all');
  const [options, setOptions] = useState([{ id: 'all', name: '전체' }]);

  // 비동기 통계 데이터 상태
  const [stats, setStats] = useState({ success: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 진입 시/새로고침 시 서비스 목록 로딩
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opts = await listSuccessServices();
        if (cancelled) return;
        setOptions(opts);
        // 현재 선택이 옵션에 없으면 all로 보정
        if (!opts.some((o) => o.id === selectedService)) {
          setSelectedService('all');
        }
      } catch (e) {
        // 목록 로딩 실패 시에도 최소 all 옵션으로 동작
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []); // 최초 1회

  // 선택 서비스가 바뀔 때마다 데이터 로딩
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const data = await generateSuccessData(selectedService);
        if (cancelled) return;
        setStats(data ?? { success: 0, failed: 0 });
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || '데이터 로딩 실패');
        setStats({ success: 0, failed: 0 });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedService]);

  const total = stats.success + stats.failed;
  const successRate =
    total > 0 ? ((stats.success / total) * 100).toFixed(1) : '0.0';

  const successPercentage = total > 0 ? stats.success / total : 0;
  const failedPercentage = total > 0 ? stats.failed / total : 0;

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
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name ?? o.id}
              </option>
            ))}
          </S.Select>
        </S.FilterRow>

        <S.ChartContainer>
          {error && (
            <div style={{ color: '#EF4444', marginBottom: 8 }}>
              에러: {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: 24 }}>로딩 중...</div>
          ) : (
            <S.DonutWrapper>
              <svg width="180" height="180" viewBox="0 0 180 180">
                {successPercentage > 0 && (
                  <path
                    d={createDonutPath(successPercentage, -90)}
                    fill="#10B981"
                    opacity="0.9"
                  />
                )}

                {failedPercentage > 0 && (
                  <path
                    d={createDonutPath(
                      failedPercentage,
                      -90 + successPercentage * 360,
                    )}
                    fill="#EF4444"
                    opacity="0.9"
                  />
                )}
              </svg>

              <S.CenterText>
                <S.SuccessRate>{successRate}%</S.SuccessRate>
                <S.RateLabel>성공률</S.RateLabel>
              </S.CenterText>
            </S.DonutWrapper>
          )}

          {!loading && (
            <S.LegendContainer gap="12px">
              <S.LegendItem gap="12px" noColor>
                <S.LegendColor color="#10B981" />
                <S.LegendText>
                  <S.LegendLabelText>성공</S.LegendLabelText>
                  <S.LegendValue>
                    {stats.success}건 ({(successPercentage * 100).toFixed(1)}%)
                  </S.LegendValue>
                </S.LegendText>
              </S.LegendItem>

              <S.LegendItem gap="12px" noColor>
                <S.LegendColor color="#EF4444" />
                <S.LegendText>
                  <S.LegendLabelText>실패</S.LegendLabelText>
                  <S.LegendValue>
                    {stats.failed}건 ({(failedPercentage * 100).toFixed(1)}%)
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
          )}
        </S.ChartContainer>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
