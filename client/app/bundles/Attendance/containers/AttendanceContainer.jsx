import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClassScreen from '../components/ClassScreen/ClassScreen';
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
    location: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(attActions, dispatch);
    const locationState = this.props.location;
    
    return (
      <ClassScreen {...{ actions, data, location}} />
    );
  }
} 

// Don't forget to actually use connect!
// Note that we don't export Attendance, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(AttendanceContainer);
