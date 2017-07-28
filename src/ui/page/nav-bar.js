// @flow

import React from 'react';
import css from './page.css';
import {logOut} from '../../lib/auth';
import {withRouter} from 'react-router';
import CloseIcon from 'react-icons/lib/md/close';
import AddIcon from 'react-icons/lib/md/add';
import TimelineIcon from 'react-icons/lib/md/timeline';

const NavBarAction = ({children, ...otherProps}) => (
  <div className={css.navBarAction} {...otherProps}>
    {children}
  </div>
);

class NavBar extends React.PureComponent {
  render() {
    const {title, onClose, onScan, onStats} = this.props;

    return (
      <div className={css.navBar}>
        <div className={css.navBarLeftActions}>
          {onClose &&
            <NavBarAction onClick={onClose}>
              <CloseIcon size={24}/>
            </NavBarAction>
          }
          {onStats &&
            <NavBarAction onClick={onStats}>
              <TimelineIcon size={24}/>
            </NavBarAction>
          }
        </div>
        <div className={css.navBarTitle}>{title}</div>
        <div className={css.navBarRightActions}>
          {onScan &&
            <NavBarAction onClick={onScan}>
              <AddIcon size={24}/>
            </NavBarAction>
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
