import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useCallback, useMemo, useEffect } from 'react';

import * as S from './ApprovalForm.styles';

import LeftSort from '/icons/left-sort.svg';
import CenterSort from '/icons/center-sort.svg';
import RightSort from '/icons/right-sort.svg';

const DOC_TYPES = ['작업 계획서', '결과 보고서'];

const STEP_TYPES = [
  { value: 'draft', label: '기안' },
  { value: 'approve', label: '결재' },
  { value: 'consent', label: '합의' },
  { value: 'cc', label: '참조' },
];

const TEMPLATES = {
  '작업 계획서': {
    design: `
      <h2>작업 계획서</h2>
      <h3>1. 개요</h3>
      <p>프로젝트(작업) 개요를 간단히 작성합니다.</p>
      <h3>2. 목표</h3>
      <ul>
        <li>핵심 목표 1</li>
        <li>핵심 목표 2</li>
      </ul>
      <h3>3. 일정</h3>
      <p>YYYY-MM-DD ~ YYYY-MM-DD</p>
      <h3>4. 담당자</h3>
      <p>담당/협업 부서 및 인원</p>
      <h3>5. 수행 내용</h3>
      <ul>
        <li> 수행 항목 1</li>
      </ul>
      <h3>6. 리스크</h3>
      <ul>
        <li>리스크 항목 1 – 방안</li>
      </ul>
      <h3>7. 백업</h3>
      <ul>
        <li>백업 항목 1 – 백업 방안</li>
      </ul>
      <h3>8. 실패 시 복구 방안</h3>
      <ul>
        <li>복구 항목 1 – 복구 방안</li>
      </ul>
    `,
    html: `
    <h2>작업 계획서</h2>
    <h3>1. 개요</h3>
    <p>프로젝트(작업) 개요를 간단히 작성합니다.</p>
    <h3>2. 목표</h3>
    <ul>
      <li>핵심 목표 1</li>
      <li>핵심 목표 2</li>
    </ul>
    <h3>3. 일정</h3>
    <p>YYYY-MM-DD ~ YYYY-MM-DD</p>
    <h3>4. 담당자</h3>
    <p>담당/협업 부서 및 인원</p>
    <h3>5. 수행 내용</h3>
    <ul>
      <li> 수행 항목 1</li>
    </ul>
    <h3>6. 리스크</h3>
    <ul>
      <li>리스크 항목 1 – 방안</li>
    </ul>
    <h3>7. 백업</h3>
    <ul>
      <li>백업 항목 1 – 백업 방안</li>
    </ul>
    <h3>8. 실패 시 복구 방안</h3>
    <ul>
      <li>복구 항목 1 – 복구 방안</li>
    </ul>
    `,
  },
  '결과 보고서': {
    design: `
      <h2>결과 보고서</h2>
      <h3>1. 요약</h3>
      <p>진행 결과를 요약합니다.</p>
      <h3>2. 상세 결과</h3>
      <ul>
        <li>성과 지표 1</li>
        <li>성과 지표 2</li>
      </ul>
      <h3>3. 특이사항</h3>
      <p>특이사항 내역</p>
      <h3>4. 추후 계획</h3>
      <p>추가 조치/개선 계획</p>
      <h3>5. 실패 복구 사항</h3>
      <p>복구 내용</p>
    `,
    html: `
    <h2>결과 보고서</h2>
    <h3>1. 요약</h3>
    <p>진행 결과를 요약합니다.</p>
    <h3>2. 상세 결과</h3>
    <ul>
      <li>성과 지표 1</li>
      <li>성과 지표 2</li>
    </ul>
    <h3>3. 특이사항</h3>
    <p>특이사항 내역</p>
    <h3>4. 추후 계획</h3>
    <p>추가 조치/개선 계획</p>
    <h3>5. 실패 복구 사항</h3>
    <p>복구 내용</p>
    `,
  },
};

const PEOPLE = [
  {
    id: 'S0001',
    name: '김민호',
    rank: '사원',
    deptCode: 'DV1',
    deptName: '개발1팀',
  },
  {
    id: 'S0002',
    name: '이원석',
    rank: '과장',
    deptCode: 'DES',
    deptName: '디자인팀',
  },
  {
    id: 'S0003',
    name: '강지현',
    rank: '부장',
    deptCode: 'DV2',
    deptName: '개발2팀',
  },
  {
    id: 'S0004',
    name: '박서윤',
    rank: '사원',
    deptCode: 'DV1',
    deptName: '개발1팀',
  },
  {
    id: 'S0005',
    name: '최유나',
    rank: '부장',
    deptCode: 'MKT',
    deptName: '마케팅팀',
  },
  {
    id: 'S0006',
    name: '최기명',
    rank: '과장',
    deptCode: 'HR',
    deptName: '인사팀',
  },
  {
    id: 'S0007',
    name: '최기명',
    rank: '사원',
    deptCode: 'HR',
    deptName: '인사팀',
  },
  {
    id: 'S0008',
    name: '최기명',
    rank: '부장',
    deptCode: 'HR',
    deptName: '인사팀',
  },
  {
    id: 'S0009',
    name: '최기명',
    rank: '임원',
    deptCode: 'HR',
    deptName: '인사팀',
  },
];

export default function ApprovalForm({
  initial = {},
  onSubmit = (payload) => console.log('SUBMIT', payload),
  onSaveDraft = (payload) => console.log('DRAFT', payload),
  onCancel = () => window.history.back(),
}) {
  const [dept, setDept] = useState(initial.dept ?? '개발1팀');
  const [position] = useState(initial.position ?? '사원');
  const [drafter, setDrafter] = useState(initial.drafter ?? '김민호');
  const [draftDate, setDraftDate] = useState(initial.draftDate ?? '2025-10-27');
  const [docType, setDocType] = useState(initial.docType ?? DOC_TYPES[0]);
  const [title, setTitle] = useState(initial.title ?? '');

  const [htmlText, setHtmlText] = useState(
    initial.htmlText ?? TEMPLATES[docType]?.html?.trim() ?? '',
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

  const openConfirm = (t) => setConfirmType(t);
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

  const [steps, setSteps] = useState(
    initial.steps ?? [
      {
        id: crypto.randomUUID(),
        type: 'draft',
        dept: dept,
        name: drafter,
        rank: position,
        opinion: '',
      },
      {
        id: crypto.randomUUID(),
        type: 'approve',
        dept: '연구소',
        name: '',
        rank: '',
        opinion: '',
      },
    ],
  );

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
      };
      if (
        first.type === next0.type &&
        first.dept === next0.dept &&
        first.name === next0.name &&
        first.rank === next0.rank
      )
        return prev;
      const arr = [...prev];
      arr[0] = next0;
      return arr;
    });
  }, [dept, drafter, position]);

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
      },
    ]);

  const patchStep = (id, patch) =>
    setSteps((prev) =>
      prev.map((s, i) => {
        if (i === 0) return { ...s, type: 'draft' };
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

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStepId, setPickerStepId] = useState(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(new Set(['HQ', 'DV']));
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  const ORG = useMemo(
    () => [
      {
        code: 'HQ',
        name: '본사',
        children: [
          { code: 'HR', name: '인사팀' },
          { code: 'ACC', name: '재무회계팀' },
          {
            code: 'DV',
            name: '개발팀',
            children: [
              { code: 'DV1', name: '개발1팀' },
              { code: 'DV2', name: '개발2팀' },
            ],
          },
          { code: 'DES', name: '디자인팀' },
          { code: 'MKT', name: '마케팅팀' },
        ],
      },
    ],
    [],
  );

  const collectDeptCodes = useCallback((nodes, code) => {
    const findNode = (arr, c) => {
      for (const n of arr) {
        if (n.code === c) return n;
        if (n.children) {
          const hit = findNode(n.children, c);
          if (hit) return hit;
        }
      }
      return null;
    };
    const start = findNode(nodes, code);
    if (!start) return new Set([code]);
    const set = new Set();
    const dfs = (n) => {
      set.add(n.code);
      (n.children || []).forEach(dfs);
    };
    dfs(start);
    return set;
  }, []);

  const toggleNode = (code) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(code) ? n.delete(code) : n.add(code);
      return n;
    });
  };

  const openPicker = (stepId) => {
    setPickerStepId(stepId);
    setQuery('');
    setSelectedDept(null);
    setSelectedPersonId(null);
    setPickerOpen(true);
  };
  const closePicker = () => setPickerOpen(false);

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = PEOPLE;
    if (selectedDept) {
      const allowed = collectDeptCodes(ORG, selectedDept);
      base = base.filter((p) => allowed.has(p.deptCode));
    }
    if (!q) return base;
    return base.filter((p) =>
      `${p.id} ${p.name} ${p.rank} ${p.deptName} ${p.deptCode}`
        .toLowerCase()
        .includes(q),
    );
  }, [query, selectedDept, collectDeptCodes, ORG]);

  const pickPerson = (p) => setSelectedPersonId(p.id);
  const confirmPick = () => {
    const p = PEOPLE.find((x) => x.id === selectedPersonId);
    if (!p) return alert('사원을 선택하세요.');
    setSteps((prev) =>
      prev.map((s) =>
        s.id === pickerStepId
          ? { ...s, dept: p.deptName, name: p.name, rank: p.rank }
          : s,
      ),
    );
    setPickerOpen(false);
  };

  useEffect(() => {
    if (!pickerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [pickerOpen]);

  const renderTree = (nodes) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {nodes.map((n) => {
        const hasChildren = Array.isArray(n.children) && n.children.length > 0;
        const open = expanded.has(n.code);
        const active = selectedDept === n.code || selectedDept === n.name;
        return (
          <li key={n.code}>
            <S.TreeRow
              data-active={active || undefined}
              onClick={() => {
                setSelectedDept(n.code);
              }}
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
    meta: { dept, position, drafter, draftDate, docType, title },
    body: htmlText,
    bodyMode: 'design',
    approvalLine: steps.map((s) =>
      Object.fromEntries(Object.entries(s).filter(([k]) => k !== 'id')),
    ),
  });

  const attachCount = 0;

  const validateBeforeSubmit = () => {
    if (!title.trim()) return '제목을 입력하세요.';
    if (approverCount < 1) return '결재/합의 단계가 1명 이상 필요합니다.';
    if (
      steps.some(
        (s) =>
          (s.type === 'approve' || s.type === 'consent') &&
          !String(s.name || '').trim(),
      )
    ) {
      return '결재/합의 대상자의 성명을 입력하세요.';
    }
    return null;
  };

  const runConfirmAction = () => {
    if (confirmType === 'cancel') {
      closeConfirm();
      onCancel();
      return;
    }
    if (confirmType === 'draft') {
      closeConfirm();
      onSaveDraft(payload());
      return;
    }
    if (confirmType === 'submit') {
      const msg = validateBeforeSubmit();
      if (msg) {
        alert(msg);
        return;
      }
      closeConfirm();
      onSubmit(payload());
      return;
    }
    if (confirmType === 'template' && pendingDocType) {
      applyTemplate(pendingDocType);
      closeConfirm();
      return;
    }
  };

  const cmd = (fn) => editor && fn(editor);

  return (
    <S.Wrap>
      <S.Panel as="form" onSubmit={(e) => e.preventDefault()}>
        <S.DocTitle>보고서</S.DocTitle>
        <S.Toolbar>
          <S.ToolRight>
            <S.ToolBtn type="button" onClick={() => openConfirm('cancel')}>
              취소
            </S.ToolBtn>
            <S.ToolBtn type="button" onClick={() => openConfirm('draft')}>
              임시저장
            </S.ToolBtn>
            <S.PrimaryBtn type="button" onClick={() => openConfirm('submit')}>
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
              <S.Select
                value={docType}
                onChange={(e) => requestTemplateChange(e.target.value)}
              >
                {DOC_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </S.Select>
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>제 목</S.MetaTh>
            <S.MetaTd colSpan={3}>
              <S.Input
                placeholder="제목을 입력하세요."
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
                    <S.Select value="draft" disabled data-nocaret="true">
                      <option value="draft">기안</option>
                    </S.Select>
                  ) : (
                    <S.Select
                      value={s.type}
                      onChange={(e) =>
                        patchStep(s.id, { type: e.target.value })
                      }
                    >
                      {STEP_TYPES.filter((t) => t.value !== 'draft').map(
                        (t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ),
                      )}
                    </S.Select>
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
                  cmd((ed) => ed.chain().focus().toggleBold().run())
                }
              >
                B
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="기울임"
                onClick={() =>
                  cmd((ed) => ed.chain().focus().toggleItalic().run())
                }
              >
                I
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="밑줄"
                onClick={() =>
                  cmd((ed) => ed.chain().focus().toggleUnderline().run())
                }
              >
                U
              </S.ToolIcon>
              <S.Separator />
              <S.ToolIcon
                type="button"
                title="왼쪽 정렬"
                onClick={() =>
                  cmd((ed) => ed.chain().focus().setTextAlign('left').run())
                }
              >
                <img src={LeftSort} alt="" aria-hidden />
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="가운데 정렬"
                onClick={() =>
                  cmd((ed) => ed.chain().focus().setTextAlign('center').run())
                }
              >
                <img src={CenterSort} alt="" aria-hidden />
              </S.ToolIcon>
              <S.ToolIcon
                type="button"
                title="오른쪽 정렬"
                onClick={() =>
                  cmd((ed) => ed.chain().focus().setTextAlign('right').run())
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
                  <S.TreeScroll>{renderTree(ORG)}</S.TreeScroll>
                </S.TreePanel>

                <S.ListPanel aria-label="사원 목록">
                  <S.TableLike>
                    <S.TableHead>
                      <div>성명</div>
                      <div>직책</div>
                      <div>부서</div>
                    </S.TableHead>
                    <S.TableBody>
                      {filteredPeople.map((p) => {
                        const active = selectedPersonId === p.id;
                        return (
                          <S.TableRow
                            key={p.id}
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
                            <div>{p.rank}</div>
                            <div>{p.deptName}</div>
                          </S.TableRow>
                        );
                      })}
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
                  <>
                    <S.ConfirmMsg data-accent="warning">
                      작성 중인 내용이 저장되지 않은 채 취소됩니다.
                    </S.ConfirmMsg>
                    <S.SummaryKV>
                      <S.K>문서제목</S.K>
                      <S.V>{title?.trim() || '—'}</S.V>
                    </S.SummaryKV>
                  </>
                )}

                {confirmType === 'draft' && (
                  <>
                    <S.ConfirmMsg>현재 내용을 임시저장합니다.</S.ConfirmMsg>
                    <S.SummaryKV>
                      <S.K>문서제목</S.K>
                      <S.V>{title?.trim() || '—'}</S.V>
                      <S.K>첨부</S.K>
                      <S.V>{attachCount}개</S.V>
                    </S.SummaryKV>
                  </>
                )}

                {confirmType === 'submit' && (
                  <>
                    <S.ConfirmMsg data-accent="primary">
                      본 문서를 상신하시겠습니까?
                    </S.ConfirmMsg>
                    <S.SummaryKV>
                      <S.K>문서제목</S.K>
                      <S.V>{title?.trim() || '—'}</S.V>
                      <S.K>결재/합의 단계</S.K>
                      <S.V>{approverCount}건</S.V>
                      <S.K>기안부서</S.K>
                      <S.V>{dept}</S.V>
                      <S.K>기안자</S.K>
                      <S.V>{drafter}</S.V>
                    </S.SummaryKV>
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
                <S.PrimaryBtn type="button" onClick={runConfirmAction}>
                  확인
                </S.PrimaryBtn>
              </S.ConfirmFoot>
            </S.ConfirmCard>
          </S.ConfirmScrim>
        )}
      </S.Panel>
    </S.Wrap>
  );
}
