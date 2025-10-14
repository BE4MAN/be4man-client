import { RouterProvider } from 'react-router-dom';

import ErrorBoundaryProvider from '@/app/providers/ErrorBoundaryProvider';
import QueryProvider from '@/app/providers/QueryProvider';
import ThemeProvider from '@/app/providers/ThemeProvider';
import { router } from '@/app/routes/router';

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ErrorBoundaryProvider>
          <RouterProvider router={router} />
        </ErrorBoundaryProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
