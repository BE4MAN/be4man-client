import { Calendar, CircleCheck, CircleX } from 'lucide-react';

import * as S from './MonthlyDeploymentCard.styles';

export default function MonthlyDeploymentCard({
  title,
  status,
  onClick,
  isCollapsed,
}) {
  const renderStatusIcon = () => {
    switch (status) {
      case 'scheduled':
        return <Calendar size={14} />;
      case 'success':
        return <CircleCheck size={14} />;
      case 'failed':
        return <CircleX size={14} />;
      default:
        return <Calendar size={14} />;
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
