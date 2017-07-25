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
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
            </li>
            <li>
              <Link to="/classes" activeClassName="active">Classes</Link>
            </li>
            <li>
              <Link to="/students" activeClassName="active">Students</Link>
            </li>
          </ul>
        </header>
        {this.props.children}
      </section>
    );
  };
};
