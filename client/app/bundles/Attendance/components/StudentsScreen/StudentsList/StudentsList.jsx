import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../BaseComponent';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import StudentsListPropTypes from './PropTypes';

import BeltIcon from '../BeltIcon';

export default class StudentsList extends BaseComponent {
  static propTypes = StudentsListPropTypes;
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { students, belts } = this.props

    const studentRows = students.map(($$student) =>
      <tr key={"student-row-" + $$student.get('id')}>
        <td>
          <BeltIcon width={30} height={24} name={belts.get($$student.get("belt").toString()).get("name")} id={$$student.get("belt")} />
        </td>
        <td><Link to={'/test/students/' + $$student.get('id')}>{$$student.get('first_name')} {$$student.get('last_name')}</Link></td>
      </tr>
    );

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {studentRows}
          </tbody>
        </table>
      </div>
    );
  }
}
