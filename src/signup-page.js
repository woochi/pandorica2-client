import React, { Component } from 'react';
import {authenticate, isAuthenticated} from './lib/auth';

class SignupPage extends React.PureComponent {
  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.replace('/quests');
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} ref={this.updateForm}>
        <input type="email" autoFocus/>
        <input type="password"/>
        <button type="submit">Sign Up</button>
      </form>
    );
  }

  updateForm = (element) => {
    this.form = element;
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'mikko@example.com',
        password: 'password',
        password_confirmation: 'password'
      })
    });
  }
}

export default SignupPage;
