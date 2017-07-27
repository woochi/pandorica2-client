import React, { Component } from 'react';
import {
  QuestCard,
  Grid
} from './ui';
import {refetch} from './lib/api';
import {compose, mapProps} from 'recompose';

class QuestPage extends React.PureComponent {
  render() {
    const {quest, submitting, loading} = this.props;
    const {name, description, points, code} = quest;

    return (
      <div>
        <div>{name}</div>
        <div>{description}</div>
        <div>{points}</div>
        <div>{code}</div>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref={this.updateInput}/>
        </form>
        {submitting && 'SUBMITTING'}
      </div>
    );
  }

  updateInput = (element) => {
    this.input = element;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {value} = this.input;

    this.props.onSubmitCode(value);
  }
}

export default compose(
  refetch(({match}) => ({
    questFetch: {
      url: `/quests/${match.params.questId}`,
      headers: {
        "access-token": "UxAMEzvBfh0Qa3Scf6vfKA",
        "token-type":   "Bearer",
        "uid":          "mikko@example.com",
        "expiry":       "1502358378"
      }
    },
    submitCode: (code) => ({
      codeSubmit: {
        url: `/quests/${match.params.questId}`,
        method: 'POST',
        body: {code}
      }
    })
  })),
  mapProps(({questFetch, submitCode, codeSubmit = {}}) => ({
    quest: questFetch.value || [],
    loading: questFetch.pending,
    submitting: codeSubmit.pending,
    onSubmitCode: submitCode
  }))
)(QuestPage);
