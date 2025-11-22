import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';

import { getDeploymentIcon } from '@/features/schedule/utils/deploymentIconMapper';
import { removeSecondsFromTime } from '@/features/schedule/utils/timeFormatter';

import * as S from './DeploymentCard.styles';

export default function DeploymentCard({
  title,
  service,
  stage,
  status,
  isDeployed,
  scheduledTime,
  onClick,
}) {
  const theme = useTheme();

  const iconConfig = getDeploymentIcon(
    stage,
    status,
    isDeployed,
    theme,
    16, // 주간 캘린더는 16px
  );
  const { Icon, color, size, animated } = iconConfig;

  // scheduledTime을 "HH:mm" 형식으로 변환 (밀리초 및 초 제거)
  const formatTimeToHHmm = (time) => {
    if (!time) return '—';
    return removeSecondsFromTime(time);
  };

  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.TitleBox>
          <S.StatusIcon
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
          <S.Time>{formatTimeToHHmm(scheduledTime)}</S.Time>
        </S.Details>
      </S.Content>
    </S.Card>
  );
}
