// 작성자 : 김민호, 이원석
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import { useApprovalsQuery } from '../../../hooks/useApprovalQueries';
import { useAuthStore } from '../../../stores/authStore';
import { useUIStore } from '../../../stores/uiStore';

import * as S from './Approval.styles';

function toArray(x) {
  if (Array.isArray(x)) return x;
  if (!x) return [];
  if (Array.isArray(x.items)) return x.items;
  if (Array.isArray(x.data)) return x.data;
  if (Array.isArray(x.rows)) return x.rows;
  if (typeof x === 'object') return Object.values(x);
  return [];
}

function formatYmdHm(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${day} ${hh}:${mm}`;
}

function mapStatusEnumToLabel(status) {
  switch (status) {
    case 'DRAFT':
      return '임시저장';
    case 'PENDING':
      return '승인요청';
    case 'CANCELED':
      return '승인취소';
    case 'APPROVED':
      return '완료';
    case 'REJECTED':
      return '반려';
    default:
      return status || '-';
  }
}

function mapStatusLabelToEnum(label) {
  switch (label) {
    case '임시저장':
      return 'DRAFT';
    case '승인요청':
      return 'PENDING';
    case '승인취소':
      return 'CANCELED';
    case '완료':
      return 'APPROVED';
    case '반려':
      return 'REJECTED';
    case '전체':
    default:
      return undefined;
  }
}

function mapTypeEnumToLabel(type) {
  switch (type) {
    case 'PLAN':
      return '계획서';
    case 'DEPLOYMENT':
    case 'REPORT':
      return '결과보고';
    case 'RETRY':
      return '재배포';
    case 'ROLLBACK':
      return '복구';
    case 'DRAFT':
      return '임시저장';
    default:
      return type || '-';
  }
}

function mapSummaryToRow(item) {
  const statusLabel = mapStatusEnumToLabel(item.status);

  return {
    id: item.id,
    type: mapTypeEnumToLabel(item.type),
    title: item.title,
    serviceName: item.service || item.serviceName || '-',

    drafter: item.drafterName || item.drafter || '—',

    draftedAt: item.createdAt || item.draftedAt,

    nextApprover: item.nextApproverName || item.nextApprover || '—',

    updatedAt: item.approvedAt || item.rejectedAt || item.canceledAt || null,

    approvedAt: item.approvedAt || null,

    status: statusLabel,

    approval: {
      current: item.currentApprovalOrder || 0,
      total: item.totalApprovalCount || 1,
    },

    rejectedAt: item.rejectedAt,
    rejectedBy: item.rejectedBy,
    rejectedReason: item.rejectedReason,
    canceledAt: item.canceledAt,
    canceledBy: item.canceledBy,
    canceledReason: item.canceledReason,

    approvedBy: item.approvedBy,
    approvedReason: item.approvedReason,
  };
}

const STATUS_OPTIONS = [
  '전체',
  '임시저장',
  '승인요청',
  '승인취소',
  '완료',
  '반려',
];

const TYPE_OPTIONS = [
  '전체',
  '계획서',
  '결과보고',
  '임시저장',
  '재배포',
  '복구',
];

const SEARCH_FIELDS = [
  { key: 'ALL', label: '전체' },
  { key: 'title', label: '제목' },
  { key: 'serviceName', label: '서비스명' },
  { key: 'drafter', label: '기안자' },
  { key: 'nextApprover', label: '현재 승인자' },
];

export default function Approval({
  items: itemsProp,
  defaultPageSize = 10,
  onClickCreate,
  onClickDetail,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAuthStore((state) => state.user);
  const accountId = user?.accountId || user?.id;

  const headerService = useUIStore((s) => s.service);

  const [decisionRow, setDecisionRow] = useState(null);
  const closeDecision = useCallback(() => setDecisionRow(null), []);
  const openDecision = useCallback((e, row) => {
    e.stopPropagation();
    setDecisionRow(row);
  }, []);

  const [statusFilter, setStatusFilter] = useState('전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [drafterFilter, setDrafterFilter] = useState('전체');
  const [serviceFilter, setServiceFilter] = useState('전체');

  const ALL_PROJECTS_LABEL = '전체 프로젝트';

  const didMountRef = useRef(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!headerService || headerService === ALL_PROJECTS_LABEL) {
      setServiceFilter('전체');
    } else {
      setServiceFilter(headerService);
    }
    if (didMountRef.current) setPage(1);
  }, [headerService]);

  const [searchField, setSearchField] = useState('ALL');
  const [q, setQ] = useState('');

  const LAST_PAGE_KEY = 'approvals:lastPage';

  const [pageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(() => {
    const v = Number(searchParams.get('page') || 1);
    return Number.isFinite(v) && v > 0 ? v : 1;
  });

  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    if (sp.get('page') !== String(page)) {
      sp.set('page', String(page));
      setSearchParams(sp, { replace: true });
    }
    try {
      sessionStorage.setItem(LAST_PAGE_KEY, String(page));
    } catch {
      //
    }
  }, [page]);

  useEffect(() => {
    const hasPage = !!searchParams.get('page');
    if (!hasPage) {
      const saved = Number(sessionStorage.getItem(LAST_PAGE_KEY) || '0');
      if (Number.isFinite(saved) && saved > 0 && saved !== page) {
        setPage(saved);
      }
    }
  }, []);

  const [openType, setOpenType] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const dropdownRef = useRef(null);

  const backendStatus = useMemo(
    () => mapStatusLabelToEnum(statusFilter),
    [statusFilter],
  );

  const {
    data: approvalsData,
    isLoading,
    isError,
  } = useApprovalsQuery(accountId, backendStatus);

  // API 응답 로깅
  useEffect(() => {
    if (approvalsData) {
      console.log('[Approval List API] Response:', approvalsData);
      console.log(
        '[Approval List API] Response length:',
        Array.isArray(approvalsData)
          ? approvalsData.length
          : approvalsData?.data?.length || approvalsData?.items?.length || 0,
      );
      if (
        (Array.isArray(approvalsData) && approvalsData.length > 0) ||
        approvalsData?.data?.length > 0 ||
        approvalsData?.items?.length > 0
      ) {
        const firstItem = Array.isArray(approvalsData)
          ? approvalsData[0]
          : approvalsData?.data?.[0] || approvalsData?.items?.[0];
        console.log('[Approval List API] First item:', firstItem);
      }
    }
  }, [approvalsData]);

  const itemsArr = useMemo(() => {
    if (Array.isArray(approvalsData) && approvalsData.length > 0) {
      return approvalsData.map(mapSummaryToRow);
    }

    const arr = toArray(itemsProp);
    if (arr.length > 0) return arr;

    return [];
  }, [approvalsData, itemsProp]);

  const handleCreate = useCallback(() => {
    if (onClickCreate) return onClickCreate();
    navigate('/approval/new');
  }, [navigate, onClickCreate]);

  const handleRowClick = useCallback(
    (row) => {
      try {
        sessionStorage.setItem(LAST_PAGE_KEY, String(page));
      } catch {
        //
      }
      if (onClickDetail) return onClickDetail(row);
      navigate(`/approval/${row.id}`, {
        state: {
          ...row,
          backTo: { pathname: '/approvals', search: location.search },
        },
      });
    },
    [navigate, onClickDetail, location.search, page],
  );

  const rows = useMemo(
    () =>
      itemsArr.map((r) => {
        const cur = Number(r?.approval?.current ?? 0);
        const totRaw = Number(r?.approval?.total ?? 1);
        const tot = Number.isFinite(totRaw) && totRaw > 0 ? totRaw : 1;

        return {
          ...r,
          status: r.status,
          approval: { current: Math.min(cur, tot), total: tot },
        };
      }),
    [itemsArr],
  );

  useEffect(() => {
    function handleClickOutside(e) {
      const el = e.target;
      if (el.closest('[data-select-root="true"]')) return;

      setOpenType(false);
      setOpenStatus(false);
      setOpenSearch(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    const serviceKey =
      headerService && headerService !== ALL_PROJECTS_LABEL
        ? headerService
        : serviceFilter;

    const passStatus = (row) =>
      statusFilter === '전체' ? true : row.status === statusFilter;
    const passType = (row) =>
      typeFilter === '전체' ? true : row.type === typeFilter;
    const passDrafter = (row) =>
      drafterFilter === '전체' ? true : row.drafter === drafterFilter;
    const passService = (row) =>
      serviceKey === '전체' ? true : row.serviceName === serviceKey;
    const passSearch = (row) => {
      if (!text) return true;
      if (searchField === 'ALL') {
        const hay = [
          row.id,
          row.type,
          row.title,
          row.serviceName,
          row.drafter,
          row.nextApprover,
          row.draftedAt,
          row.updatedAt,
          row.status,
          `${row?.approval?.current ?? ''}/${row?.approval?.total ?? ''}`,
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(text);
      }
      const v = (row?.[searchField] ?? '').toString().toLowerCase();
      return v.includes(text);
    };

    return rows.filter(
      (r) =>
        passStatus(r) &&
        passType(r) &&
        passDrafter(r) &&
        passService(r) &&
        passSearch(r),
    );
  }, [
    rows,
    statusFilter,
    typeFilter,
    drafterFilter,
    serviceFilter,
    searchField,
    headerService,
    q,
  ]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = isLoading ? page : Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const hasFetchedOnceRef = useRef(false);
  useEffect(() => {
    if (!isLoading) {
      hasFetchedOnceRef.current = true;
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && hasFetchedOnceRef.current) {
      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [isLoading, totalPages, page]);

  useEffect(() => {
    didMountRef.current = true;
  }, []);

  const pageWindow = useMemo(() => {
    if (totalPages <= 9)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
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
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
    }
    return out;
  }, [safePage, totalPages]);

  useEffect(() => {
    const v = Number(searchParams.get('page') || 1);
    if (Number.isFinite(v) && v > 0 && v !== page) {
      setPage(v);
    }
  }, [searchParams]);

  const resetFilter = () => {
    setStatusFilter('전체');
    setTypeFilter('전체');
    setDrafterFilter('전체');
    setServiceFilter('전체');
    setSearchField('ALL');
    setQ('');
    setPage(1);
  };

  const decisionLabels = decisionRow
    ? (() => {
        const status = decisionRow.status;

        const actor =
          decisionRow.rejectedBy ||
          decisionRow.canceledBy ||
          decisionRow.approvedBy ||
          decisionRow.nextApprover ||
          '—';

        const dateValue =
          decisionRow.rejectedAt ||
          decisionRow.canceledAt ||
          decisionRow.approvedAt ||
          decisionRow.updatedAt ||
          null;

        const date = dateValue ? formatYmdHm(dateValue) : '-';

        const commentRaw =
          decisionRow.rejectedReason ||
          decisionRow.canceledReason ||
          decisionRow.approvedReason ||
          '';

        if (status === '반려') {
          return {
            title: '반려',
            actorLabel: '반려자',
            dateLabel: '반려일',
            actor,
            date,
            comment: commentRaw || '반려 사유가 제공되지 않았습니다.',
          };
        }

        if (status === '승인취소') {
          return {
            title: '취소',
            actorLabel: '취소자',
            dateLabel: '취소일',
            actor,
            date,
            comment: commentRaw || '취소 사유가 제공되지 않았습니다.',
          };
        }

        return {
          title: '승인',
          actorLabel: '승인자',
          dateLabel: '승인일',
          actor,
          date,
          comment: commentRaw || '승인 사유가 제공되지 않았습니다.',
        };
      })()
    : null;

  useEffect(() => {
    return () => {
      try {
        window.scrollTo(0, 0);
        document.scrollingElement?.scrollTo(0, 0);
        if (panelRef.current) panelRef.current.scrollTop = 0;
      } catch {
        //
      }
    };
  }, []);

  return (
    <S.Wrap>
      <S.TopBar>
        <S.PrimaryBtn type="button" onClick={handleCreate}>
          등록
        </S.PrimaryBtn>
      </S.TopBar>

      <S.FilterCard ref={dropdownRef}>
        <S.FilterRow>
          <S.FilterLabel>검색옵션</S.FilterLabel>
          <S.FilterSelectWrap>
            <S.CustomSelect data-select-root="true">
              <S.CustomSelectBtn onClick={() => setOpenType((p) => !p)}>
                {typeFilter}
                <span>▾</span>
              </S.CustomSelectBtn>
              {openType && (
                <S.CustomSelectList>
                  {TYPE_OPTIONS.map((o) => (
                    <S.CustomSelectItem
                      key={o}
                      onClick={() => {
                        setTypeFilter(o);
                        setPage(1);
                        setOpenType(false);
                      }}
                    >
                      {o}
                    </S.CustomSelectItem>
                  ))}
                </S.CustomSelectList>
              )}
            </S.CustomSelect>

            <S.CustomSelect data-select-root="true">
              <S.CustomSelectBtn onClick={() => setOpenStatus((p) => !p)}>
                {statusFilter}
                <span>▾</span>
              </S.CustomSelectBtn>
              {openStatus && (
                <S.CustomSelectList>
                  {STATUS_OPTIONS.map((o) => (
                    <S.CustomSelectItem
                      key={o}
                      onClick={() => {
                        setStatusFilter(o);
                        setPage(1);
                        setOpenStatus(false);
                      }}
                    >
                      {o}
                    </S.CustomSelectItem>
                  ))}
                </S.CustomSelectList>
              )}
            </S.CustomSelect>
            <S.ResetBtn type="button" onClick={resetFilter}>
              필터 초기화
            </S.ResetBtn>
          </S.FilterSelectWrap>
        </S.FilterRow>

        <S.FilterRow>
          <S.FilterLabel>검색명</S.FilterLabel>
          <S.SearchRow>
            <S.CustomSelect data-select-root="true" style={{ minWidth: 140 }}>
              <S.CustomSelectBtn onClick={() => setOpenSearch((p) => !p)}>
                {SEARCH_FIELDS.find((f) => f.key === searchField)?.label ??
                  '전체'}
                <span>▾</span>
              </S.CustomSelectBtn>
              {openSearch && (
                <S.CustomSelectList>
                  {SEARCH_FIELDS.map((f) => (
                    <S.CustomSelectItem
                      key={f.key}
                      onClick={() => {
                        setSearchField(f.key);
                        setPage(1);
                        setOpenSearch(false);
                      }}
                    >
                      {f.label}
                    </S.CustomSelectItem>
                  ))}
                </S.CustomSelectList>
              )}
            </S.CustomSelect>
            <S.Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="검색어를 입력해 주세요."
            />
            <S.SearchBtn type="button" onClick={() => setPage(1)}>
              검색
            </S.SearchBtn>
          </S.SearchRow>
        </S.FilterRow>
      </S.FilterCard>

      <S.Panel ref={panelRef}>
        {isError && (
          <div style={{ padding: 16, color: 'red' }}>
            결재 목록을 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        <S.Table role="table" aria-label="결재함 목록">
          <S.Head role="rowgroup">
            <S.Tr role="row">
              <S.Th role="columnheader" style={{ width: 72 }}>
                번호
              </S.Th>
              <S.Th role="columnheader" style={{ width: 96 }}>
                유형
              </S.Th>
              <S.Th role="columnheader">제목</S.Th>
              <S.Th role="columnheader" style={{ width: 140 }}>
                서비스명
              </S.Th>
              <S.Th role="columnheader" style={{ width: 110 }}>
                기안자
              </S.Th>
              <S.Th role="columnheader" style={{ width: 180 }}>
                기안일
              </S.Th>
              <S.Th role="columnheader" style={{ width: 110 }}>
                승인 상태
              </S.Th>
              <S.Th role="columnheader" style={{ width: 130 }}>
                승인 예정자
              </S.Th>
              <S.Th role="columnheader" style={{ width: 180 }}>
                결재일
              </S.Th>
            </S.Tr>
          </S.Head>

          <S.Body role="rowgroup">
            {isLoading ? (
              <S.Tr role="row">
                <S.Td role="cell" colSpan={9}>
                  불러오는 중...
                </S.Td>
              </S.Tr>
            ) : pageItems.length === 0 ? (
              <S.Tr role="row">
                <S.Td role="cell" colSpan={9}>
                  조건에 맞는 항목이 없습니다.
                </S.Td>
              </S.Tr>
            ) : (
              pageItems.map((r, idx) => {
                const isDraftType =
                  r.status === '임시저장' || r.status === 'DRAFT';

                return (
                  <S.Tr
                    role="row"
                    key={`${r.id}-${idx}`}
                    onClick={() => handleRowClick(r)}
                  >
                    <S.Td role="cell">{r.id}</S.Td>
                    <S.Td role="cell">{r.type}</S.Td>
                    <S.Td role="cell">
                      <S.Title>{r.title}</S.Title>
                    </S.Td>
                    <S.Td role="cell">{r.serviceName}</S.Td>
                    <S.Td role="cell">{r.drafter}</S.Td>

                    <S.Td role="cell">
                      {isDraftType
                        ? '임시저장'
                        : r.draftedAt
                          ? formatYmdHm(r.draftedAt)
                          : '-'}
                    </S.Td>

                    <S.Td
                      role="cell"
                      data-nopointer
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isDraftType ? (
                        '-'
                      ) : r.status === '반려' ? (
                        <S.StatusBtn
                          data-variant="danger"
                          type="button"
                          onClick={(e) => openDecision(e, r)}
                          aria-label="반려 사유 보기"
                          title="반려 사유 보기"
                        >
                          반려
                        </S.StatusBtn>
                      ) : r.status === '승인취소' ? (
                        <S.StatusBtn
                          data-variant="warning"
                          type="button"
                          onClick={(e) => openDecision(e, r)}
                          aria-label="취소 사유 보기"
                          title="취소 사유 보기"
                        >
                          취소
                        </S.StatusBtn>
                      ) : r.status === '완료' ? (
                        <S.StatusBtn
                          data-variant="success"
                          type="button"
                          onClick={(e) => openDecision(e, r)}
                          aria-label="승인 사유 보기"
                          title="승인 사유 보기"
                        >
                          완료
                        </S.StatusBtn>
                      ) : (
                        <S.ApproveWrap>대기</S.ApproveWrap>
                      )}
                    </S.Td>

                    <S.Td role="cell">
                      {isDraftType
                        ? '-'
                        : r.status === '완료'
                          ? '완료'
                          : r.nextApprover}
                    </S.Td>

                    <S.Td role="cell">
                      {isDraftType
                        ? '-'
                        : r.updatedAt
                          ? formatYmdHm(r.updatedAt)
                          : '-'}
                    </S.Td>
                  </S.Tr>
                );
              })
            )}
          </S.Body>
        </S.Table>
      </S.Panel>

      {decisionRow && decisionLabels && (
        <S.ModalOverlay onClick={closeDecision} role="dialog" aria-modal="true">
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>{decisionLabels.title}</S.ModalTitle>
            </S.ModalHeader>
            <S.ModalBody>
              <S.Card>
                <S.KV>
                  <S.K>{decisionLabels.actorLabel}</S.K>
                  <S.V>{decisionLabels.actor}</S.V>
                  <S.K>{decisionLabels.dateLabel}</S.K>
                  <S.V>{decisionLabels.date}</S.V>
                </S.KV>

                {decisionRow.status !== '승인취소' && (
                  <>
                    <S.Dashed />
                    <S.ReasonScroll>
                      <S.ReasonBox>{decisionLabels.comment}</S.ReasonBox>
                    </S.ReasonScroll>
                  </>
                )}
              </S.Card>
            </S.ModalBody>
            <S.ModalActions>
              <S.PrimaryBtn type="button" onClick={closeDecision}>
                닫기
              </S.PrimaryBtn>
            </S.ModalActions>
          </S.Modal>
        </S.ModalOverlay>
      )}

      <S.Pagination role="navigation" aria-label="페이지네이션">
        <S.PageInfo>
          총 {total}개 · {safePage}/{totalPages}페이지
        </S.PageInfo>
        <S.PageBtns>
          <S.PageBtn onClick={() => setPage(1)} disabled={safePage === 1}>
            «
          </S.PageBtn>
          <S.PageBtn
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                data-active={n === safePage || undefined}
                aria-current={n === safePage ? 'page' : undefined}
                onClick={() => setPage(n)}
              >
                {n}
              </S.PageBtn>
            ),
          )}
          <S.PageBtn
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
          >
            ›
          </S.PageBtn>
          <S.PageBtn
            onClick={() => setPage(totalPages)}
            disabled={safePage === totalPages}
          >
            »
          </S.PageBtn>
        </S.PageBtns>
      </S.Pagination>
    </S.Wrap>
  );
}
