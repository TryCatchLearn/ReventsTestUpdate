import React, { Component } from 'react'
import {connect} from 'react-redux';
import {incrementCounter, decrementCounter} from './testActions';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';

const mapState = (state) => ({
    data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {
  render() {
    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
        <TestPlaceInput />
        <br/>
        <SimpleMap />
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent);