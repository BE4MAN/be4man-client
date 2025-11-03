import { Ban } from 'lucide-react';

import * as S from './MonthlyRestrictedPeriodCard.styles';

export default function MonthlyRestrictedPeriodCard({
  title,
  onClick,
  isCollapsed,
  additionalCount,
}) {
  return (
    <S.Card onClick={onClick}>
      <S.Content>
        <S.BanIcon as={Ban} />
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
