// @flow

import React from 'react';
import css from './page.css';
import {logOut} from '../../lib/auth';
import {withRouter} from 'react-router';
import CloseIcon from 'react-icons/lib/md/close';
import AddIcon from 'react-icons/lib/md/add';

const NavBarAction = ({children, ...otherProps}) => (
  <div className={css.navBarAction} {...otherProps}>
    {children}
  </div>
);

class NavBar extends React.PureComponent {
  render() {
    const {title, onClose, onScan} = this.props;

    return (
      <div className={css.navBar}>
        {onClose &&
          <NavBarAction onClick={onClose}><CloseIcon size={24}/></NavBarAction>
        }
        <div className={css.navBarTitle} onClick={this.logOut}>{title}</div>
        <div className={css.navBarRightActions}>
          {onScan &&
            <NavBarAction onClick={onScan}><AddIcon size={24}/></NavBarAction>
          }
        </div>
      </div>
    );
  }

  logOut = () => {
    logOut().then(() => {
      this.props.history.replace('/login');
    });
  }
}

export default withRouter(NavBar);
