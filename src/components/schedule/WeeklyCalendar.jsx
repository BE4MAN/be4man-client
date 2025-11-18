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
import {
  getBansForDate,
  getBanDateRangeInfo,
} from '@/features/schedule/utils/banCalculator';

import DeploymentCard from './DeploymentCard';
import RestrictedPeriodCard from './RestrictedPeriodCard';
import * as S from './WeeklyCalendar.styles';

export default function WeeklyCalendar({
  deployments,
  restrictedPeriods,
  holidays = [],
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
    const bansForDay = getBansForDate(restrictedPeriods, dateStr);

    return bansForDay.map((p) => {
      const range = getBanDateRangeInfo(p);
      const currentDay = new Date(dateStr);

      let isFirstCard = false;
      let isLastCard = false;
      let endTimeLabel = p.endTime;

      if (range) {
        const { startDateTime, endDateTime } = range;
        const startDay = format(startDateTime, 'yyyy-MM-dd');
        const endDay = format(endDateTime, 'yyyy-MM-dd');
        const currentDayLabel = format(currentDay, 'yyyy-MM-dd');

        isFirstCard = currentDayLabel === startDay;
        isLastCard = currentDayLabel === endDay;
        endTimeLabel = format(endDateTime, 'HH:mm');
      }

      return {
        ...p,
        isFirstCard,
        isLastCard,
        computedEndTime: endTimeLabel,
      };
    });
  };

  const getHolidayForDate = (date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return holidays.find((holiday) => holiday.date === formatted);
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
            const holiday = getHolidayForDate(day);

            return (
              <S.DayCell
                key={index}
                isToday={isTodayCell}
                isCurrentMonth={isCurrentMonth}
              >
                <S.DayNumber>
                  <S.DayNumberText isToday={isTodayCell} $isHoliday={!!holiday}>
                    {day.getDate()}
                  </S.DayNumberText>
                  {holiday ? (
                    <S.HolidayName>{holiday.name}</S.HolidayName>
                  ) : null}
                </S.DayNumber>
                <S.CardList>
                  {dayRestrictedPeriods.map((period, periodIndex) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    return (
                      <RestrictedPeriodCard
                        key={`period-${period.id}-${dateStr}-${period.startTime}-${periodIndex}`}
                        title={period.title}
                        type={period.type}
                        startTime={period.startTime}
                        endTime={period.computedEndTime}
                        isFirstCard={period.isFirstCard}
                        isLastCard={period.isLastCard}
                        onClick={() => onRestrictedPeriodClick(period)}
                      />
                    );
                  })}
                  {dayDeployments.map((deployment, deploymentIndex) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    return (
                      <DeploymentCard
                        key={`deployment-${deployment.id}-${dateStr}-${deployment.scheduledTime}-${deploymentIndex}`}
                        title={deployment.title}
                        service={deployment.service}
                        stage={deployment.stage}
                        status={deployment.status}
                        isDeployed={deployment.isDeployed}
                        scheduledTime={deployment.scheduledTime}
                        onClick={() => onDeploymentClick(deployment)}
                      />
                    );
                  })}
                </S.CardList>
              </S.DayCell>
            );
          })}
        </S.CalendarGrid>
      </S.CalendarWrapper>
    </S.Container>
  );
}
