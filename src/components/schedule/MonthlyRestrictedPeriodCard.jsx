import { CalendarOff } from 'lucide-react';

import * as S from './MonthlyRestrictedPeriodCard.styles';

export default function MonthlyRestrictedPeriodCard({
  title,
  onClick,
  isCollapsed,
}) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.BanIcon as={CalendarOff} />
        <S.TitleWrapper>
          <S.Title isCollapsed={isCollapsed}>{title}</S.Title>
        </S.TitleWrapper>
      </S.Content>
    </S.Card>
  );
}
