// 작성자 : 이원석
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
} from 'date-fns';
import {
  Calendar,
  List,
  Plus,
  CalendarDays,
  Search,
  RotateCcw,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PATHS } from '@/app/routes/paths';
import ServiceTag from '@/components/common/ServiceTag';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import DeploymentCalendar from '@/components/schedule/DeploymentCalendar';
import DeploymentDetailModal from '@/components/schedule/DeploymentDetailModal';
import RestrictedPeriodDetailModal from '@/components/schedule/RestrictedPeriodDetailModal';
import RestrictedPeriodList from '@/components/schedule/RestrictedPeriodList';
import RestrictedPeriodModal from '@/components/schedule/RestrictedPeriodModal';
import WeeklyCalendar from '@/components/schedule/WeeklyCalendar';
import DateRangePicker from '@/features/log/pages/DateRangePicker';

import { useBans } from '../hooks/useBans';
import { useDeployments } from '../hooks/useDeployments';
import { useHolidays } from '../hooks/useHolidays';
import { useScheduleMetadata } from '../hooks/useScheduleMetadata';
import { enumToBanType, enumToStage } from '../utils/enumConverter';

import * as S from './ScheduleManagement.styles';

export default function ScheduleManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [selectedRestrictedPeriod, setSelectedRestrictedPeriod] =
    useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRestrictedPeriodModalOpen, setIsRestrictedPeriodModalOpen] =
    useState(false);
  const [
    isRestrictedPeriodDetailModalOpen,
    setIsRestrictedPeriodDetailModalOpen,
  ] = useState(false);
  const [selectedBanType, setSelectedBanType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [periodStartDate, setPeriodStartDate] = useState('');
  const [periodEndDate, setPeriodEndDate] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarCurrentDate, setCalendarCurrentDate] = useState(new Date());
  const [shouldFetchBans, setShouldFetchBans] = useState(false);

  const normalizedSelectedServices = Array.isArray(selectedServices)
    ? selectedServices
    : [];

  // 공휴일 데이터 조회 (현재 보는 연도 기준)
  const { data: holidays = [] } = useHolidays(currentYear);

  // 메타데이터 조회
  const { data: metadata } = useScheduleMetadata();

  // 캘린더 뷰의 날짜 범위 계산 함수
  const getCalendarDateRange = () => {
    if (viewMode === 'monthly') {
      // 월간 뷰: 해당 달의 첫날 ~ 마지막 날
      const firstDay = startOfMonth(calendarCurrentDate);
      const lastDay = endOfMonth(calendarCurrentDate);
      return {
        startDate: format(firstDay, 'yyyy-MM-dd'),
        endDate: format(lastDay, 'yyyy-MM-dd'),
      };
    } else if (viewMode === 'weekly') {
      // 주간 뷰: 현재 보는 주의 첫날 ~ 마지막 날
      const weekStart = startOfWeek(calendarCurrentDate, { weekStartsOn: 0 });
      const weekEnd = addDays(weekStart, 6);
      return {
        startDate: format(weekStart, 'yyyy-MM-dd'),
        endDate: format(weekEnd, 'yyyy-MM-dd'),
      };
    }
    // 목록 뷰는 날짜 범위 없음
    return null;
  };

  // 캘린더 날짜 범위 계산
  const calendarDateRange = getCalendarDateRange();

  // Deployment 목록 조회 (월간/주간 뷰일 때만)
  const { data: deploymentsData = [] } = useDeployments(
    calendarDateRange?.startDate,
    calendarDateRange?.endDate,
    {
      enabled: !!calendarDateRange,
    },
  );

  const deployments = useMemo(() => {
    return deploymentsData.map((d) => ({
      id: d.id,
      title: d.title,
      service: d.projectName,
      date: d.scheduledDate,
      scheduledTime: d.scheduledTime?.substring(0, 5) || '',
      status: d.status,
      stage: enumToStage(d.stage) || d.stage,
      isDeployed: d.isDeployed,
      registrant: d.registrant,
      registrantDepartment: d.registrantDepartment,
      relatedServices: d.relatedServices || [],
    }));
  }, [deploymentsData]);

  const availableServices = useMemo(() => {
    if (metadata?.projects) {
      return metadata.projects.map((project) => ({
        value: project.name,
        label: project.name,
      }));
    }
    return [];
  }, [metadata]);

  const banFilters = useMemo(() => {
    const filters = {};

    if (searchQuery && searchQuery.trim()) {
      filters.query = searchQuery.trim();
    }

    if (selectedBanType && selectedBanType !== 'all') {
      filters.type = selectedBanType;
    }

    if (selectedServices && selectedServices.length > 0 && metadata?.projects) {
      const projectIds = selectedServices
        .map((serviceName) => {
          const project = metadata.projects.find((p) => p.name === serviceName);
          return project?.id;
        })
        .filter((id) => id !== undefined);
      if (projectIds.length > 0) {
        filters.projectIds = projectIds;
      }
    }

    if (periodStartDate) {
      filters.startDate = periodStartDate;
    }
    if (periodEndDate) {
      filters.endDate = periodEndDate;
    }

    return filters;
  }, [
    searchQuery,
    selectedBanType,
    selectedServices,
    periodStartDate,
    periodEndDate,
    metadata,
  ]);

  const banFiltersForCalendar = useMemo(() => {
    if (!calendarDateRange) return null;
    return {
      startDate: calendarDateRange.startDate,
      endDate: calendarDateRange.endDate,
    };
  }, [calendarDateRange]);

  const { data: restrictedPeriodsDataForList = [] } = useBans(banFilters, {
    enabled: shouldFetchBans || viewMode === 'restricted-list',
  });

  const { data: restrictedPeriodsDataForCalendar = [] } = useBans(
    banFiltersForCalendar || {},
    {
      enabled:
        !!banFiltersForCalendar &&
        (viewMode === 'monthly' || viewMode === 'weekly'),
    },
  );

  const restrictedPeriodsData =
    viewMode === 'restricted-list'
      ? restrictedPeriodsDataForList
      : restrictedPeriodsDataForCalendar;

  const restrictedPeriods = useMemo(() => {
    return restrictedPeriodsData.map((period) => ({
      ...period,
      type: enumToBanType(period.type) || period.type,
      duration: period.durationMinutes,
    }));
  }, [restrictedPeriodsData]);

  const banTypes = useMemo(() => {
    const types = [
      { value: 'all', label: '전체' },
      ...(metadata?.restrictedPeriodTypes?.map((type) => ({
        value: type.value, // Enum 값 사용
        label: type.label,
      })) || []),
    ];
    return types;
  }, [metadata]);

  const handleDeploymentClick = (deployment) => {
    setSelectedDeployment(deployment);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDeployment(null);
  };

  const handleRestrictedPeriodClick = (period) => {
    setSelectedRestrictedPeriod(period);
    setIsRestrictedPeriodDetailModalOpen(true);
  };

  const handleCloseRestrictedPeriodDetailModal = () => {
    setIsRestrictedPeriodDetailModalOpen(false);
    setSelectedRestrictedPeriod(null);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setPeriodStartDate(startDate);
    setPeriodEndDate(endDate);
  };

  const handleResetFilters = () => {
    setSelectedBanType('all');
    setSearchQuery('');
    setSelectedServices([]);
    setPeriodStartDate('');
    setPeriodEndDate('');
  };

  const handleSearchSubmit = () => {
    setShouldFetchBans(true);
  };

  const handleCalendarDateChange = (date) => {
    setCalendarCurrentDate(date);
    const year = date.getFullYear();
    if (year !== currentYear) {
      setCurrentYear(year);
    }
  };

  // location state에서 viewMode 확인
  useEffect(() => {
    if (location.state?.viewMode === 'list') {
      setViewMode('restricted-list');
      // state 초기화
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const shouldRemoveBottomPadding =
    viewMode === 'monthly' || viewMode === 'weekly';

  return (
    <S.PageContainer $removeBottomPadding={shouldRemoveBottomPadding}>
      {/* 헤더: 뷰 전환 버튼들 */}
      <S.Header>
        <S.ViewButtons>
          <S.ViewButton
            isActive={viewMode === 'monthly'}
            onClick={() => setViewMode('monthly')}
          >
            <Calendar className="h-4 w-4" />
            <span>월간</span>
          </S.ViewButton>

          <S.ViewButton
            isActive={viewMode === 'weekly'}
            onClick={() => setViewMode('weekly')}
          >
            <CalendarDays className="h-4 w-4" />
            <span>주간</span>
          </S.ViewButton>

          <S.ViewButton
            isActive={viewMode === 'restricted-list'}
            onClick={() => setViewMode('restricted-list')}
          >
            <List className="h-4 w-4" />
            <span>작업 금지 목록</span>
          </S.ViewButton>

          <S.AddButton onClick={() => navigate(PATHS.SCHEDULE_BAN_NEW)}>
            <Plus className="h-4 w-4" />
            <span>작업 금지 기간 추가</span>
          </S.AddButton>
        </S.ViewButtons>
      </S.Header>

      {/* 컨텐츠 영역 */}
      <S.Content>
        {viewMode === 'monthly' ? (
          <DeploymentCalendar
            deployments={deployments}
            restrictedPeriods={restrictedPeriods}
            holidays={holidays}
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
            onDateChange={handleCalendarDateChange}
          />
        ) : viewMode === 'weekly' ? (
          <WeeklyCalendar
            deployments={deployments}
            restrictedPeriods={restrictedPeriods}
            holidays={holidays}
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
            onDateChange={handleCalendarDateChange}
          />
        ) : (
          <S.ListContainer>
            {/* 검색 및 필터 영역 */}
            <S.SearchFilterSection>
              <S.FiltersPanel>
                <S.FiltersRow>
                  <S.FiltersLabel>검색 옵션</S.FiltersLabel>

                  <S.SelectWrapper>
                    <ScheduleCustomSelect
                      value={selectedBanType}
                      onChange={(value) => setSelectedBanType(value)}
                      options={banTypes}
                      placeholder="유형 - 전체"
                    />
                  </S.SelectWrapper>

                  <S.SelectWrapper>
                    <ScheduleCustomSelect
                      value={normalizedSelectedServices}
                      onChange={(value) => {
                        setSelectedServices(Array.isArray(value) ? value : []);
                      }}
                      options={availableServices}
                      multiple
                      showSelectAll
                      placeholder="연관 서비스 - 전체"
                    />
                  </S.SelectWrapper>

                  <DateRangePicker
                    startDate={periodStartDate}
                    endDate={periodEndDate}
                    onChange={handleDateRangeChange}
                  />

                  <S.ResetButton type="button" onClick={handleResetFilters}>
                    <RotateCcw size={16} />
                    <span>초기화</span>
                  </S.ResetButton>
                </S.FiltersRow>
              </S.FiltersPanel>

              {/* 선택된 서비스 태그 */}
              {selectedServices.length > 0 && (
                <S.TagContainer>
                  {selectedServices.map((service) => (
                    <ServiceTag
                      key={service}
                      service={service}
                      onRemove={() =>
                        setSelectedServices((prev) =>
                          prev.filter((s) => s !== service),
                        )
                      }
                    />
                  ))}
                </S.TagContainer>
              )}

              <S.SearchBox>
                <S.SearchLabel>검색명</S.SearchLabel>
                <S.SearchBar>
                  <Search className="search-icon" />
                  <S.SearchInput
                    type="text"
                    placeholder="제목, 내용, 등록자명 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    $focused={searchFocused}
                  />
                  {searchQuery && (
                    <S.ClearButton
                      type="button"
                      onClick={() => setSearchQuery('')}
                    >
                      ✕
                    </S.ClearButton>
                  )}
                </S.SearchBar>

                <S.SearchButton type="button" onClick={handleSearchSubmit}>
                  검색
                </S.SearchButton>
              </S.SearchBox>
            </S.SearchFilterSection>

            <RestrictedPeriodList
              periods={restrictedPeriods}
              onPeriodClick={handleRestrictedPeriodClick}
            />
          </S.ListContainer>
        )}
      </S.Content>

      {/* 모달들 */}
      <DeploymentDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        deployment={selectedDeployment}
      />

      <RestrictedPeriodModal
        open={isRestrictedPeriodModalOpen}
        onClose={() => setIsRestrictedPeriodModalOpen(false)}
        availableServices={availableServices}
      />

      <RestrictedPeriodDetailModal
        open={isRestrictedPeriodDetailModalOpen}
        onClose={handleCloseRestrictedPeriodDetailModal}
        period={selectedRestrictedPeriod}
      />
    </S.PageContainer>
  );
}
