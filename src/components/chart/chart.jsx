import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, XAxis, YAxis, Bar, Legend, ResponsiveContainer,
} from 'recharts';

import FilterContext from '../../context/filter-context';

import { months } from '../../utils/months';
import rawData from '../../mocks/products.json';

import style from './chart.module.css';

export default function Chart() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { filter } = useContext(FilterContext);
  const axesX = [...new Array(12)].map((_, i) => (i + 1).toString());
  const { products } = rawData;

  useMemo(() => {
    const ds = axesX.map((x) => {
      let arr1 = products.filter((item) => (item.factory_id === 1) && (item.date?.split('/')[1] === x));
      let arr2 = products.filter((item) => (item.factory_id === 2) && (item.date?.split('/')[1] === x));

      if (filter.value === '1') {
        arr1 = arr1.map((c) => ({ ...c, product2: 0 }));
        arr2 = arr2.map((c) => ({ ...c, product2: 0 }));
      } else if (filter.value === '2') {
        arr1 = arr1.map((c) => ({ ...c, product1: 0 }));
        arr2 = arr2.map((c) => ({ ...c, product1: 0 }));
      }

      return {
        month: x,
        name: months[x],
        factory_1:
          arr1.reduce((a, i) => (a + !!Number(i.product1) ? i.product1 : 0))
          + arr1.reduce((a, i) => (a + !!Number(i.product2) ? i.product2 : 0)),
        factory_2:
          arr2.reduce((a, i) => (a + !!Number(i.product1) ? i.product1 : 0))
          + arr2.reduce((a, i) => (a + !!Number(i.product2) ? i.product2 : 0)),
      };
    });

    setData(ds);
  }, [filter]);

  const onClick = (e, factory) => navigate(`details/${factory}/${e.month}`);

  const bars = [
    { dataKey: 'factory_1', fill: 'red', name: 'Фабрика A' },
    { dataKey: 'factory_2', fill: 'blue', name: 'Фабрика B' },
  ];

  return (
    <div className={style.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {bars.map((props, i) => (
            <Bar
              {...props}
              key={props.dataKey}
              barSize={20}
              onClick={(e) => onClick(e, i + 1)}
            />
          ))}
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
