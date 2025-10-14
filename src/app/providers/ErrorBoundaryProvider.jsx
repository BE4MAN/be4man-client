import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: 24 }}>
      <h3>Something went wrong.</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Reload</button>
    </div>
  );
}

export default function ErrorBoundaryProvider({ children }) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
