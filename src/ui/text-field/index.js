import React from 'react';
import MaterialTextField from 'material-ui/TextField';

const defaultStyles = {
  color: '#FFF',
  underlineFocusStyle: {
    borderColor: '#50E3C2'
  },
  hintStyle: {
    color: 'rgba(255,255,255,0.5)'
  },
  floatingLabelStyle: {
    color: '#FFF'
  }
};

const centeredStyles = {
  ...defaultStyles,
  textAlign: 'center',
  hintStyle: {
    ...defaultStyles.hintStyle,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  inputStyle: {
    textAlign: 'center'
  }
}

export const TextField = ({centered, ...props}) => {
  const styles = centered ? centeredStyles : defaultStyles;

  return (
    <MaterialTextField
      {...styles}
      {...props}/>
  );
};
