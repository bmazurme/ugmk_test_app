import React from 'react';

import Container from '../../components/container';
import ChartDetail from '../../components/chart-detail';

import style from './details.module.css';

export default function Details() {
  return (
    <Container child={<ChartDetail />} />
  );
}
