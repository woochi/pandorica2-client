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

class CodeInsertPage extends React.PureComponent {
  render() {
    return (
      <div>Insert code</div>
    );
  }
}

class App extends Component {
  render() {
    return (
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
            component={requiresAuthentication(CodeInsertPage)}/>
        </div>
      </Router>
    );
  }
}

export default App;
