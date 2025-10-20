import { useMemo, useState, useCallback } from 'react';

import {
  MOCK_LIST,
  MOCK_DETAIL,
  statusKey,
  buildDetailFromItem,
} from '../../..//mock/deploy';

import * as S from './DeployManagement.styles';
import JenkinsPanel from './JenkinsPanel';

const TAB = { ALL: 'all', PENDING: 'pending', DEPLOYED: 'deployed' };

export default function DeployManagement({
  list: listProp = MOCK_LIST,
  detail: detailProp = MOCK_DETAIL,
  onApprove = () => {},
  onReject = () => {},
}) {
  const [items, setItems] = useState(listProp);
  const [activeTab, setActiveTab] = useState(TAB.ALL);
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const [detail, setDetail] = useState(
    buildDetailFromItem(items[0] ?? {}, detailProp),
  );

  const [view, setView] = useState('pr');

  const filtered = useMemo(() => {
    if (activeTab === TAB.ALL) return items;
    if (activeTab === TAB.PENDING)
      return items.filter((i) => i.status === '승인대기');
    if (activeTab === TAB.DEPLOYED)
      return items.filter((i) => i.status === '배포완료');
    return items;
  }, [items, activeTab]);

  const handleSelect = useCallback(
    (item) => {
      setSelectedId(item.id);
      setDetail(buildDetailFromItem(item, detailProp));
    },
    [detailProp],
  );

  const handleTab = useCallback(
    (tab) => {
      setActiveTab(tab);
      const next =
        tab === TAB.ALL
          ? items
          : tab === TAB.PENDING
            ? items.filter((i) => i.status === '승인대기')
            : items.filter((i) => i.status === '배포완료');
      if (next.length) {
        setSelectedId(next[0].id);
        setDetail(buildDetailFromItem(next[0], detailProp));
      } else {
        setSelectedId(null);
        setDetail(detailProp);
      }
    },
    [items, detailProp],
  );

  const approveSelected = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedId ? { ...it, status: '승인완료' } : it,
      ),
    );
    setDetail((d) => ({ ...d, status: '승인완료' }));
    onApprove(selectedId);
  }, [selectedId, onApprove]);

  const rejectSelected = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((it) => (it.id === selectedId ? { ...it, status: '반려' } : it)),
    );
    setDetail((d) => ({ ...d, status: '반려' }));
    onReject(selectedId);
  }, [selectedId, onReject]);

  return (
    <S.Wrap>
      <S.Side>
        <S.SideHeader>
          <S.SideTop>
            <strong>배포 목록</strong>
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
              <S.SideTab
                $active={activeTab === TAB.DEPLOYED}
                onClick={() => handleTab(TAB.DEPLOYED)}
              >
                배포
              </S.SideTab>
            </S.SideTabs>
            <S.SideCount>{filtered.length}</S.SideCount>
          </S.SideBottom>
        </S.SideHeader>
        <S.SideBody>
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
        </S.SideBody>
        <S.SideFooter>
          <S.ApplyBtn type="button">배포 작업 신청</S.ApplyBtn>
        </S.SideFooter>
      </S.Side>

      <S.Main>
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
                              <S.DepCell data-col="name">{p.name}</S.DepCell>
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
                          <S.RiskText>등록된 위험 항목이 없습니다.</S.RiskText>
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
      </S.Main>
    </S.Wrap>
  );
}
