// @flow

import React from 'react';
import css from './page.css';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className={css.footer}>
        {this.props.children}
      </div>
    );
  }
}

export default Footer;

