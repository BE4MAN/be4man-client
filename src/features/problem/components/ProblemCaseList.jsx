import { Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

import CustomSelect from '@/components/auth/CustomSelect';
import Badge from '@/components/common/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/common/Table';
import { mockProblems, mockRegistrants } from '@/mock/problem';

import * as S from './ProblemCaseList.styles';

const IMPORTANCE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'HIGH', label: '상' },
  { value: 'MEDIUM', label: '중' },
  { value: 'LOW', label: '하' },
];

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

export function ProblemCaseList({
  filterByType,
  selectedCaseId,
  onSelectCase,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [importanceFilter, setImportanceFilter] = useState('');

  // TODO: Step 4에서 카테고리 옵션을 ProblemTypeTree에서 가져오도록 변경
  const categoryOptions = [
    { value: '', label: '전체' },
    { value: '1', label: '배포 순서 오류' },
    { value: '2', label: '승인 프로세스 관련' },
    { value: '3', label: '설정 오류' },
    { value: '4', label: '롤백 실패' },
  ];

  const filteredProblems = useMemo(() => {
    return mockProblems.filter((problem) => {
      // 카테고리 필터
      if (filterByType) {
        if (problem.category.id !== Number(filterByType)) {
          return false;
        }
      } else if (categoryFilter) {
        if (problem.category.id !== Number(categoryFilter)) {
          return false;
        }
      }

      // 중요도 필터
      if (importanceFilter && problem.importance !== importanceFilter) {
        return false;
      }

      // 검색어 필터
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchText =
          `${problem.title} ${problem.category.title}`.toLowerCase();
        if (!searchText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [filterByType, categoryFilter, importanceFilter, searchQuery]);

  const handleRowClick = (problemId) => {
    onSelectCase(problemId);
  };

  return (
    <S.Container>
      <S.FilterBar>
        <S.FilterRow>
          <S.SearchInput>
            <Search size={16} />
            <S.SearchField
              type="text"
              placeholder="제목 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchInput>
          <S.FilterButton>
            <Filter size={16} />
            필터 추가
          </S.FilterButton>
        </S.FilterRow>

        <S.FilterRow>
          <CustomSelect
            options={categoryOptions}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
            placeholder="전체"
            size="sm"
          />
          <CustomSelect
            options={IMPORTANCE_OPTIONS}
            value={importanceFilter}
            onChange={(value) => setImportanceFilter(value)}
            placeholder="전체"
            size="sm"
          />
        </S.FilterRow>
      </S.FilterBar>

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
            {filteredProblems.map((problem, index) => {
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <S.TitleCell>{problem.title}</S.TitleCell>
                  </TableCell>
                  <TableCell>{problem.category.title}</TableCell>
                  <TableCell>-</TableCell>
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
    </S.Container>
  );
}
