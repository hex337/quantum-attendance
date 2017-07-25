import classNames from 'classnames';
import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import * as paths from '../../constants/paths';

const NavigationBar = (props) => {
  const { pathname } = props;

  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span className="sr-only">Toggle Nav</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">Quantum Attendance</a>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse-2">
          <ul className="nav navbar-nav">
            <li className={classNames({ active: (pathname == paths.CLASSES_PATH) })}>
              <Link to={paths.CLASSES_PATH}>Classes</Link>
            </li>
            <li className={classNames({ active: (pathname == paths.STUDENTS_PATH) })}>
              <Link to={paths.STUDENTS_PATH}>Students</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  pathname: PropTypes.string.isRequired
};

export default NavigationBar;
