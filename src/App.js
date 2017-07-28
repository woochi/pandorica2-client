import React, { Component } from 'react';
import styles from './App.css';
import {
  QuestCard,
  Stack,
  Grid
} from './ui';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import QuestListPage from './quest-list';
import QuestPage from './quest-page';
import SignupPage from './signup-page';
import LoginPage from './login-page';
import {requiresAuthentication} from './lib/auth';
import HomePage from './home-page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import CodePage from './code-page';
import StatsPage from './stats-page';

const muiTheme = getMuiTheme({
  ...darkBaseTheme,
  fontFamily: `'TT Norms', sans-serif`
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div className={styles.app}>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route
              exact
              path="/quests"
              component={requiresAuthentication(QuestListPage)}/>
            <Route
              path="/quests/:questId"
              component={requiresAuthentication(QuestPage)}/>
            <Route
              exact
              path="/codes"
              component={requiresAuthentication(CodePage)}/>
            <Route
              exact
              path="/stats"
              component={StatsPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
