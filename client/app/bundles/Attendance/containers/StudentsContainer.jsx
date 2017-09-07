import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';

import StudentsScreen from '../components/StudentsScreen/StudentsScreen';
import * as studentsActionCreators from '../actions/studentsActionCreators';

function select(state) {
  return {
    data: {
      students: state.$$attendance.get("$$attendance").get("students"),
      belts: state.$$attendance.get("$$attendance").get("belts"),
    },
  };
}

class StudentsContainer extends BaseComponent {
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
      <StudentsScreen {...{ actions, data, location, params }} />
    );
  }
}

export default connect(select)(StudentsContainer)
