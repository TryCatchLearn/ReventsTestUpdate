import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync, testPermissions } from './testActions';
import { openModal } from '../modals/modalActions';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';

const mapState = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
  testPermissions
};

class TestComponent extends Component {
  render() {
    const {
      incrementAsync,
      decrementAsync,
      data,
      openModal,
      loading,
      testPermissions
    } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button
          loading={loading}
          onClick={incrementAsync}
          color='green'
          content='Increment'
        />
        <Button
          loading={loading}
          onClick={decrementAsync}
          color='red'
          content='Decrement'
        />
        <Button
          onClick={() => openModal('TestModal', { data: 42 })}
          color='teal'
          content='Open Modal'
        />
        <Button
          onClick={testPermissions}
          color='teal'
          content='Test Permissions'
        />
        <TestPlaceInput />
        <br />
        <SimpleMap />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
