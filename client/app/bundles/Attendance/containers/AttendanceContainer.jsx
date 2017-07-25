// Simple example of a React "smart" component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Attendance from '../components/ClassScreen/ClassScreen';
import * as attActions from '../actions/attendanceActionCreators';

import BaseComponent from '../components/BaseComponent';

// Which part of the Redux global state does our component want to receive as props?
function select(state) {
  return { data: state.$$attendanceStore };
}

class AttendanceContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(attActions, dispatch);
    
    return (
      <ClassScreen {...{ actions, data}} />
    );
  }
} 

// Don't forget to actually use connect!
// Note that we don't export Attendance, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(AttendanceContainer);
