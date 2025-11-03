import * as S from './MonthlyDeploymentCard.styles';

export default function MonthlyDeploymentCard({
  title,
  status,
  onClick,
  isCollapsed,
  additionalCount,
}) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.StatusCircle status={status} />
        <S.TitleWrapper>
          <S.Title isCollapsed={isCollapsed}>{title}</S.Title>
          {isCollapsed && additionalCount && (
            <S.AdditionalCount>+ {additionalCount}</S.AdditionalCount>
          )}
        </S.TitleWrapper>
      </S.Content>
    </S.Card>
  );
}
