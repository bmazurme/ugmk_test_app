import React, { useContext, useEffect } from 'react';

import Select from 'react-select';

import FilterContext from '../../context/filter-context';

import style from './header.module.css';

export default function Header() {
  const localFilter = localStorage.getItem('filter');
  const { filter, setFilter } = useContext(FilterContext);
  const options = [
    { value: '0', label: 'Все продукты' },
    { value: '1', label: 'Продукт 1' },
    { value: '2', label: 'Продукт 2' },
  ];

  useEffect(() => setFilter(() => (localFilter ? options[localFilter] : options['0'])), []);

  const onChangeFilter = (e) => {
    localStorage.setItem('filter', e.value);
    setFilter(e);
  };

  return (
    <div className={style.header}>
      <h2 className={style.description}>Фильтр по типу продукции</h2>
      <Select
        options={options}
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
}
