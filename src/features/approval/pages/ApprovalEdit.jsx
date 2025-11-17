import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useApprovalDetailQuery } from '@/hooks/useApprovalQueries';
import {
  useUpdateApprovalMutation,
  useSubmitApprovalMutation,
} from '@/hooks/useApprovalQueries';

import ApprovalForm from './ApprovalForm';

function typeEnumToDocType(type) {
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

function docTypeToEnum(label) {
  switch (label) {
    case '작업 계획서':
      return 'PLAN';
    case '결과 보고서':
      return 'REPORT';
    case '재배포':
      return 'RETRY';
    case '복구':
      return 'ROLLBACK';
    default:
      return 'PLAN';
  }
}

function toUpdatePayload(
  form,
  { includeDrafter = true, drafterComment = '', drafterAccountId } = {},
) {
  const linesRaw = (form.steps || []).map((s, idx) => {
    const isDraft = String(s.type || '').toLowerCase() === 'draft';
    const type = isDraft
      ? 'APPROVE'
      : String(s.type || 'approve').toUpperCase();
    const comment = isDraft
      ? drafterComment || s.opinion || ''
      : s.opinion || '';
    const accountId = isDraft
      ? (s.accountId ?? drafterAccountId ?? null)
      : (s.accountId ?? null);

    return {
      accountId,
      type,
      comment,
      order: idx,
      sequence: idx,
      stepOrder: idx,
    };
  });

  let lines = linesRaw.filter((l) => l.accountId != null);

  if (!includeDrafter) {
    lines = lines.slice(1);
  }

  const payload = {
    title: form.title,
    content: form.htmlText,
    service: form.service,
    type: docTypeToEnum(form.docType),
    relatedProjectIds: form.relatedProjectIds ?? [],
    lines,
    approvalLines: lines,
  };

  if (form.projectId != null) payload.projectId = form.projectId;
  if (form.pullRequestId != null) payload.pullRequestId = form.pullRequestId;

  return payload;
}

export default function ApprovalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: detail, isLoading, isError } = useApprovalDetailQuery(id);
  const updateMut = useUpdateApprovalMutation();
  const submitMut = useSubmitApprovalMutation();

  const initial = useMemo(() => {
    if (!detail) return null;

    const {
      id: approvalId,
      deploymentId,
      drafterAccountId,
      drafterName,
      drafterDept,
      drafterRank,
      title,
      content,
      type,
      createdAt,
      lines = [],
      service = '',
      projectId = null,
      pullRequestId = null,
      relatedProjectIds = [],
      branch,
    } = detail;

    const steps = lines.map((l, idx) => ({
      id: crypto.randomUUID(),
      type: idx === 0 ? 'draft' : (l.type || '').toLowerCase(),
      dept: l.deptName || drafterDept || '',
      name: l.accountName || '',
      rank: l.rank || drafterRank || '',
      opinion: l.comment || '',
      accountId: l.accountId ?? null,
    }));

    // 첫 줄(기안자) 확정 보정
    if (steps.length > 0) {
      steps[0] = {
        ...steps[0],
        type: 'draft',
        dept: drafterDept || steps[0].dept || '',
        name: drafterName || steps[0].name || '',
        rank: drafterRank || steps[0].rank || '',
        accountId: drafterAccountId ?? steps[0].accountId ?? null,
      };
    }

    return {
      approvalId,
      deploymentId,
      drafterAccountId,
      drafter: drafterName,
      dept: drafterDept,
      position: drafterRank,
      draftDate: createdAt
        ? new Date(createdAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      docType: typeEnumToDocType(type),
      title: title || '',
      htmlText: content || '',
      service,

      projectId,
      pullRequestId,
      relatedProjectIds,
      branch,

      steps,
    };
  }, [detail]);

  if (isLoading) return <div style={{ padding: 16 }}>불러오는 중…</div>;
  if (isError || !initial) {
    return (
      <div style={{ padding: 16 }}>
        문서를 불러오지 못했습니다.
        <button
          style={{ marginLeft: 8 }}
          onClick={() => navigate('/approvals')}
        >
          목록으로
        </button>
      </div>
    );
  }

  const handleSaveDraft = async (form) => {
    await updateMut.mutateAsync({
      approvalId: initial.approvalId,
      payload: toUpdatePayload(form, {
        includeDrafter: true,
        drafterAccountId: initial.drafterAccountId,
      }),
    });
    navigate('/approvals');
  };

  const handleSubmit = async (form) => {
    await updateMut.mutateAsync({
      approvalId: initial.approvalId,
      payload: toUpdatePayload(form, {
        includeDrafter: true,
        drafterComment: form.submitComment || '',
        drafterAccountId: initial.drafterAccountId,
      }),
    });
    await submitMut.mutateAsync({ approvalId: initial.approvalId });
    navigate('/approvals');
  };

  return (
    <ApprovalForm
      mode="edit"
      initial={initial}
      key={String(id)}
      onCancel={() => navigate(-1)}
      onSaveDraft={handleSaveDraft}
      onSubmit={handleSubmit}
    />
  );
}
