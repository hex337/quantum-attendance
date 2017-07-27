import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import BaseComponent from '../components/BaseComponent';

export default class Layout extends BaseComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <section>
        <header>
          <ul>
            <li>
              <IndexLink to="/test" activeClassName="active">Home</IndexLink>
            </li>
            <li>
              <Link to="/test/classes" activeClassName="active">Classes</Link>
            </li>
            <li>
              <Link to="/test/students" activeClassName="active">Students</Link>
            </li>
          </ul>
        </header>
        {this.props.children}
      </section>
    );
  };
};
