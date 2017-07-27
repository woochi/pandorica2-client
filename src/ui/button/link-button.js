// @flow

import React from 'react';
import Button from './button';
import css from './button.css';

class LinkButton extends React.PureComponent {
  render() {
    return (
      <Button {...this.props} bsStyle="link"/>
    );
  }
}

export default LinkButton;
