// @flow

import React from 'react';
import css from './paragraph.css';

class Paragraph extends React.PureComponent {
  render() {
    return (
      <p {...this.props} className={css.paragraph}/>
    );
  }
}

export default Paragraph;

