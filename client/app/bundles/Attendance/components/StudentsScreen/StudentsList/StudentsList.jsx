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
    const { $$students } = this.props
    const students = $$students && $$students.get('students') ? $$students.get('students').valueSeq() : [];
    const belts = $$students && $$students.get('belts') ? $$students.get('belts') : {};

    const studentRows = students.map(($$student) =>
      <tr key={$$student.get('id')}>
        <td>
          <BeltIcon width={30} height={24} name={belts.get($$student.get("belt").toString()).get("name")} id={$$student.get("belt")} />
        </td>
        <td>{$$student.get('id')}</td>
        <td><Link to={'/test/students/' + $$student.get('id')}>{$$student.get('first_name')} {$$student.get('last_name')}</Link></td>
      </tr>
    );

    console.log("rows:");
    console.log(studentRows);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>belt</th>
              <th>id</th>
              <th>name</th>
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
