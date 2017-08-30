import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';

import StudentScreen from '../components/StudentScreen/StudentScreen';
import * as studentsActionCreators from '../actions/studentsActionCreators';

function select(state) {
  return { data: state.students };
}

class StudentContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data, location, params } = this.props;
    const actions = bindActionCreators(studentsActionCreators, dispatch);

    return (
      <StudentScreen {...{ actions, data, location, params }} />
    );
  }
}

export default connect(select)(StudentContainer)