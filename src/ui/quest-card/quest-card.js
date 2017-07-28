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
    const {id, name, points, description} = this.props;

    return (
      <div className={css.questCard}>
        <Card>
          <CardBody>
            <Label>Quest</Label>
            <Heading>{name}</Heading>
            <Paragraph>
              {description}
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
