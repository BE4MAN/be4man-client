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
import Button from '@/components/auth/Button';
import CustomSelect from '@/components/auth/CustomSelect';
import Input from '@/components/auth/Input';
import ServiceTag from '@/components/common/ServiceTag';
import DeploymentCalendar from '@/components/schedule/DeploymentCalendar';
import DeploymentDetailModal from '@/components/schedule/DeploymentDetailModal';
import RestrictedPeriodDetailModal from '@/components/schedule/RestrictedPeriodDetailModal';
import RestrictedPeriodList from '@/components/schedule/RestrictedPeriodList';
import RestrictedPeriodModal from '@/components/schedule/RestrictedPeriodModal';
import WeeklyCalendar from '@/components/schedule/WeeklyCalendar';
import DateRangePicker from '@/features/log/pages/DateRangePicker';

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
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter(
      (period) =>
        period.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        period.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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
  if (periodStartDate && periodEndDate) {
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const periodStart = `${period.startDate}T${period.startTime}`;
      const periodEnd = `${period.endDate}T${period.endTime}`;
      return (
        (periodStart >= `${periodStartDate}T00:00` &&
          periodStart <= `${periodEndDate}T23:59`) ||
        (periodEnd >= `${periodStartDate}T00:00` &&
          periodEnd <= `${periodEndDate}T23:59`) ||
        (periodStart <= `${periodStartDate}T00:00` &&
          periodEnd >= `${periodEndDate}T23:59`)
      );
    });
  } else if (periodStartDate) {
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const periodEnd = `${period.endDate}T${period.endTime}`;
      return periodEnd >= `${periodStartDate}T00:00`;
    });
  } else if (periodEndDate) {
    filteredRestrictedPeriods = filteredRestrictedPeriods.filter((period) => {
      const periodStart = `${period.startDate}T${period.startTime}`;
      return periodStart <= `${periodEndDate}T23:59`;
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
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
          />
        ) : viewMode === 'weekly' ? (
          <WeeklyCalendar
            deployments={mockDeployments}
            restrictedPeriods={mockRestrictedPeriods}
            onDeploymentClick={handleDeploymentClick}
            onRestrictedPeriodClick={handleRestrictedPeriodClick}
          />
        ) : (
          <S.ListContainer>
            {/* 검색 및 필터 영역 */}
            <S.SearchFilterSection>
              <S.TopControls>
                <S.SearchBar>
                  <Search className="search-icon" />
                  <S.SearchInput
                    type="text"
                    placeholder="제목, 내용 검색"
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
                <S.ResetButton type="button" onClick={handleResetFilters}>
                  <RotateCcw size={16} />
                  <span>필터 초기화</span>
                </S.ResetButton>
              </S.TopControls>

              <S.FiltersPanel>
                <S.FiltersRow>
                  <S.FilterRowItem>
                    <S.FilterLabel>유형</S.FilterLabel>
                    <S.SelectWrapper>
                      <CustomSelect
                        value={selectedBanType}
                        onChange={(value) => setSelectedBanType(value)}
                        options={banTypes}
                      />
                    </S.SelectWrapper>
                  </S.FilterRowItem>

                  <S.FilterRowItem>
                    <S.FilterLabel>연관 서비스</S.FilterLabel>
                    <S.SelectWrapper>
                      <CustomSelect
                        value={selectedServices}
                        onChange={(value) => setSelectedServices(value)}
                        options={availableServices}
                        multiple
                        placeholder="전체"
                      />
                    </S.SelectWrapper>
                  </S.FilterRowItem>

                  <S.FilterRowItem>
                    <S.FilterLabel>기간</S.FilterLabel>
                    <DateRangePicker
                      startDate={periodStartDate}
                      endDate={periodEndDate}
                      onChange={handleDateRangeChange}
                    />
                  </S.FilterRowItem>
                </S.FiltersRow>
              </S.FiltersPanel>
            </S.SearchFilterSection>

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
