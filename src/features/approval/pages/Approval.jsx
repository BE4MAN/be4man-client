import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Approval.styles';

const MOCK = [
  {
    id: 301,
    type: '계획서',
    title: '유저 서비스 배포 계획서 상신',
    serviceName: '유저 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-25T14:32:00+09:00',
    currentApprover: '이원석',
    approvedAt: null,
    status: '승인요청',
  },
  {
    id: 302,
    type: '결과보고',
    title: '결제 서비스 배포 결과 보고서 상신',
    serviceName: '결제 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-24T19:20:00+09:00',
    currentApprover: '—',
    approvedAt: '2025-07-25T14:32:00+09:00',
    status: '완료',
  },
  {
    id: 303,
    type: '계획서',
    title: '정산 서비스 배포 계획',
    serviceName: '정산 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-23T10:00:00+09:00',
    currentApprover: '박지훈',
    approvedAt: null,
    status: '반려',
    rejectedAt: '2025-07-24T11:02:00+09:00',
    rejectedBy: '박지훈',
    rejectedReason:
      '성수기 거래량 증가 기간. 모니터링/롤백 전략 보강 후 재상신 바랍니다.',
  },
  {
    id: 304,
    type: '결과보고',
    title: '검색 서비스 롤백 보고서',
    serviceName: '검색 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-26T08:40:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '승인취소',
    canceledAt: '2025-07-26T09:10:00+09:00',
    canceledBy: '관리자',
    canceledReason: '신규 증빙 누락으로 승인 절차 취소 처리되었습니다.',
  },
  {
    id: 305,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 306,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 307,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 308,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 309,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 310,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 311,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
  {
    id: 312,
    type: '계획서',
    title: '푸시 서비스 핫픽스 계획',
    serviceName: '푸시 서비스',
    drafter: '김민호',
    draftedAt: '2025-07-27T12:10:00+09:00',
    approval: { current: 0, total: 2 },
    currentApprover: '-',
    approvedAt: null,
    status: '임시저장',
  },
];

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

const STATUS_OPTIONS = [
  '전체',
  '임시저장',
  '승인요청',
  '승인취소',
  '완료',
  '반려',
];
const TYPE_OPTIONS = ['전체', '계획서', '결과보고'];
const SEARCH_FIELDS = [
  { key: 'ALL', label: '전체' },
  { key: 'title', label: '제목' },
  { key: 'serviceName', label: '서비스명' },
  { key: 'drafter', label: '기안자' },
  { key: 'currentApprover', label: '현재 승인자' },
];

export default function Approval({
  items: itemsProp,
  useMockWhenEmpty = true,
  defaultPageSize = 10,
  onClickCreate,
  onClickDetail,
}) {
  const navigate = useNavigate();

  const [decisionRow, setDecisionRow] = useState(null);
  const closeDecision = useCallback(() => setDecisionRow(null), []);
  const openDecision = useCallback((e, row) => {
    e.stopPropagation();
    setDecisionRow(row);
  }, []);

  const itemsArr = useMemo(() => {
    const arr = toArray(itemsProp);
    return arr.length === 0 && useMockWhenEmpty ? MOCK : arr;
  }, [itemsProp, useMockWhenEmpty]);

  const handleCreate = useCallback(() => {
    if (onClickCreate) return onClickCreate();
    navigate('/approval/new');
  }, [navigate, onClickCreate]);

  const handleRowClick = useCallback(
    (row) => {
      if (onClickDetail) return onClickDetail(row);
      navigate(`/approval/${row.id}`, { state: row });
    },
    [navigate, onClickDetail],
  );

  const rows = useMemo(
    () =>
      itemsArr.map((r) => {
        const cur = Number(r?.approval?.current ?? 0);
        const totRaw = Number(r?.approval?.total ?? 1);
        const tot = Number.isFinite(totRaw) && totRaw > 0 ? totRaw : 1;
        let status = r.status;
        if (!status) {
          if (r.rejectedAt) status = '반려';
          else if (r.canceledAt) status = '승인취소';
          else if (r.approvedAt || cur >= tot) status = '완료';
          else if (r?.draftedAt) status = '승인요청';
          else status = '승인요청';
        }
        return {
          ...r,
          status,
          approval: { current: Math.min(cur, tot), total: tot },
        };
      }),
    [itemsArr],
  );

  const [statusFilter, setStatusFilter] = useState('전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [drafterFilter, setDrafterFilter] = useState('전체');
  const [serviceFilter, setServiceFilter] = useState('전체');

  const [searchField, setSearchField] = useState('ALL');
  const [q, setQ] = useState('');

  const [pageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);

  const [openType, setOpenType] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const dropdownRef = useRef(null);

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
    const passStatus = (row) =>
      statusFilter === '전체' ? true : row.status === statusFilter;
    const passType = (row) =>
      typeFilter === '전체' ? true : row.type === typeFilter;
    const passDrafter = (row) =>
      drafterFilter === '전체' ? true : row.drafter === drafterFilter;
    const passService = (row) =>
      serviceFilter === '전체' ? true : row.serviceName === serviceFilter;
    const passSearch = (row) => {
      if (!text) return true;
      if (searchField === 'ALL') {
        const hay = [
          row.id,
          row.type,
          row.title,
          row.serviceName,
          row.drafter,
          row.currentApprover,
          row.draftedAt,
          row.approvedAt,
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
    q,
  ]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [
    statusFilter,
    typeFilter,
    drafterFilter,
    serviceFilter,
    searchField,
    q,
    pageSize,
  ]);

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

  const resetFilter = () => {
    setStatusFilter('전체');
    setTypeFilter('전체');
    setDrafterFilter('전체');
    setServiceFilter('전체');
    setSearchField('ALL');
    setQ('');
  };

  return (
    <S.Wrap>
      <S.TopBar>
        <S.Breadcrumb>결재함</S.Breadcrumb>
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

      <S.Panel>
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
            {pageItems.length === 0 ? (
              <S.Tr role="row">
                <S.Td role="cell" colSpan={9}>
                  조건에 맞는 항목이 없습니다.
                </S.Td>
              </S.Tr>
            ) : (
              pageItems.map((r, idx) => (
                <S.Tr
                  role="row"
                  key={`${r.id}-${idx}`}
                  onClick={() => handleRowClick(r)}
                >
                  <S.Td role="cell">
                    <S.LinkLike
                      href={`/approval/${r.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRowClick(r);
                      }}
                    >
                      {r.id}
                    </S.LinkLike>
                  </S.Td>
                  <S.Td role="cell">{r.type}</S.Td>
                  <S.Td role="cell">
                    <S.Title>{r.title}</S.Title>
                  </S.Td>
                  <S.Td role="cell">{r.serviceName}</S.Td>
                  <S.Td role="cell">{r.drafter}</S.Td>
                  <S.Td role="cell">
                    {r.status === '임시저장'
                      ? '임시저장'
                      : formatYmdHm(r.draftedAt)}
                  </S.Td>
                  <S.Td
                    role="cell"
                    data-nopointer
                    onClick={(e) => e.stopPropagation()}
                  >
                    {r.status === '임시저장' ? (
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
                      '완료'
                    ) : (
                      <S.ApproveWrap>대기</S.ApproveWrap>
                    )}
                  </S.Td>
                  <S.Td role="cell">
                    {r.status === '완료' ? '완료' : r.currentApprover}
                  </S.Td>
                  <S.Td role="cell">
                    {r.approvedAt ? formatYmdHm(r.approvedAt) : '-'}
                  </S.Td>
                </S.Tr>
              ))
            )}
          </S.Body>
        </S.Table>
      </S.Panel>

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

      {decisionRow && (
        <S.ModalOverlay onClick={closeDecision} role="dialog" aria-modal="true">
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                {decisionRow.status === '반려' ? '반려 사유' : '취소 사유'}
              </S.ModalTitle>
            </S.ModalHeader>
            <S.ModalBody>
              <S.Card>
                <S.KV>
                  <S.K>
                    {decisionRow.status === '반려' ? '반려자' : '취소자'}
                  </S.K>
                  <S.V>
                    {(decisionRow.status === '반려'
                      ? decisionRow.rejectedBy
                      : decisionRow.canceledBy) ?? '—'}
                  </S.V>
                  <S.K>
                    {decisionRow.status === '반려' ? '반려일' : '취소일'}
                  </S.K>
                  <S.V>
                    {decisionRow.status === '반려'
                      ? decisionRow.rejectedAt
                        ? formatYmdHm(decisionRow.rejectedAt)
                        : '—'
                      : decisionRow.canceledAt
                        ? formatYmdHm(decisionRow.canceledAt)
                        : '—'}
                  </S.V>
                </S.KV>
                <S.Dashed />
                <S.ReasonScroll>
                  <S.ReasonBox>
                    {decisionRow.status === '반려'
                      ? (decisionRow.rejectedReason ??
                        '반려 사유가 제공되지 않았습니다.')
                      : (decisionRow.canceledReason ??
                        '취소 사유가 제공되지 않았습니다.')}
                  </S.ReasonBox>
                </S.ReasonScroll>
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
    </S.Wrap>
  );
}
