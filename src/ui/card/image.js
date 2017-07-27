// @flow

import React from 'react';
import css from './card.css';

class CardImage extends React.PureComponent {
  render() {
    return (
      <div {...this.props} className={css.image}/>
    );
  }
}

export default CardImage;
