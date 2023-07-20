import React from 'react';
import { useParams } from 'react-router-dom';
import {
  PieChart, Pie, Legend, ResponsiveContainer, Cell,
} from 'recharts';

import Preloader from '../preloader';

import { useQuery } from '../../hooks/use-query';
import { months, getNumber } from '../../utils';

import style from './chart-detail.module.css';

export default function ChartDetail() {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const { factoryId, monthNumber } = useParams();
  const { products = [], error, isLoading } = useQuery({ url: 'products' });
  const filteredFactory = (a, i, key) => a.filter((item) => ((item.factory_id.toString() === key)
    && (item.date?.split('/')[1] === (i + 1).toString())));
  const splitedFactory = months.map((name, i) => ({
    name,
    factory_1: filteredFactory(products, i, '1'),
    factory_2: filteredFactory(products, i, '2'),
  })).filter((x) => x.name === months[monthNumber]);

  const data = [
    {
      name: 'Продукт 1',
      value: splitedFactory[0][factoryId === '1' ? 'factory_1' : 'factory_2']
        .reduce((a, i) => (a + getNumber(i.product1)), 0),
    },
    {
      name: 'Продукт 2',
      value: splitedFactory[0][factoryId === '1' ? 'factory_1' : 'factory_2']
        .reduce((a, i) => (a + getNumber(i.product2)), 0),
    },
  ];

  return (
    <div className={style.chart}>
      <h2 className={style.title}>
        {`Статистика по продукции фабрики ${factoryId === '1' ? 'A' : 'B'} за ${months[monthNumber]}`}
      </h2>
      {isLoading
        ? <Preloader />
        : (
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    name={data[index].name}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
    </div>
  );
}
