import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';

import { Paths } from '../../utils/paths';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>APP-ERROR</h2>
      <p>{error.message}</p>
      <div>
        Try to
        <button type="button" onClick={resetErrorBoundary}>
          Reload app
        </button>
        or
        <Link to={Paths.MAIN.INDEX}>
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary onReset={() => console.log('reset')} FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
