import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isToday,
  isSameMonth,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';

import DeploymentCard from './DeploymentCard';
import RestrictedPeriodCard from './RestrictedPeriodCard';
import * as S from './WeeklyCalendar.styles';

export default function WeeklyCalendar({
  deployments,
  restrictedPeriods,
  onDeploymentClick,
  onRestrictedPeriodClick,
  onDateChange,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(addDays(start, i));
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const goToPreviousWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const goToNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const getDeploymentsForDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayDeployments = deployments.filter((d) => d.date === dateStr);
    return dayDeployments.sort((a, b) =>
      a.scheduledTime.localeCompare(b.scheduledTime),
    );
  };

  const getRestrictedPeriodsForDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return restrictedPeriods
      .filter((p) => {
        const periodStart = new Date(p.startDate);
        const periodEnd = new Date(p.endDate);
        const currentDay = new Date(dateStr);
        return currentDay >= periodStart && currentDay <= periodEnd;
      })
      .map((p) => {
        const periodStart = new Date(p.startDate);
        const periodEnd = new Date(p.endDate);
        const currentDay = new Date(dateStr);

        const isFirstCard =
          format(currentDay, 'yyyy-MM-dd') ===
          format(periodStart, 'yyyy-MM-dd');
        const isLastCard =
          format(currentDay, 'yyyy-MM-dd') === format(periodEnd, 'yyyy-MM-dd');

        return {
          ...p,
          isFirstCard,
          isLastCard,
        };
      });
  };

  const startOfWeekDay = weekDays[0];
  const endOfWeekDay = weekDays[6];

  return (
    <S.Container>
      <S.NavigationBar>
        <S.WeekTitle>
          {format(startOfWeekDay, 'M월 d일', { locale: ko })} -{' '}
          {format(endOfWeekDay, 'd일', { locale: ko })}
        </S.WeekTitle>

        <S.NavButtons>
          <Button variant="secondary" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="secondary" size="sm" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </S.NavButtons>
      </S.NavigationBar>

      <S.CalendarWrapper>
        <S.DayNamesGrid>
          {dayNames.map((day) => (
            <S.DayName key={day}>{day}</S.DayName>
          ))}
        </S.DayNamesGrid>

        <S.CalendarGrid>
          {weekDays.map((day, index) => {
            const dayDeployments = getDeploymentsForDay(day);
            const dayRestrictedPeriods = getRestrictedPeriodsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayCell = isToday(day);

            return (
              <S.DayCell
                key={index}
                isToday={isTodayCell}
                isCurrentMonth={isCurrentMonth}
              >
                <S.DayNumber isToday={isTodayCell}>{day.getDate()}</S.DayNumber>
                <S.CardList>
                  {dayRestrictedPeriods.map((period) => (
                    <RestrictedPeriodCard
                      key={period.id}
                      title={period.title}
                      type={period.type}
                      startTime={period.startTime}
                      endTime={period.endTime}
                      isFirstCard={period.isFirstCard}
                      isLastCard={period.isLastCard}
                      onClick={() => onRestrictedPeriodClick(period)}
                    />
                  ))}
                  {dayDeployments.map((deployment) => (
                    <DeploymentCard
                      key={deployment.id}
                      title={deployment.title}
                      service={deployment.service}
                      status={deployment.status}
                      scheduledTime={deployment.scheduledTime}
                      onClick={() => onDeploymentClick(deployment)}
                    />
                  ))}
                </S.CardList>
              </S.DayCell>
            );
          })}
        </S.CalendarGrid>
      </S.CalendarWrapper>
    </S.Container>
  );
}
