import React, { useRef, useState } from 'react';

import { useUIStore } from '@/stores/uiStore';

import * as S from './JenkinsPanel.styles';

const stages = [
  { name: 'Start', status: 'success' },
  { name: 'Checkout', status: 'success' },
  { name: 'Build', status: 'success' },
  { name: 'Test', status: 'success' },
  { name: 'Package and\nPush to Docker\nHub', status: 'success' },
  { name: 'Deploy to VM', status: 'failed' },
  { name: 'Post Actions', status: 'success' },
  { name: 'End', status: 'success' },
];

const logs = [
  `Checkout
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository https://github.com/company/project.git`,
  `Build
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository https://github.com/company/project.git`,
  `Test
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository https://github.com/company/project.git`,
  `Package and\nPush to Docker\nHub
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository https://github.com/company/project.git`,
  `Deploy to VM
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository https://github.com/company/project.git`,
  `Post Actions
  [2025-01-15 14:32:15] Started by user admin
  [2025-01-15 14:32:16] Building in workspace /var/jenkins_home/workspace/main
  [2025-01-15 14:32:17] Cloning repository`,
];

function getStatusSymbol(status) {
  if (status === 'success') return '✔';
  if (status === 'failed') return '✖';
  return null;
}

function truncateLabelByWidth(name, max = 20) {
  if (!name) return name;

  if (computeWidth(name) <= max) return name;

  const lines = name.split('\n');
  let accumulatedWidth = 0;
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const remain = max - accumulatedWidth;

    const lineWidth = computeWidth(line);

    if (lineWidth <= remain) {
      out.push(line);
      accumulatedWidth += lineWidth;
      continue;
    }

    if (remain > 0) {
      const sliced = sliceByWidth(line, remain);
      const lastSpace = sliced.lastIndexOf(' ');
      let trunc;
      if (lastSpace > 0) {
        trunc = sliced.slice(0, lastSpace);
      } else {
        trunc = sliced;
      }
      out.push(trunc + '...');
    } else {
      if (out.length === 0) out.push('...');
      else out[out.length - 1] = out[out.length - 1] + '...';
    }

    break;
  }

  return out.join('\n');
}

function charWidth(ch) {
  const widePattern =
    /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\u4E00-\u9FFF\uFF00-\uFFEF]/u;
  const emojiPattern =
    /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  if (widePattern.test(ch) || emojiPattern.test(ch)) return 2;
  return 1;
}

function computeWidth(s) {
  let w = 0;
  for (const ch of s) {
    w += charWidth(ch);
  }
  return w;
}

function sliceByWidth(s, maxWidth) {
  let w = 0;
  let out = '';
  for (const ch of s) {
    const cw = charWidth(ch);
    if (w + cw > maxWidth) break;
    out += ch;
    w += cw;
  }
  return out;
}

export default function JenkinsPanel() {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';
  const consoleRef = useRef(null);
  const [isFs, setIsFs] = useState(false);
  // activeStageLog stores the index into `logs` (0..logs.length-1), or null to show all
  const [activeStageLog, setActiveStageLog] = useState(null);

  function handleDownload() {
    try {
      const blob = new Blob([logs.join('\n')], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'build-console-127.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed', e);
    }
  }

  async function toggleFullscreen() {
    if (!consoleRef.current) return;
    try {
      if (!isFs) {
        if (consoleRef.current.requestFullscreen)
          await consoleRef.current.requestFullscreen();
        else if (consoleRef.current.webkitRequestFullscreen)
          await consoleRef.current.webkitRequestFullscreen();
        setIsFs(true);
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen)
          await document.webkitExitFullscreen();
        setIsFs(false);
      }
    } catch {
      // ignore
    }
  }
  return (
    <S.JenkinsWrapper>
      <S.PipelineArea>
        <S.CardTitle>Pipeline</S.CardTitle>
        <S.PipelineStages>
          {stages.map((s, i) => {
            const isBoundary = i === 0 || i === stages.length - 1; // Start or End
            const hasLog = !isBoundary; // internal stages have per-stage logs
            const logIndex = hasLog ? i - 1 : null;
            return (
              <React.Fragment key={s.name}>
                <S.Stage
                  role="button"
                  tabIndex={0}
                  aria-pressed={
                    isBoundary
                      ? activeStageLog === null
                      : activeStageLog === logIndex
                  }
                  onClick={() => {
                    setActiveStageLog(isBoundary ? null : logIndex);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStageLog(isBoundary ? null : logIndex);
                    }
                  }}
                >
                  <S.StageCircle
                    $status={s.status}
                    $active={activeStageLog === logIndex}
                  >
                    {getStatusSymbol(s.status)}
                  </S.StageCircle>
                  <S.StageLabel>
                    {truncateLabelByWidth(s.name, 20)}
                  </S.StageLabel>
                </S.Stage>
                {i < stages.length - 1 && (
                  <S.PipelineConnector $isDark={isDark} />
                )}
              </React.Fragment>
            );
          })}
        </S.PipelineStages>
      </S.PipelineArea>

      <S.Card>
        <S.CardTitle>Stats</S.CardTitle>
        <S.JenkinsStats>
          <S.StatCard>
            <div className="icon-wrap">✓</div>
            <div>
              <div className="stat-label">빌드 상태</div>
              <div className="stat-value">성공</div>
            </div>
          </S.StatCard>

          <S.StatCard>
            <div className="icon-wrap">⏱</div>
            <div>
              <div className="stat-label">빌드 소요 시간</div>
              <div className="stat-value">3m 24s</div>
            </div>
          </S.StatCard>

          <S.StatCard>
            <div className="icon-wrap">
              <img src="/icons/branch_icon.png" alt="branch" />
            </div>
            <div>
              <div className="stat-label">브랜치</div>
              <div className="stat-value">main</div>
            </div>
          </S.StatCard>

          <S.StatCard>
            <div className="icon-wrap">
              <img src="/icons/pr_icon.png" alt="pr" />
            </div>
            <div>
              <div className="stat-label">배포한 PR</div>
              <div className="stat-value">PR #342</div>
            </div>
          </S.StatCard>
        </S.JenkinsStats>
      </S.Card>

      <S.Card $fill>
        <S.CardTitle>Build #127 Console Output</S.CardTitle>
        <S.ConsoleWrapper ref={consoleRef}>
          <S.ConsoleHeader>
            <h3 style={{ margin: 0 }}>Console</h3>
            <div className="actions">
              <button type="button" onClick={handleDownload}>
                <span>⬇</span>
                <span style={{ marginLeft: 8 }}>Download</span>
              </button>
              <button type="button" onClick={toggleFullscreen}>
                <span>⤢</span>
                <span style={{ marginLeft: 8 }}>
                  {isFs ? 'Exit' : 'Fullscreen'}
                </span>
              </button>
            </div>
          </S.ConsoleHeader>
          <S.ConsoleContent>
            {(activeStageLog == null ? logs : [logs[activeStageLog]]).map(
              (l, idx) => (
                <div key={idx}>
                  {typeof l === 'string' ? (
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{l}</pre>
                  ) : (
                    <div>{String(l)}</div>
                  )}
                </div>
              ),
            )}
          </S.ConsoleContent>
        </S.ConsoleWrapper>
        {activeStageLog != null &&
          stages[activeStageLog + 1]?.status === 'failed' && (
            <S.ProblemArea>
              <h4>문제 요약</h4>
              <p>
                해당 단계에서 실패가 발생했습니다. 로그를 확인해 원인(예: 의존성
                누락, 권한 오류, 네트워크 타임아웃 등)을 진단하세요.
              </p>
              <h4>추천 해결책</h4>
              <ul>
                <li>최근 변경된 의존성 버전 확인 및 롤백</li>
                <li>빌드 스크립트 권한/경로 확인</li>
                <li>네트워크/레지스트리 접근성 테스트</li>
              </ul>
            </S.ProblemArea>
          )}
      </S.Card>
    </S.JenkinsWrapper>
  );
}
