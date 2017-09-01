import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../BaseComponent';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import StudentsListPropTypes from './PropTypes';

export default class StudentsList extends BaseComponent {
  static propTypes = StudentsListPropTypes;
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { $$students } = this.props
    const students = $$students && $$students.get('students') ? $$students.get('students').valueSeq() : [];
    const studentRows = students.map(($$student) =>
      <tr key={$$student.get('id')}>
        <td>{$$student.get('id')}</td>
        <td><Link to={'/test/students/' + $$student.get('id')}>{$$student.get('first_name')} {$$student.get('last_name')}</Link></td>
      </tr>
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {studentRows}
        </tbody>
      </table>
    );
  }
}
