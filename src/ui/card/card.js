// @flow

import React from 'react';
import css from './card.css';

class Card extends React.PureComponent {
  render() {
    return (
      <div {...this.props} className={css.card}/>
    );
  }
}

export default Card;
