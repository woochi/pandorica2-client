// @flow

import React from 'react';
import classnames from 'classnames';
import css from './button.css';

class Button extends React.PureComponent {
  static defaultProps = {
    bsStyle: 'default'
  };

  render() {
    const {fullWidth, bsStyle, className, ...otherProps} = this.props;
    const widthClass = fullWidth ? css.fullWidth : css.normalWidth;
    const buttonClassName = classnames(
      widthClass,
      css[bsStyle],
      className
    );

    return (
      <div>
        <button {...otherProps} className={buttonClassName}/>
        <div className={css.ripple}/>
      </div>
    );
  }
}

export default Button;
