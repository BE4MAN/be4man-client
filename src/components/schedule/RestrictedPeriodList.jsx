import { parseISO, compareAsc } from 'date-fns';
import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/common/Pagination';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/common/Table';

import * as S from './RestrictedPeriodList.styles';

const ITEMS_PER_PAGE = 5;

export default function RestrictedPeriodList({ periods, onPeriodClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedPeriods = [...periods].sort((a, b) => {
    const dateA = parseISO(`${a.startDate}T${a.startTime}`);
    const dateB = parseISO(`${b.startDate}T${b.startTime}`);
    return compareAsc(dateA, dateB);
  });

  const totalPages = Math.ceil(sortedPeriods.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPeriods = sortedPeriods.slice(startIndex, endIndex);

  return (
    <S.Container>
      <Table>
        <TableHeader>
          <TableRow>
            <S.TableHeadOverride>제목</S.TableHeadOverride>
            <S.TableHeadOverride>유형</S.TableHeadOverride>
            <S.TableHeadOverride>시작</S.TableHeadOverride>
            <S.TableHeadOverride>종료</S.TableHeadOverride>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPeriods.map((period) => (
            <TableRow key={period.id} onClick={() => onPeriodClick(period)}>
              <TableCell>{period.title}</TableCell>
              <TableCell>{period.type}</TableCell>
              <S.TimeCell>
                {period.startDate} {period.startTime}
              </S.TimeCell>
              <S.TimeCell>
                {period.endDate} {period.endTime}
              </S.TimeCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
