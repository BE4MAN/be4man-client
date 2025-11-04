// src/features/log/pages/JenkinsTab.jsx
import { Global } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { taskAPI } from '@/api/task';

import { getJenkinsStyles, noScrollbarGlobalStyles } from './JenkinsTab.style';

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

/** PR 아이콘: 외부 이미지 경로 대신 내장 SVG 사용 */
function PRIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-label="PR">
      <path
        d="M7 3a3 3 0 0 0-1 5.83V15a3 3 0 1 0 2 0V8.83A3.001 3.001 0 0 0 7 3zm0 2a1 1 0 1 1-.001 2.001A1 1 0 0 1 7 5zm0 12a1 1 0 1 1-.001 2.001A1 1 0 0 1 7 17zm10-2a3 3 0 0 0-2-2.816V7a3 3 0 1 0-2 0v5.184A3.001 3.001 0 0 0 17 15zm0-10a1 1 0 1 1-.001 2.001A1 1 0 0 1 17 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function JenkinsTab({
  id,
  theme,
  baseStyles, // planCard / planHeader / planBody 재사용
  jenkinsLog, // 상위 mock/taskManage의 기본 로그/파이프라인 정보
}) {
  const s = useMemo(() => getJenkinsStyles(theme), [theme]);

  // 상태
  const consoleOutputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [jenkinsLogData, setJenkinsLogData] = useState(null);
  const [jenkinsLogLoading, setJenkinsLogLoading] = useState(false);
  const [jenkinsLogError, setJenkinsLogError] = useState(null);

  const [buildResultData, setBuildResultData] = useState(null);
  const [buildResultLoading, setBuildResultLoading] = useState(false);
  const [buildResultError, setBuildResultError] = useState(null);

  const [pipelineStages, setPipelineStages] = useState([]);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineError, setPipelineError] = useState(null);
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);

  // API: 콘솔 로그
  useEffect(() => {
    if (!id) return;
    (async () => {
      setJenkinsLogLoading(true);
      setJenkinsLogError(null);
      try {
        const res = await taskAPI.fetchConsoleLog(id);
        const processedLog = processEscapeChars(res?.log || '');
        setJenkinsLogData({ ...res, processedLog });
      } catch (e) {
        console.error(e);
        setJenkinsLogError('로그를 불러오는데 실패했습니다.');
      } finally {
        setJenkinsLogLoading(false);
      }
    })();
  }, [id]);

  // API: 빌드 결과
  useEffect(() => {
    if (!id) return;
    (async () => {
      setBuildResultLoading(true);
      setBuildResultError(null);
      try {
        const res = await taskAPI.fetchBuildResult(id);
        setBuildResultData(res);
      } catch (e) {
        console.error(e);
        setBuildResultError('빌드 결과를 불러오는데 실패했습니다.');
      } finally {
        setBuildResultLoading(false);
      }
    })();
  }, [id]);

  // API: 파이프라인 stages
  useEffect(() => {
    if (!id) return;
    (async () => {
      setPipelineLoading(true);
      setPipelineError(null);
      try {
        const response = await taskAPI.fetchAllStages(id);
        const sorted = [...response].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        );
        setPipelineStages(sorted);
      } catch (e) {
        console.error(e);
        setPipelineError('파이프라인 정보를 불러오는데 실패했습니다.');
        setPipelineStages([]);
      } finally {
        setPipelineLoading(false);
      }
    })();
  }, [id]);

  // Fullscreen 상태 추적
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

  const isConsoleDownloadDisabled =
    !jenkinsLogData?.processedLog || jenkinsLogLoading;

  // 선택된 스테이지
  const selectedStage =
    selectedStageIndex !== null ? pipelineStages[selectedStageIndex] : null;

  // 선택된 스테이지의 이슈/해결책이 없으면 전체 요약(모의 데이터)로 대체
  const issueSummary =
    (!selectedStage?.isSuccess &&
      (selectedStage?.problemSummary || selectedStage?.problemSolution)) ||
    jenkinsLog?.errorSummary
      ? {
          summary:
            selectedStage?.problemSummary || jenkinsLog?.errorSummary || '',
          solution: selectedStage?.problemSolution || '',
          details: jenkinsLog?.issueDetails || [],
        }
      : null;

  return (
    <>
      {/* WebKit 스크롤바 숨김 전역 스타일 */}
      <Global styles={noScrollbarGlobalStyles} />

      {/* Pipeline */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>Pipeline</h2>
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
              style={s.pipelineContainer}
              data-no-scrollbar="true"
              role="list"
              aria-label="Pipeline Stages"
            >
              {/* Start */}
              <div
                style={{
                  ...s.pipelineStage,
                  cursor: 'pointer',
                  ...(selectedStageIndex === null ? {} : { opacity: 0.6 }),
                }}
                onClick={() => setSelectedStageIndex(null)}
                role="listitem"
              >
                <div style={s.pipelineStageIcon('성공')}>
                  {renderPipelineIcon('성공')}
                </div>
                <div style={s.pipelineStageName}>Start</div>
              </div>
              <div style={s.pipelineLine} />

              {/* Stages */}
              {pipelineStages.map((stage, idx) => (
                <React.Fragment key={stage.stageRunId || idx}>
                  <div
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
                      style={s.pipelineStageIcon(
                        stage.isSuccess ? '성공' : '실패',
                      )}
                    >
                      {renderPipelineIcon(stage.isSuccess ? '성공' : '실패')}
                    </div>
                    <div style={s.pipelineStageName}>{stage.stageName}</div>
                  </div>
                  {idx < pipelineStages.length - 1 && (
                    <div style={s.pipelineLine} />
                  )}
                </React.Fragment>
              ))}

              {/* End */}
              <div style={s.pipelineLine} />
              <div
                style={{
                  ...s.pipelineStage,
                  cursor: 'pointer',
                  ...(selectedStageIndex === null ? {} : { opacity: 0.6 }),
                }}
                onClick={() => setSelectedStageIndex(null)}
                role="listitem"
              >
                <div style={s.pipelineStageIcon('성공')}>
                  {renderPipelineIcon('성공')}
                </div>
                <div style={s.pipelineStageName}>End</div>
              </div>
            </div>
          ) : jenkinsLog?.pipeline ? (
            <div
              style={s.pipelineContainer}
              data-no-scrollbar="true"
              role="list"
              aria-label="Pipeline Stages"
            >
              {jenkinsLog.pipeline.map((stage, idx) => (
                <React.Fragment key={idx}>
                  <div style={s.pipelineStage} role="listitem">
                    <div style={s.pipelineStageIcon(stage.status)}>
                      {renderPipelineIcon(stage.status)}
                    </div>
                    <div style={s.pipelineStageName}>{stage.name}</div>
                  </div>
                  {idx < jenkinsLog.pipeline.length - 1 && (
                    <div style={s.pipelineLine} />
                  )}
                </React.Fragment>
              ))}
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
          <h2 style={baseStyles.planTitle}>Stats</h2>
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
            <div style={s.statsGrid}>
              <div style={s.statsItem}>
                <div style={s.statsIcon}>✓</div>
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

              <div style={s.statsItem}>
                <div style={s.statsIcon}>⏱</div>
                <div style={s.statsContent}>
                  <div style={s.statsLabel}>빌드 소요 시간</div>
                  <div style={s.statsValue()}>
                    {formatDuration(buildResultData.duration)}
                  </div>
                </div>
              </div>

              {buildResultData.startedAt && (
                <div style={s.statsItem}>
                  <div style={s.statsIcon}>🕐</div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 시작 시간</div>
                    <div style={s.statsValue()}>
                      {formatKoreanDateTime(buildResultData.startedAt)}
                    </div>
                  </div>
                </div>
              )}

              {buildResultData.endedAt && (
                <div style={s.statsItem}>
                  <div style={s.statsIcon}>🕑</div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>빌드 종료 시간</div>
                    <div style={s.statsValue()}>
                      {formatKoreanDateTime(buildResultData.endedAt)}
                    </div>
                  </div>
                </div>
              )}

              {buildResultData.prNumber && (
                <div style={s.statsItem}>
                  <div style={s.statsIcon}>
                    <PRIcon />
                  </div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>배포된 PR</div>
                    <div style={s.statsValue()}>
                      {buildResultData.prUrl ? (
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
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={s.statsGrid}>
              <div style={s.statsItem}>
                <div style={s.statsIcon}>✓</div>
                <div style={s.statsContent}>
                  <div style={s.statsLabel}>빌드 상태</div>
                  <div style={s.statsValue(jenkinsLog.status)}>
                    {jenkinsLog.status}
                  </div>
                </div>
              </div>

              <div style={s.statsItem}>
                <div style={s.statsIcon}></div>
                <div style={s.statsContent}>
                  <div style={s.statsLabel}>빌드 소요 시간</div>
                  <div style={s.statsValue()}>{jenkinsLog.duration || '-'}</div>
                </div>
              </div>

              {jenkinsLog.branch && (
                <div style={s.statsItem}>
                  <div style={s.statsIcon}></div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>브랜치</div>
                    <div style={s.statsValue()}>{jenkinsLog.branch}</div>
                  </div>
                </div>
              )}

              {jenkinsLog.pr && (
                <div style={s.statsItem}>
                  <div style={s.statsIcon}></div>
                  <div style={s.statsContent}>
                    <div style={s.statsLabel}>배포된 PR</div>
                    <div style={s.statsValue()}>{jenkinsLog.pr}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Issues: (선택 스테이지 이슈) 또는 (전체 요약) — 콘솔과 분리된 ‘별도 카드’ */}
      {issueSummary && (
        <div style={baseStyles.planCard}>
          <div style={baseStyles.planHeader}>
            <span style={baseStyles.planIcon}></span>
            <h2 style={baseStyles.planTitle}>문제 요약 & 권장 해결 방안</h2>
          </div>
          <div style={{ ...baseStyles.planBody, ...s.issuesCardBody }}>
            {issueSummary.summary && (
              <div style={s.issuesSummary}>
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

      {/* Console Output — 별도 카드로 분리 */}
      <div style={baseStyles.planCard}>
        <div style={baseStyles.planHeader}>
          <span style={baseStyles.planIcon}></span>
          <h2 style={baseStyles.planTitle}>
            Build #
            {buildResultData?.prNumber ||
              jenkinsLogData?.buildRunId ||
              jenkinsLog?.buildNumber ||
              '...'}{' '}
            Console Output
          </h2>
        </div>

        <div style={baseStyles.planBody}>
          <div style={s.consoleHeader}>
            <span style={s.consoleTitle}>Console</span>
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
            style={s.consoleOutput}
            data-no-scrollbar="true"
          >
            {jenkinsLogLoading ? (
              <div style={{ padding: 16, color: theme.colors.textsecondary }}>
                로그를 불러오는 중...
              </div>
            ) : jenkinsLogError ? (
              <div style={{ padding: 16, color: theme.colors.error }}>
                {jenkinsLogError}
              </div>
            ) : selectedStage ? (
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: theme.colors.textprimary,
                }}
              >
                {processEscapeChars(selectedStage.log || '')}
              </pre>
            ) : jenkinsLogData?.processedLog ? (
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: theme.colors.textprimary,
                }}
              >
                {jenkinsLogData.processedLog}
              </pre>
            ) : jenkinsLog?.logs ? (
              jenkinsLog.logs.map((log, idx) => (
                <div key={idx} style={s.consoleLine}>
                  <span style={s.consoleTime}>[{log.time}]</span>
                  <span style={s.consoleLevel(log.level)}>[{log.level}]</span>
                  <span style={s.consoleMessage}>{log.message}</span>
                </div>
              ))
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
