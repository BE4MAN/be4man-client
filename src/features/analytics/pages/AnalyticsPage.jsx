import DeploymentBanStatistics from '@/components/analytics/DeploymentBanStatistics/DeploymentBanStatistics';
import DeploymentDurationStats from '@/components/analytics/DeploymentDurationStats/DeploymentDurationStats';
import DeploymentPeriodStats from '@/components/analytics/DeploymentPeriodStats/DeploymentPeriodStats';
import DeploymentSuccessRate from '@/components/analytics/DeploymentSuccessRate/DeploymentSuccessRate';
import ErrorAnalyticsPanel from '@/components/analytics/ErrorAnalyticsPanel/ErrorAnalyticsPanel';
import ServerMonitoring from '@/components/analytics/ServerMonitoring/ServerMonitoring';

import * as S from './AnalyticsPage.styles';

export default function AnalyticsPage() {
  return (
    <S.AppContainer>
      <S.ContentWrapper>
        {/* Section 1: 배포 실패 결과 통계 */}
        <S.Section>
          <ErrorAnalyticsPanel />
        </S.Section>

        {/* Section 2: 통계 그리드 */}
        <S.Section>
          <S.TopGrid>
            <DeploymentPeriodStats />
            <DeploymentBanStatistics />
          </S.TopGrid>
          <S.TopGrid>
            <DeploymentDurationStats />
            <DeploymentSuccessRate />
          </S.TopGrid>
          <ServerMonitoring />
        </S.Section>
      </S.ContentWrapper>
    </S.AppContainer>
  );
}
