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
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import { getBansForDate } from '@/features/schedule/utils/banCalculator';

import * as S from './DeploymentCalendar.styles';
import MonthlyDeploymentCard from './MonthlyDeploymentCard';
import MonthlyRestrictedPeriodCard from './MonthlyRestrictedPeriodCard';

export default function DeploymentCalendar({
  deployments,
  restrictedPeriods,
  holidays = [],
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
    return getBansForDate(restrictedPeriods, dateStr);
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

  const getHolidayForDay = (day) => {
    const dateStr = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      'yyyy-MM-dd',
    );
    return holidays.find((holiday) => holiday.date === dateStr);
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
        const holiday = getHolidayForDay(dayNumber);
        const dateStr = format(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            dayNumber,
          ),
          'yyyy-MM-dd',
        );

        days.push(
          <S.DayCell key={i} isToday={isTodayCell}>
            <S.DayNumber>
              <S.DayNumberInfo>
                <S.DayNumberText $isHoliday={!!holiday} isToday={isTodayCell}>
                  {dayNumber}
                </S.DayNumberText>
                {holiday ? <S.HolidayName>{holiday.name}</S.HolidayName> : null}
              </S.DayNumberInfo>
              {hasMultipleTasks && allTasks.length > 0 && (
                <S.ExpandButton
                  type="button"
                  onClick={() => toggleDayExpansion(dayNumber)}
                >
                  <S.ExpandChevron $expanded={isExpanded} strokeWidth={3} />
                  <S.ExpandButtonCount>{allTasks.length}</S.ExpandButtonCount>
                </S.ExpandButton>
              )}
            </S.DayNumber>
            <S.CardList>
              {allTasks.length === 0 ? null : shouldCollapse ? (
                <>
                  {/* 첫 번째 항목만 표시 */}
                  {allTasks[0].type === 'restricted' ? (
                    <MonthlyRestrictedPeriodCard
                      key={`restricted-${allTasks[0].data.id}-${dateStr}-${allTasks[0].data.startDate}-${allTasks[0].data.startTime}`}
                      title={allTasks[0].data.title}
                      onClick={() => onRestrictedPeriodClick(allTasks[0].data)}
                    />
                  ) : (
                    <MonthlyDeploymentCard
                      key={`deployment-${allTasks[0].data.id}-${dateStr}-${allTasks[0].data.date}-${allTasks[0].data.scheduledTime}`}
                      title={allTasks[0].data.title}
                      stage={allTasks[0].data.stage}
                      status={allTasks[0].data.status}
                      deploymentStatus={allTasks[0].data.deploymentStatus}
                      onClick={() => onDeploymentClick(allTasks[0].data)}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* 모든 항목 표시 */}
                  {allTasks.map((task, taskIndex) => {
                    return task.type === 'restricted' ? (
                      <MonthlyRestrictedPeriodCard
                        key={`restricted-${task.data.id}-${dateStr}-${task.data.startDate}-${task.data.startTime}-${taskIndex}`}
                        title={task.data.title}
                        onClick={() => onRestrictedPeriodClick(task.data)}
                      />
                    ) : (
                      <MonthlyDeploymentCard
                        key={`deployment-${task.data.id}-${dateStr}-${task.data.date}-${task.data.scheduledTime}-${taskIndex}`}
                        title={task.data.title}
                        stage={task.data.stage}
                        status={task.data.status}
                        deploymentStatus={task.data.deploymentStatus}
                        onClick={() => onDeploymentClick(task.data)}
                      />
                    );
                  })}
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
