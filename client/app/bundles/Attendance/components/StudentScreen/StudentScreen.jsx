import React from 'react';
import PropTypes from 'prop-types';

import { studentPropTypes } from '../StudentsScreen/StudentsList/StudentsList';

import BaseComponent from '../BaseComponent';

export default class StudentScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.shape({
      $$students: PropTypes.shape({
        students: PropTypes.objectOf(PropTypes.shape(studentPropTypes)),
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // ensure that we have the student we want to view in the store
    const { fetchStudents } = this.props.actions;
    fetchStudents();
  }

  render() {
    const { data, actions, location, params } = this.props;
    let studentId = ('studentId' in params) ? params.studentId : '';
    let $$students = data.get('$$students');

    //if ('students' in $$students && studentId in $$students.get('students')) {
    //}

    let student = $$students.get('students').get(studentId);

    return (
      <div>
        <div className="container">
          A whole bunch of students and stuff goes here.
        </div>
        <div>
          Student id: <strong>{studentId}</strong>.
        </div>
        <div>
          {student.get('first_name')} {student.get('last_name')}
        </div>
      </div>
    );
  }
}
