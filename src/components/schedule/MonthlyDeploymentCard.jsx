import * as S from './MonthlyDeploymentCard.styles';

export default function MonthlyDeploymentCard({ title, status, onClick }) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.StatusCircle status={status} />
        <S.Title>{title}</S.Title>
      </S.Content>
    </S.Card>
  );
}
