import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PieChart, Pie, Legend, ResponsiveContainer, Cell,
} from 'recharts';

import { months } from '../../utils/months';

import rawData from '../../mocks/products.json';

import style from './chart-detail.module.css';

export default function ChartDetail() {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const { factoryId, monthNumber } = useParams();
  const { products } = rawData;
  let ds = [...new Array(12)].map((_, i) => (i + 1).toString());

  console.log(factoryId);

  ds = ds.map((x) => {
    const arr = products.filter((item) => (item.factory_id === Number(factoryId)) && (item.date?.split('/')[1] === x));
    return {
      month: x,
      name: months[x],
      product1: arr.reduce((a, i) => (a + !!Number(i.product1) ? i.product1 : 0)),
      product2: arr.reduce((a, i) => (a + !!Number(i.product2) ? i.product2 : 0)),
    };
  }).filter((x) => x.month === monthNumber);

  ds = [
    { name: 'Продукт 1', value: ds[0].product1 },
    { name: 'Продукт 2', value: ds[0].product2 },
  ];

  return (
    <div className={style.chart}>
      <h2 className={style.title}>{`Статистика по продукции фабрики ${factoryId} за ${months[monthNumber]}`}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={ds}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            label
          >
            {ds.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                name={ds[index].name}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
