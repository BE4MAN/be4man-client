import { useTheme } from '@emotion/react';
import { Calendar, CircleCheck, CircleX } from 'lucide-react';

import * as S from './MonthlyDeploymentCard.styles';

export default function MonthlyDeploymentCard({
  title,
  status,
  onClick,
  isCollapsed,
}) {
  const theme = useTheme();

  const renderStatusIcon = () => {
    switch (status) {
      case 'scheduled':
        return <Calendar size={14} color={theme.colors.textPrimary} />;
      case 'success':
        return (
          <CircleCheck size={14} color={theme.colors.schedule.successGreen} />
        );
      case 'failed':
        return (
          <CircleX size={14} color={theme.colors.schedule.restrictedDanger} />
        );
      default:
        return <Calendar size={14} color={theme.colors.textPrimary} />;
    }
  };

  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.StatusIcon status={status}>{renderStatusIcon()}</S.StatusIcon>
        <S.TitleWrapper>
          <S.Title isCollapsed={isCollapsed}>{title}</S.Title>
        </S.TitleWrapper>
      </S.Content>
    </S.Card>
  );
}
