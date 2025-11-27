// 작성자 : 허겸, 김민호, 이원석
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from '@/components/layout/AppLayout';

import { PATHS } from './paths';
import ProtectedRoute from './ProtectedRoute';

const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage'));
const AuthCallback = lazy(() => import('@/features/auth/pages/AuthCallback'));
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const Task = lazy(() => import('@/features/log/pages/LogManagement'));
const TaskDetail = lazy(() => import('@/features/log/pages/TaskDetail'));
const Approval = lazy(() => import('@/features/approval/pages/Approval'));
const ApprovalFormPage = lazy(
  () => import('@/features/approval/pages/ApprovalForm'),
);
const ApprovalDetailPage = lazy(
  () => import('@/features/approval/pages/ApprovalDetail'),
);
const ApprovalEditPage = lazy(
  () => import('@/features/approval/pages/ApprovalEdit'),
);

const LogManagement = lazy(() => import('@/features/log/pages/LogManagement'));
const ScheduleManagement = lazy(
  () => import('@/features/schedule/pages/ScheduleManagement'),
);
const RestrictedPeriodCreationPage = lazy(
  () => import('@/features/schedule/pages/RestrictedPeriodCreationPage'),
);
const AnalyticsPage = lazy(
  () => import('@/features/analytics/pages/AnalyticsPage'),
);
const ProblemManagement = lazy(
  () => import('@/features/problem/pages/ProblemManagement'),
);
const ProblemFormPage = lazy(
  () => import('@/features/problem/pages/ProblemFormPage'),
);

export const router = createBrowserRouter([
  {
    path: PATHS.AUTH,
    element: (
      <Suspense fallback={null}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: PATHS.AUTH_CALLBACK,
    element: (
      <Suspense fallback={null}>
        <AuthCallback />
      </Suspense>
    ),
  },
  {
    path: PATHS.ROOT,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={PATHS.HOME} replace /> },
      {
        path: PATHS.HOME,
        element: (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: PATHS.APPROVALS,
        element: (
          <Suspense fallback={null}>
            <Approval />
          </Suspense>
        ),
      },

      {
        path: PATHS.APPROVAL_NEW,
        element: (
          <Suspense fallback={null}>
            <ApprovalFormPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.APPROVAL_DETAIL,
        element: (
          <Suspense fallback={null}>
            <ApprovalDetailPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.APPROVAL_EDIT,
        element: (
          <Suspense fallback={null}>
            <ApprovalEditPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.SCHEDULE,
        element: (
          <Suspense fallback={null}>
            <ScheduleManagement />
          </Suspense>
        ),
      },
      {
        path: PATHS.SCHEDULE_BAN_NEW,
        element: (
          <Suspense fallback={null}>
            <RestrictedPeriodCreationPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.TASKS,
        element: (
          <Suspense fallback={null}>
            <Task />
          </Suspense>
        ),
      },
      {
        path: PATHS.TASK_DETAIL,
        element: (
          <Suspense fallback={null}>
            <TaskDetail />
          </Suspense>
        ),
      },
      {
        path: PATHS.ANALYTICS,
        element: (
          <Suspense fallback={null}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PROBLEMS,
        element: (
          <Suspense fallback={null}>
            <ProblemManagement />
          </Suspense>
        ),
      },
      {
        path: PATHS.PROBLEM_NEW,
        element: (
          <Suspense fallback={null}>
            <ProblemFormPage />
          </Suspense>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to={PATHS.HOME} replace /> },
]);
