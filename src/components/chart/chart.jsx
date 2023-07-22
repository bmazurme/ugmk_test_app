/* eslint-disable max-len */
import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, XAxis, YAxis, Bar, Legend, ResponsiveContainer,
} from 'recharts';

import FilterContext from '../../context/filter-context';
import {
  CULTURE, UNIT, months, bars, getNumber,
} from '../../utils';

import { useAppSelector } from '../../hooks';
import { selectProduct } from '../../store/slices';

import style from './chart.module.css';

export default function Chart() {
  const navigate = useNavigate();
  const products = useAppSelector(selectProduct);
  const { filter: { value: filter } } = useContext(FilterContext);
  const getProduct = (filterValue, item, key) => ((filterValue === key || filterValue === '0') ? getNumber(item[`product${[key]}`], UNIT) : 0);
  const condition = (a, i) => (a + getProduct(filter, i, '1') + getProduct(filter, i, '2'));
  const onClick = (e, factory) => navigate(`details/${factory}/${months[CULTURE].findIndex((x) => e.name === x)}`);

  const data = useMemo(
    () => products.map(({ name, ...p }) => ({
      name, factory_1: p.factory_1.reduce(condition, 0), factory_2: p.factory_2.reduce(condition, 0),
    })),
    [filter, products.length],
  );

  return (
    <div className={style.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {bars.map((props, i) => (<Bar {...props} key={props.dataKey} onClick={onClick} />))}
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
