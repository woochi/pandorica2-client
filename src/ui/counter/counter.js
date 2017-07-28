// @flow

import React from 'react';
import {Motion, spring} from 'react-motion';
import css from './counter.css';
import {Label} from '../label';

class Counter extends React.PureComponent {
  static defaultProps = {
    points: 150
  };

  render() {
    const {points} = this.props;

    return (
      <div>
        <Motion
          defaultStyle={{points: 0}}
          style={{points: spring(points, {stiffness: 40, damping: 30})}}
          onRest={this.onCounterComplete}>
          {value => <div className={css.counter}>{Math.ceil(value.points)}</div>}
        </Motion>
        <Label>Points</Label>
      </div>
    );
  }
}

export default Counter;
