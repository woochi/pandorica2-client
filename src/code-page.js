// @flow

import React from 'react';
import {Page, PageBody, Center, Heading, Paragraph, TextField, NavBar} from './ui';
import {withRouter} from 'react-router';
import {post} from './lib/api';
import SubmitInput from './submit-input';

class CodePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
      <Page>
        <NavBar onClose={this.navigateToQuests}/>
        <PageBody>
          <Center>
            <Heading>Found a wild code?</Heading>
            <Paragraph>
              Insert wil codes you found in Messukeskus and in different events here to gain points for your kingdom.
            </Paragraph>
            <form onSubmit={this.onSubmit}>
              <fieldset>
                <TextField
                  hintText="XXXXX"
                  value={this.state.value}
                  onChange={this.onCodeChange}/>
                <SubmitInput/>
              </fieldset>
            </form>
          </Center>
        </PageBody>
      </Page>
    );
  }

  navigateToQuests = () => {
    this.props.history.push('/quests');
  }

  onSubmit = (event) => {
    event.preventDefault();
    post('/codes', {value: this.state.value})
  }

  onCodeChange = (event, value) => {
    this.setState({value});
  };
}

export default withRouter(CodePage);
