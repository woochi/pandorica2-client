import React from 'react';
import MaterialTextField from 'material-ui/TextField';

const styles = {
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

export const TextField = (props) => (
  <MaterialTextField
    {...styles}
    {...props}/>
);
