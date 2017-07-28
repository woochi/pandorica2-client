import React, { Component } from 'react';
import {authenticate, isAuthenticated} from './lib/auth';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Page, PageBody, PageFooter, TextField, Button, Heading} from './ui';
import Snackbar from 'material-ui/Snackbar';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false
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
        <Snackbar
          open={this.state.error !== false}
          message={this.state.error}
          autoHideDuration={2000}
          onRequestClose={this.onErrorClose}/>
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
    const {email, password} = this.state;
    event.preventDefault();
    authenticate(email, password).then(() => {
      this.props.history.push('/quests');
    }).catch(response => {
      response.json().then(({errors}) => {
        this.setState({error: errors ? errors.join() : 'Unknown error'});
      });
    });
  }

  onErrorClose = () => {
    this.setState({error: false});
  }
}

export default withRouter(LoginPage);
