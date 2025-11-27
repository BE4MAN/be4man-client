// 작성자 : 이원석
import { useTheme } from '@emotion/react';
import { CalendarOff } from 'lucide-react';

import { removeSecondsFromTime } from '@/features/schedule/utils/timeFormatter';

import * as S from './RestrictedPeriodCard.styles';

export default function RestrictedPeriodCard({
  title,
  type,
  startTime,
  endTime,
  isFirstCard: _isFirstCard, // eslint-disable-line no-unused-vars
  isLastCard: _isLastCard, // eslint-disable-line no-unused-vars
  onClick,
}) {
  const theme = useTheme();

  // 시간을 "HH:mm" 형식으로 변환하고 밀리초 및 초 제거
  const formatTime = (time) => {
    if (!time) return '—';
    return removeSecondsFromTime(time);
  };

  // 두 시간을 하나의 박스에 "12:00 ~ 15:00" 형식으로 표시
  const getTimeDisplay = () => {
    const formattedStart = formatTime(startTime);
    const formattedEnd = formatTime(endTime);

    if (formattedStart === '—' && formattedEnd === '—') {
      return '—';
    }

    if (formattedStart !== '—' && formattedEnd !== '—') {
      return `${formattedStart} ~ ${formattedEnd}`;
    }

    if (formattedStart !== '—') {
      return formattedStart;
    }

    if (formattedEnd !== '—') {
      return formattedEnd;
    }

    return '—';
  };

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
          <S.Time>{getTimeDisplay()}</S.Time>
        </S.Details>
      </S.Content>
    </S.Card>
  );
}
