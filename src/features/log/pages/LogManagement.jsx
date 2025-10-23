// src/features/log/pages/LogManagement.jsx
import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';

import { getLogs } from '@/api/logService';

import { getStyles } from './LogManagement.style';

// 커스텀 드롭다운 컴포넌트
function CustomDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={styles.customDropdown} ref={dropdownRef}>
      <button
        style={styles.dropdownTrigger(isFocused, isHovered)}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsFocused(!isOpen);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
      >
        {label && <span style={styles.dropdownLabel}>{label}</span>}
        <span style={styles.dropdownValue}>{value}</span>
        <svg
          style={styles.dropdownArrow(isOpen)}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div style={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option}
              style={styles.dropdownItem(
                value === option,
                hoveredItem === option,
              )}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
                setIsFocused(false);
              }}
              onMouseEnter={() => setHoveredItem(option)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {option}
              {value === option && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LogManagement() {
  const theme = useTheme();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    작업상태: '전체',
    결과: '전체',
    순서: '최신순',
    시작일: '',
    종료일: '',
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Hover states
  const [searchFocused, setSearchFocused] = useState(false);
  const [clearBtnHovered, setClearBtnHovered] = useState(false);
  const [resetBtnHovered, setResetBtnHovered] = useState(false);
  //   const [refreshBtnHovered, setRefreshBtnHovered] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredPaginationBtn, setHoveredPaginationBtn] = useState(null);

  const styles = getStyles(theme);

  // ✅ 백엔드 상태값 → 프론트 표준 형식 매핑
  const STATUS_MAP = {
    // 백엔드에서 올 수 있는 모든 케이스
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DEPLOYED: 'deployed',
    SUCCESS: 'deployed', // SUCCESS는 배포로 취급
    FAILURE: 'rejected', // FAILURE는 반려로 취급
    // 소문자도 대비
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
    deployed: 'deployed',
    success: 'deployed',
    failure: 'rejected',
  };

  // ✅ 상태 → 한글 라벨
  const STATUS_LABEL = {
    pending: '대기',
    approved: '승인완료',
    rejected: '반려',
    deployed: '배포',
  };

  // ✅ 결과 → 한글 라벨
  const RESULT_LABEL = {
    success: '성공',
    failure: '실패',
    deployed: '성공',
  };

  // ✅ 백엔드 데이터를 프론트 형식으로 변환
  const transformLogData = (backendData) => {
    return backendData.map((item, index) => {
      // 백엔드 상태를 표준 형식으로 변환
      const rawStatus = item.status || item.approvalStatus || 'PENDING';
      const normalizedStatus =
        STATUS_MAP[rawStatus] ||
        STATUS_MAP[rawStatus?.toUpperCase()] ||
        'pending';

      console.log(`📝 항목 ${index + 1}:`, {
        원본상태: rawStatus,
        변환된상태: normalizedStatus,
        전체데이터: item,
      });

      return {
        id: `#${item.prNumber || item.buildNumber || item.id}`,
        branch: item.branch || '-',
        status: normalizedStatus,
        deployTime: formatDateTime(item.scheduledAt || item.createdAt),
        // deployed 상태면 success, 아니면 null
        result: normalizedStatus === 'deployed' ? 'success' : null,
      };
    });
  };

  // ✅ 날짜 포맷팅 함수
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // ✅ 로그 데이터 가져오기 함수
  const fetchLogs = () => {
    setLoading(true);

    getLogs()
      .then((response) => {
        console.log('🔍 원본 API 응답:', response);
        const logsData = response.content || response;
        console.log('🔍 추출한 로그 데이터:', logsData);

        // 첫 번째 데이터 상세 확인
        if (logsData && logsData.length > 0) {
          console.log('🔍 첫 번째 로그 항목:', logsData[0]);
        }

        const transformedData = transformLogData(logsData);
        console.log('✅ 변환된 데이터:', transformedData);
        setLogs(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('로그 가져오기 실패:', err);
        setLoading(false);
      });
  };

  // ✅ 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchLogs();
  }, []);

  // main 태그의 padding 제거
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const originalPadding = mainElement.style.padding;
      mainElement.style.padding = '0';

      return () => {
        mainElement.style.padding = originalPadding;
      };
    }
  }, []);

  const handleFilter = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      작업상태: '전체',
      결과: '전체',
      순서: '최신순',
      시작일: '',
      종료일: '',
    });
    setSortOrder('desc');
  };

  // ✅ 필터링 로직 - 한글 라벨로 비교
  const filteredData = logs
    .filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase());

      // 한글 라벨로 변환해서 비교
      const statusLabel = STATUS_LABEL[item.status];
      const matchesStatus =
        filters.승인여부 === '전체' || statusLabel === filters.작업상태;

      const resultLabel = item.result ? RESULT_LABEL[item.result] : null;
      const matchesResult =
        filters.결과 === '전체' || resultLabel === filters.결과;

      let matchesDateRange = true;
      if (filters.시작일 && filters.종료일) {
        const itemDate = new Date(item.deployTime.replace(/\./g, '-'));
        const startDate = new Date(filters.시작일);
        const endDate = new Date(filters.종료일 + ' 23:59:59');
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return (
        matchesSearch && matchesStatus && matchesResult && matchesDateRange
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.deployTime.replace(/\./g, '-'));
      const dateB = new Date(b.deployTime.replace(/\./g, '-'));
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredData.slice(start, start + PAGE_SIZE);

  // ✅ 배지 렌더링 - theme.js의 색상 사용
  const renderBadge = (status) => {
    const label = STATUS_LABEL[status] || status;
    const colors = theme.colors.status?.[status];

    console.log(`🎨 배지 렌더링:`, {
      status,
      label,
      colors,
      theme: theme.colors.status,
    });

    // theme.colors.status가 없으면 기본 색상 사용
    const defaultColors = {
      pending: {
        bg: theme.mode === 'dark' ? '#14532D' : '#86EFAC',
        text: theme.mode === 'dark' ? '#86EFAC' : '#14532D',
      },
      approved: {
        bg: theme.mode === 'dark' ? '#713F12' : '#FDE047',
        text: theme.mode === 'dark' ? '#FDE047' : '#713F12',
      },
      rejected: {
        bg: theme.mode === 'dark' ? '#7F1D1D' : '#FCA5A5',
        text: theme.mode === 'dark' ? '#FCA5A5' : '#7F1D1D',
      },
      deployed: {
        bg: theme.mode === 'dark' ? '#1E3A8A' : '#DBEAFE',
        text: theme.mode === 'dark' ? '#60A5FA' : '#1E40AF',
      },
    };

    const finalColors = colors ||
      defaultColors[status] || { bg: '#E5E7EB', text: '#000000' };

    return (
      <span
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          background: finalColors.bg,
          color: finalColors.text,
        }}
      >
        {label}
      </span>
    );
  };

  // ✅ 결과 배지 렌더링
  const renderResultBadge = (result) => {
    const label = RESULT_LABEL[result] || result;

    const colors =
      result === 'success'
        ? {
            bg: theme.mode === 'dark' ? '#059669' : '#D1FAE5',
            text: theme.mode === 'dark' ? '#FFFFFF' : '#065F46',
          }
        : {
            bg: theme.mode === 'dark' ? '#DC2626' : '#FEE2E2',
            text: theme.mode === 'dark' ? '#FFFFFF' : '#991B1B',
          };

    return (
      <span
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          background: colors.bg,
          color: colors.text,
        }}
      >
        {label}
      </span>
    );
  };

  const renderResult = (status, result) => {
    if (status === 'deployed' && result) {
      return renderResultBadge(result);
    }
    return <span style={{ color: theme.colors.textSecondary }}>-</span>;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <div style={styles.container}>
      {/* 검색 및 필터 영역 */}
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
              placeholder="PR 번호 또는 브랜치 검색"
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
        </div>

        {/* 필터 패널 */}
        <div style={styles.filtersPanel}>
          <div style={styles.filtersRow}>
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>작업 상태</label>
              <CustomDropdown
                label=""
                options={['전체', '대기', '승인완료', '반려', '배포']}
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
              <label style={styles.filterLabel}>처리 시각</label>
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
              <label style={styles.filterLabel}>시작일</label>
              <input
                type="date"
                value={filters.시작일 || ''}
                onChange={(e) => handleFilter('시작일', e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>종료일</label>
              <input
                type="date"
                value={filters.종료일 || ''}
                onChange={(e) => handleFilter('종료일', e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                style={styles.dateInput}
              />
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
        </div>
      </div>

      {/* 테이블 */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>PR 번호</th>
              <th style={styles.th}>브랜치명</th>
              <th style={styles.th}>작업 상태</th>
              <th style={styles.th}>처리 시각</th>
              <th style={styles.th}>결과</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ ...styles.td, padding: '40px' }}>
                  로딩 중...
                </td>
              </tr>
            ) : pageData.length > 0 ? (
              pageData.map((pr) => (
                <tr
                  key={pr.id}
                  style={styles.tr(hoveredRow === pr.id)}
                  onMouseEnter={() => setHoveredRow(pr.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td
                    style={{
                      ...styles.td,
                      color: theme.colors.brand,
                      fontWeight: '500',
                    }}
                  >
                    {pr.id}
                  </td>
                  <td style={styles.td}>{pr.branch}</td>
                  <td style={styles.td}>{renderBadge(pr.status)}</td>
                  <td style={styles.td}>{pr.deployTime}</td>
                  <td style={styles.td}>
                    {renderResult(pr.status, pr.result)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...styles.td, padding: '40px' }}>
                  등록된 로그가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 0 && (
        <div style={styles.pagination}>
          <button
            style={styles.paginationArrow(
              currentPage === 1,
              hoveredPaginationBtn === 'prev',
            )}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            onMouseEnter={() => setHoveredPaginationBtn('prev')}
            onMouseLeave={() => setHoveredPaginationBtn(null)}
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

          <button
            style={styles.paginationArrow(currentPage === totalPages)}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            onMouseEnter={() => setHoveredPaginationBtn('next')}
            onMouseLeave={() => setHoveredPaginationBtn(null)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
