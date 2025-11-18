import DeploymentDurationStats from '@/components/analytics/DeploymentDurationStats/DeploymentDurationStats';
import DeploymentPeriodStats from '@/components/analytics/DeploymentPeriodStats/DeploymentPeriodStats';
import DeploymentSuccessRate from '@/components/analytics/DeploymentSuccessRate/DeploymentSuccessRate';
import DeploymentFailureCharts from '@/features/analytics/pages/DeploymentFailureChart';

import DeploymentBanType from '../../../components/analytics/DeploymentBanType/DeploymentBanType';
import FailureFollowupCharts from '../../../components/analytics/FailureFollowUpChart/FailureFollowUpChart';

import * as S from './AnalyticsPage.styles';

export default function AnalyticsPage() {
  return (
    <S.AppContainer>
      <S.ContentWrapper>
        <S.Section>
          {/*
            NOTE: DeploymentFailureCharts fetches real data from
            /api/projects/{projectId}/deploy-failures/stats. We default
            projectId to 1 here. If you have a project context, replace
            the hardcoded `projectId={1}` with the actual value.
          */}
          <DeploymentFailureCharts projectId={2} />
        </S.Section>

        {/* Section 2: 통계 그리드 */}
        <S.Section>
          <S.TopGrid>
            <DeploymentPeriodStats />
            <DeploymentBanType />
          </S.TopGrid>
          <S.TopGrid>
            <DeploymentDurationStats />
            <DeploymentSuccessRate />
          </S.TopGrid>
        </S.Section>
        <S.Section>
          <FailureFollowupCharts />
        </S.Section>
      </S.ContentWrapper>
    </S.AppContainer>
  );
}
