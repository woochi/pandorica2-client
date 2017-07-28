// @flow

import React from 'react';
import {Motion, spring} from 'react-motion';
import css from './counter.css';
import PointsDisplay from './points-display';

class Counter extends React.PureComponent {
  static defaultProps = {
    points: 150
  };

  render() {
    const {points} = this.props;

    return (
      <Motion
        defaultStyle={{points: 0}}
        style={{points: spring(points, {stiffness: 40, damping: 30})}}
        onRest={this.onCounterComplete}>
        {value => <PointsDisplay points={Math.ceil(value.points)}/>}
      </Motion>
    );
  }
}

export default Counter;
