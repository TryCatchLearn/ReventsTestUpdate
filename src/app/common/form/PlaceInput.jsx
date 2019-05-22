import React, { Component } from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import { Form, List, Segment, Label } from 'semantic-ui-react';

export default class PlaceInput extends Component {
  render() {
    const {
      input: {value, onChange, onBlur},
      width,
      onSelect,
      options,
      placeholder,
      meta: { touched, error }
    } = this.props;
    return (
      
        <PlacesAutoComplete
          value={value}
          onChange={onChange}
          searchOptions={options}
          onSelect={onSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <Form.Field error={touched && !!error} width={width}>
             
              <input
                placeholder={placeholder}
                {...getInputProps({placeholder, onBlur})}
              />
              {touched && error && <Label basic color='red'>{error}</Label>}
              {suggestions.length > 0 && (
                <Segment style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
                  {loading && <div>Loading...</div>}
                  <List fluid selection>
                    {suggestions.map(suggestion => (
                      <List.Item {...getSuggestionItemProps(suggestion)}>
                        <List.Header>
                          {suggestion.formattedSuggestion.mainText}
                        </List.Header>
                        <List.Description>
                          {suggestion.formattedSuggestion.secondaryText}
                        </List.Description>
                      </List.Item>
                    ))}
                  </List>
                </Segment>
              )}
              
            </Form.Field>
          )}
        </PlacesAutoComplete>
    );
  }
}
