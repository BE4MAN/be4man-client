// src/features/approval/pages/ApprovalDetail.jsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PATHS } from '../../../app/routes/paths';
import {
  useApprovalDetailQuery,
  useApproveApprovalMutation,
  useRejectApprovalMutation,
  useCancelApprovalMutation,
  useDeleteApprovalMutation,
} from '../../../hooks/useApprovalQueries';
import { useAuthStore } from '../../../stores/authStore';

import * as S from './ApprovalDetail.styles';

const APPROVAL_LIST_PATH = '/approvals';

const TYPE_LABEL = {
  draft: '기안',
  approve: '결재',
  consent: '합의',
  cc: '참조',
};

function formatYmd(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function mapTypeEnumToDocType(type) {
  switch (type) {
    case 'PLAN':
      return '작업 계획서';
    case 'REPORT':
      return '결과 보고서';
    case 'RETRY':
      return '재배포';
    case 'ROLLBACK':
      return '복구';
    default:
      return '작업 계획서';
  }
}

function mapDetailToUi(detail) {
  if (!detail) return null;

  const {
    id,
    title,
    content,
    type,
    status,
    createdAt,
    updatedAt,
    drafterName,
    drafterDept,
    drafterRank,
    lines,
  } = detail;

  const isFinished =
    status === 'APPROVED' || status === 'REJECTED' || status === 'CANCELED';

  const approvalLine = (lines || []).map((line, idx) => {
    const lineType = (line.type || '').toLowerCase();
    return {
      type: lineType || (idx === 0 ? 'draft' : 'approve'),
      dept: line.deptName || line.dept || drafterDept || '',
      name:
        line.accountName ||
        line.name ||
        (line.accountId != null ? `#${line.accountId}` : ''),
      rank: line.rank || drafterRank || '',
      status: line.statusLabel || '대기',
      approvedAt: line.approvedAt || null,
      comment: line.comment || '',
    };
  });

  return {
    id,
    title,
    type: mapTypeEnumToDocType(type),
    dept: drafterDept || '',
    drafter: drafterName || '',
    draftedAt: createdAt || null,
    decidedAt: isFinished ? updatedAt : null,
    rawStatus: status || null,
    retention: '5년',
    docType: mapTypeEnumToDocType(type),
    body: content || '',
    attachments: [],
    sections: [],
    approvalLine,
  };
}

export default function ApprovalDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showLine, setShowLine] = useState(false);
  const [actionModal, setActionModal] = useState(null);
  const [actionComment, setActionComment] = useState('');

  const user = useAuthStore((s) => s.user);
  let currentUserId = user?.accountId || user?.id;
  let currentUserName = user?.name || user?.username || user?.displayName || '';

  currentUserId = 2;
  currentUserName = '이원석';

  const { data: apiDetail, isLoading, isError } = useApprovalDetailQuery(id);

  const approveMut = useApproveApprovalMutation();
  const rejectMut = useRejectApprovalMutation();
  const cancelMut = useCancelApprovalMutation();
  const deleteMut = useDeleteApprovalMutation();

  const data = useMemo(() => {
    if (apiDetail) return mapDetailToUi(apiDetail);
    if (state?.__isFull) return state;
    return null;
  }, [apiDetail, state]);

  useEffect(() => {
    if (isError) {
      console.error('결재 상세 조회 실패');
    }
  }, [isError]);

  if (isLoading && !data) {
    return (
      <S.Wrap>
        <S.Panel>
          <div style={{ padding: 16 }}>불러오는 중...</div>
        </S.Panel>
      </S.Wrap>
    );
  }

  if (!data) {
    return (
      <S.Wrap>
        <S.Panel>
          <div style={{ padding: 16 }}>데이터가 없습니다.</div>
          <S.SubtleBtn onClick={() => navigate(-1)}>뒤로가기</S.SubtleBtn>
        </S.Panel>
      </S.Wrap>
    );
  }

  const rawStatus = apiDetail?.status || data.rawStatus;
  const isFinished =
    rawStatus === 'APPROVED' ||
    rawStatus === 'REJECTED' ||
    rawStatus === 'CANCELED';
  const isDraft = rawStatus === 'DRAFT';

  const currentStep =
    (data.approvalLine || []).find(
      (s) =>
        s.type !== 'draft' &&
        (s.status === '대기' || s.status === 'PENDING' || s.approvedAt == null),
    ) ?? null;

  const isDrafterMe =
    !!currentUserName && data.drafter && data.drafter === currentUserName;

  const isMyTurnToApprove =
    !!currentUserName &&
    currentStep &&
    currentStep.name &&
    currentStep.name === currentUserName;

  const openActionModal = (type) => {
    setActionModal({ type });
    setActionComment('');
  };

  const closeActionModal = () => {
    setActionModal(null);
    setActionComment('');
  };

  const handleActionSubmit = async () => {
    if (!actionModal || !id) return;

    try {
      if (actionModal.type === 'delete') {
        await deleteMut.mutateAsync({ approvalId: id });
        navigate(APPROVAL_LIST_PATH);
        return;
      }

      if (actionModal.type === 'cancel') {
        await cancelMut.mutateAsync({ approvalId: id });
        navigate(APPROVAL_LIST_PATH);
        return;
      }

      if (actionModal.type === 'approve') {
        await approveMut.mutateAsync({
          approvalId: id,
          approverAccountId: currentUserId,
          comment: actionComment,
        });
        navigate(APPROVAL_LIST_PATH);
        return;
      }

      if (actionModal.type === 'reject') {
        await rejectMut.mutateAsync({
          approvalId: id,
          approverAccountId: currentUserId,
          comment: actionComment,
        });
        navigate(APPROVAL_LIST_PATH);
        return;
      }

      closeActionModal();
    } catch (e) {
      console.error(e);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <S.Wrap>
      <S.Panel>
        <S.HeaderRow>
          {isDraft ? (
            // 🔸 임시저장 상태: 삭제 · 수정 · 결재라인 · 뒤로가기
            <>
              <S.DangerBtn onClick={() => openActionModal('delete')}>
                삭제
              </S.DangerBtn>
              <S.PrimaryBtn
                onClick={() => navigate(PATHS.APPROVAL_EDIT.replace(':id', id))}
              >
                수정
              </S.PrimaryBtn>
              <S.PrimaryBtn onClick={() => setShowLine(true)}>
                결재라인
              </S.PrimaryBtn>
              <S.SubtleBtn onClick={() => navigate(-1)}>뒤로가기</S.SubtleBtn>
            </>
          ) : (
            // 🔸 상신 이후 상태
            <>
              {!isFinished && isDrafterMe && (
                <S.DangerBtn onClick={() => openActionModal('cancel')}>
                  취소
                </S.DangerBtn>
              )}

              {!isFinished && isMyTurnToApprove && (
                <>
                  <S.PrimaryBtn onClick={() => openActionModal('approve')}>
                    승인
                  </S.PrimaryBtn>
                  <S.DangerBtn onClick={() => openActionModal('reject')}>
                    반려
                  </S.DangerBtn>
                </>
              )}

              <S.PrimaryBtn onClick={() => setShowLine(true)}>
                결재라인
              </S.PrimaryBtn>
              <S.SubtleBtn onClick={() => navigate(-1)}>뒤로가기</S.SubtleBtn>
            </>
          )}
        </S.HeaderRow>

        <S.InfoTable>
          <S.InfoColGroup>
            <col />
            <col />
            <col />
            <col />
          </S.InfoColGroup>

          <S.InfoRow>
            <S.InfoTh>기안부서</S.InfoTh>
            <S.InfoTd>{data.dept || '-'}</S.InfoTd>
            <S.InfoTh>기안자</S.InfoTh>
            <S.InfoTd>{data.drafter || '-'}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>기안일자</S.InfoTh>
            <S.InfoTd>
              {isDraft
                ? '임시저장'
                : data.draftedAt
                  ? formatYmd(data.draftedAt)
                  : '-'}
            </S.InfoTd>
            <S.InfoTh>문서분류</S.InfoTh>
            <S.InfoTd>{data.docType}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoTh>제 목</S.InfoTh>
            <S.InfoTd colSpan={3}>{data.title}</S.InfoTd>
          </S.InfoRow>
        </S.InfoTable>

        <S.Section>
          <S.BodyViewer
            dangerouslySetInnerHTML={{
              __html: data.body?.trim() ? data.body : '<p>(내용 없음)</p>',
            }}
          />
        </S.Section>
      </S.Panel>

      {showLine && (
        <S.ModalOverlay onClick={() => setShowLine(false)}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>결재라인</S.ModalTitle>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ALTable>
                <S.ALHeadRow data-head>
                  <S.ALCell>유형</S.ALCell>
                  <S.ALCell>부서명</S.ALCell>
                  <S.ALCell>성명</S.ALCell>
                  <S.ALCell>직책</S.ALCell>
                  <S.ALCell>상태</S.ALCell>
                  <S.ALCell>처리일</S.ALCell>
                  <S.ALCell data-col="comment">코멘트</S.ALCell>
                </S.ALHeadRow>

                {(data.approvalLine || []).map((s, i) => (
                  <S.ALRow key={`${s.name}-${i}`}>
                    <S.ALCell>{TYPE_LABEL[s.type] ?? s.type}</S.ALCell>
                    <S.ALCell>{s.dept || '-'}</S.ALCell>
                    <S.ALCell>{s.name || '-'}</S.ALCell>
                    <S.ALCell>{s.rank || '-'}</S.ALCell>
                    <S.ALCell>{s.status || '대기'}</S.ALCell>
                    <S.ALCell>
                      {s.approvedAt
                        ? formatYmd(s.approvedAt)
                        : data.decidedAt &&
                            (apiDetail?.status === 'APPROVED' ||
                              apiDetail?.status === 'REJECTED' ||
                              apiDetail?.status === 'CANCELED')
                          ? formatYmd(data.decidedAt)
                          : '-'}
                    </S.ALCell>
                    <S.ALCell data-col="comment">
                      <S.CommentText>{s.comment || ''}</S.CommentText>
                    </S.ALCell>
                  </S.ALRow>
                ))}
              </S.ALTable>
            </S.ModalBody>
            <S.ModalActions>
              <S.PrimaryBtn onClick={() => setShowLine(false)}>
                닫기
              </S.PrimaryBtn>
            </S.ModalActions>
          </S.Modal>
        </S.ModalOverlay>
      )}

      {actionModal && (
        <S.ModalOverlay onClick={closeActionModal}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                {actionModal.type === 'delete' && '문서를 삭제하시겠습니까?'}
                {actionModal.type === 'cancel' && '문서를 취소하시겠습니까?'}
                {actionModal.type === 'approve' && '승인 사유'}
                {actionModal.type === 'reject' && '반려 사유'}
              </S.ModalTitle>
            </S.ModalHeader>

            <S.ModalBody>
              {(actionModal.type === 'delete' ||
                actionModal.type === 'cancel') && (
                <div style={{ padding: '12px 0' }}>
                  {actionModal.type === 'delete'
                    ? '정말 삭제하시겠습니까?'
                    : '정말 문서를 취소하시겠습니까?'}
                </div>
              )}

              {(actionModal.type === 'approve' ||
                actionModal.type === 'reject') && (
                <>
                  <S.ReasonLabel>사유를 입력해 주세요.</S.ReasonLabel>
                  <S.ReasonTextarea
                    value={actionComment}
                    onChange={(e) => setActionComment(e.target.value)}
                    placeholder="사유를 입력하세요."
                  />
                </>
              )}
            </S.ModalBody>

            <S.ModalActions>
              <S.SubtleBtn onClick={closeActionModal}>취소</S.SubtleBtn>
              <S.PrimaryBtn onClick={handleActionSubmit}>확인</S.PrimaryBtn>
            </S.ModalActions>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Wrap>
  );
}
