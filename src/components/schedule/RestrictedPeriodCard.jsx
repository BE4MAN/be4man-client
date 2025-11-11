import { useTheme } from '@emotion/react';
import { CalendarOff } from 'lucide-react';

import * as S from './RestrictedPeriodCard.styles';

export default function RestrictedPeriodCard({
  title,
  type,
  startTime,
  endTime,
  isFirstCard,
  isLastCard,
  onClick,
}) {
  const theme = useTheme();

  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.TitleBox>
          <S.BanIcon
            as={CalendarOff}
            color={theme.colors.schedule.restrictedDanger}
          />
          <S.Title>{title}</S.Title>
        </S.TitleBox>
        <S.Details>
          {type && <S.Type>{type}</S.Type>}
          {isFirstCard && <S.Time>{startTime}</S.Time>}
          {isLastCard && <S.Time>{endTime}</S.Time>}
          {!isFirstCard && !isLastCard && <S.Time>-</S.Time>}
        </S.Details>
      </S.Content>
    </S.Card>
  );
}
