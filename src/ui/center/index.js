// @flow

import React from 'react';
import css from './center.css';

export class Center extends React.PureComponent {
  render() {
    return (
      <div className={css.center}>
        {this.props.children}
      </div>
    );
  }
}
