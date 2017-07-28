import React, { Component } from 'react';
import {authenticate, isAuthenticated} from './lib/auth';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Page, PageBody, PageFooter, TextField, Button, Heading} from './ui';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.replace('/quests');
    }
  }

  render() {
    const {email, password} = this.state;

    return (
      <Page>
        <PageBody>
          <form onSubmit={this.onSubmit}>
            <fieldset>
              <Heading>Log in</Heading>
              <TextField
                floatingLabelText="Email address"
                hintText="E.g. john.doe@ropecon.fi"
                autoFocus
                fullWidth
                floatingLabelFixed
                value={email}
                onChange={this.onChangeEmail}
                type="email"/>
              <TextField
                floatingLabelText="Password"
                type="password"
                fullWidth
                floatingLabelFixed
                value={password}
                onChange={this.onChangePassword}/>
            </fieldset>
            <fieldset>
              <Button
                bsStyle="primary"
                type="submit"
                fullWidth
                onClick={this.onSubmit}>
                Log In
              </Button>
            </fieldset>
          </form>
        </PageBody>
        <PageFooter>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </PageFooter>
      </Page>
    );
  }

  onChangeEmail = (event, email) => {
    this.setState({email});
  }

  onChangePassword = (event, password) => {
    this.setState({password})
  }

  onSubmit = (event) => {
    event.preventDefault();
    authenticate().then(() => {
      this.props.history.push('/quests');
    });
  }
}

export default withRouter(LoginPage);
