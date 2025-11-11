import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';

import { getDeploymentIcon } from '@/features/schedule/utils/deploymentIconMapper';

import * as S from './DeploymentCard.styles';

export default function DeploymentCard({
  title,
  service,
  stage,
  status,
  deploymentStatus,
  scheduledTime,
  onClick,
}) {
  const theme = useTheme();

  const iconConfig = getDeploymentIcon(
    stage,
    status,
    deploymentStatus,
    theme,
    16, // 주간 캘린더는 16px
  );
  const { Icon, color, size, animated } = iconConfig;

  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.TitleBox>
          <S.StatusIcon
            status={deploymentStatus}
            css={
              animated
                ? css`
                    animation: spin 2s linear infinite;

                    @keyframes spin {
                      from {
                        transform: rotate(0deg);
                      }
                      to {
                        transform: rotate(360deg);
                      }
                    }
                  `
                : undefined
            }
          >
            <Icon size={size} color={color} />
          </S.StatusIcon>
          <S.Title>{title}</S.Title>
        </S.TitleBox>
        <S.Details>
          <S.Service>{service}</S.Service>
          <S.Time>{scheduledTime}</S.Time>
        </S.Details>
      </S.Content>
    </S.Card>
  );
}
