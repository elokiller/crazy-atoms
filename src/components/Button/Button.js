import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

function Button({title, onClick}) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button;
