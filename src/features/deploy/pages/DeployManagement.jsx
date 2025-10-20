import { useMemo, useState, useCallback } from 'react';

import {
  MOCK_LIST,
  MOCK_DETAIL,
  MOCK_APPLY_LIST,
  statusKey,
  buildDetailFromItem,
} from '../../../mock/deploy';

import * as S from './DeployManagement.styles';
import JenkinsPanel from './JenkinsPanel';

const TAB = { ALL: 'all', PENDING: 'pending', DEPLOYED: 'deployed' };
const TOP = { DEPLOY: 'deploy', APPLY: 'apply' };

export default function DeployManagement({
  list: listProp = MOCK_LIST,
  detail: detailProp = MOCK_DETAIL,
  applyList: applyListProp = MOCK_APPLY_LIST,
  onApprove = () => {},
  onReject = () => {},
}) {
  const [topTab, setTopTab] = useState(TOP.DEPLOY);
  const [items, setItems] = useState(listProp);
  const [applyItems, setApplyItems] = useState(applyListProp);
  const [showApplyPage, setShowApplyPage] = useState(false);
  const sourceItems = topTab === TOP.DEPLOY ? items : applyItems;
  const [activeTab, setActiveTab] = useState(TAB.ALL);
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const [detail, setDetail] = useState(
    buildDetailFromItem(items[0] ?? {}, detailProp),
  );

  const [view, setView] = useState('pr');

  const filtered = useMemo(() => {
    const list = sourceItems;
    if (activeTab === TAB.ALL) return list;
    if (activeTab === TAB.PENDING)
      return list.filter((i) => i.status === '승인대기');
    if (activeTab === TAB.DEPLOYED)
      return list.filter((i) => i.status === '배포완료');
    return list;
  }, [sourceItems, activeTab]);

  const handleSelect = useCallback(
    (item) => {
      setSelectedId(item.id);
      setDetail(buildDetailFromItem(item, detailProp));
      if (topTab === TOP.APPLY) setShowApplyPage(false);
    },
    [detailProp, topTab],
  );

  const handleTopTab = useCallback(
    (tab) => {
      setTopTab(tab);
      setShowApplyPage(false);
      setView('pr');
      const base = tab === TOP.DEPLOY ? items : applyItems;
      setActiveTab(TAB.ALL);
      if (base.length) {
        setSelectedId(base[0].id);
        setDetail(buildDetailFromItem(base[0], detailProp));
      } else {
        setSelectedId(null);
        setDetail(detailProp);
      }
    },
    [items, applyItems, detailProp],
  );

  const handleTab = useCallback(
    (tab) => {
      setActiveTab(tab);
      setShowApplyPage(false);
      const list = sourceItems;
      const next =
        tab === TAB.ALL
          ? list
          : tab === TAB.PENDING
            ? list.filter((i) => i.status === '승인대기')
            : list.filter((i) => i.status === '배포완료');
      if (next.length) {
        setSelectedId(next[0].id);
        setDetail(buildDetailFromItem(next[0], detailProp));
      } else {
        setSelectedId(null);
        setDetail(detailProp);
      }
    },
    [sourceItems, detailProp],
  );

  const approveSelected = useCallback(() => {
    if (topTab === TOP.APPLY) {
      setApplyItems((prev) =>
        prev.map((it) =>
          it.id === selectedId ? { ...it, status: '승인완료' } : it,
        ),
      );
    } else {
      setItems((prev) =>
        prev.map((it) =>
          it.id === selectedId ? { ...it, status: '승인완료' } : it,
        ),
      );
    }
    setDetail((d) => ({ ...d, status: '승인완료' }));
    onApprove(selectedId);
  }, [selectedId, topTab, onApprove]);

  const rejectSelected = useCallback(() => {
    if (topTab === TOP.APPLY) {
      setApplyItems((prev) =>
        prev.map((it) =>
          it.id === selectedId ? { ...it, status: '반려' } : it,
        ),
      );
    } else {
      setItems((prev) =>
        prev.map((it) =>
          it.id === selectedId ? { ...it, status: '반려' } : it,
        ),
      );
    }
    setDetail((d) => ({ ...d, status: '반려' }));
    onReject(selectedId);
  }, [selectedId, topTab, onReject]);

  return (
    <S.Wrap>
      <S.Side>
        <S.SideHeader>
          <S.SideTop>
            <S.TopTab
              type="button"
              aria-pressed={topTab === TOP.DEPLOY}
              $active={topTab === TOP.DEPLOY}
              onClick={() => handleTopTab(TOP.DEPLOY)}
            >
              배포 목록
            </S.TopTab>
            <S.TopTab
              type="button"
              aria-pressed={topTab === TOP.APPLY}
              $active={topTab === TOP.APPLY}
              onClick={() => handleTopTab(TOP.APPLY)}
            >
              작업 신청 목록
            </S.TopTab>
          </S.SideTop>
          <S.SideBottom>
            <S.SideTabs>
              <S.SideTab
                $active={activeTab === TAB.ALL}
                onClick={() => handleTab(TAB.ALL)}
              >
                전체
              </S.SideTab>
              <S.SideTab
                $active={activeTab === TAB.PENDING}
                onClick={() => handleTab(TAB.PENDING)}
              >
                대기
              </S.SideTab>
              {topTab === TOP.DEPLOY && (
                <S.SideTab
                  $active={activeTab === TAB.DEPLOYED}
                  onClick={() => handleTab(TAB.DEPLOYED)}
                >
                  배포
                </S.SideTab>
              )}
            </S.SideTabs>
            <S.SideCount>{filtered.length}</S.SideCount>
          </S.SideBottom>
        </S.SideHeader>

        <S.SideBody>
          {filtered.length === 0 ? (
            <S.Empty>
              {topTab === TOP.APPLY
                ? '신청 목록이 비어 있습니다.'
                : '배포 목록이 비어 있습니다.'}
            </S.Empty>
          ) : (
            <S.List role="list">
              {filtered.map((it) => {
                const isActive = it.id === selectedId;
                const st = statusKey(it.status);
                return (
                  <S.ListItem
                    role="listitem"
                    key={it.id}
                    onClick={() => handleSelect(it)}
                    aria-selected={isActive}
                    data-active={isActive ? 'true' : undefined}
                  >
                    <S.ItemTop>
                      <S.ItemBranch $status={st}>{it.branch}</S.ItemBranch>
                      <S.StatusBadge $status={st}>{it.status}</S.StatusBadge>
                    </S.ItemTop>
                    <S.ItemTitle>{it.title}</S.ItemTitle>
                    <S.ItemBottom>
                      <S.ItemMeta>
                        <span>{it.votes}</span>
                        <span>•</span>
                        <span>{it.comments}</span>
                        <span>•</span>
                        <span>{it.hours}</span>
                      </S.ItemMeta>
                      {/* <S.RiskChip $risk={it.risk}>{it.risk}</S.RiskChip> */}
                    </S.ItemBottom>
                  </S.ListItem>
                );
              })}
            </S.List>
          )}
        </S.SideBody>
        <S.SideFooter>
          <S.ApplyBtn
            type="button"
            onClick={() => {
              if (topTab !== TOP.APPLY) handleTopTab(TOP.APPLY);
              setShowApplyPage(true);
            }}
          >
            배포 작업 신청
          </S.ApplyBtn>
        </S.SideFooter>
      </S.Side>

      <S.Main>
        {topTab === TOP.DEPLOY ? (
          <>
            <S.LabelBar>
              <S.PRLabel
                role="button"
                tabIndex={0}
                aria-pressed={view === 'pr'}
                $active={view === 'pr'}
                onClick={() => setView('pr')}
              >
                PR
              </S.PRLabel>
              <S.JenkinsLabel
                role="button"
                tabIndex={0}
                aria-pressed={view === 'jenkins'}
                $active={view === 'jenkins'}
                onClick={() => setView('jenkins')}
              >
                Jenkins
              </S.JenkinsLabel>
            </S.LabelBar>

            {view === 'pr' ? (
              <>
                <S.Panel>
                  <S.TitleRow>
                    <S.TitleLeft>
                      <h2>{detail.title}</h2>
                      <S.MetaLabel>
                        {detail.branchFrom} → {detail.branchTo}
                      </S.MetaLabel>
                    </S.TitleLeft>
                    <S.TitleRight>
                      <S.PanelHeader>
                        <S.ActionRow>
                          <S.ApproveBtn type="button" onClick={approveSelected}>
                            승인
                          </S.ApproveBtn>
                          <S.RejectBtn type="button" onClick={rejectSelected}>
                            거절
                          </S.RejectBtn>
                        </S.ActionRow>
                      </S.PanelHeader>
                    </S.TitleRight>
                  </S.TitleRow>

                  <S.SubMeta>
                    <S.MetaItem>
                      <S.MetaLabel>Author</S.MetaLabel>
                      <S.MetaValue>{detail.author}</S.MetaValue>
                    </S.MetaItem>
                    <S.MetaItem>
                      <S.MetaLabel>Created</S.MetaLabel>
                      <S.MetaValue as="time">{detail.createdAt}</S.MetaValue>
                    </S.MetaItem>
                    <S.MetaRight>
                      <S.MetaLabel>Status</S.MetaLabel>
                      <S.StatusBadge $status={statusKey(detail.status)}>
                        {detail.status}
                      </S.StatusBadge>
                    </S.MetaRight>
                  </S.SubMeta>

                  <S.Section>
                    <S.SectionTitle>Description</S.SectionTitle>
                    <S.SectionBody>{detail.description}</S.SectionBody>
                  </S.Section>

                  <S.Metrics>
                    {detail.metrics.map((m) => (
                      <S.MetricCard key={m.label}>
                        <small>{m.label}</small>
                        <strong>{m.value}</strong>
                      </S.MetricCard>
                    ))}
                  </S.Metrics>
                </S.Panel>

                <S.Row>
                  <S.LeftCol>
                    <S.Card>
                      <S.CardTitle>프로젝트 의존성</S.CardTitle>
                      <S.RelatedProjectArea>
                        <S.DepTableInner>
                          <S.DepHeader>
                            <div>프로젝트</div>
                            <div>배포 예정 시간</div>
                            <div>운영상태</div>
                          </S.DepHeader>
                          <S.DepBody>
                            {(detail.relatedProjects ?? []).map((p) => {
                              const time =
                                p.time ||
                                p.schedule ||
                                p.window ||
                                p.maintenanceWindow ||
                                p.deployWindow ||
                                '-';
                              const ok = !!p.active;
                              return (
                                <S.DepRow key={p.name}>
                                  <S.DepCell data-col="name">
                                    {p.name}
                                  </S.DepCell>
                                  <S.DepCell data-col="time">{time}</S.DepCell>
                                  <S.DepCell data-col="status">
                                    <S.StatusDot $ok={ok} />
                                    {ok ? '정상' : '점검'}
                                  </S.DepCell>
                                </S.DepRow>
                              );
                            })}
                          </S.DepBody>
                        </S.DepTableInner>
                      </S.RelatedProjectArea>
                    </S.Card>
                  </S.LeftCol>

                  <S.RightCol>
                    <S.Card>
                      <S.CardTitle>위험 관리</S.CardTitle>
                      <S.RiskAnalystArea>
                        <S.RiskList>
                          {(detail.risks ?? []).map((r, i) => (
                            <li key={i}>
                              <S.RiskText>{r.text}</S.RiskText>
                              {r.sub && <S.RiskSub>{r.sub}</S.RiskSub>}
                            </li>
                          ))}
                          {(detail.risks?.length ?? 0) === 0 && (
                            <li>
                              <S.RiskText>
                                등록된 위험 항목이 없습니다.
                              </S.RiskText>
                            </li>
                          )}
                        </S.RiskList>
                      </S.RiskAnalystArea>
                    </S.Card>
                  </S.RightCol>
                </S.Row>
              </>
            ) : (
              <JenkinsPanel />
            )}
          </>
        ) : (
          <>
            {showApplyPage ? (
              <S.Panel>
                <S.Section>
                  <S.SectionTitle>작업 신청</S.SectionTitle>
                  <S.SectionBody>작업 신청 페이지 입니다.</S.SectionBody>
                </S.Section>
              </S.Panel>
            ) : (
              <S.Panel>
                <S.Section>
                  <S.SectionTitle>작업 상세</S.SectionTitle>
                  <S.SectionBody>작업 상세 페이지 입니다.</S.SectionBody>
                </S.Section>
              </S.Panel>
            )}
          </>
        )}
      </S.Main>
    </S.Wrap>
  );
}
