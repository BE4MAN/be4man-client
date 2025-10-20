// src/features/log/pages/LogManagement.jsx
import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';

import { getStyles } from './LogManagement.style';

const mockData = [
  {
    id: '#247',
    branch: 'feature/auth-improvements',
    status: 'Deployed',
    deployTime: '2025.07.25 14:32',
    result: 'Success',
  },
  {
    id: '#246',
    branch: 'feature/ui-update',
    status: 'Deployed',
    deployTime: '2025.07.24 19:20',
    result: 'Failed',
  },
  {
    id: '#245',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.24 10:51',
    result: 'Success',
  },
  {
    id: '#244',
    branch: 'feature/auth-improvements',
    status: 'Rejected',
    deployTime: '2025.07.24 09:02',
    result: null,
  },
  {
    id: '#243',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.22 14:15',
    result: null,
  },
  {
    id: '#242',
    branch: 'feature/auth-improvements',
    status: 'Deployed',
    deployTime: '2025.07.20 17:25',
    result: 'Failed',
  },
  {
    id: '#241',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.18 15:42',
    result: 'Success',
  },
  {
    id: '#240',
    branch: 'feature/api-v2',
    status: 'Approved',
    deployTime: '2025.07.14 14:22',
    result: null,
  },
  {
    id: '#239',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.18 15:42',
    result: 'Success',
  },
  {
    id: '#238',
    branch: 'feature/api-v2',
    status: 'Approved',
    deployTime: '2025.07.14 14:22',
    result: null,
  },
  {
    id: '#237',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.18 15:42',
    result: 'Success',
  },
  {
    id: '#236',
    branch: 'feature/ui-update',
    status: 'Deployed',
    deployTime: '2025.07.10 14:20',
    result: 'Failed',
  },
  {
    id: '#235',
    branch: 'feature/auth-improvements',
    status: 'Deployed',
    deployTime: '2025.07.12 12:20',
    result: 'Success',
  },
  {
    id: '#234',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.24 18:12',
    result: null,
  },
  {
    id: '#233',
    branch: 'feature/api-v2',
    status: 'Rejected',
    deployTime: '2025.07.21 10:15',
    result: null,
  },
  {
    id: '#232',
    branch: 'develop',
    status: 'Pending',
    deployTime: '2025.07.24 19:12',
    result: null,
  },
  {
    id: '#231',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.22 12:12',
    result: null,
  },
  {
    id: '#230',
    branch: 'feature/auth-improvements',
    status: 'Rejected',
    deployTime: '2025.07.23 10:30',
    result: null,
  },
  {
    id: '#229',
    branch: 'hotfix/db-fix',
    status: 'Pending',
    deployTime: '2025.07.22 16:20',
    result: null,
  },
  {
    id: '#228',
    branch: 'feature/api-v2',
    status: 'Deployed',
    deployTime: '2025.07.24 13:12',
    result: 'Failed',
  },
  {
    id: '#227',
    branch: 'develop',
    status: 'Pending',
    deployTime: '2025.07.11 13:20',
    result: null,
  },
  {
    id: '#226',
    branch: 'feature/ui-update',
    status: 'Deployed',
    deployTime: '2025.07.23 09:12',
    result: 'Failed',
  },
  {
    id: '#225',
    branch: 'feature/auth-improvements',
    status: 'Pending',
    deployTime: '2025.07.13 12:25',
    result: null,
  },
  {
    id: '#224',
    branch: 'hotfix/db-fix',
    status: 'Pending',
    deployTime: '2025.07.06 12:30',
    result: null,
  },
  {
    id: '#223',
    branch: 'feature/api-v2',
    status: 'Pending',
    deployTime: '2025.07.21 14:25',
    result: null,
  },
  {
    id: '#222',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.14 12:25',
    result: null,
  },
  {
    id: '#221',
    branch: 'feature/ui-update',
    status: 'Approved',
    deployTime: '2025.07.20 15:30',
    result: null,
  },
  {
    id: '#220',
    branch: 'feature/auth-improvements',
    status: 'Pending',
    deployTime: '2025.07.16 11:20',
    result: null,
  },
  {
    id: '#219',
    branch: 'hotfix/db-fix',
    status: 'Pending',
    deployTime: '2025.07.13 16:25',
    result: null,
  },
  {
    id: '#218',
    branch: 'feature/api-v2',
    status: 'Deployed',
    deployTime: '2025.07.07 17:30',
    result: 'Success',
  },
  {
    id: '#217',
    branch: 'develop',
    status: 'Rejected',
    deployTime: '2025.07.18 11:12',
    result: null,
  },
  {
    id: '#216',
    branch: 'feature/ui-update',
    status: 'Rejected',
    deployTime: '2025.07.18 13:20',
    result: null,
  },
  {
    id: '#215',
    branch: 'feature/auth-improvements',
    status: 'Pending',
    deployTime: '2025.07.13 16:20',
    result: null,
  },
  {
    id: '#214',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.13 13:12',
    result: null,
  },
  {
    id: '#213',
    branch: 'feature/api-v2',
    status: 'Rejected',
    deployTime: '2025.07.16 10:20',
    result: null,
  },
  {
    id: '#212',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.23 19:20',
    result: null,
  },
  {
    id: '#211',
    branch: 'feature/ui-update',
    status: 'Rejected',
    deployTime: '2025.07.11 15:25',
    result: null,
  },
  {
    id: '#210',
    branch: 'feature/auth-improvements',
    status: 'Pending',
    deployTime: '2025.07.12 15:12',
    result: null,
  },
  {
    id: '#209',
    branch: 'hotfix/db-fix',
    status: 'Rejected',
    deployTime: '2025.07.24 10:30',
    result: null,
  },
  {
    id: '#208',
    branch: 'feature/api-v2',
    status: 'Approved',
    deployTime: '2025.07.16 15:12',
    result: null,
  },
  {
    id: '#207',
    branch: 'develop',
    status: 'Approved',
    deployTime: '2025.07.09 11:25',
    result: null,
  },
  {
    id: '#206',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.20 17:15',
    result: null,
  },
  {
    id: '#205',
    branch: 'feature/auth-improvements',
    status: 'Approved',
    deployTime: '2025.07.19 13:12',
    result: null,
  },
  {
    id: '#204',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.17 09:12',
    result: null,
  },
  {
    id: '#203',
    branch: 'feature/api-v2',
    status: 'Pending',
    deployTime: '2025.07.17 15:30',
    result: null,
  },
  {
    id: '#202',
    branch: 'develop',
    status: 'Rejected',
    deployTime: '2025.07.22 11:20',
    result: null,
  },
  {
    id: '#201',
    branch: 'feature/ui-update',
    status: 'Approved',
    deployTime: '2025.07.25 17:15',
    result: null,
  },
  {
    id: '#200',
    branch: 'feature/auth-improvements',
    status: 'Approved',
    deployTime: '2025.07.12 13:12',
    result: null,
  },
  {
    id: '#199',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.20 17:30',
    result: null,
  },
  {
    id: '#198',
    branch: 'feature/api-v2',
    status: 'Deployed',
    deployTime: '2025.07.23 13:15',
    result: 'Failed',
  },
  {
    id: '#197',
    branch: 'develop',
    status: 'Rejected',
    deployTime: '2025.07.23 18:12',
    result: null,
  },
  {
    id: '#196',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.13 09:15',
    result: null,
  },
  {
    id: '#195',
    branch: 'feature/auth-improvements',
    status: 'Rejected',
    deployTime: '2025.07.14 10:30',
    result: null,
  },
  {
    id: '#194',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.23 13:30',
    result: null,
  },
  {
    id: '#193',
    branch: 'feature/api-v2',
    status: 'Rejected',
    deployTime: '2025.07.09 19:25',
    result: null,
  },
  {
    id: '#192',
    branch: 'develop',
    status: 'Approved',
    deployTime: '2025.07.23 10:12',
    result: null,
  },
  {
    id: '#191',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.19 16:12',
    result: null,
  },
  {
    id: '#190',
    branch: 'feature/auth-improvements',
    status: 'Approved',
    deployTime: '2025.07.24 17:20',
    result: null,
  },
  {
    id: '#189',
    branch: 'hotfix/db-fix',
    status: 'Approved',
    deployTime: '2025.07.11 19:15',
    result: null,
  },
  {
    id: '#188',
    branch: 'feature/api-v2',
    status: 'Pending',
    deployTime: '2025.07.09 12:12',
    result: null,
  },
  {
    id: '#187',
    branch: 'develop',
    status: 'Approved',
    deployTime: '2025.07.17 17:25',
    result: null,
  },
  {
    id: '#186',
    branch: 'feature/ui-update',
    status: 'Pending',
    deployTime: '2025.07.15 18:30',
    result: null,
  },
  {
    id: '#185',
    branch: 'feature/auth-improvements',
    status: 'Deployed',
    deployTime: '2025.07.09 18:12',
    result: 'Failed',
  },
  {
    id: '#184',
    branch: 'hotfix/db-fix',
    status: 'Deployed',
    deployTime: '2025.07.13 13:30',
    result: 'Success',
  },
  {
    id: '#183',
    branch: 'feature/api-v2',
    status: 'Approved',
    deployTime: '2025.07.19 17:30',
    result: null,
  },
  {
    id: '#182',
    branch: 'develop',
    status: 'Deployed',
    deployTime: '2025.07.23 09:30',
    result: 'Success',
  },
  {
    id: '#181',
    branch: 'feature/ui-update',
    status: 'Approved',
    deployTime: '2025.07.24 15:30',
    result: null,
  },
  {
    id: '#180',
    branch: 'feature/auth-improvements',
    status: 'Approved',
    deployTime: '2025.07.08 15:20',
    result: null,
  },
];

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

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    승인여부: '전체',
    결과: '전체',
    순서: '최신순',
    시작일: '',
    종료일: '',
  });
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Hover states
  const [filterBtnHovered, setFilterBtnHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [clearBtnHovered, setClearBtnHovered] = useState(false);
  const [resetBtnHovered, setResetBtnHovered] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredPaginationBtn, setHoveredPaginationBtn] = useState(null);

  const styles = getStyles(theme);

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
      승인여부: '전체',
      결과: '전체',
      순서: '최신순',
      시작일: '',
      종료일: '',
    });
    setSortOrder('desc');
  };

  // 영어 → 한글 매핑
  const STATUS_LABEL = {
    Pending: '대기',
    Approved: '승인완료',
    Rejected: '반려',
    Deployed: '배포',
  };

  const RESULT_LABEL = {
    Success: '성공',
    Failed: '실패',
  };

  // 필터링 로직 (한글 기반)
  const filteredData = mockData
    .filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase());

      // 승인여부 필터링 (영어 → 한글 변환)
      const statusLabel = STATUS_LABEL[item.status];
      const matchesStatus =
        filters.승인여부 === '전체' || statusLabel === filters.승인여부;

      // 결과 필터링 (영어 → 한글 변환)
      const resultLabel = item.result ? RESULT_LABEL[item.result] : null;
      const matchesResult =
        filters.결과 === '전체' || resultLabel === filters.결과;

      const itemDate = new Date(item.deployTime.replace(/\./g, '-'));
      const matchesStartDate =
        !filters.시작일 || itemDate >= new Date(filters.시작일);
      const matchesEndDate =
        !filters.종료일 || itemDate <= new Date(filters.종료일 + ' 23:59:59');

      return (
        matchesSearch &&
        matchesStatus &&
        matchesResult &&
        matchesStartDate &&
        matchesEndDate
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.deployTime.replace(/\./g, '-'));
      const dateB = new Date(b.deployTime.replace(/\./g, '-'));
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filteredData.slice(start, start + PAGE_SIZE);

  const renderBadge = (text, type) => {
    const label =
      type === 'status'
        ? STATUS_LABEL[text] || text
        : RESULT_LABEL[text] || text;
    return <span style={styles.badge(type, text)}>{label}</span>;
  };

  const renderResult = (status, result) => {
    if (status === 'Deployed' && result) {
      return renderBadge(result, 'result');
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
        {/* 상단: 필터 버튼 + 검색 바 */}
        <div style={styles.topControls}>
          <button
            style={styles.filterToggleButton(showFilters, filterBtnHovered)}
            onClick={() => setShowFilters(!showFilters)}
            onMouseEnter={() => setFilterBtnHovered(true)}
            onMouseLeave={() => setFilterBtnHovered(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 4.5h14M5 9h8M7.5 13.5h3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            필터
            <svg
              style={styles.toggleArrow(showFilters)}
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

        {/* 필터 패널 (인라인 방식) */}
        <div style={styles.filtersPanel(showFilters)}>
          <div style={styles.filtersRow}>
            {/* 승인 여부 - 한글 옵션으로 변경 */}
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>승인여부</label>
              <CustomDropdown
                label=""
                options={['전체', '대기', '승인완료', '반려', '배포']}
                value={filters.승인여부}
                onChange={(val) => handleFilter('승인여부', val)}
              />
            </div>

            {/* 결과 - 한글 옵션으로 변경 */}
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>결과</label>
              <CustomDropdown
                label=""
                options={['전체', '성공', '실패']}
                value={filters.결과}
                onChange={(val) => handleFilter('결과', val)}
              />
            </div>

            {/* 배포 시간 정렬 - 새로 추가 */}
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>배포 시간</label>
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

            {/* 날짜 범위 */}
            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>시작일</label>
              <input
                type="date"
                value={filters.시작일}
                onChange={(e) => handleFilter('시작일', e.target.value)}
                style={styles.dateInput}
                placeholder="연도-월-일"
              />
            </div>

            <div style={styles.filterRowItem}>
              <label style={styles.filterLabel}>종료일</label>
              <input
                type="date"
                value={filters.종료일}
                onChange={(e) => handleFilter('종료일', e.target.value)}
                style={styles.dateInput}
                placeholder="연도-월-일"
              />
            </div>

            {/* 초기화 버튼 */}
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
              <th style={styles.th}>승인 여부</th>
              <th style={styles.th}>배포 시간</th>
              <th style={styles.th}>결과</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
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
                  <td style={styles.td}>{renderBadge(pr.status, 'status')}</td>
                  <td style={styles.td}>{pr.deployTime}</td>
                  <td style={styles.td}>
                    {renderResult(pr.status, pr.result)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...styles.td, padding: '40px' }}>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={styles.pagination}>
        {/* 왼쪽 화살표 */}
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

        {/* 페이지 번호 계산 (최대 5개만 표시) */}
        {(() => {
          const maxVisible = 5;
          let startPage = Math.max(1, currentPage - 2);
          let endPage = Math.min(totalPages, startPage + maxVisible - 1);

          // 끝에서 5개 미만일 때 보정
          if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
          }

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

        {/* 오른쪽 화살표 */}
        <button
          style={styles.paginationArrow(
            start + PAGE_SIZE >= filteredData.length,
            hoveredPaginationBtn === 'next',
          )}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={start + PAGE_SIZE >= filteredData.length}
          onMouseEnter={() => setHoveredPaginationBtn('next')}
          onMouseLeave={() => setHoveredPaginationBtn(null)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
