import React, { Component } from 'react';
import {
  QuestCard,
  Grid
} from './ui';
import {refetch} from './lib/api';
import {compose, mapProps} from 'recompose';

const items = Array(10).fill(null).map((_, i) => ({
  id: i,
  name: 'Quest ' + i,
  points: 200
}));

class QuestList extends React.PureComponent {
  render() {
    const {quests} = this.props;

    return (
      <Grid>
        {quests.map(this.renderQuestCard)}
      </Grid>
    );
  }

  renderQuestCard(quest, i) {
    return (
      <QuestCard {...quest}/>
    );
  }
}

export default compose(
  refetch(props => ({
    questsFetch: {
      url: '/quests'
    }
  })),
  mapProps(({questsFetch}) => ({
    quests: questsFetch.value || [],
    loading: questsFetch.pending
  }))
)(QuestList);
