// @flow

import React from 'react';
import {Page, PageBody, Center, Heading, Paragraph, TextField, NavBar, Counter} from './ui';
import {withRouter} from 'react-router';
import {post} from './lib/api';
import SubmitInput from './submit-input';
import Snackbar from 'material-ui/Snackbar';
import qs from 'qs';

class CodePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      success: false,
      points: 150
    };
  }

  componentDidMount() {
    const params = qs.parse(this.props.location.search.replace('?', ''));
    this.setState({value: params.value}, () => {
      this.onSubmit();
    });
  }

  render() {
    return (
      <Page>
        <NavBar onClose={this.navigateToQuests}/>
        <PageBody>
          {this.renderContent()}
        </PageBody>
        <Snackbar
          open={this.state.error !== false}
          message={this.state.error}
          autoHideDuration={2000}
          onRequestClose={this.onErrorClose}/>
      </Page>
    );
  }

  renderContent = () => {
    if (this.state.success) {
      return (
        <Center>
          <Heading>You found a treasure!</Heading>
          <Paragraph>
            You have been an aid to the kingdom's cause.
          </Paragraph>
          <Counter points={this.state.points}/>
        </Center>
      );
    } else {
      return (
        <Center>
          <Heading>Found a wild code?</Heading>
          <Paragraph>
            Insert wild codes you found in Messukeskus and in different events here to gain points for your kingdom.
          </Paragraph>
          <form
            onSubmit={this.onSubmit}
            action="/codes"
            method="POST">
            <fieldset>
              <TextField
                centered
                hintText="Enter wild code"
                value={this.state.value.toUpperCase()}
                onChange={this.onCodeChange}/>
              <SubmitInput/>
            </fieldset>
          </form>
        </Center>
      );
    }
  }

  navigateToQuests = () => {
    this.props.history.push('/quests');
  }

  onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    post('/codes', {value: this.state.value}).then(response => {
      response.json().then(({points}) => {
        this.setState({
          success: true,
          points
        });
      });
    }).catch((response) => {
      response.json().then(({errors = []}) => {
        this.setState({error: errors.length ? errors.join() : 'Unknown error'});
      });
    });
  }

  onCodeChange = (event, value) => {
    this.setState({value});
  }

  onErrorClose = () => {
    this.setState({error: false});
  }
}

export default withRouter(CodePage);
