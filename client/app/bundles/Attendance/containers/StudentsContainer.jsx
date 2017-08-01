import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';

import StudentScreen from '../components/StudentScreen/StudentScreen';
import * as studentsActionCreators from '../actions/studentsActionCreators';

function select(state) {
  return { data: state.$$attendanceStore };
}

class StudentsContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(studentsActionCreators, dispatch);

    return (
      <ClassScreen {...{ actions, data }} />
    );
  }
}

export default connect(select)(StudentsContainer)
