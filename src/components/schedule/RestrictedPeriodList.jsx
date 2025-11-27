// 작성자 : 이원석
import { parseISO, compareAsc, format as formatDate } from 'date-fns';
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
import { getDurationInMinutes } from '@/features/schedule/utils/durationUtils';

import * as S from './RestrictedPeriodList.styles';

const ITEMS_PER_PAGE = 10;

export default function RestrictedPeriodList({ periods, onPeriodClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedPeriods = [...periods].sort((a, b) => {
    const dateA = parseISO(`${a.startDate}T${a.startTime}`);
    const dateB = parseISO(`${b.startDate}T${b.startTime}`);
    return compareAsc(dateA, dateB);
  });

  const getEndDateTimeLabel = (period) => {
    if (period.endedAt) {
      const ended = parseISO(period.endedAt);
      if (!Number.isNaN(ended.getTime())) {
        return formatDate(ended, 'yyyy-MM-dd HH:mm');
      }
    }
    if (period.startDate && period.startTime) {
      const start = parseISO(`${period.startDate}T${period.startTime}:00`);
      if (!Number.isNaN(start.getTime())) {
        const computed = new Date(start);
        const durationMinutes = getDurationInMinutes(period);
        if (durationMinutes > 0) {
          computed.setMinutes(computed.getMinutes() + durationMinutes);
          return formatDate(computed, 'yyyy-MM-dd HH:mm');
        }
      }
    }
    if (period.endDate || period.endTime) {
      return `${period.endDate || period.startDate} ${period.endTime || ''}`.trim();
    }
    return '—';
  };

  const totalPages = Math.ceil(sortedPeriods.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPeriods = sortedPeriods.slice(startIndex, endIndex);

  return (
    <>
      <S.Container>
        <Table>
          <TableHeader>
            <TableRow>
              <S.TableHeadOverride>제목</S.TableHeadOverride>
              <S.TableHeadOverride>유형</S.TableHeadOverride>
              <S.TableHeadOverride>시작일자</S.TableHeadOverride>
              <S.TableHeadOverride>종료일자</S.TableHeadOverride>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPeriods.map((period, index) => (
              <TableRow
                key={`${period.id}-${period.startDate}-${period.startTime}-${index}`}
                onClick={() => onPeriodClick(period)}
              >
                <TableCell>{period.title}</TableCell>
                <TableCell>{period.type}</TableCell>
                <S.TimeCell>
                  {period.startDate} {period.startTime}
                </S.TimeCell>
                <S.TimeCell>{getEndDateTimeLabel(period)}</S.TimeCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </S.Container>
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
    </>
  );
}
