import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NavigationBar from '../components/NavigationBar/NavigationBar';

import NavigationBarContainer from '../containers/NavigationBarContainer';
import * as paths from '../constants/paths';

export default class Layout extends BaseComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <section>
        <header>
          <NavigationBarContainer location={location} />
        </header>
        {this.props.children}
      </section>
    );
  };
};
