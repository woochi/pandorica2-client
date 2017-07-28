// @flow

import React from 'react';
import {Page, PageBody, Paragraph, NavBar, Button} from './ui';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import css from './help-page.css';

class HelpPage extends React.PureComponent {
  render() {
    return (
      <Page>
        <NavBar
          title="Realms of Ropecon"
          onClose={this.goBack}/>
        <PageBody>
          <div className={css.content}>
            <Paragraph>
              <strong>Realms of Ropecon</strong> is an Alternative Reality (AR) game that takes place during the whole Ropecon weekend. In the game, three kingdoms are collecting gold, weapons and information to strengthen their armies against <strong>The Enemy</strong>.
            </Paragraph>
            <Paragraph>
              The game works by completing quests posted to the app. The quests might require visiting special places within the Ropecon event area, escorting royalty to safety or completing other daring deeds. You can also collect <strong>wild codes</strong> by attending lectures and events. Each completed quest and collected code gains points to your kingdom and strengthens its forces. Note that more quests appear in time, so check the listing periodically.
            </Paragraph>
            <Paragraph>
              The less quests the three kingdoms' warriors complete the more <strong>The Enemy</strong> gains strength in turn. On Sunday the three kingdoms will face The Enemy in a final showdown on Sunday to decide the final destiny of the land.
            </Paragraph>
            <Paragraph>
              <Link to="/signup">
                <Button bsStyle="primary" fullWidth>Join the Fight now!</Button>
              </Link>
            </Paragraph>
          </div>
        </PageBody>
      </Page>
    );
  }

  goBack = () => {
    this.props.history.goBack();
  }
}

export default withRouter(HelpPage);
