import * as S from './DeployManagement.styles';

const MOCK_LIST = [
  {
    id: '1',
    branch: 'feature/auth-improvements',
    title: 'feat: Oauth 2.0 구현',
    votes: '+24',
    comments: 8,
    hours: '2 hours ago',
    status: '승인대기',
    risk: 'Low',
  },
  {
    id: '2',
    branch: 'feature/dashboard-redesign',
    title: 'feat: 대시보드 UI 구현',
    votes: '+156',
    comments: 7,
    hours: '4 hours ago',
    status: '승인완료',
    risk: 'Medium',
  },
  {
    id: '3',
    branch: 'hotfix/security-patch',
    title: 'feat: 스프링 시큐리티 구현',
    votes: '+12',
    comments: 2,
    hours: '6 hours ago',
    status: '반려',
    risk: 'High',
  },
  {
    id: '4',
    branch: 'feature/api-optimization',
    title: 'feat: api 최적화',
    votes: '+67',
    comments: 1,
    hours: '8 hours ago',
    status: '배포요청',
    risk: 'Low',
  },
];

const MOCK_DETAIL = {
  title: 'feat: Oauth 2.0 구현',
  branchFrom: 'feature/user-auth',
  branchTo: 'main',
  labels: ['PR', 'Jenkins'],
  status: '승인대기',
  author: '김민호',
  createdAt: 'Jan 15, 2025 at 2:30 PM',
  description: '깃허브 ID로 서비스 이용을 위한 깃허브 Oauth 2.0 구현',
  metrics: [
    { label: '파일 변경 개수', value: 12 },
    { label: '라인 추가 개수', value: '+247' },
    { label: '라인 제거 개수', value: '-89' },
    { label: '커밋 개수', value: 8 },
  ],
  riskScore: 45,
  riskLevel: 'Medium',
  riskBreakdown: [
    { k: '코드 보전성', v: '중간' },
    { k: '테스트 개수', v: '30회' },
    { k: '테스트 커버리지', v: '충족 (89%)' },
    { k: '의존성', v: '2개 의존성' },
  ],
  riskSummary: [
    '코드 복잡성이 중간값으로 위험성 낮음',
    '2개의 의존성으로 위험성 보통',
    '테스트 커버리지 높음으로 위험성 낮음',
  ],
  deps: { parent: 'feature/user', child: 'feature/user-auth' },
};

export default function DeployManagement({
  list = MOCK_LIST,
  detail = MOCK_DETAIL,
  onApprove = () => {},
  onReject = () => {},
}) {
  return (
    <S.Wrap>
      <S.Side>
        <S.SideHeader>
          <strong>배포 목록</strong>
          <S.SideTabs>
            <S.SideTab $active>전체</S.SideTab>
            <S.SideTab>대기</S.SideTab>
            <S.SideTab>배포</S.SideTab>
          </S.SideTabs>
          <S.SideCount>{list.length}</S.SideCount>
        </S.SideHeader>

        <S.List role="list">
          {list.map((it) => (
            <S.ListItem role="listitem" key={it.id}>
              <S.ItemTop>
                <S.ItemBranch>{it.branch}</S.ItemBranch>
                <S.Badge $tone={it.status}>{it.status}</S.Badge>
              </S.ItemTop>
              <S.ItemTitle>{it.title}</S.ItemTitle>
              <S.ItemMeta>
                <span>{it.votes}</span>
                <span>•</span>
                <span>{it.comments}</span>
                <span>•</span>
                <span>{it.hours}</span>
              </S.ItemMeta>
              <S.RiskChip $risk={it.risk}>{it.risk}</S.RiskChip>
            </S.ListItem>
          ))}
        </S.List>
      </S.Side>

      <S.Main>
        <S.LabelBar>
          {detail.labels.map((l) => (
            <S.Label key={l}>{l}</S.Label>
          ))}
        </S.LabelBar>

        <S.Panel>
          <S.TitleRow>
            <S.TitleLeft>
              <h2>{detail.title}</h2>
              <S.MetaLabel>feature/user-auth → main</S.MetaLabel>
            </S.TitleLeft>
            <S.TitleRight>
              <S.PanelHeader>
                <S.ActionRow>
                  <S.ApproveBtn type="button" onClick={onApprove}>
                    승인
                  </S.ApproveBtn>
                  <S.RejectBtn type="button" onClick={onReject}>
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
              <S.StatusBadge $tone={detail.status}>
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
              <S.CardTitle>연관 프로젝트</S.CardTitle>
              <S.RealatedProjectArea></S.RealatedProjectArea>
            </S.Card>
          </S.LeftCol>

          <S.RightCol>
            <S.Card>
              <S.CardTitle>위험성</S.CardTitle>
              <S.RiskAnalystArea></S.RiskAnalystArea>
            </S.Card>
          </S.RightCol>
        </S.Row>
      </S.Main>
    </S.Wrap>
  );
}
