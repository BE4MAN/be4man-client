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
  const [expandedDays, setExpandedDays] = useState(new Set());

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

  const getAllTasksForDay = (day) => {
    const dayDeployments = getDeploymentsForDay(day);
    const dayRestrictedPeriods = getRestrictedPeriodsForDay(day);

    const allTasks = [
      ...dayRestrictedPeriods.map((period) => ({
        type: 'restricted',
        data: period,
      })),
      ...dayDeployments.map((deployment) => ({
        type: 'deployment',
        data: deployment,
      })),
    ];

    return allTasks;
  };

  const toggleDayExpansion = (day) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
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
        const allTasks = getAllTasksForDay(dayNumber);
        const isTodayCell = isTodayDay(dayNumber);
        const isExpanded = expandedDays.has(dayNumber);
        const hasMultipleTasks = allTasks.length > 1;
        const shouldCollapse = hasMultipleTasks && !isExpanded;

        days.push(
          <S.DayCell key={i} isToday={isTodayCell}>
            <S.DayNumber isToday={isTodayCell}>{dayNumber}</S.DayNumber>
            <S.CardList>
              {allTasks.length === 0 ? null : shouldCollapse ? (
                <>
                  {/* 첫 번째 항목만 표시 (제목에 "+ N" 포함) */}
                  {allTasks[0].type === 'restricted' ? (
                    <MonthlyRestrictedPeriodCard
                      key={allTasks[0].data.id}
                      title={allTasks[0].data.title}
                      onClick={() => toggleDayExpansion(dayNumber)}
                      isCollapsed
                      additionalCount={allTasks.length - 1}
                    />
                  ) : (
                    <MonthlyDeploymentCard
                      key={allTasks[0].data.id}
                      title={allTasks[0].data.title}
                      status={allTasks[0].data.status}
                      onClick={() => toggleDayExpansion(dayNumber)}
                      isCollapsed
                      additionalCount={allTasks.length - 1}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* 모든 항목 표시 */}
                  {allTasks.map((task) =>
                    task.type === 'restricted' ? (
                      <MonthlyRestrictedPeriodCard
                        key={task.data.id}
                        title={task.data.title}
                        onClick={() => onRestrictedPeriodClick(task.data)}
                      />
                    ) : (
                      <MonthlyDeploymentCard
                        key={task.data.id}
                        title={task.data.title}
                        status={task.data.status}
                        onClick={() => onDeploymentClick(task.data)}
                      />
                    ),
                  )}
                </>
              )}
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
