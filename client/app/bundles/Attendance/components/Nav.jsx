import PropTypes from 'prop-types';
import React from 'react';

const Nav = ({ currentPath }) => (
  <div>
    <ul>
      <li>Create New Class</li>
      <li>View Classes</li>
    </ul>
  </div>
);

Nav.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Nav;
