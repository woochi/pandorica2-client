import React, { Component } from 'react';
import {
  QuestCard,
  Grid,
  Heading,
  Paragraph,
  Label,
  Page,
  PageBody,
  NavBar,
  Chip,
  Center,
  TextField
} from './ui';
import {refetch, post} from './lib/api';
import {compose, mapProps} from 'recompose';
import {withRouter} from 'react-router';
import {Motion, spring} from 'react-motion';
import CheckIcon from 'react-icons/lib/md/check';
import css from './quest-page.css';
import SubmitInput from './submit-input';

class QuestPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      success: false
    };
  }

  render() {
    return (
      <Page>
        <NavBar onClose={this.navigateToQuestList}/>
        <PageBody>
          {this.renderContent()}
        </PageBody>
      </Page>
    );
  }

  renderContent = () => {
    const {quest, submitting, loading} = this.props;
    const {name, description, points, completed} = quest;

    if (this.state.success) {
      return (
        <Center>
          <Heading>Quest Completed!</Heading>
          <Paragraph>You have been an aid to the kingdom's cause.</Paragraph>
          <Motion
            defaultStyle={{points: 0}}
            style={{points: spring(points, {stiffness: 40, damping: 30})}}
            onRest={this.onCounterComplete}>
            {value => <div className={css.counter}>{Math.ceil(value.points)}</div>}
          </Motion>
        </Center>
      );
    } else {
      return (
        <Center>
          <Label>Testing Label</Label>
          <Heading>{name}</Heading>
          <Paragraph>{description}</Paragraph>
          <div><Chip>+ {points}</Chip></div>
          {completed &&
            <Paragraph>
              You have completed this quest.<br/>
              <CheckIcon size={24} color="#50E3C2"/>
            </Paragraph>
          }
          {!completed &&
            <form onSubmit={this.onSubmit}>
              <TextField
                hintText="XXXXX"
                value={this.state.code}
                onChange={this.onChangeCode}/>
              <SubmitInput/>
            </form>
          }
        </Center>
      );
    }
  }

  onChangeCode = (event, code) => {
    this.setState({code});
  }

  navigateToQuestList = () => {
    this.props.history.push('/quests');
  }

  updateInput = (element) => {
    this.input = element;
  }

  onSubmit = (event) => {
    event.preventDefault();
    post(
      `/quests/${this.props.match.params.questId}`,
      {code: this.state.code}
    ).then(() => {
      this.setState({success: true})
    });
  }
}

export default compose(
  withRouter,
  refetch(({match}) => ({
    questFetch: {
      url: `/quests/${match.params.questId}`,
      headers: {
        "access-token": "UxAMEzvBfh0Qa3Scf6vfKA",
        "token-type":   "Bearer",
        "uid":          "mikko@example.com",
        "expiry":       "1502358378"
      }
    }
  })),
  mapProps(({questFetch, submitCode, codeSubmit = {}, ...otherProps}) => ({
    quest: questFetch.value || [],
    loading: questFetch.pending,
    submitting: codeSubmit.pending,
    onSubmitCode: submitCode,
    ...otherProps
  }))
)(QuestPage);
