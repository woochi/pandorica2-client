// @flow

import React from 'react';
import css from './page.css';

class Body extends React.PureComponent {
  render() {
    return (
      <div className={css.body}>
        {this.props.children}
      </div>
    );
  }
}

export default Body;

