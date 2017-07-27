// @flow

import React from 'react';
import css from './label.css';

class Label extends React.PureComponent {
  render() {
    return (
      <label {...this.props} className={css.label}/>
    );
  }
}

export default Label;
