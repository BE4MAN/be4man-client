// src/features/log/pages/LogManagement.jsx
import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import mockData from '../../../mock/taskManage';

import DateRangePicker from './DateRangePicker';
import { getStyles } from './LogManagement.style';

// 드롭다운 컴포넌트 (이전 코드 동일)
const CustomDropdown = ({ label, options, value, onChange }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownStyles = {
    container: {
      position: 'relative',
      minWidth: '140px',
    },
    button: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: theme.mode === 'dark' ? '#2a2a2a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: '#ffffff',
    },
    menu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '4px',
      backgroundColor: theme.mode === 'dark' ? '#2a2a2a' : '#ffffff',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      boxShadow:
        theme.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.5)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
    },
    option: (isSelected) => ({
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: isSelected
        ? theme.mode === 'dark'
          ? 'rgba(33, 150, 243, 0.3)'
          : theme.colors.brandLight || 'rgba(33, 150, 243, 0.1)'
        : 'transparent',
      color: isSelected ? theme.colors.brand : theme.colors.text,
    }),
  };

  return (
    <div ref={dropdownRef} style={dropdownStyles.container}>
      <button
        type="button"
        style={dropdownStyles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || label}</span>
        <span style={{ fontSize: '12px' }}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div style={dropdownStyles.menu}>
          {options.map((option) => (
            <div
              key={option}
              style={dropdownStyles.option(value === option)}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                if (value !== option) {
                  e.currentTarget.style.backgroundColor =
                    theme.mode === 'dark'
                      ? '#3a3a3a'
                      : theme.colors.backgroundHover || '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function LogManagement() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  const PAGE_SIZE = 8;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    작업단계: '전체',
    작업상태: '전체',
    결과: '전체',
    시작일: '',
    종료일: '',
    순서: '최신순',
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  //   const [hoveredRow, setHoveredRow] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [clearBtnHovered, setClearBtnHovered] = useState(false);
  const [resetBtnHovered, setResetBtnHovered] = useState(false);
  const [hoveredPaginationBtn, setHoveredPaginationBtn] = useState(null);
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
    setSortOrder('desc');
    setSearchQuery('');
  };

  // 각 단계별 허용된 상태 정의
  const stageStatusMap = {
    계획서: ['승인대기'],
    배포: ['진행중', '종료', '취소'],
    결과보고: ['승인대기', '반려', '완료'],
  };

  const filteredData = mockData
    .filter((item) => {
      // 단계별 허용된 상태인지 먼저 체크
      const allowedStatuses = stageStatusMap[item.stage];
      if (allowedStatuses && !allowedStatuses.includes(item.status)) {
        return false;
      }

      const matchesSearch =
        searchQuery === '' ||
        item.id.toString().includes(searchQuery) ||
        item.drafter.includes(searchQuery) ||
        item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage =
        filters.작업단계 === '전체' || item.stage === filters.작업단계;
      const matchesStatus =
        filters.작업상태 === '전체' || item.status === filters.작업상태;
      const matchesResult =
        filters.결과 === '전체' ||
        (item.result && item.result === filters.결과);

      let matchesDateRange = true;
      if (filters.시작일 && filters.종료일 && item.completionTime) {
        const itemDate = new Date(item.completionTime.replace(/\./g, '-'));
        const startDate = new Date(filters.시작일);
        const endDate = new Date(filters.종료일 + ' 23:59:59');
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return (
        matchesSearch &&
        matchesStage &&
        matchesStatus &&
        matchesResult &&
        matchesDateRange
      );
    })
    .sort((a, b) => {
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    });

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredData.slice(start, start + PAGE_SIZE);

  const renderBadge = (text, type) => {
    return <span style={styles.badge(type, text)}>{text}</span>;
  };

  const renderResult = (result) => {
    if (result) {
      return renderBadge(result, 'result');
    }
    return <span style={{ color: theme.colors.textSecondary }}>-</span>;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  // 상세보기 페이지로 이동
  const handleDetailClick = (itemId) => {
    navigate(`/tasks/${itemId}`);
  };

  // 상세보기 버튼 스타일 (개선된 UI)
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

  return (
    <div style={styles.container}>
      {/* 검색 및 필터 영역 (이전 코드 동일) */}
      <div style={styles.searchFilterSection}>
        <div style={styles.topControls}>
          <div style={styles.searchBar}>
            <svg
              style={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="작업번호, 기안자, 서비스명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={styles.searchInput(searchFocused)}
            />
            {searchQuery && (
              <button
                style={styles.clearButton(clearBtnHovered)}
                onClick={() => setSearchQuery('')}
                onMouseEnter={() => setClearBtnHovered(true)}
                onMouseLeave={() => setClearBtnHovered(false)}
              >
                ✕
              </button>
            )}
          </div>
          <button
            style={styles.resetButton(resetBtnHovered)}
            onClick={resetFilters}
            onMouseEnter={() => setResetBtnHovered(true)}
            onMouseLeave={() => setResetBtnHovered(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35z"
                fill="currentColor"
              />
            </svg>
            필터 초기화
          </button>
        </div>

        <div style={styles.filtersPanel}>
          <div style={styles.filtersRow}>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>작업 단계</label>
              <CustomDropdown
                label=""
                options={['전체', '계획서', '배포', '결과보고']}
                value={filters.작업단계}
                onChange={(val) => handleFilter('작업단계', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>작업 상태</label>
              <CustomDropdown
                label=""
                options={[
                  '전체',
                  '승인대기',
                  '진행중',
                  '취소',
                  '반려',
                  '완료',
                  '종료',
                ]}
                value={filters.작업상태}
                onChange={(val) => handleFilter('작업상태', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>결과</label>
              <CustomDropdown
                label=""
                options={['전체', '성공', '실패']}
                value={filters.결과}
                onChange={(val) => handleFilter('결과', val)}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>정렬</label>
              <CustomDropdown
                label=""
                options={['최신순', '오래된순']}
                value={filters.순서}
                onChange={(val) => {
                  handleFilter('순서', val);
                  setSortOrder(val === '최신순' ? 'desc' : 'asc');
                }}
              />
            </div>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>기간</label>
              <DateRangePicker
                startDate={filters.시작일}
                endDate={filters.종료일}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>작업 번호</th>
              <th style={styles.th}>기안자</th>
              <th style={styles.th}>부서</th>
              <th style={styles.th}>서비스명</th>
              <th style={styles.th}>작업 제목</th>
              <th style={styles.th}>작업 단계</th>
              <th style={styles.th}>작업 상태</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>완료 시각</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>배포 결과</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>상세</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      ...styles.td,
                      color: theme.colors.text,
                      fontWeight: '500',
                    }}
                  >
                    {item.id}
                  </td>
                  <td style={styles.td}>{item.drafter}</td>
                  <td style={styles.td}>{item.department}</td>
                  <td style={styles.td}>{item.serviceName}</td>
                  <td style={styles.td}>{item.taskTitle}</td>
                  <td style={styles.td}>{renderBadge(item.stage, 'stage')}</td>
                  <td style={styles.td}>
                    {renderBadge(item.status, 'status')}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    {item.completionTime || (
                      <span style={{ color: theme.colors.textSecondary }}>
                        -
                      </span>
                    )}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    {renderResult(item.result)}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <button
                      style={detailButtonStyle(hoveredDetailBtn === item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetailClick(item.id);
                      }}
                      onMouseEnter={() => setHoveredDetailBtn(item.id)}
                      onMouseLeave={() => setHoveredDetailBtn(null)}
                    >
                      상세
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ ...styles.td, padding: '40px' }}>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 (이전 코드 동일) */}
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.paginationArrow(
              currentPage === 1,
              hoveredPaginationBtn === 'prev',
            ),
            pointerEvents: currentPage === 1 ? 'none' : 'auto', // ← 추가
          }}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          onMouseEnter={() => {
            if (currentPage !== 1) {
              setHoveredPaginationBtn('prev');
            }
          }}
          onMouseLeave={() => {
            if (currentPage !== 1) {
              setHoveredPaginationBtn(null);
            }
          }}
        >
          &lt;
        </button>

        {(() => {
          const pageSize = 5;
          const currentGroup = Math.floor((currentPage - 1) / pageSize);
          const startPage = currentGroup * pageSize + 1;
          const endPage = Math.min(startPage + pageSize - 1, totalPages);

          const pages = [];
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }

          return pages.map((page) => (
            <button
              key={page}
              style={styles.paginationButton(
                page === currentPage,
                false,
                hoveredPaginationBtn === page,
              )}
              onClick={() => setCurrentPage(page)}
              onMouseEnter={() => setHoveredPaginationBtn(page)}
              onMouseLeave={() => setHoveredPaginationBtn(null)}
            >
              {page}
            </button>
          ));
        })()}

        {/* 다음 페이지 버튼 */}
        <button
          style={{
            ...styles.paginationArrow(
              currentPage === totalPages,
              hoveredPaginationBtn === 'next',
            ),
            pointerEvents: currentPage === totalPages ? 'none' : 'auto', // ← 추가
          }}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          onMouseEnter={() => {
            if (currentPage !== totalPages) {
              setHoveredPaginationBtn('next');
            }
          }}
          onMouseLeave={() => {
            if (currentPage !== totalPages) {
              setHoveredPaginationBtn(null);
            }
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
