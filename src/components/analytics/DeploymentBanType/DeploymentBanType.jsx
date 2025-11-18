import { useEffect, useMemo, useState } from 'react';

import {
  fetchBanTypeData,
  listSuccessServices,
} from '@/utils/analyticsDataGenerators';
import { polarToCartesian } from '@/utils/analyticsHelpers';

import * as S from './DeploymentBanType.styles';

export default function DeploymentBanType() {
  // 서비스 드롭다운 (성공률 통계와 동일한 소스 재사용)
  const [selectedService, setSelectedService] = useState('all');
  const [options, setOptions] = useState([{ id: 'all', name: '전체' }]);

  // 데이터 상태
  const [reasons, setReasons] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) 진입 시 서비스 목록 로딩 (성공률 통계와 동일 로직)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const opts = await listSuccessServices(); // [{id,name}] (DB 기반)
        if (cancelled) return;
        setOptions(opts);
        // 현재 선택이 옵션에 없으면 all로 보정
        if (!opts.some((o) => o.id === selectedService)) {
          setSelectedService('all');
        }
      } catch (e) {
        // 실패해도 최소 '전체'로 동작
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []); // 최초 1회

  // 선택한 서비스의 id를 projectId로 사용 ('all'은 전체)
  const projectId = useMemo(() => selectedService ?? 'all', [selectedService]);

  // 2) 선택 서비스 변경 시 통계 로딩
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { total, reasons } = await fetchBanTypeData(projectId);
        if (cancelled) return;
        setTotal(total);
        setReasons(reasons);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || '데이터 로딩 실패');
          setTotal(0);
          setReasons([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const createDonutPath = (percentage, startAngle) => {
    if (percentage <= 0) return '';
    const angle = percentage * 360;
    const endAngle = startAngle + angle;

    const cx = 90,
      cy = 90,
      outerR = 70,
      innerR = 50;

    if (percentage >= 0.999999) {
      return createFullRingPath(cx, cy, outerR, innerR);
    }

    const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
    const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
    const startInner = polarToCartesian(cx, cy, innerR, endAngle);
    const endInner = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArcFlag = angle <= 180 ? '0' : '1';

    return [
      'M',
      startOuter.x,
      startOuter.y,
      'A',
      outerR,
      outerR,
      0,
      largeArcFlag,
      0,
      endOuter.x,
      endOuter.y,
      'L',
      endInner.x,
      endInner.y,
      'A',
      innerR,
      innerR,
      0,
      largeArcFlag,
      1,
      startInner.x,
      startInner.y,
      'Z',
    ].join(' ');
  };

  const createFullRingPath = (cx, cy, outerR, innerR) => {
    return [
      // 바깥 원 둘레를 180° x 2로 완주
      'M',
      cx + outerR,
      cy,
      'A',
      outerR,
      outerR,
      0,
      1,
      0,
      cx - outerR,
      cy,
      'A',
      outerR,
      outerR,
      0,
      1,
      0,
      cx + outerR,
      cy,
      // 안쪽 원 둘레를 반대 방향으로 180° x 2로 완주(구멍)
      'L',
      cx + innerR,
      cy,
      'A',
      innerR,
      innerR,
      0,
      1,
      1,
      cx - innerR,
      cy,
      'A',
      innerR,
      innerR,
      0,
      1,
      1,
      cx + innerR,
      cy,
      'Z',
    ].join(' ');
  };

  let currentStart = -90; // 12시 방향 시작
  const slices = reasons.map((r) => {
    const pct = total > 0 ? r.count / total : 0;
    const d = createDonutPath(pct, currentStart);
    currentStart += pct * 360;
    return { ...r, d, pct };
  });

  return (
    <S.PanelContainer hasHeight>
      <S.PanelHeader>
        <S.HeaderLeft>
          <S.PanelTitle>작업 금지 유형 통계</S.PanelTitle>
        </S.HeaderLeft>
      </S.PanelHeader>

      <S.PanelContent flex>
        <S.FilterRow>
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
            <>
              <S.DonutWrapper>
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  role="img"
                  aria-label="작업 금지 유형 도넛 차트"
                >
                  {total === 0 && (
                    <circle
                      cx="90"
                      cy="90"
                      r="60"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="20"
                    />
                  )}
                  {total > 0 &&
                    slices.map((s, i) =>
                      s.pct > 0 ? (
                        <path key={i} d={s.d} fill={s.color} opacity="0.95" />
                      ) : null,
                    )}
                </svg>

                <S.CenterText>
                  <S.TotalValue>{total}</S.TotalValue>
                </S.CenterText>
              </S.DonutWrapper>

              <S.LegendContainer>
                {slices.map((s, i) => (
                  <S.LegendItem key={i} noColor>
                    <S.LegendColor color={s.color} />
                    <S.LegendText>
                      <S.LegendLabelText>{s.label}</S.LegendLabelText>
                      <S.LegendValue>
                        {s.count}건 ({(s.pct * 100).toFixed(1)}%)
                      </S.LegendValue>
                    </S.LegendText>
                  </S.LegendItem>
                ))}
              </S.LegendContainer>
            </>
          )}
        </S.ChartContainer>
      </S.PanelContent>
    </S.PanelContainer>
  );
}
