import { RotateCcw, Search as SearchIcon } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import Badge from '@/components/common/Badge';
import ServiceTag from '@/components/common/ServiceTag';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import {
  useAllProblemsQuery,
  useAllProblemCategoriesQuery,
} from '@/hooks/useProblemQueries';

import * as S from './ProblemCaseList.styles';

const IMPORTANCE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'HIGH', label: '상' },
  { value: 'MEDIUM', label: '중' },
  { value: 'LOW', label: '하' },
];

const getImportanceLabel = (importance) => {
  if (importance === 'HIGH') return '상';
  if (importance === 'MEDIUM') return '중';
  if (importance === 'LOW') return '하';
  return importance;
};

const getImportanceVariant = (importance) => {
  if (importance === 'HIGH') return 'error';
  if (importance === 'MEDIUM') return 'warning';
  if (importance === 'LOW') return 'info';
  return 'default';
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
  const [shouldSearch, setShouldSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: problems = [] } = useAllProblemsQuery();
  const { data: categories = [] } = useAllProblemCategoriesQuery();

  const [projectMap, setProjectMap] = useState({});
  const [accountMap, setAccountMap] = useState({});
  const [allProjects, setAllProjects] = useState([]);

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((cat) => {
      map.set(cat.id, cat);
    });
    return map;
  }, [categories]);

  const categoryOptions = useMemo(
    () => [
      { value: '', label: '전체' },
      ...categories.map((cat) => ({
        value: String(cat.id),
        label: cat.title,
      })),
    ],
    [categories],
  );

  useEffect(() => {
    let cancelled = false;

    const loadAllProjects = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.PROJECTS);
        if (cancelled) return;

        const list = Array.isArray(res.data) ? res.data : [];
        setAllProjects(list);
      } catch (error) {
        console.error('전체 프로젝트 목록 조회 실패:', error);
      }
    };

    loadAllProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const uniqueProjectIds = Array.from(
      new Set(
        categories
          .map((cat) => cat.projectId)
          .filter((id) => id !== null && id !== undefined),
      ),
    );

    if (uniqueProjectIds.length === 0) return;

    let cancelled = false;

    const loadProjects = async () => {
      try {
        const results = await Promise.all(
          uniqueProjectIds.map(async (id) => {
            const res = await axiosInstance.get(
              API_ENDPOINTS.PROJECT_BY_ID(id),
            );
            return [id, res.data];
          }),
        );
        if (cancelled) return;

        const nextMap = {};
        results.forEach(([id, project]) => {
          nextMap[id] = project;
        });
        setProjectMap(nextMap);
      } catch (error) {
        console.error('프로젝트 정보 조회 실패:', error);
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [categories]);

  useEffect(() => {
    const uniqueAccountIds = Array.from(
      new Set(
        problems
          .map((p) => p.accountId)
          .filter((id) => id !== null && id !== undefined),
      ),
    );

    if (uniqueAccountIds.length === 0) return;

    let cancelled = false;

    const loadAccounts = async () => {
      try {
        const results = await Promise.all(
          uniqueAccountIds.map(async (id) => {
            const res = await axiosInstance.get(
              API_ENDPOINTS.ACCOUNT_BY_ID(id),
            );
            return [id, res.data];
          }),
        );
        if (cancelled) return;

        const nextMap = {};
        results.forEach(([id, account]) => {
          nextMap[id] = account;
        });
        setAccountMap(nextMap);
      } catch (error) {
        console.error('계정 정보 조회 실패:', error);
      }
    };

    loadAccounts();

    return () => {
      cancelled = true;
    };
  }, [problems]);

  const availableServices = useMemo(() => {
    const servicesSet = new Set();

    allProjects.forEach((project) => {
      const serviceName = project?.service || project?.name;
      if (serviceName) {
        servicesSet.add(serviceName);
      }
    });

    return Array.from(servicesSet)
      .sort()
      .map((service) => ({ value: service, label: service }));
  }, [allProjects]);

  const filteredProblems = useMemo(() => {
    let filtered = [...problems];

    if (categoryFilter) {
      filtered = filtered.filter(
        (problem) => String(problem.categoryId) === categoryFilter,
      );
    }

    if (importanceFilter) {
      filtered = filtered.filter(
        (problem) => problem.importance === importanceFilter,
      );
    }

    if (selectedServices) {
      filtered = filtered.filter((problem) => {
        const category = categoryMap.get(problem.categoryId);
        if (!category) return false;
        const project = projectMap[category.projectId];
        const serviceName = project?.service || project?.name;
        if (!serviceName) return false;
        return serviceName === selectedServices;
      });
    }

    if (shouldSearch && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((problem) => {
        const titleMatch = problem.title?.toLowerCase().includes(query);
        const category = categoryMap.get(problem.categoryId);
        const categoryMatch = category?.title?.toLowerCase().includes(query);

        const account = accountMap[problem.accountId];
        const accountName = account?.name || '';
        const accountMatch = accountName.toLowerCase().includes(query);

        return titleMatch || categoryMatch || accountMatch;
      });
    }

    return filtered;
  }, [
    problems,
    categoryFilter,
    importanceFilter,
    selectedServices,
    searchQuery,
    shouldSearch,
    categoryMap,
    projectMap,
    accountMap,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProblems.length / ITEMS_PER_PAGE),
  );

  const safePage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProblems = filteredProblems.slice(startIndex, endIndex);

  const pageWindow = useMemo(() => {
    if (totalPages <= 9) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const win = new Set([
      1,
      2,
      totalPages - 1,
      totalPages,
      safePage,
      safePage - 1,
      safePage + 1,
    ]);

    const arr = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (n) => win.has(n),
    );

    const out = [];
    for (let i = 0; i < arr.length; i += 1) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) {
        out.push('…');
      }
    }
    return out;
  }, [safePage, totalPages]);

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
    setShouldSearch(false);
  };

  const handleRowClick = (problemId) => {
    onSelectCase(problemId);
  };

  return (
    <S.Wrap>
      <S.FilterCard>
        <S.FilterRow>
          <S.FilterLabel>검색 옵션</S.FilterLabel>
          <S.FilterSelectWrap>
            <S.CustomSelect>
              <ScheduleCustomSelect
                value={selectedServices}
                onChange={handleServicesChange}
                options={availableServices}
                placeholder="전체"
              />
            </S.CustomSelect>

            <S.CustomSelect>
              <ScheduleCustomSelect
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                options={categoryOptions}
                placeholder="유형 - 전체"
              />
            </S.CustomSelect>

            <S.CustomSelect>
              <ScheduleCustomSelect
                value={importanceFilter}
                onChange={handleImportanceFilterChange}
                options={IMPORTANCE_OPTIONS}
                placeholder="중요도 - 전체"
              />
            </S.CustomSelect>

            <S.ResetBtn type="button" onClick={handleResetFilters}>
              <RotateCcw size={14} />
              <span>초기화</span>
            </S.ResetBtn>
          </S.FilterSelectWrap>
        </S.FilterRow>

        {selectedServices && (
          <S.FilterRow>
            <S.FilterLabel>선택 서비스</S.FilterLabel>
            <S.FilterSelectWrap>
              <ServiceTag
                service={selectedServices}
                onRemove={() => setSelectedServices('')}
              />
            </S.FilterSelectWrap>
          </S.FilterRow>
        )}

        <S.FilterRow>
          <S.FilterLabel>검색명</S.FilterLabel>
          <S.SearchRow>
            <S.SearchInputWrap>
              <SearchIcon
                size={16}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: 0.6,
                }}
              />
              <S.Input
                type="text"
                placeholder="제목, 카테고리, 등록자명 검색"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ paddingLeft: 30 }}
              />
              {searchQuery && (
                <S.ClearBtn
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShouldSearch(false);
                  }}
                >
                  ✕
                </S.ClearBtn>
              )}
            </S.SearchInputWrap>
            <S.SearchBtn type="button" onClick={handleSearchSubmit}>
              검색
            </S.SearchBtn>
          </S.SearchRow>
        </S.FilterRow>
      </S.FilterCard>

      <S.Panel>
        <S.Table>
          <S.Head>
            <S.Tr>
              <S.Th style={{ width: 70 }}>번호</S.Th>
              <S.Th>제목</S.Th>
              <S.Th style={{ width: 160 }}>문제 유형</S.Th>
              <S.Th style={{ width: 160 }}>관련 프로젝트</S.Th>
              <S.Th style={{ width: 120 }}>중요도</S.Th>
              <S.Th style={{ width: 120 }}>등록자</S.Th>
              <S.Th style={{ width: 150 }}>등록일</S.Th>
            </S.Tr>
          </S.Head>
          <S.Body>
            {currentProblems.map((problem, index) => {
              const category = categoryMap.get(problem.categoryId);
              const project = category ? projectMap[category.projectId] : null;
              const serviceName = project?.service || project?.name || '-';
              const account = accountMap[problem.accountId];
              const accountName = account?.name || '-';

              return (
                <S.Tr
                  key={problem.id}
                  onClick={() => handleRowClick(problem.id)}
                  data-selected={
                    selectedCaseId === problem.id ? 'true' : undefined
                  }
                >
                  <S.Td>{startIndex + index + 1}</S.Td>
                  <S.Td>
                    <S.Title>{problem.title}</S.Title>
                  </S.Td>
                  <S.Td>{category?.title || '-'}</S.Td>
                  <S.Td>{serviceName}</S.Td>
                  <S.Td>
                    <Badge variant={getImportanceVariant(problem.importance)}>
                      {getImportanceLabel(problem.importance)}
                    </Badge>
                  </S.Td>
                  <S.Td>{accountName}</S.Td>
                  <S.Td>{formatDate(problem.createdAt)}</S.Td>
                </S.Tr>
              );
            })}
          </S.Body>
        </S.Table>
      </S.Panel>

      <S.Pagination>
        <S.PageInfo>
          총 {filteredProblems.length}건 · {safePage}/{totalPages}페이지
        </S.PageInfo>
        <S.PageBtns>
          <S.PageBtn
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={safePage === 1}
          >
            «
          </S.PageBtn>
          <S.PageBtn
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
          >
            ‹
          </S.PageBtn>

          {pageWindow.map((n, i) =>
            n === '…' ? (
              <S.Ellipsis key={`e-${i}`}>…</S.Ellipsis>
            ) : (
              <S.PageBtn
                key={n}
                type="button"
                onClick={() => setCurrentPage(n)}
                data-active={safePage === n || undefined}
                aria-current={safePage === n ? 'page' : undefined}
              >
                {n}
              </S.PageBtn>
            ),
          )}

          <S.PageBtn
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
          >
            ›
          </S.PageBtn>
          <S.PageBtn
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={safePage === totalPages}
          >
            »
          </S.PageBtn>
        </S.PageBtns>
      </S.Pagination>
    </S.Wrap>
  );
}
