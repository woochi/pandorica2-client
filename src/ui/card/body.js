// @flow

import React from 'react';
import css from './card.css';

class CardBody extends React.PureComponent {
  render() {
    return (
      <div {...this.props} className={css.body}/>
    );
  }
}

export default CardBody;
