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
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropdownIcon from 'react-icons/lib/md/arrow-drop-down';
import {logOut} from './lib/auth';

const items = Array(10).fill(null).map((_, i) => ({
  id: i,
  name: 'Quest ' + i,
  points: 200
}));

class QuestList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }
  render() {
    const {quests} = this.props;

    return (
      <Page>
        <NavBar
          title={<div><span style={{verticalAlign: 'middle'}} ref={this.setTitleElement} onClick={this.toggleMenu}>Quests Board</span> <DropdownIcon size={16}/></div>}
          onScan={this.navigateToCodes}
          onStats={this.navigateToStatsPage}/>
        <Popover
          open={this.state.menuOpen}
          anchorEl={this.title}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeMenu}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem
              primaryText="Help"
              onTouchTap={this.navigateToHelp}/>
            <MenuItem
              primaryText="Sign out"
              onTouchTap={this.logOut}/>
          </Menu>
        </Popover>
        <PageBody>
          <Grid>
            {quests.map(this.renderQuestCard)}
          </Grid>
        </PageBody>
      </Page>
    );
  }

  navigateToHelp = () => {
    this.props.history.push('/help');
  }

  logOut = () => {
    logOut().then(() => {
      this.props.history.replace('/login');
    });
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  closeMenu = () => {
    this.setState({menuOpen: false});
  }

  setTitleElement = (element) => {
    this.title = element;
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
