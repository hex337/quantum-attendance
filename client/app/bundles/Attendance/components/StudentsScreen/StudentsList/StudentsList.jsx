import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import Immutable from 'immutable';
import { Link } from 'react-router';

export const studentPropTypes = {
  id: PropTypes.number.isRequired,
  belt_id: PropTypes.number.isRequired,
  comment: PropTypes.string,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
}

export default class StudentsList extends BaseComponent {
  static propTypes = {
    $$students: PropTypes.shape({
      students: PropTypes.objectOf(PropTypes.shape(studentPropTypes)),
    }),
  };

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
