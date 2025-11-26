import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userAPI } from '@/api/user';
import { ProblemCaseDetailModal } from '@/features/problem/components/ProblemCaseDetailModal';
import * as PT from '@/features/problem/components/ProblemTypeTree.styles';
import {
  useAllProblemCategoriesQuery,
  useAllProblemsQuery,
} from '@/hooks/useProblemQueries';
import { useAccountProjectsByAccountQuery } from '@/hooks/useProjectQueries';
import { useMyPullRequestsQueryByGithubId } from '@/hooks/usePullRequestQueries.js';

import {
  useSaveDraftApprovalMutation,
  useCreateAndSubmitApprovalMutation,
} from '../../../hooks/useApprovalQueries';
import { DOC_TYPES, TEMPLATES } from '../../../mock/approvalTemplates';
import { useAuthStore } from '../../../stores/authStore';

import * as S from './ApprovalForm.styles';

import LeftSort from '/icons/left-sort.svg';
import CenterSort from '/icons/center-sort.svg';
import RightSort from '/icons/right-sort.svg';

const mapDepartmentToLabel = (dept) => {
  if (!dept) return '';
  const key = typeof dept === 'string' ? dept : String(dept);
  switch (key) {
    case 'HR':
      return '인사팀';
    case 'FINANCE':
      return '재무회계팀';
    case 'IT':
      return '개발1팀';
    case 'PLANNING':
      return '기획팀';
    case 'LEGAL':
      return '법무팀';
    case 'SALES':
      return '영업팀';
    default:
      return key;
  }
};

const mapPositionToLabel = (pos) => {
  if (!pos) return '';
  switch (pos) {
    case 'INTERN':
      return '인턴';
    case 'STAFF':
      return '사원';
    case 'ASSISTANT_MANAGER':
      return '대리';
    case 'SENIOR_MANAGER':
      return '과장';
    case 'DEPUTY_GENERAL_MANAGER':
      return '차장';
    case 'GENERAL_MANAGER':
      return '부장';
    case 'EXECUTIVE':
      return '임원';
    default:
      return pos;
  }
};

const ORG_TREE = [
  {
    code: 'HQ',
    name: '본사',
    children: [
      { code: 'HR', name: '인사팀' },
      { code: 'FINANCE', name: '재무회계팀' },
      {
        code: 'DEV',
        name: '개발팀',
        children: [
          { code: 'IT', name: '개발1팀' },
          { code: 'DEV2', name: '개발2팀' },
        ],
      },
      { code: 'DESIGN', name: '디자인팀' },
      { code: 'MKT', name: '마케팅팀' },
    ],
  },
];

const ORG_NODE_TO_DEPT = {
  HR: 'HR',
  FINANCE: 'FINANCE',
  IT: 'IT',
  DEV: 'IT',
};

export default function ApprovalForm({
  mode = 'create',
  initial = {},
  onSubmit = (payload) => console.log('SUBMIT', payload),
  onSaveDraft = (payload) => console.log('DRAFT', payload),
  onCancel = () => window.history.back(),
}) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const CURRENT_ACCOUNT_ID =
    initial.drafterAccountId ?? user?.accountId ?? user?.id ?? null;

  const initialDept =
    initial.dept ??
    mapDepartmentToLabel(user?.department ?? user?.departmentName);

  const initialPosition =
    initial.position ??
    mapPositionToLabel(user?.position ?? user?.positionName);

  const initialDrafter = initial.drafter ?? user?.name ?? '';

  const [dept, setDept] = useState(initialDept ?? '');
  const [position] = useState(initialPosition ?? '');
  const [drafter, setDrafter] = useState(initialDrafter ?? '');
  const [draftDate, setDraftDate] = useState(
    initial.draftDate ?? new Date().toISOString().slice(0, 10),
  );

  const [workStartAt, setWorkStartAt] = useState(initial.workStartAt ?? '');
  const [workEndAt, setWorkEndAt] = useState(initial.workEndAt ?? '');

  const [docType, setDocType] = useState(initial.docType ?? DOC_TYPES[0]);
  const [htmlText, setHtmlText] = useState(
    initial.htmlText ?? TEMPLATES[docType]?.html?.trim() ?? '',
  );
  const [title, setTitle] = useState(
    initial.title ?? '시스원 연혁 업데이트 배포',
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: '내용을 입력하세요…' }),
    ],
    content: initial.designText ?? htmlText,
    onUpdate: ({ editor }) => setHtmlText(editor.getHTML()),
  });

  const [confirmType, setConfirmType] = useState(null);
  const [pendingDocType, setPendingDocType] = useState(null);
  const [submitComment, setSubmitComment] = useState('');
  const [busy, setBusy] = useState(false);

  const [steps, setSteps] = useState(
    initial.steps ?? [
      {
        id: crypto.randomUUID(),
        type: 'draft',
        dept: dept,
        name: drafter,
        rank: position,
        opinion: '',
        accountId: CURRENT_ACCOUNT_ID,
      },
    ],
  );

  const [openProjectSelect, setOpenProjectSelect] = useState(false);
  const [openPrSelect, setOpenPrSelect] = useState(false);
  const [openDocTypeSelect, setOpenDocTypeSelect] = useState(false);
  const [openStepTypeId, setOpenStepTypeId] = useState(null);

  useEffect(() => {
    function handleClickOutside(e) {
      const el = e.target;
      if (el.closest('[data-select-root="true"]')) return;
      setOpenProjectSelect(false);
      setOpenPrSelect(false);
      setOpenDocTypeSelect(false);
      setOpenStepTypeId(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openConfirm = (t) => {
    if (t === 'submit') {
      const first = steps[0];
      setSubmitComment(first?.opinion || '상신합니다.');
    }
    setConfirmType(t);
  };
  const closeConfirm = () => {
    setConfirmType(null);
    setPendingDocType(null);
  };

  const requestTemplateChange = (nextType) => {
    setPendingDocType(nextType);
    setConfirmType('template');
  };

  const applyTemplate = (type) => {
    const t = TEMPLATES[type];
    if (!editor || !t) return;
    editor.commands.setContent(t.design.trim(), false);
    setHtmlText(t.html.trim());
    setDocType(type);
  };

  useEffect(() => {
    setSteps((prev) => {
      if (!prev.length) return prev;
      const first = prev[0];
      const next0 = {
        ...first,
        type: 'draft',
        dept,
        name: drafter,
        rank: position,
        accountId: CURRENT_ACCOUNT_ID,
      };
      if (
        first.type === next0.type &&
        first.dept === next0.dept &&
        first.name === next0.name &&
        first.rank === next0.rank &&
        first.accountId === next0.accountId
      )
        return prev;
      const arr = [...prev];
      arr[0] = next0;
      return arr;
    });
  }, [dept, drafter, position, CURRENT_ACCOUNT_ID]);

  const approverCount = useMemo(
    () =>
      steps.filter((s) => s.type === 'approve' || s.type === 'consent').length,
    [steps],
  );

  const addStep = (type = 'approve') =>
    setSteps((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: type === 'draft' ? 'approve' : type,
        dept: '',
        name: '',
        rank: '',
        opinion: '',
        accountId: null,
      },
    ]);

  const patchStep = (id, patch) =>
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i === 0)
          return s.id === id
            ? { ...s, ...patch, type: 'draft' }
            : { ...s, type: 'draft' };
        return s.id === id ? { ...s, ...patch } : s;
      }),
    );

  const removeStep = (id) =>
    setSteps((prev) => prev.filter((s) => s.id !== id));

  const moveStep = useCallback((id, dir) => {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 1 || targetIdx >= prev.length) return prev;
      if (prev[idx].type === 'draft' || prev[targetIdx].type === 'draft')
        return prev;
      const arr = [...prev];
      const [item] = arr.splice(idx, 1);
      arr.splice(targetIdx, 0, item);
      return arr;
    });
  }, []);

  const accountId = user?.accountId ?? user?.id;
  const {
    data: memberships = [],
    isLoading: isLoadingProjects,
    isError: isProjectsError,
  } = useAccountProjectsByAccountQuery(accountId);

  const myProjectOptions = useMemo(() => {
    if (!memberships?.length) return [];
    return memberships
      .map((m) => ({
        id: m.projectId ?? m.project?.id ?? m.project_id,
        name: m.projectName ?? m.project?.name ?? m.project_name,
      }))
      .filter((p) => p.id && p.name);
  }, [memberships]);

  const firstProjectId = myProjectOptions[0]?.id ?? null;

  const [selectedProjectId, setSelectedProjectId] = useState(
    initial.projectId ?? firstProjectId,
  );

  useEffect(() => {
    if (selectedProjectId != null) return;
    if (initial?.projectId != null) {
      setSelectedProjectId(initial.projectId);
    } else if (firstProjectId != null) {
      setSelectedProjectId(firstProjectId);
    }
  }, [firstProjectId, initial?.projectId, selectedProjectId]);

  const selectedProjectName = useMemo(() => {
    const item = myProjectOptions.find((p) => p.id === selectedProjectId);
    return item?.name ?? (initial?.service || '');
  }, [myProjectOptions, selectedProjectId, initial?.service]);

  const onChangeProject = (idStr) => {
    const idNum = Number(idStr);
    setSelectedProjectId(Number.isNaN(idNum) ? idStr : idNum);
  };

  const rawGithubId = user?.githubId ?? user?.github?.id ?? null;

  const githubId =
    typeof rawGithubId === 'number'
      ? rawGithubId
      : rawGithubId
        ? Number(rawGithubId)
        : null;

  const {
    data: myPRs = [],
    isLoading: isLoadingPRs,
    isError: isErrorPRs,
  } = useMyPullRequestsQueryByGithubId(githubId);

  const prOptions = useMemo(() => {
    if (!myPRs?.length) return [];

    const hasApprovedFlag = myPRs.some(
      (pr) =>
        Object.prototype.hasOwnProperty.call(pr, 'isApproved') ||
        Object.prototype.hasOwnProperty.call(pr, 'approved') ||
        Object.prototype.hasOwnProperty.call(pr, 'is_approved'),
    );

    const list =
      docType === '결과 보고서' && hasApprovedFlag
        ? myPRs.filter(
            (pr) =>
              pr?.isApproved === true ||
              pr?.approved === true ||
              pr?.is_approved === true,
          )
        : myPRs;

    return list.map((pr) => ({
      id: pr.id,
      label: pr.branch ?? 'branch?',
      branch: pr.branch,
    }));
  }, [myPRs, docType]);

  const [selectedPrId, setSelectedPrId] = useState(
    initial.pullRequestId ?? prOptions[0]?.id ?? null,
  );
  const [selectedBranch, setSelectedBranch] = useState(
    initial.pullRequestId
      ? (myPRs.find((p) => p.id === initial.pullRequestId)?.branch ?? '')
      : (prOptions[0]?.branch ?? ''),
  );

  useEffect(() => {
    if (!prOptions.length) {
      setSelectedPrId(null);
      setSelectedBranch('');
      return;
    }
    if (!prOptions.some((p) => String(p.id) === String(selectedPrId))) {
      setSelectedPrId(prOptions[0].id);
      setSelectedBranch(prOptions[0].branch ?? '');
    }
  }, [prOptions, selectedPrId]);

  const onChangePR = (prIdStr) => {
    const prId = Number(prIdStr);
    setSelectedPrId(prId);
    const found = (myPRs || []).find((p) => p.id === prId);
    setSelectedBranch(found?.branch ?? '');
  };

  const selectedPrLabel = useMemo(() => {
    const found = prOptions.find((p) => String(p.id) === String(selectedPrId));
    if (found) return found.label;
    if (initial?.pullRequestId != null) {
      return initial.branch || `PR #${initial.pullRequestId}`;
    }
    return '';
  }, [prOptions, selectedPrId, initial?.pullRequestId, initial?.branch]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStepId, setPickerStepId] = useState(null);

  const [query, setQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(query.trim()), 200);
    return () => clearTimeout(t);
  }, [query]);

  const [expanded, setExpanded] = useState(() => new Set(['HQ', 'DEV']));
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [allPeople, setAllPeople] = useState([]);
  const [peopleLoading, setPeopleLoading] = useState(false);

  const openPicker = (stepId) => {
    setPickerStepId(stepId);
    const target = steps.find((s) => s.id === stepId);

    setQuery('');
    setDebouncedQ('');
    setSelectedDept(null);

    if (target) {
      setSelectedPerson({
        accountId: target.accountId ?? null,
        name: target.name ?? '',
        rank: target.rank ?? '',
        deptName: target.dept ?? '',
        deptCode: null,
      });
    } else {
      setSelectedPerson(null);
    }
    setPickerOpen(true);
  };
  const closePicker = () => setPickerOpen(false);

  useEffect(() => {
    if (!pickerOpen) return;
    let alive = true;
    (async () => {
      try {
        setPeopleLoading(true);
        const rows = await userAPI.fetchApprovalLineCandidates();
        if (!alive) return;
        const list = Array.isArray(rows) ? rows : [];
        const normalized = list
          .map((r) => ({
            accountId: r.accountId ?? r.id ?? r.account_id,
            name: r.name ?? '',
            rank: mapPositionToLabel(r.position),
            deptCode: r.department ?? '',
            deptName: mapDepartmentToLabel(r.department),
          }))
          .filter((x) => x.accountId && x.name);
        setAllPeople(normalized);
      } catch (e) {
        console.error(e);
        if (alive) setAllPeople([]);
      } finally {
        if (alive) setPeopleLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [pickerOpen]);

  useEffect(() => {
    if (!pickerOpen) return;
    if (!selectedPerson?.accountId) return;
    if (!allPeople?.length) return;
    const found = allPeople.find(
      (p) => String(p.accountId) === String(selectedPerson.accountId),
    );
    if (found) setSelectedPerson(found);
  }, [allPeople, pickerOpen, selectedPerson?.accountId]);

  const toggleNode = (code) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(code) ? n.delete(code) : n.add(code);
      return n;
    });
  };

  const visiblePeople = useMemo(() => {
    let base = allPeople;
    if (selectedDept) {
      if (selectedDept === 'HQ') {
        base = allPeople;
      } else {
        const deptFilter = ORG_NODE_TO_DEPT[selectedDept];
        base = deptFilter
          ? allPeople.filter(
              (p) =>
                p.deptCode &&
                String(p.deptCode).toUpperCase() === deptFilter.toUpperCase(),
            )
          : [];
      }
    }
    if (!debouncedQ) return base;
    const q = debouncedQ.toLowerCase();
    return base.filter((p) =>
      `${p.accountId} ${p.name} ${p.rank} ${p.deptName}`
        .toLowerCase()
        .includes(q),
    );
  }, [allPeople, selectedDept, debouncedQ]);

  const pickPerson = (p) => setSelectedPerson(p);
  const confirmPick = () => {
    if (!selectedPerson) return alert('결재 대상을 선택하세요.');
    setSteps((prev) =>
      prev.map((s) =>
        s.id === pickerStepId
          ? {
              ...s,
              dept: selectedPerson.deptName ?? '',
              name: selectedPerson.name ?? '',
              rank: selectedPerson.rank ?? '',
              accountId: selectedPerson.accountId ?? null,
            }
          : s,
      ),
    );
    setPickerOpen(false);
  };

  const renderTree = (nodes) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {nodes.map((n) => {
        const hasChildren = Array.isArray(n.children) && n.children.length > 0;
        const open = expanded.has(n.code);
        const active = selectedDept === n.code;
        return (
          <li key={n.code}>
            <S.TreeRow
              data-active={active || undefined}
              onClick={() => setSelectedDept(n.code)}
            >
              {hasChildren ? (
                <S.TreeToggle
                  type="button"
                  aria-label={open ? '닫기' : '열기'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNode(n.code);
                  }}
                >
                  {open ? '▾' : '▸'}
                </S.TreeToggle>
              ) : (
                <S.TreeTogglePlaceholder />
              )}
              <span>{n.name}</span>
            </S.TreeRow>
            {hasChildren && open && (
              <div style={{ paddingLeft: 18 }}>{renderTree(n.children)}</div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const payload = () => ({
    meta: {
      dept,
      position,
      drafter,
      draftDate,
      docType,
      title,
      projectId: selectedProjectId,
      pullRequestId: selectedPrId,
      branch: selectedBranch,
      service: selectedProjectName,
      workStartAt,
      workEndAt,
    },
    body: htmlText,
    bodyMode: 'design',
    approvalLine: steps.map((s) =>
      Object.fromEntries(Object.entries(s).filter(([k]) => k !== 'id')),
    ),
  });

  const validateBeforeSubmit = () => {
    if (isLoadingProjects)
      return '프로젝트 목록을 불러오는 중입니다. 잠시 후 다시 시도하세요.';
    if (!selectedProjectId) return '기안 프로젝트를 선택하세요.';
    if (isLoadingPRs)
      return 'PR 목록을 불러오는 중입니다. 잠시 후 다시 시도하세요.';
    if (!selectedPrId) return '기안 PR을 선택하세요.';
    if (approverCount < 1) return '결재/합의 단계가 1명 이상 필요합니다.';
    if (
      steps.some(
        (s) =>
          (s.type === 'approve' || s.type === 'consent') &&
          !String(s.name || '').trim(),
      )
    )
      return '결재/합의 대상자의 성명을 입력하세요.';
    if (
      steps.some(
        (s) => (s.type === 'approve' || s.type === 'consent') && !s.accountId,
      )
    )
      return '결재/합의 대상자의 계정을 선택하세요.';
    return null;
  };

  const draftMut = useSaveDraftApprovalMutation();
  const submitMut = useCreateAndSubmitApprovalMutation();

  const mapDocTypeToApprovalType = (t) => {
    switch (t) {
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
  };

  const mapStepTypeToLineType = (t) => {
    const v = (t || '').toString().toUpperCase();
    if (v === 'CONSENT') return 'CONSENT';
    if (v === 'CC') return 'CC';
    return 'APPROVE';
  };

  const buildApprovalCreateRequest = ({ draftComment = '' } = {}) => {
    const p = payload();
    const t = p.meta.docType;

    return {
      deploymentId: initial.deploymentId ?? null,
      drafterAccountId: CURRENT_ACCOUNT_ID,
      type: mapDocTypeToApprovalType(t),
      title: p.meta.title,
      content: p.body,
      service: p.meta.service,
      projectId: p.meta.projectId,
      pullRequestId: p.meta.pullRequestId,
      workStartAt: p.meta.workStartAt || null,
      workEndAt: p.meta.workEndAt || null,
      relatedProjectIds: initial.relatedProjectIds ?? [],
      lines: p.approvalLine
        .map((l) => {
          const lineType = mapStepTypeToLineType(l.type);
          const accountId =
            l.accountId ?? (lineType === 'APPROVE' ? CURRENT_ACCOUNT_ID : null);
          if (!accountId) return null;
          const isDraftLine =
            (l.type || '').toString().toUpperCase() === 'DRAFT';
          const comment =
            isDraftLine && draftComment ? draftComment : l.opinion || '';
          return { accountId, type: lineType, comment };
        })
        .filter(Boolean),
    };
  };

  const runConfirmAction = async () => {
    if (confirmType === 'cancel') {
      closeConfirm();
      onCancel();
      return;
    }

    if (confirmType === 'draft') {
      if (!CURRENT_ACCOUNT_ID) return alert('로그인 정보를 확인해주세요.');
      if (busy) return;
      setBusy(true);
      try {
        if (mode === 'edit') {
          const formForParent = {
            dept,
            position,
            drafter,
            draftDate,
            docType,
            title,
            htmlText,
            service: selectedProjectName,
            projectId: selectedProjectId,
            pullRequestId: selectedPrId,
            relatedProjectIds: initial.relatedProjectIds ?? [],
            steps,
            workStartAt,
            workEndAt,
          };
          await onSaveDraft(formForParent);
        } else {
          const req = buildApprovalCreateRequest();
          const id = await draftMut.mutateAsync(req);
          onSaveDraft(req, id);
        }
        navigate('/approvals');
      } catch (e) {
        console.error(e);
      } finally {
        setBusy(false);
        closeConfirm();
      }
      return;
    }

    if (confirmType === 'submit') {
      const msg = validateBeforeSubmit();
      if (msg) return alert(msg);
      if (busy) return;
      setBusy(true);
      try {
        if (mode === 'edit') {
          const formForParent = {
            dept,
            position,
            drafter,
            draftDate,
            docType,
            title,
            htmlText,
            service: selectedProjectName,
            projectId: selectedProjectId,
            pullRequestId: selectedPrId,
            relatedProjectIds: initial.relatedProjectIds ?? [],
            steps,
            submitComment,
            drafterAccountId: CURRENT_ACCOUNT_ID,
            workStartAt,
            workEndAt,
          };
          await onSubmit(formForParent);
        } else {
          const req = buildApprovalCreateRequest({
            draftComment: submitComment,
          });
          const id = await submitMut.mutateAsync(req);
          onSubmit(req, id);
        }
        navigate('/approvals');
      } catch (e) {
        console.error(e);
        alert('상신 중 오류가 발생했습니다.');
      } finally {
        setBusy(false);
        closeConfirm();
      }
      return;
    }

    if (confirmType === 'template' && pendingDocType) {
      applyTemplate(pendingDocType);
      closeConfirm();
    }
  };

  const [problemModalOpen, setProblemModalOpen] = useState(false);
  const [expandedProblemTypes, setExpandedProblemTypes] = useState(
    () => new Set(),
  );
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  useEffect(() => {
    const hasModalOpen =
      pickerOpen || !!confirmType || problemModalOpen || !!selectedProblemId;

    if (hasModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [pickerOpen, confirmType, problemModalOpen, selectedProblemId]);

  const handleOpenProblemList = () => {
    setProblemModalOpen(true);
    setSelectedProblemId(null);
  };

  const handleOpenProblemDetail = (id) => {
    setProblemModalOpen(false);
    setSelectedProblemId(id);
  };

  const handleCloseProblemDetail = () => {
    setSelectedProblemId(null);
    setProblemModalOpen(true);
  };

  const toggleProblemCategory = (categoryId) => {
    setExpandedProblemTypes((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const {
    data: problemCategories = [],
    isLoading: isLoadingProblemCategories,
  } = useAllProblemCategoriesQuery();
  const { data: problemList = [], isLoading: isLoadingProblems } =
    useAllProblemsQuery();

  const categoryProblemsMap = useMemo(() => {
    const map = new Map();
    problemList.forEach((problem) => {
      const cid = problem.categoryId;
      if (!cid) return;
      if (!map.has(cid)) map.set(cid, []);
      map.get(cid).push(problem);
    });
    return map;
  }, [problemList]);

  return (
    <S.Wrap>
      <S.Panel as="form" onSubmit={(e) => e.preventDefault()}>
        <S.DocTitle>보고서</S.DocTitle>

        <S.Toolbar>
          <S.ToolBtn
            type="button"
            onClick={handleOpenProblemList}
            disabled={busy}
          >
            문제 사례 보기
          </S.ToolBtn>
          <S.ToolRight>
            <S.ToolBtn
              type="button"
              onClick={() => openConfirm('cancel')}
              disabled={busy}
            >
              취소
            </S.ToolBtn>
            <S.PrimaryBtn
              type="button"
              onClick={() => openConfirm('submit')}
              disabled={busy}
            >
              상신
            </S.PrimaryBtn>
          </S.ToolRight>
        </S.Toolbar>

        <S.MetaTable role="table">
          <S.MetaColGroup>
            <col />
            <col />
            <col />
            <col />
          </S.MetaColGroup>

          <S.MetaRow>
            <S.MetaTh>기안부서</S.MetaTh>
            <S.MetaTd>
              <S.Input value={dept} onChange={(e) => setDept(e.target.value)} />
            </S.MetaTd>
            <S.MetaTh>기안자</S.MetaTh>
            <S.MetaTd>
              <S.Input
                value={drafter}
                onChange={(e) => setDrafter(e.target.value)}
              />
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>기안 프로젝트</S.MetaTh>
            <S.MetaTd>
              {isLoadingProjects ? (
                <S.Input readOnly value="프로젝트 불러오는 중..." />
              ) : isProjectsError ? (
                <S.Input readOnly value="프로젝트 조회 실패" />
              ) : myProjectOptions.length === 0 &&
                initial?.projectId != null ? (
                <S.Input
                  readOnly
                  value={
                    initial.service || `프로젝트 #${initial.projectId ?? ''}`
                  }
                />
              ) : myProjectOptions.length === 0 ? (
                <S.Input readOnly value="선택 가능한 프로젝트가 없습니다" />
              ) : (
                <S.CustomSelect data-select-root="true">
                  <S.CustomSelectBtn
                    type="button"
                    onClick={() => setOpenProjectSelect((prev) => !prev)}
                  >
                    {selectedProjectName || '프로젝트 선택'}
                    <span>▾</span>
                  </S.CustomSelectBtn>
                  {openProjectSelect && (
                    <S.CustomSelectList>
                      {myProjectOptions.map((p) => (
                        <S.CustomSelectItem
                          key={p.id}
                          onClick={() => {
                            onChangeProject(String(p.id));
                            setOpenProjectSelect(false);
                          }}
                        >
                          {p.name}
                        </S.CustomSelectItem>
                      ))}
                      {initial?.projectId != null &&
                        !myProjectOptions.some(
                          (p) => String(p.id) === String(initial.projectId),
                        ) && (
                          <S.CustomSelectItem
                            onClick={() => {
                              onChangeProject(String(initial.projectId));
                              setOpenProjectSelect(false);
                            }}
                          >
                            {initial.service ||
                              `프로젝트 #${initial.projectId}`}
                          </S.CustomSelectItem>
                        )}
                    </S.CustomSelectList>
                  )}
                </S.CustomSelect>
              )}
            </S.MetaTd>

            <S.MetaTh>기안 PR</S.MetaTh>
            <S.MetaTd>
              {isLoadingPRs ? (
                <S.Input readOnly value="PR 불러오는 중..." />
              ) : isErrorPRs ? (
                <S.Input readOnly value="PR 조회 실패" />
              ) : prOptions.length === 0 && initial?.pullRequestId != null ? (
                <S.Input
                  readOnly
                  value={initial.branch || `PR #${initial.pullRequestId ?? ''}`}
                />
              ) : prOptions.length === 0 ? (
                <S.Input readOnly value="PR 없음" />
              ) : (
                <S.CustomSelect data-select-root="true">
                  <S.CustomSelectBtn
                    type="button"
                    onClick={() => setOpenPrSelect((prev) => !prev)}
                  >
                    {selectedPrLabel || 'PR 선택'}
                    <span>▾</span>
                  </S.CustomSelectBtn>
                  {openPrSelect && (
                    <S.CustomSelectList>
                      {prOptions.map((p) => (
                        <S.CustomSelectItem
                          key={p.id}
                          onClick={() => {
                            onChangePR(String(p.id));
                            setOpenPrSelect(false);
                          }}
                        >
                          {p.label}
                        </S.CustomSelectItem>
                      ))}
                      {initial?.pullRequestId != null &&
                        !prOptions.some(
                          (p) => String(p.id) === String(initial.pullRequestId),
                        ) && (
                          <S.CustomSelectItem
                            onClick={() => {
                              onChangePR(String(initial.pullRequestId));
                              setOpenPrSelect(false);
                            }}
                          >
                            {initial.branch || `PR #${initial.pullRequestId}`}
                          </S.CustomSelectItem>
                        )}
                    </S.CustomSelectList>
                  )}
                </S.CustomSelect>
              )}
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>기안일자</S.MetaTh>
            <S.MetaTd data-bb>
              <S.Input
                type="date"
                value={draftDate}
                onChange={(e) => setDraftDate(e.target.value)}
              />
            </S.MetaTd>

            <S.MetaTh data-bb>문서분류</S.MetaTh>
            <S.MetaTd data-bb>
              <S.CustomSelect data-select-root="true">
                <S.CustomSelectBtn
                  type="button"
                  onClick={() => setOpenDocTypeSelect((prev) => !prev)}
                >
                  {docType}
                  <span>▾</span>
                </S.CustomSelectBtn>
                {openDocTypeSelect && (
                  <S.CustomSelectList>
                    {DOC_TYPES.map((t) => (
                      <S.CustomSelectItem
                        key={t}
                        onClick={() => {
                          requestTemplateChange(t);
                          setOpenDocTypeSelect(false);
                        }}
                      >
                        {t}
                      </S.CustomSelectItem>
                    ))}
                  </S.CustomSelectList>
                )}
              </S.CustomSelect>
            </S.MetaTd>
          </S.MetaRow>

          {/* 🔹 작업 시작/종료 일시 */}
          <S.MetaRow>
            <S.MetaTh>작업 시작</S.MetaTh>
            <S.MetaTd>
              <S.Input
                type="datetime-local"
                value={workStartAt}
                onChange={(e) => setWorkStartAt(e.target.value)}
              />
            </S.MetaTd>

            <S.MetaTh>작업 종료</S.MetaTh>
            <S.MetaTd>
              <S.Input
                type="datetime-local"
                value={workEndAt}
                onChange={(e) => setWorkEndAt(e.target.value)}
              />
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>제목</S.MetaTh>
            <S.MetaTd colSpan={3}>
              <S.Input
                placeholder="보고서 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </S.MetaTd>
          </S.MetaRow>
        </S.MetaTable>

        <S.ALBox>
          <S.ALHeader>
            <S.ALTitle>결재라인</S.ALTitle>
            <S.ALActions>
              <S.ALSmallBtn type="button" onClick={() => addStep('approve')}>
                + 결재
              </S.ALSmallBtn>
              <S.ALSmallBtn type="button" onClick={() => addStep('consent')}>
                + 합의
              </S.ALSmallBtn>
              <S.ALSmallBtn type="button" onClick={() => addStep('cc')}>
                + 참조
              </S.ALSmallBtn>
            </S.ALActions>
          </S.ALHeader>

          <S.ALTable role="table" aria-label="결재라인">
            <S.ALRow role="row" data-head>
              <S.ALCell role="columnheader">유형</S.ALCell>
              <S.ALCell role="columnheader">부서명</S.ALCell>
              <S.ALCell role="columnheader">성명</S.ALCell>
              <S.ALCell role="columnheader">직책</S.ALCell>
              <S.ALCell role="columnheader">처리</S.ALCell>
            </S.ALRow>

            {steps.map((s, idx) => (
              <S.ALRow key={s.id}>
                <S.ALCell>
                  {idx === 0 ? (
                    <S.Input value="기안" readOnly />
                  ) : (
                    <S.CustomSelect data-select-root="true">
                      <S.CustomSelectBtn
                        type="button"
                        onClick={() =>
                          setOpenStepTypeId((prev) =>
                            prev === s.id ? null : s.id,
                          )
                        }
                      >
                        {s.type === 'approve'
                          ? '결재'
                          : s.type === 'consent'
                            ? '합의'
                            : '참조'}
                        <span>▾</span>
                      </S.CustomSelectBtn>
                      {openStepTypeId === s.id && (
                        <S.CustomSelectList>
                          {['approve', 'consent', 'cc'].map((t) => (
                            <S.CustomSelectItem
                              key={t}
                              onClick={() => {
                                patchStep(s.id, { type: t });
                                setOpenStepTypeId(null);
                              }}
                            >
                              {t === 'approve'
                                ? '결재'
                                : t === 'consent'
                                  ? '합의'
                                  : '참조'}
                            </S.CustomSelectItem>
                          ))}
                        </S.CustomSelectList>
                      )}
                    </S.CustomSelect>
                  )}
                </S.ALCell>

                <S.ALCell>
                  <S.Input
                    value={s.dept ?? ''}
                    readOnly
                    onClick={idx === 0 ? undefined : () => openPicker(s.id)}
                    placeholder="부서"
                  />
                </S.ALCell>
                <S.ALCell>
                  <S.Input
                    value={s.name ?? ''}
                    readOnly
                    onClick={idx === 0 ? undefined : () => openPicker(s.id)}
                    placeholder="성명"
                  />
                </S.ALCell>
                <S.ALCell>
                  <S.Input
                    value={s.rank ?? ''}
                    readOnly
                    onClick={idx === 0 ? undefined : () => openPicker(s.id)}
                    placeholder="직책"
                  />
                </S.ALCell>

                <S.ALActionsCell>
                  {idx > 0 && (
                    <>
                      <S.ALSmallBtn
                        type="button"
                        aria-label="행 위로 이동"
                        onClick={() => moveStep(s.id, 'up')}
                        disabled={steps[idx - 1]?.type === 'draft'}
                      >
                        위로
                      </S.ALSmallBtn>
                      <S.ALSmallBtn
                        type="button"
                        aria-label="행 아래로 이동"
                        onClick={() => moveStep(s.id, 'down')}
                        disabled={idx === steps.length - 1}
                      >
                        아래로
                      </S.ALSmallBtn>
                      <S.ALSmallBtn
                        type="button"
                        aria-label="행 삭제"
                        onClick={() => removeStep(s.id)}
                      >
                        삭제
                      </S.ALSmallBtn>
                    </>
                  )}
                </S.ALActionsCell>
              </S.ALRow>
            ))}
          </S.ALTable>
        </S.ALBox>

        <S.EditorCard>
          <S.EditorToolbar>
            <S.ToolGroup>
              <S.ToolIcon
                type="button"
                title="굵게"
                onClick={() =>
                  editor && editor.chain().focus().toggleBold().run()
                }
              >
                B
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="기울임"
                onClick={() =>
                  editor && editor.chain().focus().toggleItalic().run()
                }
              >
                I
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="밑줄"
                onClick={() =>
                  editor && editor.chain().focus().toggleUnderline().run()
                }
              >
                U
              </S.ToolIcon>
              <S.Separator />
              <S.ToolIcon
                type="button"
                title="왼쪽 정렬"
                onClick={() =>
                  editor && editor.chain().focus().setTextAlign('left').run()
                }
              >
                <img src={LeftSort} alt="" aria-hidden />
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="가운데 정렬"
                onClick={() =>
                  editor && editor.chain().focus().setTextAlign('center').run()
                }
              >
                <img src={CenterSort} alt="" aria-hidden />
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="오른쪽 정렬"
                onClick={() =>
                  editor && editor.chain().focus().setTextAlign('right').run()
                }
              >
                <img src={RightSort} alt="" aria-hidden />
              </S.ToolIcon>
            </S.ToolGroup>
          </S.EditorToolbar>

          <div style={{ padding: 14, minHeight: 220 }}>
            <EditorContent editor={editor} className="tiptap" />
          </div>
        </S.EditorCard>

        {pickerOpen && (
          <S.ModalScrim onClick={closePicker}>
            <S.ModalCard onClick={(e) => e.stopPropagation()}>
              <S.ModalHead>
                <div>결재선 설정</div>
              </S.ModalHead>

              <S.ModalToolbar>
                <S.SearchInput
                  placeholder="검색어를 입력해주세요. (성명/직책/부서)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </S.ModalToolbar>

              <S.ModalBody2>
                <S.TreePanel aria-label="조직 트리">
                  <S.PanelHead>조직</S.PanelHead>
                  <S.TreeScroll>
                    {ORG_TREE.length ? (
                      renderTree(ORG_TREE)
                    ) : (
                      <div>조직 없음</div>
                    )}
                  </S.TreeScroll>
                </S.TreePanel>

                <S.ListPanel aria-label="사원 목록">
                  <S.TableLike>
                    <S.TableHead>
                      <div>성명</div>
                      <div>직책</div>
                      <div>부서</div>
                    </S.TableHead>
                    <S.TableBody>
                      {peopleLoading ? (
                        <S.TableRow data-full="true">
                          <div>로딩중…</div>
                        </S.TableRow>
                      ) : visiblePeople.length === 0 ? (
                        <S.TableRow data-full="true">
                          <div>결과 없음</div>
                        </S.TableRow>
                      ) : (
                        visiblePeople.map((p) => {
                          const active =
                            selectedPerson?.accountId === p.accountId;
                          return (
                            <S.TableRow
                              key={p.accountId}
                              data-active={active || undefined}
                              onClick={() => pickPerson(p)}
                              onDoubleClick={() => {
                                pickPerson(p);
                                confirmPick();
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <div>{p.name}</div>
                              <div>{p.rank || '-'}</div>
                              <div>{p.deptName || '-'}</div>
                            </S.TableRow>
                          );
                        })
                      )}
                    </S.TableBody>
                  </S.TableLike>
                </S.ListPanel>
              </S.ModalBody2>

              <S.ModalFoot>
                <div>
                  <S.ConfirmBtn type="button" onClick={confirmPick}>
                    확인
                  </S.ConfirmBtn>
                  <S.CancelBtn type="button" onClick={closePicker}>
                    취소
                  </S.CancelBtn>
                </div>
              </S.ModalFoot>
            </S.ModalCard>
          </S.ModalScrim>
        )}

        {confirmType && (
          <S.ConfirmScrim onClick={closeConfirm}>
            <S.ConfirmCard
              onClick={(e) => e.stopPropagation()}
              data-variant={
                confirmType === 'cancel'
                  ? 'warning'
                  : confirmType === 'submit'
                    ? 'primary'
                    : 'neutral'
              }
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
            >
              <S.ConfirmHead>
                <S.ConfirmTitle id="confirm-title">
                  {confirmType === 'cancel' && '작성 취소'}
                  {confirmType === 'draft' && '임시저장'}
                  {confirmType === 'submit' && '상신 확인'}
                  {confirmType === 'template' && '문서 분류 변경'}
                </S.ConfirmTitle>
              </S.ConfirmHead>

              <S.ConfirmBody>
                {confirmType === 'cancel' && (
                  <S.ConfirmMsg data-accent="warning">
                    작성 중인 내용이 저장되지 않은 채 취소됩니다.
                  </S.ConfirmMsg>
                )}
                {confirmType === 'draft' && (
                  <S.ConfirmMsg>현재 내용을 임시저장합니다.</S.ConfirmMsg>
                )}
                {confirmType === 'submit' && (
                  <>
                    <S.ConfirmMsg data-accent="primary">
                      본 문서를 상신하시겠습니까?
                    </S.ConfirmMsg>
                    <div style={{ marginTop: 12 }}>
                      <S.Input
                        as="textarea"
                        rows={3}
                        placeholder="결재자에게 남길 코멘트를 입력하세요."
                        value={submitComment}
                        onChange={(e) => setSubmitComment(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {confirmType === 'template' && (
                  <S.ConfirmMsg>
                    <strong>문서 분류</strong>를 변경하면 본문이 초기화 됩니다.
                  </S.ConfirmMsg>
                )}
              </S.ConfirmBody>

              <S.ConfirmFoot>
                <S.SecondaryBtn type="button" onClick={closeConfirm}>
                  닫기
                </S.SecondaryBtn>
                <S.PrimaryBtn
                  type="button"
                  onClick={runConfirmAction}
                  disabled={busy}
                >
                  확인
                </S.PrimaryBtn>
              </S.ConfirmFoot>
            </S.ConfirmCard>
          </S.ConfirmScrim>
        )}

        {/* 🔹 문제 사례 리스트 모달 (z-index: 900) */}
        {problemModalOpen && (
          <S.ProblemScrim onClick={() => setProblemModalOpen(false)}>
            <S.ConfirmCard
              onClick={(e) => e.stopPropagation()}
              data-variant="neutral"
              role="dialog"
              aria-modal="true"
              aria-labelledby="problem-modal-title"
              style={{ maxWidth: 720, width: '90%', maxHeight: '80vh' }}
            >
              <S.ConfirmHead>
                <S.ConfirmTitle id="problem-modal-title">
                  문제 사례 목록
                </S.ConfirmTitle>
              </S.ConfirmHead>

              <S.ConfirmBody>
                {isLoadingProblemCategories || isLoadingProblems ? (
                  <S.ConfirmMsg>문제 사례를 불러오는 중입니다…</S.ConfirmMsg>
                ) : problemCategories.length === 0 ? (
                  <S.ConfirmMsg>등록된 문제 유형이 없습니다.</S.ConfirmMsg>
                ) : (
                  <PT.TreeContainer
                    style={{
                      maxHeight: '55vh',
                      overflowY: 'auto',
                    }}
                  >
                    {problemCategories.map((category) => {
                      const isExpanded = expandedProblemTypes.has(category.id);
                      const problemsInCategory =
                        categoryProblemsMap.get(category.id) || [];

                      return (
                        <div key={category.id}>
                          <PT.TreeItem
                            $selected={false}
                            onClick={() => toggleProblemCategory(category.id)}
                          >
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                            <PT.TreeItemText>{category.title}</PT.TreeItemText>
                            <PT.TreeItemCount>
                              {problemsInCategory.length}
                            </PT.TreeItemCount>
                          </PT.TreeItem>

                          {isExpanded && (
                            <PT.ChildrenContainer>
                              {problemsInCategory.map((problem) => (
                                <PT.ChildItem
                                  key={problem.id}
                                  onClick={() =>
                                    handleOpenProblemDetail(problem.id)
                                  }
                                >
                                  {problem.title}
                                </PT.ChildItem>
                              ))}
                            </PT.ChildrenContainer>
                          )}
                        </div>
                      );
                    })}
                  </PT.TreeContainer>
                )}
              </S.ConfirmBody>

              <S.ConfirmFoot>
                <S.SecondaryBtn
                  type="button"
                  onClick={() => setProblemModalOpen(false)}
                >
                  닫기
                </S.SecondaryBtn>
              </S.ConfirmFoot>
            </S.ConfirmCard>
          </S.ProblemScrim>
        )}

        <ProblemCaseDetailModal
          isOpen={!!selectedProblemId}
          onClose={handleCloseProblemDetail}
          problemId={selectedProblemId}
          showActions={false}
        />
      </S.Panel>
    </S.Wrap>
  );
}
