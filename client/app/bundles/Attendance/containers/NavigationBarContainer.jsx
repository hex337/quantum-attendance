import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/BaseComponent';

import NavigationBar from '../components/NavigationBar/NavigationBar';

function stateToProps(state) {
  if (state.$$attendanceStore) {
    return {
      pathname: state.railsContext.pathname,
    };
  }

  return {};
}

class NavigationBarContainer extends BaseComponent {
  static PropTypes = {
    pathname: PropTypes.string.isRequired
  };

  render() {
    const { pathname } = this.props;

    return (
      <NavigationBar {...{ pathname }} />
    );
  };
}

export default connect(stateToProps)(NavigationBarContainer);
