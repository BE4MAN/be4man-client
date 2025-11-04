import { Calendar, CircleCheck, CircleX } from 'lucide-react';

import * as S from './DeploymentCard.styles';

export default function DeploymentCard({
  title,
  service,
  status,
  scheduledTime,
  onClick,
}) {
  const renderStatusIcon = () => {
    switch (status) {
      case 'scheduled':
        return <Calendar size={16} />;
      case 'success':
        return <CircleCheck size={16} />;
      case 'failed':
        return <CircleX size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.TitleBox>
          <S.StatusIcon status={status}>{renderStatusIcon()}</S.StatusIcon>
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
