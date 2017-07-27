// @flow

import React from 'react';
import css from './chip.css';
import classnames from 'classnames';

class Chip extends React.PureComponent {
  render() {
    return (
      <div
        {...this.props}
        className={classnames(css.chip, this.props.className)}/>
    );
  }
}

export default Chip;
