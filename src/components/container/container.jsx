import React, { useState, useMemo } from 'react';

import Header from '../header';

import FilterContext from '../../context/filter-context';

import style from './container.module.css';

export default function Container({ header, children }) {
  const [filter, setFilter] = useState({ value: '0', label: 'Все продукты' });
  const providerValue = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);

  return (
    <FilterContext.Provider value={providerValue}>
      <div className={style.container}>
        {header && <Header />}
        {children}
      </div>
    </FilterContext.Provider>
  );
}
