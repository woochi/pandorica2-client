// @flow

import React from 'react';
import css from './heading.css';
import {h1, h2, h3} from 'react-dom';

const componentMappings = [
  {component: h1, className: css.heading1},
  {component: h2, className: css.heading2},
  {component: h3, className: css.heading3}
];

class Heading extends React.PureComponent {
  static defaultProps = {
    size: 2
  };

  render() {
    const {component, className} = componentMappings[this.props.size];

    return (
      <component {...this.props} className={className}/>
    );
  }
}

export default Heading;
