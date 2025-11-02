import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import PageSkeleton from '@/components/feedback/PageSkeleton';
import AppLayout from '@/components/layout/AppLayout';

import { PATHS } from './paths';
import ProtectedRoute from './ProtectedRoute';

const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage'));
const AuthCallback = lazy(() => import('@/features/auth/pages/AuthCallback'));
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const Task = lazy(() => import('@/features/log/pages/LogManagement'));
const Approval = lazy(() => import('@/features/approval/pages/Approval'));
const ApprovalFormPage = lazy(
  () => import('@/features/approval/pages/ApprovalForm'),
);
const ApprovalDetailPage = lazy(
  () => import('@/features/approval/pages/ApprovalDetail'),
);

const renderPlaceholder = (label) => (
  <div style={{ padding: 16, color: '#8B95A8' }}>{label} — Coming soon</div>
);
const LogManagement = lazy(() => import('@/features/log/pages/LogManagement'));
const ScheduleManagement = lazy(
  () => import('@/features/schedule/pages/ScheduleManagement'),
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
          <Suspense fallback={<PageSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: PATHS.APPROVALS,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Approval />
          </Suspense>
        ),
      },

      {
        path: PATHS.APPROVAL_NEW,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ApprovalFormPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.APPROVAL_DETAIL,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ApprovalDetailPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.SCHEDULE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ScheduleManagement />
          </Suspense>
        ),
      },
      {
        path: PATHS.TASKS,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Task />
          </Suspense>
        ),
      },
      {
        path: PATHS.ANALYTICS,
        element: renderPlaceholder('Analytics'),
      },
    ],
  },
  { path: '*', element: <Navigate to={PATHS.HOME} replace /> },
]);
