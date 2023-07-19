import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorBoundaryWrapper>
      <App />
    </ErrorBoundaryWrapper>
  </BrowserRouter>,
);
