// @flow

import React from 'react';

const style = {
  position: 'absolute',
  left: -9999,
  top: -9999
};

class SubmitInput extends React.PureComponent {
  render() {
    return (
      <input type="submit" style={style}/>
    );
  }
}

export default SubmitInput;
