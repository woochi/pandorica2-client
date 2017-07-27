// @flow

import React from 'react';
import Button from './button';
import css from './button.css';

class FlatButton extends React.PureComponent {
  render() {
    return (
      <Button {...this.props} className={css.flatButton}/>
    );
  }
}

export default FlatButton;
