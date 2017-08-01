import React, { PropTypes } from 'react';
import Link from 'react-router';

import BaseComponent from '../../components/BaseComponent';

const NavLink = (props) => {
  const { location, linkName } = props;
  const isActive = location.pathname == props.to;
  const className = isActive ? 'active' : '';

  return (
    <li className={className}>
      <Link {...props} activeClassName="active">{linkName}</Link>
    </li>
  );
};

NavLink.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NavLink;
