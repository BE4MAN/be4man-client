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
import { getBanDateRangeInfo } from '@/features/schedule/utils/banCalculator';

import { useHolidays } from '../hooks/useHolidays';
import { mockDeployments, mockRestrictedPeriods } from '../mockData';

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

  const normalizedSelectedServices = Array.isArray(selectedServices)
    ? selectedServices
    : [];

  // 공휴일 데이터 조회 (현재 보는 연도 기준)
  const { data: holidays = [] } = useHolidays(currentYear);

  // 서비스 목록 추출 (모든 배포 작업에서 고유한 서비스 추출)
  const availableServices = useMemo(() => {
    const services = new Set(
      mockDeployments.map((deployment) => deployment.service),
    );
    return Array.from(services)
      .sort()
      .map((service) => ({ value: service, label: service }));
  }, []);

  const banTypes = [
    { value: 'all', label: '전체' },
    { value: 'DB 마이그레이션', label: 'DB 마이그레이션' },
    { value: '서버 점검', label: '서버 점검' },
    { value: '외부 일정', label: '외부 일정' },
    { value: '재난 재해', label: '재난 재해' },
  ];

  // 필터링
  let filteredRestrictedPeriods =
    selectedBanType === 'all'
      ? mockRestrictedPeriods
      : mockRestrictedPeriods.filter(
          (period) => period.type === selectedBanType,
        );

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const titleMatch = period.title?.toLowerCase().includes(normalizedQuery);
      const descriptionMatch = period.description
        ?.toLowerCase()
        .includes(normalizedQuery);
      const registrantMatch = period.registrant
        ?.toLowerCase()
        .includes(normalizedQuery);
      return titleMatch || descriptionMatch || registrantMatch;
    });
  }

  // 서비스 필터링
  if (selectedServices.length > 0) {
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      if (!period.services || period.services.length === 0) return false;
      return selectedServices.some((service) =>
        period.services.includes(service),
      );
    });
  }

  // 기간 필터링
  const withinRange = (period, startBound, endBound) => {
    const range = getBanDateRangeInfo(period);
    if (!range) return false;
    const { startDateTime, endDateTime } = range;
    const startTime = startDateTime.getTime();
    const endTime = endDateTime.getTime();
    return (
      (startTime >= startBound && startTime <= endBound) ||
      (endTime >= startBound && endTime <= endBound) ||
      (startTime <= startBound && endTime >= endBound)
    );
  };

  if (periodStartDate && periodEndDate) {
    const startBound = new Date(`${periodStartDate}T00:00`).getTime();
    const endBound = new Date(`${periodEndDate}T23:59`).getTime();
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) =>
      withinRange(period, startBound, endBound),
    );
  } else if (periodStartDate) {
    const startBound = new Date(`${periodStartDate}T00:00`).getTime();
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const range = getBanDateRangeInfo(period);
      if (!range) return false;
      const { endDateTime } = range;
      return endDateTime.getTime() >= startBound;
    });
  } else if (periodEndDate) {
    const endBound = new Date(`${periodEndDate}T23:59`).getTime();
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const range = getBanDateRangeInfo(period);
      if (!range) return false;
      const { startDateTime } = range;
      return startDateTime.getTime() <= endBound;
    });
  }

  // 이벤트 핸들러
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
    // TODO: API 연동 시 필터 값 기반으로 호출
  };

  // 캘린더 날짜 변경 시 연도 업데이트
  const handleCalendarDateChange = (date) => {
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
            deployments={mockDeployments}
            restrictedPeriods={mockRestrictedPeriods}
            holidays={holidays}
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
            onDateChange={handleCalendarDateChange}
          />
        ) : viewMode === 'weekly' ? (
          <WeeklyCalendar
            deployments={mockDeployments}
            restrictedPeriods={mockRestrictedPeriods}
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
              periods={filteredRestrictedPeriods}
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
