import React from 'react';
import { Link } from 'react-router-dom';

import { Paths } from '../../utils/paths';

import style from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>404</h2>
      <p className={style.description}>Not found page</p>
      <Link className={style.link} to={Paths.MAIN.INDEX}>
        Go to homepage
      </Link>
    </div>
  );
}
