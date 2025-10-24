import { parseISO, compareAsc, compareDesc } from 'date-fns';
import { Calendar, List, Plus, CalendarDays, Search } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import CustomSelect from '@/components/auth/CustomSelect';
import Input from '@/components/auth/Input';
import DeploymentCalendar from '@/components/schedule/DeploymentCalendar';
import DeploymentDetailModal from '@/components/schedule/DeploymentDetailModal';
import RestrictedPeriodDetailModal from '@/components/schedule/RestrictedPeriodDetailModal';
import RestrictedPeriodList from '@/components/schedule/RestrictedPeriodList';
import RestrictedPeriodModal from '@/components/schedule/RestrictedPeriodModal';
import WeeklyCalendar from '@/components/schedule/WeeklyCalendar';

import { mockDeployments, mockRestrictedPeriods } from '../mockData';

import * as S from './ScheduleManagement.styles';

export default function ScheduleManagement() {
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
  const [sortOrder, setSortOrder] = useState('latest');

  const banTypes = [
    { value: 'all', label: '전체' },
    { value: 'DB 마이그레이션', label: 'DB 마이그레이션' },
    { value: '서버 점검', label: '서버 점검' },
    { value: '외부 일정', label: '외부 일정' },
    { value: '재난 재해', label: '재난 재해' },
  ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '과거순' },
  ];

  // 필터링 및 정렬
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

  if (sortOrder === 'latest') {
    filteredRestrictedPeriods = [...filteredRestrictedPeriods].sort((a, b) => {
      const dateA = parseISO(`${a.startDate}T${a.startTime}`);
      const dateB = parseISO(`${b.startDate}T${b.startTime}`);
      return compareDesc(dateA, dateB);
    });
  } else {
    filteredRestrictedPeriods = [...filteredRestrictedPeriods].sort((a, b) => {
      const dateA = parseISO(`${a.startDate}T${a.startTime}`);
      const dateB = parseISO(`${b.startDate}T${b.startTime}`);
      return compareAsc(dateA, dateB);
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

  return (
    <S.PageContainer>
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

          <S.AddButton onClick={() => setIsRestrictedPeriodModalOpen(true)}>
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
            {/* 검색, 필터, 정렬 바 */}
            <S.FilterBar>
              <S.SearchWrapper>
                <Search className="search-icon" />
                <Input
                  type="text"
                  placeholder="검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </S.SearchWrapper>

              <S.SelectWrapper>
                <CustomSelect
                  value={selectedBanType}
                  onChange={(value) => setSelectedBanType(value)}
                  options={banTypes}
                />
              </S.SelectWrapper>

              <S.SelectWrapper>
                <CustomSelect
                  value={sortOrder}
                  onChange={(value) => setSortOrder(value)}
                  options={sortOptions}
                />
              </S.SelectWrapper>
            </S.FilterBar>

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
      />

      <RestrictedPeriodDetailModal
        open={isRestrictedPeriodDetailModalOpen}
        onClose={handleCloseRestrictedPeriodDetailModal}
        period={selectedRestrictedPeriod}
      />
    </S.PageContainer>
  );
}
