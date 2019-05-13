/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const mapState = (state, ownProps) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue')
});

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  };

 componentDidMount = async () => {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    // if (event.exists) {
    //   this.setState({
    //     venueLatLng: event.data().venueLatLng
    //   });
    // }
  }

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };

  handleFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      console.log(values)
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push('/events');
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                type='text'
                options={category}
                component={SelectInput}
                placeholder='What is your event about'
              />
              <Field
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event location details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ typs: ['(cities)'] }}
                placeholder='Event city'
                onSelect={this.handleCitySelect}
              />
              <Field
                name='venue'
                type='text'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder='Event venue'
                onSelect={this.handleVenueSelect}
              />
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Event date'
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type='button'>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
);
