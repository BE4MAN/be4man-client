// // 작성자 : 김민호, 조윤상
export const DOC_TYPES = ['작업 계획서', '결과 보고서', '재배포', '복구'];

export const TEMPLATES = {
  '작업 계획서': {
    design: `
      <h2>작업 계획서</h2>

      <h3>1. 개요</h3>
      <p>
        본 문서는 [프로젝트/서비스명]의 작업 수행을 위해 목적, 범위, 일정 및 리스크를 정의하여
        안전하고 일관된 배포/변경을 보장하기 위한 계획서입니다.
      </p>

      <h3>2. 목표</h3>
      <ul>
        <li>핵심 목표 1: [예) 오류율 1% 이하, 성능 20% 개선 등] / 측정 지표: [지표명]</li>
        <li>핵심 목표 2: [예) 기능 A 릴리스, 고객 VOC 개선] / 측정 지표: [지표명]</li>
      </ul>

      <h3>3. 일정</h3>
      <p>
        계획 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm<br/>
      </p>

      <h3>4. 담당자</h3>
      <p>
        실행: [팀/이름/연락처]<br/>
        지원(인프라/DB/보안 등): [팀/이름/연락처]<br/>
        승인: [직책/이름]
      </p>

      <h3>5. 수행 내용</h3>
      <ul>
        <li>사전 준비: 테스트 결과 확인, 공지/릴리스노트 배포, 백업/롤백 점검</li>
        <li>적용/배포: [백엔드/프론트/설정] 순서 및 상세 절차</li>
        <li>검증: 헬스체크, 샘플 트랜잭션, 로그/알람 확인</li>
      </ul>

      <h3>6. 리스크</h3>
      <ul>
        <li>리스크 항목 1 – 방안: [영향/발생가능성] → [완화/회피/전가/수용 방안]</li>
        <li>리스크 항목 2 – 방안: [영향/발생가능성] → [대응 절차/책임자]</li>
      </ul>

      <h3>7. 백업</h3>
      <ul>
        <li>대상: [DB 스키마/중요 테이블/환경설정/파일]</li>
        <li>방법: [스냅샷/Export/버전 태깅], 저장 위치: [저장소/버킷]</li>
        <li>검증: 복원 리허설, 무결성 확인 (검증 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>8. 실패 시 복구 방안</h3>
      <ul>
        <li>복구 기준: [에러율/지연/장애 등급] 임계치 초과 시 즉시 롤백</li>
        <li>복구 절차(일시): 트래픽 완화 → 롤백 실행(YYYY-MM-DD HH:mm) → 서비스 헬스체크 → 원인 분석/재배포 계획</li>
        <li>커뮤니케이션: 장애 공지/사후 보고 체계 (공지 일시: YYYY-MM-DD HH:mm)</li>
      </ul>
    `,
    html: `
      <h2>작업 계획서</h2>

      <h3>1. 개요</h3>
      <p>
        본 문서는 [프로젝트/서비스명]의 작업 수행을 위해 목적, 범위, 일정 및 리스크를 정의하여
        안전하고 일관된 배포/변경을 보장하기 위한 계획서입니다.
      </p>

      <h3>2. 목표</h3>
      <ul>
        <li>핵심 목표 1: [예) 오류율 1% 이하, 성능 20% 개선 등] / 측정 지표: [지표명]</li>
        <li>핵심 목표 2: [예) 기능 A 릴리스, 고객 VOC 개선] / 측정 지표: [지표명]</li>
      </ul>

      <h3>3. 일정</h3>
      <p>
        계획 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm<br/>
      </p>

      <h3>4. 담당자</h3>
      <p>
        실행: [팀/이름/연락처]<br/>
        지원(인프라/DB/보안 등): [팀/이름/연락처]<br/>
        승인: [직책/이름]
      </p>

      <h3>5. 수행 내용</h3>
      <ul>
        <li>사전 준비: 테스트 결과 확인, 공지/릴리스노트 배포, 백업/롤백 점검</li>
        <li>적용/배포: [백엔드/프론트/설정] 순서 및 상세 절차</li>
        <li>검증: 헬스체크, 샘플 트랜잭션, 로그/알람 확인</li>
      </ul>

      <h3>6. 리스크</h3>
      <ul>
        <li>리스크 항목 1 – 방안: [영향/발생가능성] → [완화/회피/전가/수용 방안]</li>
        <li>리스크 항목 2 – 방안: [영향/발생가능성] → [대응 절차/책임자]</li>
      </ul>

      <h3>7. 백업</h3>
      <ul>
        <li>대상: [DB 스키마/중요 테이블/환경설정/파일]</li>
        <li>방법: [스냅샷/Export/버전 태깅], 저장 위치: [저장소/버킷]</li>
        <li>검증: 복원 리허설, 무결성 확인 (검증 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>8. 실패 시 복구 방안</h3>
      <ul>
        <li>복구 기준: [에러율/지연/장애 등급] 임계치 초과 시 즉시 롤백</li>
        <li>복구 절차(일시): 트래픽 완화 → 롤백 실행(YYYY-MM-DD HH:mm) → 서비스 헬스체크 → 원인 분석/재배포 계획</li>
        <li>커뮤니케이션: 장애 공지/사후 보고 체계 (공지 일시: YYYY-MM-DD HH:mm)</li>
      </ul>
    `,
  },

  '결과 보고서': {
    design: `
      <h2>결과 보고서</h2>

      <h3>1. 요약</h3>
      <p>
        작업 개요와 주요 성과를 요약합니다. 목표 대비 달성도, 고객/운영 영향 요점을 3줄 내외로 기재합니다.<br/>
        작업 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm
      </p>

      <h3>2. 상세 결과</h3>
      <ul>
        <li>성과 지표 1: [지표명/목표/실적/달성률]</li>
        <li>성과 지표 2: [지표명/목표/실적/달성률]</li>
        <li>품질 지표: 오류율/지연/가용성/문의량 등의 변동</li>
      </ul>

      <h3>3. 특이사항</h3>
      <p>이슈/장애/지연/예정 외 변경 등 특이사항과 처리 내역(발생/해결 일시 포함)을 기재합니다.</p>

      <h3>4. 추후 계획</h3>
      <p>후속 조치, 개선 항목, 차기 릴리스 포함 여부 및 일정 초안을 기재합니다.</p>

      <h3>5. 실패 복구 사항</h3>
      <p>
        (해당 시) 실패 구간(일시), 복구 절차 수행 일시, 서비스 영향, 재발 방지 조치를 간단히 정리합니다.
      </p>
    `,
    html: `
      <h2>결과 보고서</h2>

      <h3>1. 요약</h3>
      <p>
        작업 개요와 주요 성과를 요약합니다. 목표 대비 달성도, 고객/운영 영향 요점을 3줄 내외로 기재합니다.<br/>
        작업 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm
      </p>

      <h3>2. 상세 결과</h3>
      <ul>
        <li>성과 지표 1: [지표명/목표/실적/달성률]</li>
        <li>성과 지표 2: [지표명/목표/실적/달성률]</li>
        <li>품질 지표: 오류율/지연/가용성/문의량 등의 변동</li>
      </ul>

      <h3>3. 특이사항</h3>
      <p>이슈/장애/지연/예정 외 변경 등 특이사항과 처리 내역(발생/해결 일시 포함)을 기재합니다.</p>

      <h3>4. 추후 계획</h3>
      <p>후속 조치, 개선 항목, 차기 릴리스 포함 여부 및 일정 초안을 기재합니다.</p>

      <h3>5. 실패 복구 사항</h3>
      <p>
        (해당 시) 실패 구간(일시), 복구 절차 수행 일시, 서비스 영향, 재발 방지 조치를 간단히 정리합니다.
      </p>
    `,
  },

  재배포: {
    design: `
      <h2>재배포 계획서</h2>

      <h3>1. 개요</h3>
      <p>
        재배포 배경과 목적을 명시합니다. (예: 긴급 패치, 구성값 오류 수정, 이전 배포 회피책 등)
      </p>

      <h3>2. 변경 내용</h3>
      <ul>
        <li>모듈/기능: [변경 대상] / 변경 유형: [버그픽스/성능/설정]</li>
        <li>변경 전/후 차이: [주요 차이, 호환성, 의존성]</li>
      </ul>

      <h3>3. 배포 대상 및 범위</h3>
      <ul>
        <li>서비스/시스템: [목록]</li>
        <li>환경/서버: [Prod/Stage/Region/노드]</li>
      </ul>

      <h3>4. 재배포 일정</h3>
      <p>YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm (점검/공지 포함 시각 명시)</p>

      <h3>5. 영향도 및 리스크</h3>
      <ul>
        <li>사용자 영향: [무중단/부분 중단/전면 중단], 대안: [우회/알림]</li>
        <li>시스템 영향: [성능/자원/로그/알람] 변화 가능성</li>
        <li>리스크/대응: [항목] – [완화/복구 방안/담당]</li>
      </ul>

      <h3>6. 롤백 및 복구 계획</h3>
      <ul>
        <li>롤백 기준: [지표/알람/오류 임계치] (판단 일시 기록)</li>
        <li>롤백 절차: [명령/스크립트] → 검증(YYYY-MM-DD HH:mm) → 공지(YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>7. 모니터링 계획</h3>
      <ul>
        <li>지표/도구: [APM/로그/알람 체계]</li>
        <li>모니터링 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm</li>
      </ul>
    `,
    html: `
      <h2>재배포 계획서</h2>

      <h3>1. 개요</h3>
      <p>
        재배포 배경과 목적을 명시합니다. (예: 긴급 패치, 구성값 오류 수정, 이전 배포 회피책 등)
      </p>

      <h3>2. 변경 내용</h3>
      <ul>
        <li>모듈/기능: [변경 대상] / 변경 유형: [버그픽스/성능/설정]</li>
        <li>변경 전/후 차이: [주요 차이, 호환성, 의존성]</li>
      </ul>

      <h3>3. 배포 대상 및 범위</h3>
      <ul>
        <li>서비스/시스템: [목록]</li>
        <li>환경/서버: [Prod/Stage/Region/노드]</li>
      </ul>

      <h3>4. 재배포 일정</h3>
      <p>YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm (점검/공지 포함 시각 명시)</p>

      <h3>5. 영향도 및 리스크</h3>
      <ul>
        <li>사용자 영향: [무중단/부분 중단/전면 중단], 대안: [우회/알림]</li>
        <li>시스템 영향: [성능/자원/로그/알람] 변화 가능성</li>
        <li>리스크/대응: [항목] – [완화/복구 방안/담당]</li>
      </ul>

      <h3>6. 롤백 및 복구 계획</h3>
      <ul>
        <li>롤백 기준: [지표/알람/오류 임계치] (판단 일시 기록)</li>
        <li>롤백 절차: [명령/스크립트] → 검증(YYYY-MM-DD HH:mm) → 공지(YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>7. 모니터링 계획</h3>
      <ul>
        <li>지표/도구: [APM/로그/알람 체계]</li>
        <li>모니터링 기간: YYYY-MM-DD HH:mm ~ YYYY-MM-DD HH:mm</li>
      </ul>
    `,
  },

  복구: {
    design: `
      <h2>복구 보고서</h2>

      <h3>1. 개요</h3>
      <p>
        장애 발생 배경과 복구 목적을 기술합니다. 사건 개요(서비스/영향 범위/지속 시간)를 포함합니다.
      </p>

      <h3>2. 장애 현황</h3>
      <ul>
        <li>발생 일시: YYYY-MM-DD HH:mm</li>
        <li>복구 일시: YYYY-MM-DD HH:mm</li>
        <li>장애 등급: [긴급/높음/보통/낮음], 영향: [사용자/거래/기능]</li>
      </ul>

      <h3>3. 원인 분석</h3>
      <ul>
        <li>직접 원인: [즉시 촉발 요인] (발생 일시 포함)</li>
        <li>근본 원인(RCA): [설계/프로세스/운영/인적 요인 등] (발견 일시 포함)</li>
      </ul>

      <h3>4. 복구 조치 내용</h3>
      <ul>
        <li>즉시 조치: [완화/우회/재기동/패치] (조치 일시: YYYY-MM-DD HH:mm)</li>
        <li>영구 조치: [코드/설정/인프라/모니터링 개선] (완료 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>5. 영향 범위</h3>
      <ul>
        <li>영향 서비스/시스템: [목록]</li>
        <li>영향 사용자/거래: [수치/비율/기간]</li>
      </ul>

      <h3>6. 재발 방지 대책</h3>
      <ul>
        <li>개선 과제: [항목/담당/목표일(YYYY-MM-DD HH:mm)]</li>
        <li>점검/모니터링 강화: [지표/알람/리허설] (시행 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>7. 기타 사항</h3>
      <p>
        커뮤니케이션(공지/보고) 이력(일시 포함), 외부 영향, 추가 공유 사항을 기재합니다.
      </p>
    `,
    html: `
      <h2>복구 보고서</h2>

      <h3>1. 개요</h3>
      <p>
        장애 발생 배경과 복구 목적을 기술합니다. 사건 개요(서비스/영향 범위/지속 시간)를 포함합니다.
      </p>

      <h3>2. 장애 현황</h3>
      <ul>
        <li>발생 일시: YYYY-MM-DD HH:mm</li>
        <li>복구 일시: YYYY-MM-DD HH:mm</li>
        <li>장애 등급: [긴급/높음/보통/낮음], 영향: [사용자/거래/기능]</li>
      </ul>

      <h3>3. 원인 분석</h3>
      <ul>
        <li>직접 원인: [즉시 촉발 요인] (발생 일시 포함)</li>
        <li>근본 원인(RCA): [설계/프로세스/운영/인적 요인 등] (발견 일시 포함)</li>
      </ul>

      <h3>4. 복구 조치 내용</h3>
      <ul>
        <li>즉시 조치: [완화/우회/재기동/패치] (조치 일시: YYYY-MM-DD HH:mm)</li>
        <li>영구 조치: [코드/설정/인프라/모니터링 개선] (완료 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>5. 영향 범위</h3>
      <ul>
        <li>영향 서비스/시스템: [목록]</li>
        <li>영향 사용자/거래: [수치/비율/기간]</li>
      </ul>

      <h3>6. 재발 방지 대책</h3>
      <ul>
        <li>개선 과제: [항목/담당/목표일(YYYY-MM-DD HH:mm)]</li>
        <li>점검/모니터링 강화: [지표/알람/리허설] (시행 일시: YYYY-MM-DD HH:mm)</li>
      </ul>

      <h3>7. 기타 사항</h3>
      <p>
        커뮤니케이션(공지/보고) 이력(일시 포함), 외부 영향, 추가 공유 사항을 기재합니다.
      </p>
    `,
  },
};

// import { LibraryBig } from 'lucide-react';
// import { useMemo, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

// import { PATHS } from '@/app/routes/paths';
// import { useAuth } from '@/hooks/useAuth';
// import { useUIStore } from '@/stores/uiStore';

// import HomeDayIcon from '/icons/home-day.svg';
// import HomeNightIcon from '/icons/home-night.svg';
// import HomeActiveIcon from '/icons/home-active.svg';

// import ApprovalDayIcon from '/icons/approval-day.svg';
// import ApprovalNightIcon from '/icons/approval-night.svg';
// import ApprovalActiveIcon from '/icons/approval-active.svg';

// import ScheduleDayIcon from '/icons/schedule-day.svg';
// import ScheduleNightIcon from '/icons/schedule-night.svg';
// import ScheduleActiveIcon from '/icons/schedule-active.svg';

// import TaskDayIcon from '/icons/task-day.svg';
// import TaskNightIcon from '/icons/task-night.svg';
// import TaskActiveIcon from '/icons/task-active.svg';

// import AnalyticsDayIcon from '/icons/analytics-day.svg';
// import AnalyticsNightIcon from '/icons/analytics-night.svg';
// import AnalyticsActiveIcon from '/icons/analytics-active.svg';

// import LogoutIcon from '/icons/logout.svg';
// import LogoutDayIcon from '/icons/logout-day.svg';

// import * as S from './Sidebar.styles';

// export default function Sidebar() {
//   const { sidebarOpen, theme } = useUIStore();
//   const { logout } = useAuth();
//   const isDark = theme === 'dark';
//   const { pathname } = useLocation();

//   const items = useMemo(
//     () => [
//       {
//         key: 'home',
//         to: PATHS.HOME,
//         label: '홈',
//         icons: {
//           dark: HomeNightIcon,
//           light: HomeDayIcon,
//           active: HomeActiveIcon,
//         },
//         end: true,
//       },
//       {
//         key: 'approvals',
//         to: PATHS.APPROVALS,
//         label: '결재함',
//         icons: {
//           dark: ApprovalNightIcon,
//           light: ApprovalDayIcon,
//           active: ApprovalActiveIcon,
//         },
//         end: true,
//       },
//       {
//         key: 'schedule',
//         to: PATHS.SCHEDULE,
//         label: '일정관리',
//         icons: {
//           dark: ScheduleNightIcon,
//           light: ScheduleDayIcon,
//           active: ScheduleActiveIcon,
//         },
//         end: true,
//       },
//       {
//         key: 'tasks',
//         to: PATHS.TASKS,
//         label: '작업관리',
//         icons: {
//           dark: TaskNightIcon,
//           light: TaskDayIcon,
//           active: TaskActiveIcon,
//         },
//         end: true,
//       },
//       {
//         key: 'analytics',
//         to: PATHS.ANALYTICS,
//         label: '통계',
//         icons: {
//           dark: AnalyticsNightIcon,
//           light: AnalyticsDayIcon,
//           active: AnalyticsActiveIcon,
//         },
//         end: true,
//       },
//       {
//         key: 'problems',
//         to: PATHS.PROBLEMS,
//         label: '문제관리',
//         iconComponent: LibraryBig,
//         end: true,
//       },
//     ],
//     [],
//   );

//   const iconSrc = useCallback(
//     (isActive, icons) => {
//       if (!icons) return null;
//       const { dark, light, active } = icons;
//       if (isActive && active) return active;
//       return isDark ? dark : light;
//     },
//     [isDark],
//   );

//   const isApprovalFamily =
//     pathname === PATHS.APPROVALS ||
//     pathname === PATHS.APPROVAL_NEW ||
//     pathname.startsWith('/approval/');

//   const isScheduleFamily =
//     pathname === PATHS.SCHEDULE || pathname.startsWith(`${PATHS.SCHEDULE}/`);

//   const isTasksFamily =
//     pathname === PATHS.TASKS || pathname.startsWith('/tasks/');

//   const isProblemsFamily =
//     pathname === PATHS.PROBLEMS || pathname.startsWith('/problems/');

//   return (
//     <S.Aside open={sidebarOpen}>
//       <S.MenuWrap>
//         {items.map((it) => {
//           const forceActive =
//             it.key === 'approvals'
//               ? isApprovalFamily
//               : it.key === 'schedule'
//                 ? isScheduleFamily
//                 : it.key === 'tasks'
//                   ? isTasksFamily
//                   : it.key === 'problems'
//                     ? isProblemsFamily
//                     : false;

//           return (
//             <S.Item
//               key={it.key}
//               to={it.to}
//               end={it.end}
//               data-active={forceActive ? 'true' : undefined}
//             >
//               {({ isActive }) => {
//                 const src = iconSrc(isActive || forceActive, it.icons);
//                 const IconComponent = it.iconComponent;
//                 const isItemActive = isActive || forceActive;
//                 return (
//                   <>
//                     {IconComponent ? (
//                       <IconComponent
//                         size={18}
//                         style={{ flexShrink: 0 }}
//                         color={isItemActive ? undefined : 'currentColor'}
//                       />
//                     ) : src ? (
//                       <S.IconImg src={src} alt="" aria-hidden="true" />
//                     ) : null}
//                     {it.label}
//                   </>
//                 );
//               }}
//             </S.Item>
//           );
//         })}
//       </S.MenuWrap>

//       <S.LogoutBtn type="button" onClick={logout}>
//         <S.IconImg
//           src={isDark ? LogoutIcon : LogoutDayIcon}
//           alt=""
//           aria-hidden="true"
//         />
//         로그아웃
//       </S.LogoutBtn>
//     </S.Aside>
//   );
// }
