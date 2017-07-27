import React, { Component } from 'react';
import {authenticate, isAuthenticated} from './lib/auth';
import {withRouter} from 'react-router';

class LoginPage extends React.PureComponent {
  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.replace('/quests');
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="email"/>
        <input type="password"/>
        <button type="submit">Log In</button>
      </form>
    );
  }

  onSubmit = (event) => {
    event.preventDefault();
    authenticate().then(() => {
      this.props.history.push('/quests');
    });
  }
}

export default withRouter(LoginPage);
