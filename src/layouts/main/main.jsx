import React from 'react';

import Container from '../../components/container';
import Chart from '../../components/chart';

import style from './main.module.css';

export default function Main() {
  return (<Container header children={<Chart />} />);
}
