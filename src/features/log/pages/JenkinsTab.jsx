// src/features/log/pages/JenkinsTab.jsx
import { Global } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { taskAPI } from '@/api/task';

import {
  buildJenkinsGlobalStyles,
  getJenkinsInlineStyles,
} from './JenkinsTab.style';

/** 공통 유틸 */
function processEscapeChars(text) {
  if (!text) return '';
  let processed = text.replace(/\r\n/g, '\n');
  processed = processed.replace(/\r/g, '\n');
  processed = processed.replace(/\\n/g, '\n');
  processed = processed.replace(/\\t/g, '\t');
  processed = processed.replace(/\\r/g, '\n');
  return processed;
}

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '-';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  if (s > 0 || parts.length === 0) parts.push(`${s}초`);
  return parts.join(' ');
}
function formatKoreanDateTime(isoString) {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${y}-${mo}-${da} ${h}:${mi}:${s}`;
  } catch {
    return '-';
  }
}

/* 파이프라인 아이콘 */
function renderPipelineIcon(status) {
  if (status === 'SUCCESS' || status === '성공') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#4caf50" />
        <path
          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
          fill="white"
        />
      </svg>
    );
  }
  if (status === 'FAILURE' || status === '실패') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#f44336" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          fill="white"
        />
      </svg>
    );
  }
  if (status === 'IN_PROGRESS' || status === '진행중') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#2196f3" />
        <path
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"
          fill="white"
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#9e9e9e" />
    </svg>
  );
}

/** PR 아이콘 (내장 SVG) */
function PRIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-label="PR">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M6 8v8" strokeLinecap="round" />
        <path d="M18 8v8" strokeLinecap="round" />
        <path d="M6 8c2 2 6 2 12 0" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* Small SVG icons to avoid OS emoji rendering issues */
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12.75 7h-1.5v6l5.25 3.15.75-1.23-4.5-2.67z"
        fill="currentColor"
      />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 11h-4v-1h3V7h1z"
        fill="currentColor"
      />
    </svg>
  );
}

function DurationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm0 2a9 9 0 1 1-9 9 9.01 9.01 0 0 1 9-9zm.5 5h-1v5l4.2 2.52.6-1-3.8-2.28z"
        fill="currentColor"
      />
    </svg>
  );
}

function StartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path d="M4 2v20l18-10L4 2z" fill="currentColor" />
    </svg>
  );
}

function EndIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
    </svg>
  );
}

export default function JenkinsTab({
  id, // deploymentId
  theme,
  baseStyles, // planCard / planHeader / planBody 재사용
}) {
  const s = useMemo(() => getJenkinsInlineStyles(theme), [theme]);

  // 상태
  const consoleOutputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ▶ 배포 상태 기반 실시간 플래그
  const [isRealtimeBuild, setIsRealtimeBuild] = useState(false);

  // ▶ SSE 상태
  const [isStreaming, setIsStreaming] = useState(false);
  const [realtimeLog, setRealtimeLog] = useState('');
  const eventSourceRef = useRef(null);

  // ▶ REST 기반 콘솔 로그
  const [jenkinsLogData, setJenkinsLogData] = useState(null);
  const [jenkinsLogLoading, setJenkinsLogLoading] = useState(false);
  const [jenkinsLogError, setJenkinsLogError] = useState(null);

  // ▶ 빌드 결과 / 목록
  const [buildResultData, setBuildResultData] = useState(null);
  const [buildResultLoading, setBuildResultLoading] = useState(false);
  const [buildResultError, setBuildResultError] = useState(false);
  const [buildList, setBuildList] = useState([]);

  // ▶ 파이프라인 스테이지
  const [pipelineStages, setPipelineStages] = useState([]);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineError, setPipelineError] = useState(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);

  /** 1) deploymentId 기반 배포 상태 조회 → 실시간 여부 결정 */
  useEffect(() => {
    if (!id) {
      setIsRealtimeBuild(false);
      setRealtimeLog('');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsStreaming(false);
      return;
    }

    (async () => {
      try {
        console.log('[JenkinsTab] fetchDeploymentStatus: start', { id });
        const status = await taskAPI.fetchDeploymentStatus(id);
        console.log('[JenkinsTab] fetchDeploymentStatus: response', status);

        const shouldRealtime =
          status?.stage === 'DEPLOYMENT' && status?.status === 'IN_PROGRESS';

        setIsRealtimeBuild(!!shouldRealtime);

        if (!shouldRealtime) {
          // 실시간 조건이 아니면 SSE 끊고 로그 초기화
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
          setIsStreaming(false);
          setRealtimeLog('');
        }
      } catch (e) {
        console.error('[JenkinsTab] fetchDeploymentStatus: error', e);
        setIsRealtimeBuild(false);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        setIsStreaming(false);
        setRealtimeLog('');
      }
    })();
  }, [id]);

  /** 2) 실시간 모드일 때만 SSE 연결 */
  useEffect(() => {
    if (!isRealtimeBuild || !id) {
      // 실시간 모드가 아니면 SSE 정리
      if (eventSourceRef.current) {
        console.log('[JenkinsTab] SSE close (not realtime)');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsStreaming(false);
      return;
    }

    // 이미 연결되어 있으면 재연결 방지
    if (eventSourceRef.current) return;

    const url = taskAPI.getJenkinsLogStreamUrl(id);
    console.log('[JenkinsTab] SSE connect:', url);

    const es = new EventSource(url);
    eventSourceRef.current = es;
    setIsStreaming(true);
    setRealtimeLog('');

    es.addEventListener('connected', (e) => {
      console.log('[JenkinsTab] SSE connected:', e.data);
    });

    es.addEventListener('log', (e) => {
      const chunk = processEscapeChars(e.data || '');
      setRealtimeLog((prev) => (prev ? `${prev}\n${chunk}` : chunk));
    });

    es.addEventListener('complete', (e) => {
      console.log('[JenkinsTab] SSE complete:', e.data);
      setIsStreaming(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    });

    es.onerror = (err) => {
      console.error('[JenkinsTab] SSE error:', err);
      setIsStreaming(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };

    return () => {
      if (eventSourceRef.current) {
        console.log('[JenkinsTab] SSE cleanup (unmount/change)');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsStreaming(false);
    };
  }, [id, isRealtimeBuild]);

  /** 3) REST 콘솔 로그 (실시간 모드일 때는 스킵) */
  useEffect(() => {
    const buildRunId = buildResultData?.buildRunId;
    if (!id || !buildRunId || isRealtimeBuild) {
      setJenkinsLogData(null);
      return;
    }

    (async () => {
      console.log('[JenkinsTab] fetchConsoleLog: start', { id, buildRunId });
      setJenkinsLogLoading(true);
      setJenkinsLogError(null);
      try {
        const res = await taskAPI.fetchConsoleLog(id, buildRunId);
        console.log('[JenkinsTab] fetchConsoleLog: response', res);
        const processedLog = processEscapeChars(res?.log || '');
        setJenkinsLogData({ ...res, processedLog });
      } catch (e) {
        console.error('[JenkinsTab] fetchConsoleLog: error', e);
        setJenkinsLogError('로그를 불러오는데 실패했습니다.');
      } finally {
        setJenkinsLogLoading(false);
        console.log('[JenkinsTab] fetchConsoleLog: end');
      }
    })();
  }, [id, buildResultData?.buildRunId, isRealtimeBuild]);

  /** 4) 빌드 결과 목록 */
  useEffect(() => {
    if (!id) return;
    (async () => {
      console.log('[JenkinsTab] fetchBuildResult: start', { id });
      setBuildResultLoading(true);
      setBuildResultError(null);
      try {
        const res = await taskAPI.fetchBuildResult(id);
        console.log('[JenkinsTab] fetchBuildResult: response', res);
        if (Array.isArray(res)) {
          setBuildList(res);
          const first = res[0];
          if (first) {
            try {
              const detail = await taskAPI.fetchBuildResult(
                id,
                first.buildRunId,
              );
              setBuildResultData(detail || first);
            } catch (detailErr) {
              console.error(
                '[JenkinsTab] fetchBuildResult: detail fetch error',
                detailErr,
              );
              setBuildResultData(first);
            }
          } else {
            setBuildResultData(null);
          }
        } else if (res && typeof res === 'object') {
          setBuildList([res]);
          setBuildResultData(res);
        } else {
          setBuildList([]);
          setBuildResultData(null);
        }
      } catch (e) {
        console.error('[JenkinsTab] fetchBuildResult: error', e);
        setBuildResultError('빌드 결과를 불러오는데 실패했습니다.');
      } finally {
        setBuildResultLoading(false);
        console.log('[JenkinsTab] fetchBuildResult: end');
      }
    })();
  }, [id]);

  /** 5) 파이프라인 stages */
  useEffect(() => {
    const buildRunId = buildResultData?.buildRunId;
    if (!id || !buildRunId) {
      setPipelineStages([]);
      return;
    }

    (async () => {
      console.log('[JenkinsTab] fetchAllStages: start', { buildRunId });
      setPipelineLoading(true);
      setPipelineError(null);
      try {
        const response = await taskAPI.fetchAllStages(buildRunId);
        console.log('[JenkinsTab] fetchAllStages: response', response);
        const sorted = [...response].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        );
        setPipelineStages(sorted);
      } catch (e) {
        console.error('[JenkinsTab] fetchAllStages: error', e);
        setPipelineError('파이프라인 정보를 불러오는데 실패했습니다.');
        setPipelineStages([]);
      } finally {
        setPipelineLoading(false);
        console.log('[JenkinsTab] fetchAllStages: end');
      }
    })();
  }, [id, buildResultData?.buildRunId]);

  /** 6) Fullscreen 상태 추적 */
  useEffect(() => {
    const handleFullscreenChange = () => {
      const enabled = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(enabled);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
    };
  }, []);

  /** 7) 콘솔 자동 스크롤 */
  useEffect(() => {
    if (!consoleOutputRef.current) return;
    consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
  }, [realtimeLog, jenkinsLogData?.processedLog, selectedStageIndex]);

  const isConsoleDownloadDisabled =
    !jenkinsLogData?.processedLog || jenkinsLogLoading;

  // 선택된 스테이지
  const selectedStage =
    selectedStageIndex !== null ? pipelineStages[selectedStageIndex] : null;

  // 선택된 스테이지의 이슈/해결책
  const issueSummary =
    !selectedStage?.isSuccess &&
    (selectedStage?.problemSummary ||
      selectedStage?.problemSolution ||
      jenkinsLogData?.errorSummary)
      ? {
          summary:
            selectedStage?.problemSummary || jenkinsLogData?.errorSummary || '',
          solution: selectedStage?.problemSolution || '',
          details: jenkinsLogData?.issueDetails || [],
        }
      : null;

  // Builds list inline styles
  const buildListStyles = {
    wrapper: { overflowX: 'auto' },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thead: {
      backgroundColor:
        theme.colors.backgroundHover ||
        (theme.mode === 'dark' ? '#2a2a2a' : '#f8f9fa'),
    },
    th: {
      padding: '12px 14px',
      textAlign: 'left',
      fontSize: '13px',
      fontWeight: 600,
      color: theme.colors.textsecondary,
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    td: {
      padding: '12px 14px',
      fontSize: '14px',
      color: theme.colors.text,
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    row: (isSelected) => ({
      cursor: 'pointer',
      backgroundColor: isSelected
        ? theme.mode === 'dark'
          ? 'rgba(33,150,243,0.06)'
          : 'rgba(33,150,243,0.03)'
        : 'transparent',
    }),
  };

  /** 콘솔에 뿌릴 로그 결정 (우선순위) */
  let displayedLog = '';
  if (selectedStage) {
    displayedLog = processEscapeChars(selectedStage.log || '');
  } else if (realtimeLog) {
    displayedLog = realtimeLog;
  } else if (jenkinsLogData?.processedLog) {
    displayedLog = jenkinsLogData.processedLog;
  }

  return (
    <>
      {/* 전역 반응형/가상선택자 및 스크롤바 숨김 CSS */}
      <Global styles={buildJenkinsGlobalStyles()} />

      {/* Builds 목록 */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>빌드 목록</h2>
        </div>

        <div style={baseStyles.planBody}>
          {buildResultLoading ? (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              빌드 목록을 불러오는 중...
            </div>
          ) : buildResultError ? (
            <div style={{ padding: 16, color: theme.colors.error }}>
              {buildResultError}
            </div>
          ) : buildList && buildList.length > 0 ? (
            <div style={buildListStyles.wrapper}>
              <table style={buildListStyles.table}>
                <thead style={buildListStyles.thead}>
                  <tr>
                    <th style={buildListStyles.th}>작업 번호</th>
                    <th style={buildListStyles.th}>빌드 번호</th>
                    <th style={buildListStyles.th}>배포 결과</th>
                    <th style={buildListStyles.th}>배포 소요 시간</th>
                    <th style={buildListStyles.th}>배포 시작시간</th>
                    <th style={buildListStyles.th}>배포 종료시간</th>
                  </tr>
                </thead>
                <tbody>
                  {buildList.map((b, idx) => {
                    const isSelected =
                      buildResultData?.buildRunId === b.buildRunId;
                    return (
                      <tr
                        key={b.buildRunId || idx}
                        onClick={async () => {
                          try {
                            const detail = await taskAPI.fetchBuildResult(
                              id,
                              b.buildRunId,
                            );
                            setBuildResultData(detail || b);
                          } catch (err) {
                            console.error(
                              '[JenkinsTab] onClick fetchBuildResult detail error',
                              err,
                            );
                            setBuildResultData(b);
                          }
                        }}
                        style={buildListStyles.row(isSelected)}
                      >
                        <td style={buildListStyles.td}>{b.deploymentId}</td>
                        <td style={buildListStyles.td}>{b.buildRunId}</td>
                        <td style={buildListStyles.td}>
                          {b.isDeployed ? '성공' : '실패'}
                        </td>
                        <td style={buildListStyles.td}>
                          {formatDuration(b.duration)}
                        </td>
                        <td style={buildListStyles.td}>
                          {formatKoreanDateTime(b.startedAt)}
                        </td>
                        <td style={buildListStyles.td}>
                          {formatKoreanDateTime(b.endedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              빌드 이력이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Pipeline */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>빌드 파이프라인</h2>
        </div>

        <div style={baseStyles.planBody}>
          {pipelineLoading ? (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              파이프라인 정보를 불러오는 중...
            </div>
          ) : pipelineError ? (
            <div style={{ padding: 16, color: theme.colors.error }}>
              {pipelineError}
            </div>
          ) : pipelineStages.length > 0 ? (
            <div
              className="jt-pipeline-container"
              style={s.pipelineContainer}
              data-no-scrollbar="true"
              role="list"
              aria-label="Pipeline Stages"
            >
              {/* Start */}
              <div
                className="jt-pipeline-stage"
                style={{
                  ...s.pipelineStage,
                  cursor: 'pointer',
                  ...(selectedStageIndex === null ? {} : { opacity: 0.6 }),
                }}
                onClick={() => setSelectedStageIndex(null)}
                role="listitem"
              >
                <div
                  className="jt-pipeline-stage-icon"
                  style={s.pipelineStageIcon}
                >
                  {renderPipelineIcon('성공')}
                </div>
                <div
                  className="jt-pipeline-stage-name"
                  style={s.pipelineStageName}
                >
                  Start
                </div>
              </div>
              <div className="jt-pipeline-line" style={s.pipelineLine} />

              {/* Stages */}
              {pipelineStages.map((stage, idx) => (
                <React.Fragment key={stage.stageRunId || idx}>
                  <div
                    className="jt-pipeline-stage"
                    style={{
                      ...s.pipelineStage,
                      cursor: 'pointer',
                      ...(selectedStageIndex !== null &&
                      selectedStageIndex !== idx
                        ? { opacity: 0.6 }
                        : {}),
                    }}
                    onClick={() =>
                      setSelectedStageIndex(
                        selectedStageIndex === idx ? null : idx,
                      )
                    }
                    role="listitem"
                  >
                    <div
                      className="jt-pipeline-stage-icon"
                      style={s.pipelineStageIcon}
                    >
                      {renderPipelineIcon(stage.isSuccess ? '성공' : '실패')}
                    </div>
                    <div
                      className="jt-pipeline-stage-name"
                      style={s.pipelineStageName}
                    >
                      {stage.stageName}
                    </div>
                  </div>
                  {idx < pipelineStages.length - 1 && (
                    <div className="jt-pipeline-line" style={s.pipelineLine} />
                  )}
                </React.Fragment>
              ))}

              {/* End */}
              <div className="jt-pipeline-line" style={s.pipelineLine} />
              <div
                className="jt-pipeline-stage"
                style={{
                  ...s.pipelineStage,
                  cursor: 'pointer',
                  ...(selectedStageIndex === null ? {} : { opacity: 0.6 }),
                }}
                onClick={() => setSelectedStageIndex(null)}
                role="listitem"
              >
                <div
                  className="jt-pipeline-stage-icon"
                  style={s.pipelineStageIcon}
                >
                  {renderPipelineIcon('성공')}
                </div>
                <div
                  className="jt-pipeline-stage-name"
                  style={s.pipelineStageName}
                >
                  End
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              파이프라인 정보가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>빌드 결과</h2>
        </div>
        <div style={baseStyles.planBody}>
          {buildResultLoading ? (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              빌드 정보를 불러오는 중...
            </div>
          ) : buildResultError ? (
            <div style={{ padding: 16, color: theme.colors.error }}>
              {buildResultError}
            </div>
          ) : buildResultData ? (
            <div className="jt-stats-grid">
              {/* Top row: 빌드 상태 | 빌드 시작 시간 | 빌드 종료 시간 */}
              <div className="jt-stats-row">
                <div className="jt-stats-item" style={s.statsItem}>
                  <div className="jt-stats-icon" style={s.statsIcon}>
                    ✓
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 상태</div>
                    <div
                      style={s.statsValue(
                        buildResultData.isDeployed ? '성공' : '실패',
                      )}
                    >
                      {buildResultData.isDeployed ? '빌드 성공' : '빌드 실패'}
                    </div>
                  </div>
                </div>

                <div className="jt-stats-item" style={s.statsItem}>
                  <div className="jt-stats-icon" style={s.statsIcon}>
                    <StartIcon />
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 시작 시간</div>
                    <div style={s.statsValue()}>
                      {buildResultData.startedAt
                        ? formatKoreanDateTime(buildResultData.startedAt)
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className="jt-stats-item" style={s.statsItem}>
                  <div className="jt-stats-icon" style={s.statsIcon}>
                    <EndIcon />
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 종료 시간</div>
                    <div style={s.statsValue()}>
                      {buildResultData.endedAt
                        ? formatKoreanDateTime(buildResultData.endedAt)
                        : '-'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row: 빌드 소요 시간 | 배포된 PR */}
              <div className="jt-stats-row bottom">
                <div className="jt-stats-item" style={s.statsItem}>
                  <div className="jt-stats-icon" style={s.statsIcon}>
                    <DurationIcon />
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 소요 시간</div>
                    <div style={s.statsValue()}>
                      {formatDuration(buildResultData.duration)}
                    </div>
                  </div>
                </div>

                <div className="jt-stats-item" style={s.statsItem}>
                  <div className="jt-stats-icon" style={s.statsIcon}>
                    <PRIcon />
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>배포된 PR</div>
                    <div style={s.statsValue()}>
                      {buildResultData.prNumber ? (
                        buildResultData.prUrl ? (
                          <a
                            href={buildResultData.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: theme.colors.brand,
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            #{buildResultData.prNumber}
                          </a>
                        ) : (
                          `#${buildResultData.prNumber}`
                        )
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 16, color: theme.colors.textsecondary }}>
              빌드 정보가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Issues 카드 (콘솔과 분리) */}
      {issueSummary && (
        <div style={baseStyles.planCard}>
          <div style={baseStyles.planHeader}>
            <span style={baseStyles.planIcon}></span>
            <h2 style={baseStyles.planTitle}>문제 요약 & 권장 해결 방안</h2>
          </div>
          <div style={{ ...baseStyles.planBody, ...s.issuesCardBody }}>
            {issueSummary.summary && (
              <div style={s.issuesSummary}>
                <h4 style={s.issuesDetailsTitle}>문제 요약</h4>
                <p style={s.issuesText}>{issueSummary.summary}</p>
              </div>
            )}

            {issueSummary.solution && (
              <div style={s.issuesDetails}>
                <h4 style={s.issuesDetailsTitle}>권장 해결 방안</h4>
                <p style={baseStyles.reportText}>{issueSummary.solution}</p>
              </div>
            )}

            {issueSummary.details?.length > 0 && (
              <div style={s.issuesDetails}>
                <h4 style={s.issuesDetailsTitle}>주요 에러내역</h4>
                <ul style={s.issuesList}>
                  {issueSummary.details.map((it, idx) => (
                    <li key={idx} style={s.issuesListItem}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Console Output */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>
            빌드 #
            {buildResultData?.prNumber || jenkinsLogData?.buildRunId || '...'}{' '}
            콘솔 로그
          </h2>
        </div>

        <div style={baseStyles.planBody}>
          <div className="jt-console-header" style={s.consoleHeader}>
            <span style={s.consoleTitle}>
              Console
              {isRealtimeBuild && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    color: theme.colors.brand,
                  }}
                >
                  {isStreaming ? ' (실시간 수집 중)' : ' (실시간 모드 대기)'}
                </span>
              )}
            </span>
            <div style={s.consoleActions}>
              <button
                style={{
                  ...s.consoleButton,
                  ...(isConsoleDownloadDisabled
                    ? { opacity: 0.5, cursor: 'not-allowed' }
                    : { opacity: 1, cursor: 'pointer' }),
                }}
                onClick={() => {
                  if (jenkinsLogData?.processedLog && !jenkinsLogLoading) {
                    const blob = new Blob([jenkinsLogData.processedLog], {
                      type: 'text/plain;charset=utf-8',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `build-console-${
                      buildResultData?.prNumber ||
                      jenkinsLogData?.buildRunId ||
                      id ||
                      'unknown'
                    }.txt`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }
                }}
                disabled={isConsoleDownloadDisabled}
              >
                ⬇ Download
              </button>

              <button
                style={s.consoleButton}
                onClick={async () => {
                  if (!consoleOutputRef.current) return;
                  try {
                    if (!isFullscreen) {
                      if (consoleOutputRef.current.requestFullscreen) {
                        await consoleOutputRef.current.requestFullscreen();
                      } else if (
                        consoleOutputRef.current.webkitRequestFullscreen
                      ) {
                        await consoleOutputRef.current.webkitRequestFullscreen();
                      } else if (
                        consoleOutputRef.current.mozRequestFullScreen
                      ) {
                        await consoleOutputRef.current.mozRequestFullScreen();
                      } else if (consoleOutputRef.current.msRequestFullscreen) {
                        await consoleOutputRef.current.msRequestFullscreen();
                      }
                      setIsFullscreen(true);
                    } else {
                      if (document.exitFullscreen)
                        await document.exitFullscreen();
                      else if (document.webkitExitFullscreen)
                        await document.webkitExitFullscreen();
                      else if (document.mozCancelFullScreen)
                        await document.mozCancelFullScreen();
                      else if (document.msExitFullscreen)
                        await document.msExitFullscreen();
                      setIsFullscreen(false);
                    }
                  } catch (error) {
                    console.error('Fullscreen 전환 실패:', error);
                  }
                }}
              >
                {isFullscreen ? '⤢ Exit Fullscreen' : '⤢ Fullscreen'}
              </button>
            </div>
          </div>

          <div
            ref={consoleOutputRef}
            className="jt-console-output"
            style={s.consoleOutput}
            data-no-scrollbar="true"
          >
            {jenkinsLogLoading && !displayedLog ? (
              <div style={{ padding: 16, color: theme.colors.textsecondary }}>
                로그를 불러오는 중...
              </div>
            ) : jenkinsLogError && !displayedLog ? (
              <div style={{ padding: 16, color: theme.colors.error }}>
                {jenkinsLogError}
              </div>
            ) : displayedLog ? (
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: theme.colors.textprimary,
                }}
              >
                {displayedLog}
              </pre>
            ) : (
              <div style={{ padding: 16, color: theme.colors.textsecondary }}>
                로그가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
