import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';

import { getDeploymentIcon } from '@/features/schedule/utils/deploymentIconMapper';

import * as S from './MonthlyDeploymentCard.styles';

export default function MonthlyDeploymentCard({
  title,
  stage,
  status,
  deploymentStatus,
  onClick,
  isCollapsed,
}) {
  const theme = useTheme();

  const iconConfig = getDeploymentIcon(stage, status, deploymentStatus, theme);
  const { Icon, color, size, animated } = iconConfig;

  return (
    <S.Card onClick={onClick}>
      <S.Content>
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
        <S.TitleWrapper>
          <S.Title isCollapsed={isCollapsed}>{title}</S.Title>
        </S.TitleWrapper>
      </S.Content>
    </S.Card>
  );
}
