import React, { Component } from 'react';
import {authenticate, isAuthenticated, signUp} from './lib/auth';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Page, PageBody, PageFooter, NavBar, Button, TextField, Paragraph, Heading} from './ui';
import {compose, mapProps} from 'recompose';
import {refetch, post} from './lib/api';
import css from './signup-page.css';

class Faction extends React.PureComponent {
  render() {
    const {faction} = this.props;
    const {name, description} = faction;

    return (
      <div className={css.faction}>
        <div className={css.factionName}>{name}</div>
        <p className={css.factionDescription}>{description}</p>
        <Button bsStyle="primary" onClick={this.onSelect}>Join {name}</Button>
      </div>
    );
  }

  onSelect = () => {
    this.props.onSelect(this.props.faction);
  }
};

class SignupPage extends React.PureComponent {
  static defaultProps = {
    factions: []
  };

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
    const {faction, email, password} = this.state;

    if (faction) {
      return (
        <Page>
          <PageBody>
            <form onSubmit={this.onSubmit} ref={this.updateForm}>
              <fieldset>
                <Heading>Sign up</Heading>
                <Paragraph>You are joining {faction.name}.</Paragraph>
                <TextField
                  floatingLabelText="Email address"
                  hintText="E.g. john.doe@ropecon.fi"
                  autoFocus
                  fullWidth
                  floatingLabelFixed
                  value={email}
                  onChange={this.onChangeEmail}/>
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
                  Sign Up
                </Button>
              </fieldset>
            </form>
          </PageBody>
          <PageFooter>
            Already have an account? <Link to="/login">Log in</Link>
          </PageFooter>
        </Page>
      );
    } else {
      return (
        <Page>
          <NavBar title="Choose Your Kingdom"/>
          <PageBody>
            {this.props.factions.map((faction) =>
              <Faction faction={faction} onSelect={this.onSelectFaction}/>
            )}
          </PageBody>
        </Page>
      );
    }
  }

  onSelectFaction = (faction) => {
    this.setState({faction});
  }

  updateForm = (element) => {
    this.form = element;
  }

  onChangeEmail = (event, email) => {
    this.setState({email});
  }

  onChangePassword = (event, password) => {
    this.setState({password})
  }

  onSubmit = (event) => {
    const {email, password, faction} = this.state;
    event.preventDefault();
    signUp(email, password, faction).then(() => {
      this.props.history.replace('/quests');
    });
  }
}

export default compose(
  withRouter,
  refetch(props => ({
    factionsFetch: '/factions?public=1'
  })),
  mapProps(({factionsFetch, ...otherProps}) => ({
    loading: factionsFetch.pending,
    factions: factionsFetch.value || [],
    ...otherProps
  }))
)(SignupPage);
