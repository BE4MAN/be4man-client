import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getTaskById } from '../../../api/taskManagement';

import JenkinsTab from './JenkinsTab';
import { getStyles } from './TaskDetail.style';

export default function TaskDetail() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { id } = useParams();

  const [taskItem, setTaskItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('plan');
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('reject');
  const [comment, setComment] = useState('');

  // ✅ 현재 로그인한 사용자 ID (실제로는 Context나 Redux에서 가져와야 함)
  const currentUserId = 1; // TODO: 실제 로그인 사용자 ID로 변경

  const fetchTaskDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTaskById(id);
      setTaskItem(data);

      if (data.initialTab) {
        setActiveTab(data.initialTab);
      } else {
        if (data.currentStage === '결과보고') {
          setActiveTab('report');
        } else if (data.currentStage === '배포') {
          setActiveTab('jenkins');
        } else {
          setActiveTab('plan');
        }
      }
    } catch (err) {
      console.error('작업 상세 조회 실패:', err);
      setError('작업 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTaskDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>{error}</div>
      </div>
    );
  }

  if (!taskItem) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>작업을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const timeline = taskItem?.timeline || [];
  const planApproval = taskItem?.planApproval || {};
  const reportApproval = taskItem?.reportApproval || {};
  const planContent = taskItem?.planContent || {};
  const reportContent = taskItem?.reportContent || null;

  const getPlanApprovalStatus = () => {
    if (
      taskItem.currentStage === '배포' ||
      taskItem.currentStage === '결과보고'
    ) {
      return '승인';
    }
    return taskItem.currentStatus || '대기';
  };

  const isTabEnabled = (tabName) => {
    const maxStage = taskItem.maxStage; // ✅ 가장 진행된 단계

    if (tabName === 'plan') {
      return true; // 계획서는 항상 활성화
    }

    if (tabName === 'jenkins') {
      // 배포 또는 결과보고까지 진행되었으면 활성화
      return (
        maxStage === '배포' ||
        maxStage === '재배포' ||
        maxStage === '복구' ||
        maxStage === '결과보고'
      );
    }

    if (tabName === 'report') {
      // 결과보고까지 진행되었으면 활성화
      return maxStage === '결과보고';
    }

    return false;
  };

  // ✅ 실제 승인 API 호출
  const handleApprove = async () => {
    setApprovalLoading(true);
    setApprovalMessage('승인 처리 중...');

    try {
      // 현재 activeTab에 따라 approvalId 결정
      const approvalId =
        activeTab === 'report'
          ? reportApproval?.approvalId
          : planApproval?.approvalId;

      if (!approvalId) {
        setApprovalMessage('승인 정보를 찾을 수 없습니다.');
        setApprovalLoading(false);
        return;
      }

      const response = await fetch(`/api/approvals/${approvalId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approverAccountId: currentUserId,
          comment: '',
        }),
      });

      if (response.ok) {
        setApprovalMessage('승인 완료되었습니다.');
        // 1초 후 페이지 새로고침하여 최신 상태 반영
        setTimeout(() => {
          fetchTaskDetail();
        }, 1000);
      } else {
        const errorData = await response.json();
        setApprovalMessage(errorData.message || '승인 처리 실패');
      }
    } catch (error) {
      console.error('승인 실패:', error);
      setApprovalMessage('승인 처리 중 오류가 발생했습니다.');
    } finally {
      setApprovalLoading(false);
    }
  };

  const handleRejectClick = () => {
    setModalType('reject');
    setComment('');
    setIsModalOpen(true);
  };

  // ✅ 실제 반려/취소 API 호출
  const handleModalSubmit = async () => {
    if (!comment.trim()) {
      alert('사유를 입력해주세요.');
      return;
    }

    const actionText = modalType === 'reject' ? '반려' : '취소';
    setApprovalLoading(true);
    setApprovalMessage(`${actionText} 처리 중...`);

    try {
      const approvalId =
        activeTab === 'report'
          ? reportApproval?.approvalId
          : planApproval?.approvalId;

      if (!approvalId) {
        setApprovalMessage('승인 정보를 찾을 수 없습니다.');
        setApprovalLoading(false);
        return;
      }

      const endpoint =
        modalType === 'reject'
          ? `/api/approvals/${approvalId}/reject`
          : `/api/approvals/${approvalId}/cancel`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approverAccountId: currentUserId,
          comment: comment,
        }),
      });

      if (response.ok) {
        setApprovalMessage(`${actionText} 완료되었습니다.`);
        setIsModalOpen(false);
        setComment('');
        // 1초 후 페이지 새로고침하여 최신 상태 반영
        setTimeout(() => {
          fetchTaskDetail();
        }, 1000);
      } else {
        const errorData = await response.json();
        setApprovalMessage(errorData.message || `${actionText} 처리 실패`);
      }
    } catch (error) {
      console.error(`${actionText} 실패:`, error);
      setApprovalMessage(`${actionText} 처리 중 오류가 발생했습니다.`);
    } finally {
      setApprovalLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setComment('');
  };

  const isDark = theme.mode === 'dark';

  const modalStyles = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    },
    modal: {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      width: '90%',
      maxWidth: '500px',
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.5)'
        : '0 8px 32px rgba(0, 0, 0, 0.15)',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    header: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: theme.colors.text,
      borderBottom: `1px solid ${theme.colors.border}`,
      paddingBottom: '12px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: theme.colors.text,
    },
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '12px',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      color: theme.colors.text,
      fontSize: '14px',
      marginBottom: '20px',
      resize: 'vertical',
      fontFamily: 'inherit',
      outline: 'none',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: `1px solid ${theme.colors.border}`,
      backgroundColor: 'transparent',
      color: theme.colors.text,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
    submitButton: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#ef5350',
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {/* 모달 */}
      {isModalOpen && (
        <div style={modalStyles.backdrop} onClick={handleModalClose}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              {modalType === 'reject' ? '반려 사유 입력' : '취소 사유 입력'}
            </div>

            <label style={modalStyles.label}>
              {modalType === 'reject' ? '반려 사유' : '취소 사유'}
            </label>
            <textarea
              style={modalStyles.textarea}
              placeholder="사유를 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autoFocus
            />

            <div style={modalStyles.buttonGroup}>
              <button
                style={modalStyles.cancelButton}
                onClick={handleModalClose}
              >
                닫기
              </button>
              <button
                style={modalStyles.submitButton}
                onClick={handleModalSubmit}
              >
                {modalType === 'reject' ? '반려' : '취소'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.timelineCard}>
        <h3 style={styles.timelineTitle}>작업 타임라인</h3>
        <div style={styles.timelineWrapper}>
          {timeline && timeline.length > 0 ? (
            timeline.map((step, index) => {
              const isLastStep = index === timeline.length - 1;
              const nextStep = !isLastStep ? timeline[index + 1] : null;

              const shouldShowLine =
                !isLastStep && nextStep && nextStep.status !== 'pending';

              const getLineColor = () => {
                const currentStatus = step.status;
                const currentResult = step.result;

                if (currentResult === 'failure') {
                  return isDark ? '#ef5350' : '#f44336';
                }

                if (currentResult === 'success') {
                  return isDark ? '#4caf50' : '#66bb6a';
                }

                if (currentStatus === 'rejected' || currentStatus === '취소') {
                  return isDark ? '#ef5350' : '#f44336';
                }

                if (
                  currentStatus === 'completed' ||
                  currentStatus === '승인' ||
                  currentStatus === '성공' ||
                  currentStatus === '작성완료'
                ) {
                  return isDark ? '#4caf50' : '#66bb6a';
                }

                if (currentStatus === 'active') {
                  return isDark ? '#ffa726' : '#ff9800';
                }

                return isDark ? '#424242' : '#e0e0e0';
              };

              return (
                <div key={index} style={styles.timelineStep(false)}>
                  <div style={styles.timelineIconWrapper}>
                    {renderStepIcon(step, isLastStep, styles)}

                    {shouldShowLine && (
                      <div style={styles.timelineLine(getLineColor())} />
                    )}
                  </div>

                  <div style={styles.timelineStepName}>
                    {step.stepNumber}. {step.stepName}
                  </div>

                  <div style={styles.timelineStepTime}>
                    {step.timestamp || '-'}
                  </div>

                  <div
                    style={styles.timelineStepStatus(
                      step.result === 'failure',
                      false,
                    )}
                  >
                    {step.description || step.status}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: theme.colors.textsecondary,
              }}
            >
              타임라인 정보가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div style={styles.mainContentWrapper}>
        <div style={styles.leftContent}>
          <div style={styles.planCard}>
            <div style={styles.subTabContainer}>
              <button
                style={styles.subTabButton(
                  activeTab === 'plan',
                  isTabEnabled('plan'),
                )}
                onClick={() => isTabEnabled('plan') && setActiveTab('plan')}
                disabled={!isTabEnabled('plan')}
              >
                계획서
              </button>
              <button
                style={styles.subTabButton(
                  activeTab === 'jenkins',
                  isTabEnabled('jenkins'),
                )}
                onClick={() =>
                  isTabEnabled('jenkins') && setActiveTab('jenkins')
                }
                disabled={!isTabEnabled('jenkins')}
              >
                Jenkins
              </button>
              <button
                style={styles.subTabButton(
                  activeTab === 'report',
                  isTabEnabled('report'),
                )}
                onClick={() => isTabEnabled('report') && setActiveTab('report')}
                disabled={!isTabEnabled('report')}
              >
                결과 보고
              </button>
            </div>

            <div style={styles.tabContentWrapper}>
              {activeTab === 'plan' && (
                <>
                  <div style={styles.planCard}>
                    <div style={styles.planHeader}>
                      <span style={styles.planIcon}></span>
                      <h2 style={styles.planTitle}>작업 정보</h2>
                    </div>
                    <div style={styles.planBody}>
                      <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>작업명</span>
                          <span style={styles.infoValue}>
                            {taskItem.taskTitle || '-'}
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>서비스명</span>
                          <span style={styles.infoValue}>
                            {taskItem.serviceName || '-'}
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>기안자</span>
                          <span style={styles.infoValue}>
                            {planContent?.drafter || '-'} (
                            {planContent?.department || '-'})
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>기안일자</span>
                          <span style={styles.infoValue}>
                            {planContent?.createdAt || '-'}
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>배포 시작</span>
                          <span style={styles.infoValue}>
                            {planContent?.scheduledAt || '-'}
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>배포 종료</span>
                          <span style={styles.infoValue}>
                            {planContent?.scheduledToEndedAt || '-'}
                          </span>
                        </div>

                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>계획서 상태</span>
                          <span
                            style={styles.statusBadge(getPlanApprovalStatus())}
                          >
                            {getPlanApprovalStatus()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.planCard}>
                    <div style={styles.planHeader}>
                      <span style={styles.planIcon}></span>
                      <h2 style={styles.planTitle}>상세 정보</h2>
                    </div>

                    <div style={styles.planBody}>
                      <div
                        style={styles.detailTextContent}
                        dangerouslySetInnerHTML={{
                          __html: planContent?.content || '내용이 없습니다.',
                        }}
                      />

                      {(planApproval?.approvers || []).some(
                        (a) => a.canApprove || a.canCancel,
                      ) && (
                        <div style={styles.detailApprovalButtons}>
                          {approvalMessage && (
                            <div style={styles.approvalMessage}>
                              {approvalMessage}
                            </div>
                          )}
                          <div style={styles.detailApprovalButtonWrapper}>
                            <button
                              style={styles.detailApproveButton}
                              onClick={handleApprove}
                              disabled={approvalLoading}
                            >
                              ✓ 승인
                            </button>
                            <button
                              style={styles.detailRejectButton}
                              onClick={handleRejectClick}
                              disabled={approvalLoading}
                            >
                              ✕ 반려
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'jenkins' && (
                <JenkinsTab
                  id={id}
                  theme={theme}
                  baseStyles={{
                    planCard: styles.planCard,
                    planHeader: styles.planHeader,
                    planBody: styles.planBody,
                  }}
                />
              )}

              {activeTab === 'report' && (
                <div style={styles.planCard}>
                  <div style={styles.planHeader}>
                    <span style={styles.planIcon}></span>
                    <h2 style={styles.planTitle}>결과 보고</h2>
                  </div>
                  <div style={styles.planBody}>
                    {reportContent ? (
                      <>
                        {/* 배포 결과 정보 */}
                        <div style={styles.infoGrid}>
                          {reportContent.deploymentResult && (
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>배포 결과</span>
                              <span
                                style={styles.statusBadge(
                                  reportContent.deploymentResult,
                                )}
                              >
                                {reportContent.deploymentResult}
                              </span>
                            </div>
                          )}

                          {reportContent.actualStartedAt && (
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>
                                실제 시작 시각
                              </span>
                              <span style={styles.infoValue}>
                                {reportContent.actualStartedAt}
                              </span>
                            </div>
                          )}

                          {reportContent.actualEndedAt && (
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>
                                실제 종료 시각
                              </span>
                              <span style={styles.infoValue}>
                                {reportContent.actualEndedAt}
                              </span>
                            </div>
                          )}

                          {reportContent.actualDuration && (
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>
                                실제 소요 시간
                              </span>
                              <span style={styles.infoValue}>
                                {reportContent.actualDuration}
                              </span>
                            </div>
                          )}

                          {reportContent.reportCreatedAt && (
                            <div style={styles.infoItem}>
                              <span style={styles.infoLabel}>
                                결과보고 작성일
                              </span>
                              <span style={styles.infoValue}>
                                {reportContent.reportCreatedAt}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 결과보고 내용 */}
                        <div
                          style={styles.detailTextContent}
                          dangerouslySetInnerHTML={{
                            __html:
                              reportContent.reportContent || '내용이 없습니다.', // ✅ .reportContent 사용
                          }}
                        />
                      </>
                    ) : (
                      <div>결과 보고가 없습니다.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.approvalSidebarFull}>
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>승인 정보</h3>
          </div>

          <div style={styles.approvalListContainer}>
            {(() => {
              const approvers =
                activeTab === 'report'
                  ? reportApproval?.approvers || []
                  : planApproval?.approvers || [];

              return approvers.length > 0 ? (
                approvers.map((approver, idx) => {
                  const approvalStatus = approver.approvalStatus || '대기중';
                  const isApproved = approvalStatus === '승인';
                  const isRejected = approvalStatus === '반려';
                  const isPending = approvalStatus === '대기중';

                  return (
                    <div
                      key={idx}
                      style={styles.approverListItem(
                        approver.isCurrentTurn,
                        false,
                        isRejected,
                      )}
                    >
                      <div
                        style={styles.approverListName(
                          approver.isCurrentTurn,
                          false,
                          isApproved,
                          isRejected,
                        )}
                      >
                        {isApproved && <span style={styles.checkMark}>✓</span>}
                        {isRejected && <span style={styles.rejectMark}>✕</span>}
                        {isPending && approver.isCurrentTurn && (
                          <span style={styles.pendingMark}>⏳</span>
                        )}
                        {approver.approverName}
                      </div>

                      <div
                        style={styles.approverListInfo(
                          approver.isCurrentTurn,
                          false,
                          isApproved,
                          isRejected,
                        )}
                      >
                        {approver.approverDepartment} · 승인자
                      </div>

                      {approver.processedAt && (
                        <div
                          style={styles.approverListInfo(
                            approver.isCurrentTurn,
                            false,
                            isApproved,
                            isRejected,
                          )}
                        >
                          {approver.processedAt}
                        </div>
                      )}

                      {approver.comment && (
                        <div
                          style={styles.approverListInfo(
                            approver.isCurrentTurn,
                            false,
                            isApproved,
                            isRejected,
                          )}
                        >
                          <strong>의견:</strong> {approver.comment}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: theme.colors.textsecondary,
                  }}
                >
                  승인 정보가 없습니다.
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStepIcon(step, isLastStep, styles) {
  const status = step.status;
  const result = step.result;

  if (result === 'failure') {
    return (
      <span style={styles.timelineIcon('rejected', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </span>
    );
  }

  if (result === 'success') {
    return (
      <span style={styles.timelineIcon('completed', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </span>
    );
  }

  if (status === 'completed') {
    return (
      <span style={styles.timelineIcon('completed', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </span>
    );
  }

  if (status === 'active') {
    return (
      <span style={styles.timelineIcon('inProgress', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="currentColor" />
        </svg>
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span style={styles.timelineIcon('rejected', isLastStep)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </span>
    );
  }

  return (
    <span style={styles.timelineIcon('pending', isLastStep)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </span>
  );
}
