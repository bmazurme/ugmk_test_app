import React, { useState, useMemo } from 'react';

import Header from '../header';
import Preloader from '../preloader';

import { useGetProductsQuery } from '../../store';
import FilterContext from '../../context/filter-context';

import style from './container.module.css';

export default function Container({ header, children }) {
  const [filter, setFilter] = useState({ value: '0', label: 'Все продукты' });
  const providerValue = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);
  const { isLoading } = useGetProductsQuery();

  return (
    <FilterContext.Provider value={providerValue}>
      <div className={style.container}>
        {header && <Header />}
        {isLoading ? <Preloader /> : children}
      </div>
    </FilterContext.Provider>
  );
}
