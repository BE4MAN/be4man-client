import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import * as S from './ApprovalDetail.styles';

const FALLBACK_DETAIL = {
  id: '-',
  title: '제목 없음',
  type: '작업 계획서',
  dept: '개발1팀',
  drafter: '김푸름',
  draftedAt: '2025-07-25T14:32:00+09:00',
  retention: '5년',
  docType: '작업 계획서',
  body: `
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
  attachments: [],
  sections: [],
  approvalLine: [
    {
      type: 'draft',
      dept: '개발1팀',
      name: '김민호',
      rank: '사원',
      status: '완료',
      approvedAt: '2025-07-25T14:32:00+09:00',
      comment: '유저 서비스 배포 계획서 상신 드립니다.',
    },
    {
      type: 'approve',
      dept: '개발2팀',
      name: '이원석',
      rank: '과장',
      status: '진행',
      approvedAt: null,
      comment: '',
    },
    {
      type: 'consent',
      dept: '개발1팀',
      name: '강지현',
      rank: '부장',
      status: '대기',
      approvedAt: null,
      comment: '',
    },
  ],
};

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

export default function ApprovalDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    if (state?.__isFull) {
      setData(state);
      return;
    }
    const composed = {
      ...FALLBACK_DETAIL,
      id: id ?? FALLBACK_DETAIL.id,
      title: state?.title ?? FALLBACK_DETAIL.title,
      drafter: state?.drafter ?? FALLBACK_DETAIL.drafter,
      draftedAt: state?.draftedAt ?? FALLBACK_DETAIL.draftedAt,
      type: state?.type ?? FALLBACK_DETAIL.type,
    };
    setData(composed);
  }, [id, state]);

  if (!data) return null;

  return (
    <S.Wrap>
      <S.Panel>
        <S.HeaderRow>
          <S.PrimaryBtn onClick={() => setShowLine(true)}>
            결재라인
          </S.PrimaryBtn>
          <S.SubtleBtn onClick={() => navigate(-1)}>뒤로가기</S.SubtleBtn>
        </S.HeaderRow>

        <S.InfoTable role="table" aria-label="기본 정보">
          <S.InfoColGroup>
            <col />
            <col />
            <col />
            <col />
          </S.InfoColGroup>

          <S.InfoRow role="row">
            <S.InfoTh role="columnheader">기안부서</S.InfoTh>
            <S.InfoTd role="cell">{data.dept}</S.InfoTd>
            <S.InfoTh role="columnheader">기안자</S.InfoTh>
            <S.InfoTd role="cell">{data.drafter}</S.InfoTd>
          </S.InfoRow>

          <S.InfoRow role="row">
            <S.InfoTh role="columnheader">기안일자</S.InfoTh>
            <S.InfoTd role="cell">{formatYmd(data.draftedAt)}</S.InfoTd>
            <S.InfoTh data-bb role="columnheader">
              문서분류
            </S.InfoTh>
            <S.InfoTd data-bb role="cell">
              {data.docType}
            </S.InfoTd>
          </S.InfoRow>

          <S.InfoRow role="row">
            <S.InfoTh role="columnheader">제 목</S.InfoTh>
            <S.InfoTd role="cell" colSpan={3}>
              {data.title}
            </S.InfoTd>
          </S.InfoRow>
        </S.InfoTable>

        <S.Section>
          <S.BodyViewer
            dangerouslySetInnerHTML={{
              __html: data.body || '<p>(내용 없음)</p>',
            }}
          />
        </S.Section>
      </S.Panel>

      {showLine && (
        <S.ModalOverlay
          onClick={() => setShowLine(false)}
          role="dialog"
          aria-modal="true"
        >
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>결재라인</S.ModalTitle>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ALTable role="table" aria-label="결재라인">
                <S.ALHeadRow role="row" data-head>
                  <S.ALCell role="columnheader">유형</S.ALCell>
                  <S.ALCell role="columnheader">부서명</S.ALCell>
                  <S.ALCell role="columnheader">성명</S.ALCell>
                  <S.ALCell role="columnheader">직책</S.ALCell>
                  <S.ALCell role="columnheader">상태</S.ALCell>
                  <S.ALCell role="columnheader">처리 이력</S.ALCell>
                  <S.ALCell role="columnheader" data-col="comment">
                    코멘트
                  </S.ALCell>
                </S.ALHeadRow>

                {(data.approvalLine || []).map((s, i) => (
                  <S.ALRow key={`${s.name}-${i}`} role="row">
                    <S.ALCell role="cell">
                      {TYPE_LABEL[s.type] ?? s.type}
                    </S.ALCell>
                    <S.ALCell role="cell">{s.dept}</S.ALCell>
                    <S.ALCell role="cell">{s.name}</S.ALCell>
                    <S.ALCell role="cell">{s.rank}</S.ALCell>
                    <S.ALCell role="cell">{s.status || '대기'}</S.ALCell>
                    <S.ALCell role="cell">
                      {s.approvedAt ? formatYmd(s.approvedAt) : '-'}
                    </S.ALCell>
                    <S.ALCell role="cell" data-col="comment">
                      <S.CommentText>
                        {s.comment?.trim() ? s.comment : ''}
                      </S.CommentText>
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
    </S.Wrap>
  );
}
