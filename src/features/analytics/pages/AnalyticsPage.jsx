import DeploymentBanStatistics from '@/components/analytics/DeploymentBanStatistics/DeploymentBanStatistics';
import DeploymentDurationStats from '@/components/analytics/DeploymentDurationStats/DeploymentDurationStats';
import DeploymentPeriodStats from '@/components/analytics/DeploymentPeriodStats/DeploymentPeriodStats';
import DeploymentSuccessRate from '@/components/analytics/DeploymentSuccessRate/DeploymentSuccessRate';
import ServerMonitoring from '@/components/analytics/ServerMonitoring/ServerMonitoring';
import DeploymentFailureCharts from '@/features/analytics/pages/DeploymentFailureChart';

import * as S from './AnalyticsPage.styles';

export default function AnalyticsPage() {
  return (
    <S.AppContainer>
      <S.ContentWrapper>
        {/* Section 1: 배포 실패 결과 통계 */}
        <S.Section>
          {/*
            NOTE: DeploymentFailureCharts fetches real data from
            /api/projects/{projectId}/deploy-failures/stats. We default
            projectId to 1 here. If you have a project context, replace
            the hardcoded `projectId={1}` with the actual value.
          */}
          <DeploymentFailureCharts projectId={1} />
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
