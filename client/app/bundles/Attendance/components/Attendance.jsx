import PropTypes from 'prop-types';
import React from 'react';

import Nav from './Nav'

const Attendance = ({ name, updateName }) => (
  <div>
    <Nav currentPath="create" />
    <h2>Attendance App</h2>
    <h3>
      Hello, {name}!
    </h3>
    <hr />
    <form >
      <label htmlFor="name">
        Say hello to:
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
    </form>
  </div>
);

Attendance.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
};

export default Attendance;
