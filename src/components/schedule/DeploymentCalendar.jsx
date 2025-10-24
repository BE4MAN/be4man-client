import {
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';

import * as S from './DeploymentCalendar.styles';
import MonthlyDeploymentCard from './MonthlyDeploymentCard';
import MonthlyRestrictedPeriodCard from './MonthlyRestrictedPeriodCard';

export default function DeploymentCalendar({
  deployments,
  restrictedPeriods,
  onDeploymentClick,
  onRestrictedPeriodClick,
  onDateChange,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getDay(startOfMonth(currentDate));
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const goToPreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const goToNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const getDeploymentsForDay = (day) => {
    const dateStr = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      'yyyy-MM-dd',
    );
    const dayDeployments = deployments.filter((d) => d.date === dateStr);
    return dayDeployments.sort((a, b) =>
      a.scheduledTime.localeCompare(b.scheduledTime),
    );
  };

  const getRestrictedPeriodsForDay = (day) => {
    const dateStr = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      'yyyy-MM-dd',
    );
    return restrictedPeriods.filter((p) => {
      const periodStart = new Date(p.startDate);
      const periodEnd = new Date(p.endDate);
      const currentDay = new Date(dateStr);
      return currentDay >= periodStart && currentDay <= periodEnd;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const isTodayDay = (day) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      return isToday(date);
    };

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDayOfMonth + 1;

      if (i < firstDayOfMonth || dayNumber > daysInMonth) {
        days.push(<S.EmptyCell key={i} />);
      } else {
        const dayDeployments = getDeploymentsForDay(dayNumber);
        const dayRestrictedPeriods = getRestrictedPeriodsForDay(dayNumber);
        const isTodayCell = isTodayDay(dayNumber);

        days.push(
          <S.DayCell key={i} isToday={isTodayCell}>
            <S.DayNumber isToday={isTodayCell}>{dayNumber}</S.DayNumber>
            <S.CardList>
              {dayRestrictedPeriods.map((period) => (
                <MonthlyRestrictedPeriodCard
                  key={period.id}
                  title={period.title}
                  onClick={() => onRestrictedPeriodClick(period)}
                />
              ))}
              {dayDeployments.map((deployment) => (
                <MonthlyDeploymentCard
                  key={deployment.id}
                  title={deployment.title}
                  status={deployment.status}
                  onClick={() => onDeploymentClick(deployment)}
                />
              ))}
            </S.CardList>
          </S.DayCell>,
        );
      }
    }

    return days;
  };

  return (
    <S.Container>
      <S.NavigationBar>
        <S.MonthTitle>
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </S.MonthTitle>

        <S.NavButtons>
          <Button variant="secondary" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="secondary" size="sm" onClick={goToNextMonth}>
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

        <S.CalendarGrid>{renderCalendarDays()}</S.CalendarGrid>
      </S.CalendarWrapper>
    </S.Container>
  );
}
