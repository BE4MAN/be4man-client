import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import PageSkeleton from '@/components/feedback/PageSkeleton';
import AppLayout from '@/components/layout/AppLayout';

import { PATHS } from './paths';

const DeployManagement = lazy(
  () => import('@/features/deploy/pages/DeployManagement'),
);
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const LogManagement = lazy(() => import('@/features/log/pages/LogManagement'));

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <AppLayout />,
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
