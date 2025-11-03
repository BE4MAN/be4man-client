import * as S from './DeploymentCard.styles';

export default function DeploymentCard({
  title,
  service,
  status,
  scheduledTime,
  onClick,
}) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.TitleBox>
          <S.StatusCircle status={status} />
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
