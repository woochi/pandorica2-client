// @flow

import React from 'react';
import css from './card.css';

class CardFooter extends React.PureComponent {
  render() {
    return (
      <div {...this.props} className={css.footer}/>
    );
  }
}

export default CardFooter;
