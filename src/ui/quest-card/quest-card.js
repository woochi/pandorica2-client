// @flow

import React from 'react';
import {
  LinkButton,
  Label,
  Paragraph,
  Heading,
  Card,
  CardImage,
  CardBody,
  CardFooter,
  Chip
} from '../';
import css from './quest-card.css';
import {
  Link
} from 'react-router-dom'

class QuestCard extends React.PureComponent {
  static defaultProps = {
    name: 'Unknown',
    points: 0
  }

  render() {
    const {id, name, points} = this.props;

    return (
      <div className={css.questCard}>
        <Card>
          <CardBody>
            <Label>Quest</Label>
            <Heading>{name}</Heading>
            <Paragraph>
              Join the royal guardsmen in escorting the princess to her evening banquet. The princess was last seen near the Messukeskus lobby area.
            </Paragraph>
            <div className={css.labels}>
              <Chip>+ {points}</Chip>
            </div>
          </CardBody>
          <CardFooter>
            <Link to={`quests/${id}`}>
              <LinkButton fullWidth={true}>Accept Quest</LinkButton>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default QuestCard;
