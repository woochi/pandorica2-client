import React, { Component } from 'react';
import {
  QuestCard,
  Grid,
  Page,
  PageBody,
  NavBar
} from './ui';
import {refetch} from './lib/api';
import {compose, mapProps} from 'recompose';
import {withRouter} from 'react-router';

const items = Array(10).fill(null).map((_, i) => ({
  id: i,
  name: 'Quest ' + i,
  points: 200
}));

class QuestList extends React.PureComponent {
  render() {
    const {quests} = this.props;

    return (
      <Page>
        <NavBar
          title="Quests Board"
          onScan={this.navigateToCodes}
          onStats={this.navigateToStatsPage}/>
        <PageBody>
          <Grid>
            {quests.map(this.renderQuestCard)}
          </Grid>
        </PageBody>
      </Page>
    );
  }

  navigateToStatsPage = () => {
    this.props.history.push('/stats');
  }

  navigateToCodes = () => {
    this.props.history.push('/codes');
  }

  renderQuestCard(quest, i) {
    return (
      <QuestCard {...quest}/>
    );
  }
}

export default compose(
  withRouter,
  refetch(props => ({
    questsFetch: {
      url: '/quests',
      refreshInterval: 60 * 1000
    }
  })),
  mapProps(({questsFetch, ...otherProps}) => ({
    quests: questsFetch.value || [],
    loading: questsFetch.pending,
    ...otherProps
  }))
)(QuestList);
