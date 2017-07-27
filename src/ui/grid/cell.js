// @flow

import React from 'react';
import css from './grid.css';

class Cell extends React.PureComponent {
  render() {
    return (
      <div className={css.cell}>
        {this.props.children}
      </div>
    );
  }
}

export default Cell;
