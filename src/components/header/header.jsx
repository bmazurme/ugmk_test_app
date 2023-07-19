import React, { useContext, useEffect } from 'react';
import Select from 'react-select';

import FilterContext from '../../context/filter-context';
import { useLocalStorage } from '../../hooks/use-local-storage';

import { options } from '../../utils';

import style from './header.module.css';

export default function Header() {
  const [value, setValue] = useLocalStorage('filter', '0');
  const { filter, setFilter } = useContext(FilterContext);

  const onChangeFilter = (e) => {
    setValue(e.value);
    setFilter(e);
  };

  useEffect(() => setFilter(() => (value ? options[value] : options['0'])), []);

  return (
    <div className={style.header}>
      <h2 className={style.description}>Фильтр по типу продукции</h2>
      <Select options={options} value={filter} onChange={onChangeFilter} />
    </div>
  );
}
