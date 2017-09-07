import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../components/BaseComponent';

import ClassesScreen from '../components/ClassesScreen/ClassesScreen';
import * as classesActionCreators from '../actions/classesActionCreators';

function select(state) {
  return { data: state.$$attendance };
}

class ClassesContainer extends BaseComponent {
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
      <ClassesScreen {...{ actions, data, location, params }} />
    );
  }
}

export default connect(select)(ClassesContainer)
