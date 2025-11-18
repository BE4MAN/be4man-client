import { Search, RotateCcw } from 'lucide-react';
import { useState, useMemo } from 'react';

import Badge from '@/components/common/Badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/common/Pagination';
import ServiceTag from '@/components/common/ServiceTag';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/common/Table';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import { mockProblems, mockRegistrants } from '@/mock/problem';

import * as S from './ProblemCaseList.styles';

const IMPORTANCE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'HIGH', label: '상' },
  { value: 'MEDIUM', label: '중' },
  { value: 'LOW', label: '하' },
];

// 서비스 목록 (mockProblems에서 추출)
const getAvailableServices = () => {
  const servicesSet = new Set();
  mockProblems.forEach((problem) => {
    if (problem.services && Array.isArray(problem.services)) {
      problem.services.forEach((service) => servicesSet.add(service));
    }
  });
  return Array.from(servicesSet)
    .sort()
    .map((service) => ({ value: service, label: service }));
};

// 카테고리 옵션
const getCategoryOptions = () => {
  const categoriesSet = new Set();
  mockProblems.forEach((problem) => {
    if (problem.category) {
      categoriesSet.add(problem.category.title);
    }
  });
  return [
    { value: '', label: '전체' },
    ...Array.from(categoriesSet)
      .sort()
      .map((title) => ({ value: title, label: title })),
  ];
};

const getImportanceLabel = (importance) => {
  switch (importance) {
    case 'HIGH':
      return '상';
    case 'MEDIUM':
      return '중';
    case 'LOW':
      return '하';
    default:
      return importance;
  }
};

const getImportanceVariant = (importance) => {
  switch (importance) {
    case 'HIGH':
      return 'error';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'info';
    default:
      return 'default';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const ITEMS_PER_PAGE = 10;

export function ProblemCaseList({ selectedCaseId, onSelectCase }) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [importanceFilter, setImportanceFilter] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = useMemo(() => getCategoryOptions(), []);
  const availableServices = useMemo(() => getAvailableServices(), []);

  const filteredProblems = useMemo(() => {
    let filtered = [...mockProblems];

    // 카테고리 필터
    if (categoryFilter) {
      filtered = filtered.filter(
        (problem) => problem.category.title === categoryFilter,
      );
    }

    // 중요도 필터
    if (importanceFilter) {
      filtered = filtered.filter(
        (problem) => problem.importance === importanceFilter,
      );
    }

    // 서비스 필터
    if (selectedServices) {
      filtered = filtered.filter((problem) => {
        if (!problem.services || !Array.isArray(problem.services)) {
          return false;
        }
        return problem.services.includes(selectedServices);
      });
    }

    // 검색어 필터 (검색 버튼 클릭 시에만)
    if (shouldSearch && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((problem) => {
        const titleMatch = problem.title.toLowerCase().includes(query);
        const categoryMatch = problem.category.title
          .toLowerCase()
          .includes(query);
        const registrant = mockRegistrants[problem.accountId];
        const registrantMatch = registrant?.name?.toLowerCase().includes(query);
        return titleMatch || categoryMatch || registrantMatch;
      });
    }

    return filtered;
  }, [
    categoryFilter,
    importanceFilter,
    selectedServices,
    searchQuery,
    shouldSearch,
  ]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProblems = filteredProblems.slice(startIndex, endIndex);

  // 필터 변경 시 첫 페이지로 리셋
  const handleCategoryFilterChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleImportanceFilterChange = (value) => {
    setImportanceFilter(value);
    setCurrentPage(1);
  };

  const handleServicesChange = (value) => {
    setSelectedServices(value || '');
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setCategoryFilter('');
    setImportanceFilter('');
    setSelectedServices('');
    setSearchQuery('');
    setShouldSearch(false);
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    setShouldSearch(true);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShouldSearch(false); // 검색어 변경 시 검색 결과 초기화
  };

  const handleRowClick = (problemId) => {
    onSelectCase(problemId);
  };

  return (
    <S.Container>
      <S.SearchFilterSection>
        <S.FiltersPanel>
          <S.FiltersRow>
            <S.FiltersLabel>검색 옵션</S.FiltersLabel>

            <S.SelectWrapper>
              <ScheduleCustomSelect
                value={selectedServices}
                onChange={handleServicesChange}
                options={availableServices}
                placeholder="관련 서비스 - 전체"
              />
            </S.SelectWrapper>

            <S.SelectWrapper>
              <ScheduleCustomSelect
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                options={categoryOptions}
                placeholder="유형 - 전체"
              />
            </S.SelectWrapper>

            <S.SelectWrapper>
              <ScheduleCustomSelect
                value={importanceFilter}
                onChange={handleImportanceFilterChange}
                options={IMPORTANCE_OPTIONS}
                placeholder="중요도 - 전체"
              />
            </S.SelectWrapper>

            <S.ResetButton type="button" onClick={handleResetFilters}>
              <RotateCcw size={16} />
              <span>초기화</span>
            </S.ResetButton>
          </S.FiltersRow>
        </S.FiltersPanel>

        {/* 선택된 서비스 태그 */}
        {selectedServices && (
          <S.TagContainer>
            <ServiceTag
              service={selectedServices}
              onRemove={() => setSelectedServices('')}
            />
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
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              $focused={searchFocused}
            />
            {searchQuery && (
              <S.ClearButton
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShouldSearch(false);
                }}
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

      <S.TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>문제 유형</TableHead>
              <TableHead>관련 서비스</TableHead>
              <TableHead>영향도</TableHead>
              <TableHead>등록자</TableHead>
              <TableHead>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProblems.map((problem, index) => {
              const registrant = mockRegistrants[problem.accountId];
              return (
                <TableRow
                  key={problem.id}
                  onClick={() => handleRowClick(problem.id)}
                  style={
                    selectedCaseId === problem.id
                      ? { backgroundColor: 'rgb(100 150 255 / 12%)' }
                      : undefined
                  }
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <S.TitleCell>{problem.title}</S.TitleCell>
                  </TableCell>
                  <TableCell>{problem.category.title}</TableCell>
                  <TableCell>
                    {problem.services && problem.services.length > 0
                      ? problem.services.join(', ')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getImportanceVariant(problem.importance)}>
                      {getImportanceLabel(problem.importance)}
                    </Badge>
                  </TableCell>
                  <TableCell>{registrant?.name || '-'}</TableCell>
                  <TableCell>{formatDate(problem.createdAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </S.TableContainer>

      {totalPages > 1 && (
        <S.PaginationWrapper>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </S.PaginationWrapper>
      )}
    </S.Container>
  );
}
