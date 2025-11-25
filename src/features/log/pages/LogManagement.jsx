import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTasks } from '../../../api/taskManagement';

import DateRangePicker from './DateRangePicker';
import * as S from './LogManagement.style';

const CustomDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayLabel = value || label || '전체';

  return (
    <S.CustomSelect ref={wrapperRef}>
      <S.CustomSelectBtn
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {displayLabel}
        <span>{isOpen ? '▲' : '▼'}</span>
      </S.CustomSelectBtn>
      {isOpen && (
        <S.CustomSelectList>
          {options.map((option) => (
            <S.CustomSelectItem
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </S.CustomSelectItem>
          ))}
        </S.CustomSelectList>
      )}
    </S.CustomSelect>
  );
};

export default function LogManagement() {
  const theme = useTheme();
  const navigate = useNavigate();

  const PAGE_SIZE = 8;

  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    작업단계: '전체',
    작업상태: '전체',
    결과: '전체',
    시작일: '',
    종료일: '',
    순서: '최신순',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredDetailBtn, setHoveredDetailBtn] = useState(null);

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setFilters((prev) => ({
      ...prev,
      시작일: startDate,
      종료일: endDate,
    }));
  };

  const resetFilters = () => {
    setFilters({
      작업단계: '전체',
      작업상태: '전체',
      결과: '전체',
      시작일: '',
      종료일: '',
      순서: '최신순',
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage - 1,
        size: PAGE_SIZE,
        searchQuery,
        stage: filters.작업단계,
        status: filters.작업상태,
        result: filters.결과,
        sortBy: filters.순서,
      };

      const response = await getTasks(params);
      setTasks(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalCount(response.totalElements || 0);
    } catch (err) {
      console.error('작업 목록 조회 실패:', err);
      setError('작업 목록을 불러오는데 실패했습니다.');
      setTasks([]);
      setTotalPages(0);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchQuery, filters]);

  const renderBadge = (text, type) => {
    let style = {
      display: 'inline-block',
      fontSize: 13,
      fontWeight: 500,
    };

    if (type === 'result') {
      style = {
        ...style,
        padding: '4px 12px',
        borderRadius: 12,
      };

      if (text === '성공') {
        style.backgroundColor =
          theme.mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9';
        style.color = theme.mode === 'dark' ? '#81c784' : '#388e3c';
      } else if (text === '실패') {
        style.backgroundColor =
          theme.mode === 'dark' ? 'rgba(244, 67, 54, 0.2)' : '#ffebee';
        style.color = theme.mode === 'dark' ? '#ef5350' : '#d32f2f';
      } else {
        style.backgroundColor =
          theme.colors.backgroundHover ||
          (theme.mode === 'dark' ? '#333333' : '#f5f5f5');
        style.color = theme.colors.textSecondary;
      }
    } else {
      style.color = theme.colors.textPrimary;
    }

    return <span style={style}>{text}</span>;
  };

  const renderResult = (result) => {
    if (result) {
      return renderBadge(result, 'result');
    }
    return <span style={{ color: theme.colors.textsecondary }}>-</span>;
  };

  const handleDetailClick = (itemId) => {
    navigate(`/tasks/${itemId}`);
  };

  const detailButtonStyle = (isHovered) => ({
    padding: '6px 14px',
    backgroundColor: isHovered
      ? theme.mode === 'dark'
        ? 'rgba(33, 150, 243, 0.15)'
        : 'rgba(33, 150, 243, 0.08)'
      : theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.04)',
    color: isHovered
      ? theme.colors.brand || '#2196F3'
      : theme.colors.textSecondary,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: isHovered
      ? theme.mode === 'dark'
        ? '0 2px 8px rgba(33, 150, 243, 0.2)'
        : '0 2px 6px rgba(33, 150, 243, 0.15)'
      : 'none',
  });

  const safeTotalPages = useMemo(
    () => Math.max(1, totalPages || 0),
    [totalPages],
  );

  const safePage = useMemo(
    () => Math.min(currentPage, safeTotalPages),
    [currentPage, safeTotalPages],
  );

  const PAGE_GROUP_SIZE = 5;
  const pageList = useMemo(() => {
    if (safeTotalPages <= 0) return [];

    const currentGroup = Math.floor((safePage - 1) / PAGE_GROUP_SIZE);
    const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, safeTotalPages);

    const list = [];
    for (let p = startPage; p <= endPage; p += 1) {
      list.push(p);
    }
    return list;
  }, [safePage, safeTotalPages]);

  return (
    <S.Wrap>
      <S.FilterCard>
        <S.FilterRow>
          <S.FilterLabel>필터</S.FilterLabel>
          <S.FilterSelectWrap>
            <CustomDropdown
              label="작업 단계"
              options={['전체', '계획서', '배포', '결과보고', '재배포', '복구']}
              value={filters.작업단계}
              onChange={(val) => handleFilter('작업단계', val)}
            />
            <CustomDropdown
              label="작업 상태"
              options={['전체', '대기', '진행중', '취소', '반려', '완료']}
              value={filters.작업상태}
              onChange={(val) => handleFilter('작업상태', val)}
            />
            <CustomDropdown
              label="결과"
              options={['전체', '성공', '실패']}
              value={filters.결과}
              onChange={(val) => handleFilter('결과', val)}
            />
            <CustomDropdown
              label="정렬"
              options={['최신순', '오래된순']}
              value={filters.순서}
              onChange={(val) => handleFilter('순서', val)}
            />
            <div style={{ minWidth: 200 }}>
              <DateRangePicker
                startDate={filters.시작일}
                endDate={filters.종료일}
                onChange={handleDateRangeChange}
              />
            </div>
            <S.ResetBtn type="button" onClick={resetFilters}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: 4 }}
              >
                <path
                  d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35z"
                  fill="currentColor"
                />
              </svg>
              <span>필터 초기화</span>
            </S.ResetBtn>
          </S.FilterSelectWrap>
        </S.FilterRow>

        <S.FilterRow>
          <S.FilterLabel>검색</S.FilterLabel>
          <S.SearchRow>
            <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: 0.6,
                }}
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <S.Input
                type="text"
                placeholder="작업번호, 기안자, 서비스명 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 30 }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: theme.colors.textsecondary,
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            <S.SearchBtn
              type="button"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              검색
            </S.SearchBtn>
          </S.SearchRow>
        </S.FilterRow>
      </S.FilterCard>

      <S.Panel>
        {loading ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            로딩 중...
          </div>
        ) : error ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: theme.colors.danger,
            }}
          >
            {error}
          </div>
        ) : (
          <S.Table>
            <S.Head>
              <S.Tr>
                <S.Th style={{ width: 100 }}>작업 번호</S.Th>
                <S.Th style={{ width: 90 }}>기안자</S.Th>
                <S.Th style={{ width: 80 }}>부서</S.Th>
                <S.Th style={{ width: 130 }}>서비스명</S.Th>
                <S.Th>작업 제목</S.Th>
                <S.Th style={{ width: 100 }}>작업 단계</S.Th>
                <S.Th style={{ width: 100 }}>작업 상태</S.Th>
                <S.Th style={{ width: 160 }}>완료 시각</S.Th>
                <S.Th style={{ width: 90 }}>배포 결과</S.Th>
                <S.Th style={{ width: 80 }}>상세</S.Th>
              </S.Tr>
            </S.Head>
            <S.Body>
              {tasks.length === 0 ? (
                <S.Tr>
                  <S.Td colSpan={10} data-no-ellipsis>
                    작업 데이터가 없습니다.
                  </S.Td>
                </S.Tr>
              ) : (
                tasks.map((task) => (
                  <S.Tr
                    key={task.id}
                    onClick={() => handleDetailClick(task.id)}
                  >
                    <S.Td>{task.id || '-'}</S.Td>
                    <S.Td>{task.drafter || task.drafterName || '-'}</S.Td>
                    <S.Td>
                      {task.department || task.drafterDepartment || '-'}
                    </S.Td>
                    <S.Td>{task.serviceName || task.service || '-'}</S.Td>
                    <S.Td data-no-ellipsis>
                      {task.taskTitle || task.title || '-'}
                    </S.Td>
                    <S.Td>
                      {task.stage ? renderBadge(task.stage, 'stage') : '-'}
                    </S.Td>
                    <S.Td>
                      {task.status ? renderBadge(task.status, 'status') : '-'}
                    </S.Td>
                    <S.Td>
                      {task.completionTime ||
                        task.approvedAt ||
                        task.completedAt ||
                        '-'}
                    </S.Td>
                    <S.Td>
                      {renderResult(task.result || task.deploymentResult)}
                    </S.Td>
                    <S.Td
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <button
                        type="button"
                        style={detailButtonStyle(hoveredDetailBtn === task.id)}
                        onClick={() => handleDetailClick(task.id)}
                        onMouseEnter={() => setHoveredDetailBtn(task.id)}
                        onMouseLeave={() => setHoveredDetailBtn(null)}
                      >
                        보기
                      </button>
                    </S.Td>
                  </S.Tr>
                ))
              )}
            </S.Body>
          </S.Table>
        )}
      </S.Panel>

      <S.Pagination role="navigation" aria-label="페이지네이션">
        <S.PageInfo>
          총 {totalCount}개 · {safePage}/{safeTotalPages}페이지
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

          {pageList.map((n) => (
            <S.PageBtn
              key={n}
              type="button"
              onClick={() => setCurrentPage(n)}
              data-active={safePage === n || undefined}
              aria-current={safePage === n ? 'page' : undefined}
            >
              {n}
            </S.PageBtn>
          ))}

          <S.PageBtn
            type="button"
            onClick={() =>
              setCurrentPage((p) => Math.min(safeTotalPages, p + 1))
            }
            disabled={safePage === safeTotalPages}
          >
            ›
          </S.PageBtn>
          <S.PageBtn
            type="button"
            onClick={() => setCurrentPage(safeTotalPages)}
            disabled={safePage === safeTotalPages}
          >
            »
          </S.PageBtn>
        </S.PageBtns>
      </S.Pagination>
    </S.Wrap>
  );
}
