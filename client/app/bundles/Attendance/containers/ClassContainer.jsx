import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';

import ClassScreen from '../components/ClassScreen/ClassScreen';
import * as classesActionCreators from '../actions/classesActionCreators';

function select(state) {
  return {
    data: {
      classes: state.$$attendance.get("$$attendance").get("classes"),
      class_types: state.$$attendance.get("$$attendance").get("class_types"),
    },
  };
}

class ClassContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data, location, params } = this.props;
    const actions = bindActionCreators(classesActionCreators, dispatch);

    return (
      <ClassScreen {...{ actions, data, location, params }} />
    );
  }
}

export default connect(select)(ClassContainer)
