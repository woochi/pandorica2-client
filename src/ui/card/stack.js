// @flow

import React from 'react';
import css from './stack.css';
import {TransitionMotion, spring} from 'react-motion';

function getCurrentTouchPosition(event) {
  return event.targetTouches[0].clientX;
}

class StackItem extends React.PureComponent {
  static defaultProps = {
    threshold: 200,
    minOpacity: 0.2
  }

  state = {
    xOffset: 0,
    animating: false
  }

  render() {
    const {xOffset, animating} = this.state;
    const {threshold, minOpacity, index, disabled, style} = this.props;
    const {x, y, scale} = style;
    const animationStyle = {
      transform: `translate3d(${Math.max(x, xOffset)}px, ${y}px, 0) scale(${scale})`,
      opacity: 1 - Math.pow(x / threshold, 2) * 0.4,
      zIndex: -index
    };
    const touchHandlers = disabled || animating ? undefined : {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd
    };

    return (
      <div
        {...this.props}
        style={animationStyle}
        ref={this.updateElement}
        className={css.item}
        {...touchHandlers}/>
    );
  }

  updateElement = (element) => {
    this.element = element;
  }

  onTouchStart = (event) => {
    const currentTouchPosition = getCurrentTouchPosition(event);
    this.initialTouchPosition = currentTouchPosition;
  }

  onTouchMove = (event) => {
    const offset = getCurrentTouchPosition(event) - this.initialTouchPosition;

    if (offset > this.props.threshold) {
      // unbind event listeners
      // call onSwipe after animation complete
      this.setState({animating: true});
      this.props.onSwipe();
    } else {
      this.setState({xOffset: offset});
    }
  }

  onTouchEnd = () => {
    this.initialTouchPosition = null;
    this.setState({xOffset: 0});
  }
}

class Stack extends React.PureComponent {
  static defaultProps = {
    offset: 0,
    visibleDepth: 3
  };

  render() {
    const {visibleDepth, offset, items, onSwipe} = this.props;
    const stackPosition = offset % items.length;
    const remainingItems = items.length - stackPosition;
    const circledItems = remainingItems < visibleDepth ? Math.abs(remainingItems - visibleDepth) : 0;
    const visibleItems = items
      .slice(stackPosition, stackPosition + visibleDepth)
      .concat(items.slice(0, circledItems));

    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={visibleItems.map((_, i) => ({
          key: stackPosition + i,
          style: {x: 0, y: i * 20, scale: 1.0 - 0.05 * i}
        }))}>
        {styles => {
          return (
            <div className={css.stack}>
              {styles.map(this.renderItem)}
            </div>
          );
        }}
      </TransitionMotion>
    );
  }

  willLeave() {
    return {
      x: spring(400, {stiffness: 400, damping: 40, precision: 1}),
      y: 0,
      scale: 1
    };
  }

  renderItem = ({key, style}, i) => {
    const {items, onSwipe} = this.props;

    return (
      <StackItem
        key={key}
        index={i}
        style={style}
        disabled={i > 0}
        onSwipe={this.props.onSwipe}>
        {this.props.renderItem(items[key], i)}
      </StackItem>
    );
  }
}

export default Stack;
