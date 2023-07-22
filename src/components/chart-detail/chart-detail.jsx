/* eslint-disable max-len */
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PieChart, Pie, Legend, ResponsiveContainer, Cell,
} from 'recharts';

import { useAppSelector } from '../../hooks';
import { selectProduct } from '../../store/slices';
import {
  CULTURE, UNIT, COLORS, months, getNumber, productTypes,
} from '../../utils';

import style from './chart-detail.module.css';

export default function ChartDetail() {
  const products = useAppSelector(selectProduct);
  const { factoryId, monthNumber } = useParams();
  const currentProducts = products.find((x) => x.name === months[CULTURE][monthNumber]);
  const getSumValue = (values, j) => values[`factory_${j + 1}`].reduce((a, i) => (a + getNumber(i.product1, UNIT)), 0);
  const data = productTypes.map((name, j) => ({ name, value: getSumValue(currentProducts, j) }), {});

  return (
    <div className={style.chart}>
      <h2 className={style.title}>
        {`Статистика по продукции фабрики ${factoryId === '1' ? 'А' : 'Б'} за ${months[CULTURE][monthNumber]}`}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={data[index].name} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
