// @flow

import React from 'react';
import css from './page.css';

class NavBar extends React.PureComponent {
  render() {
    const {title} = this.props;

    return (
      <div className={css.navBar}>
        <div className={css.navBarTitle}>{title}</div>
      </div>
    );
  }
}

export default NavBar;
