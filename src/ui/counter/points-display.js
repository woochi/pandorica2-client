// @flow

import React from 'react';
import css from './counter.css';
import {Label} from '../label';

class PointsDisplay extends React.PureComponent {
  render() {
    const {points, contributions} = this.props;

    return (
      <div>
        <div className={css.counter}>{points}</div>
        <Label>
          {!contributions &&
            <span>Points</span>
          }
          {!!contributions &&
            <div><span className={css.contributedPoints}>{contributions}</span> points by you</div>
          }
        </Label>
      </div>
    );
  }
}

export default PointsDisplay;
