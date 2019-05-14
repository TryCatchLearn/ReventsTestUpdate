import React from 'react';
import { Grid, Card, Segment, Image, Header, Tab } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';

const panes = [
  {menuItem: 'All Events', pane: {key: 'allEvents'}},
  {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
  {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
  {menuItem: 'Hosting', pane: {key: 'hosting'}},
]

const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment loading={eventsLoading} attached>
        <Header icon='calendar' content='Events' />
        <Tab onTabChange={(e, data) => changeTab(e, data)} panes={panes} menu={{secondary: true, pointing: true}}/>
        <br/>

        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign='center'>{event.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                    <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
