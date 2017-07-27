// @flow

import React from 'react';
import Cell from './cell';

class Grid extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.children.map((child, i) => (
          <Cell key={i}>{child}</Cell>
        ))}
      </div>
    );
  }
}

export default Grid;
