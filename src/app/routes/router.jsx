import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PageSkeleton from '@/components/feedback/PageSkeleton';
import AppLayout from '@/components/layout/AppLayout';

import { PATHS } from './paths';

const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage'));
const DeployManagement = lazy(
  () => import('@/features/deploy/pages/DeployManagement'),
);
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const LogManagement = lazy(() => import('@/features/log/pages/LogManagement'));

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
    path: PATHS.ROOT,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={PATHS.DEPLOY} replace /> },
      {
        path: PATHS.DEPLOY,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <DeployManagement />
          </Suspense>
        ),
      },
      {
        path: PATHS.DASHBOARD,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: PATHS.LOGS,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <LogManagement />
          </Suspense>
        ),
      },
    ],
  },
]);
