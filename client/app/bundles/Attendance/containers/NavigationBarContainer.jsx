import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseComponent from '../components/BaseComponent';

import NavigationBar from '../components/NavigationBar/NavigationBar';

function stateToProps(state) {
  if (state.railsContext) {
    return {
      pathname: state.railsContext.pathname,
    };
  }

  return {};
}

class NavigationBarContainer extends BaseComponent {
  static PropTypes = {
    pathname: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const { pathname, location } = this.props;

    return (
      <NavigationBar {...{ pathname, location }} />
    );
  };
}

export default connect(stateToProps)(NavigationBarContainer);
