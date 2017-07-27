// @flow

import React from 'react';
import classnames from 'classnames';
import css from './button.css';

class Button extends React.PureComponent {
  static defaultProps = {
    bsStyle: 'default'
  };

  render() {
    const widthClass = this.props.fullWidth ? css.fullWidth : css.normalWidth;
    const className = classnames(
      widthClass,
      css[this.props.bsStyle],
      this.props.className
    );

    return (
      <div>
        <button {...this.props} className={className}/>
        <div className={css.ripple}/>
      </div>
    );
  }
}

export default Button;
