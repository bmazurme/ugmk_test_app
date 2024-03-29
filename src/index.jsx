import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper';

import { store } from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundaryWrapper>
        <App />
      </ErrorBoundaryWrapper>
    </BrowserRouter>
  </Provider>,
);
