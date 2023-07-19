import React from 'react';

import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/main-page';
import DetailsPage from './pages/details-page';
import NotFoundPage from './pages/not-found-page';

import { Paths } from './utils/paths';

export default function App() {
  return (
    <Routes>
      <Route index element={(<MainPage />)} />
      <Route path={Paths.DETAILS.INDEX} element={(<DetailsPage />)} />
      <Route path={Paths['404']} element={(<NotFoundPage />)} />
    </Routes>
  );
}
