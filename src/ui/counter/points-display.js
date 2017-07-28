// @flow

import React from 'react';
import css from './counter.css';
import {Label} from '../label';

class PointsDisplay extends React.PureComponent {
  render() {
    const {points} = this.props;

    return (
      <div>
        <div className={css.counter}>{points}</div>
        <Label>Points</Label>
      </div>
    );
  }
}

export default PointsDisplay;
