// @flow

import React from 'react';
import {Page, PageBody, Heading, Paragraph, Center, Counter, NavBar, PointsDisplay} from './ui';
import css from './stats-page.css';
import {refetch} from './lib/api';
import {compose, mapProps} from 'recompose';
import Crown from './images/crown.png';
import {withRouter} from 'react-router';

class FactionStats extends React.PureComponent {
  static defaultProps = {
    isLeader: false
  }

  render() {
    const {faction, isLeader} = this.props;
    const {name, points} = faction;

    return (
      <div>
        <Center>
          {isLeader &&
            <div className={css.leaderIcon}>
              <img src={Crown} width="100%"/>
            </div>
          }
          <div className={css.factionName}>
            <Heading>{name}</Heading>
          </div>
          <PointsDisplay points={points}/>
        </Center>
      </div>
    );
  }
}

function alphabeticSort(a, b) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

class StatsPage extends React.PureComponent {
  static defaultProps = {
    factions: []
  };

  render() {
    return (
      <Page>
        <NavBar onClose={this.navigateToQuests}/>
        <PageBody>
          {this.renderContent()}
        </PageBody>
      </Page>
    );
  }

  renderContent = () => {
    const {factions, loading} = this.props;

    if (loading) {
      return null;
    } else {
      const enemyFaction = factions.find(faction =>
        faction.name === 'The Enemy'
      );
      const playerFactions = factions.filter(faction =>
        faction !== enemyFaction
      ).sort((a, b) => alphabeticSort(a.name, b.name));
      const sortedFactions = [enemyFaction].concat(playerFactions);
      const leader = sortedFactions.sort((a, b) => a.points < b.points)[0];

      return (
        <div className={css.factionsContainer}>
          <div className={css.factionList}>
            {sortedFactions.map(faction => (
              <div className={css.factionItem} key={faction.id}>
                <FactionStats
                  faction={faction}
                  key={faction.id}
                  isLeader={faction === leader}/>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  navigateToQuests = () => {
    this.props.history.replace('/quests');
  }
}

export default compose(
  refetch(props => ({
    factionsFetch: {
      url: '/factions',
      refreshInterval: 60 * 1000
    }
  })),
  mapProps(({factionsFetch, ...props}) => ({
    factions: factionsFetch.value || [],
    loading: factionsFetch.pending,
    ...props
  }))
)(StatsPage);
