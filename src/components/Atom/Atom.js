import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import alive from './alive.svg';
import dead from './dead.svg';
import new_life_atom from './new_life_atom.svg';
import styles from './Atom.module.scss';
import {ATOM_TYPES} from '../../helpers/enums';

const icons = {alive, dead, new_life_atom};
const titles = {
  alive: {
    title: 'Живая',
    subtitle: 'и шевелится!'
  },
  dead: {
    title: 'Мёртвая',
    subtitle: 'или прикидывается'
  },
  new_life_atom: {
    title: 'Жизнь',
    subtitle: 'Ку-ку!'
  }
}

function Atom({type}) {
  const typeLowerCased = type.toLowerCase();
  return (
    <div className={styles.wrap}>
      <div className={classnames([styles.avatar, styles[typeLowerCased]])}>
        <img src={icons[typeLowerCased]} alt=""/>
      </div>
      <div className={styles.title}>{titles[typeLowerCased].title}</div>
      <div>{titles[typeLowerCased].subtitle}</div>
    </div>
  )
}

Atom.propTypes = {
  type: PropTypes.oneOf(Object.keys(ATOM_TYPES)).isRequired,
}

export default Atom;
