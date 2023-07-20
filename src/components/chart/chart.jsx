import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, XAxis, YAxis, Bar, Legend, ResponsiveContainer,
} from 'recharts';

import Preloader from '../preloader';

import FilterContext from '../../context/filter-context';
import { useQuery } from '../../hooks/use-query';
import { months, bars, getNumber } from '../../utils';

import style from './chart.module.css';

const filteredFactory = (a, i, key) => a.filter((item) => ((item.factory_id.toString() === key)
&& (item.date?.split('/')[1] === (i + 1).toString())));

const filterProduct = (filterValue, product, key) => ((filterValue === key || filterValue === '0')
  ? getNumber(product)
  : 0);

export default function Chart() {
  const navigate = useNavigate();
  const { filter } = useContext(FilterContext);
  const { products = [], error, isLoading } = useQuery({ url: 'products' });

  const splitedFactory = months.map((name, i) => ({
    name,
    factory_1: filteredFactory(products, i, '1'),
    factory_2: filteredFactory(products, i, '2'),
  }));

  const data = useMemo(
    () => splitedFactory.map((m) => ({
      ...m,
      factory_1: m.factory_1.reduce((a, i) => (a
        + filterProduct(filter.value, i.product1, '1')
        + filterProduct(filter.value, i.product2, '2')), 0),
      factory_2: m.factory_2.reduce((a, i) => (a
        + filterProduct(filter.value, i.product1, '1')
        + filterProduct(filter.value, i.product2, '2')), 0),
    })),

    [filter.value, products.length],
  );

  const onClick = (e, factory) => navigate(`details/${factory}/${months.findIndex((x) => e.name === x)}`);

  return (
    <div className={style.chart}>
      {isLoading
        ? <Preloader />
        : (
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
        )}
    </div>
  );
}
