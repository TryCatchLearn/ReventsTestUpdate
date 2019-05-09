import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

  handleFormSubmit = () => {
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent);
      this.props.history.push('/events')
    }
  };

  handleInputChange = (evt)=> {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  }


  render() {
    const { title, date, city, venue, hostedBy } = this.state.event;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              value={title}
              onChange={this.handleInputChange}
              placeholder='Event Title'
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name='date'
              value={date}
              onChange={this.handleInputChange}
              type='date'
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              value={city}
              onChange={this.handleInputChange}
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              value={venue}
              onChange={this.handleInputChange}
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              value={hostedBy}
              onChange={this.handleInputChange}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
