import React from 'react';
import {Link} from 'react-router-dom'
import css from './home-page.css';
import {Button, Page, PageFooter, PageBody, NavBar, Center} from './ui';
import Logo from './images/logo.png';
import {authenticate, isAuthenticated} from './lib/auth';

class HomePage extends React.PureComponent {
  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.replace('/quests');
    }
  }

  render() {
    return (
      <Page>
        <PageBody>
          <div className={css.center}>
            <div className={css.titleGroup}>
              <div className={css.logo}>
                <img src={Logo} width="100%"/>
              </div>
              <div className={css.supertitle}>Realms of</div>
              <div className={css.title}>Ropecon</div>
              <div className={css.subtitle}>The Game of Four Kingdoms</div>
            </div>
            <Link to="/signup">
              <Button bsStyle="primary" fullWidth>Join the Fight!</Button>
            </Link>
          </div>
        </PageBody>
        <PageFooter>
          Already signed up? <Link to="/login">Log in</Link>
        </PageFooter>
      </Page>
    );
  }
}

export default HomePage;
