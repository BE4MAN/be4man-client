import { Ban } from 'lucide-react';

import * as S from './MonthlyRestrictedPeriodCard.styles';

export default function MonthlyRestrictedPeriodCard({ title, onClick }) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.BanIcon as={Ban} />
        <S.Title>{title}</S.Title>
      </S.Content>
    </S.Card>
  );
}
