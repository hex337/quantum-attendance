import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { BeltPropType, StudentPropType } from '../StudentsScreen/StudentsList/PropTypes';

import BaseComponent from '../BaseComponent';

export default class StudentScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchStudent: PropTypes.func,
    }).isRequired,
    data: PropTypes.shape({
      $$attendance: ImmutablePropTypes.contains({
        students: ImmutablePropTypes.mapOf(StudentPropType),
        belts: ImmutablePropTypes.mapOf(BeltPropType),
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      studentId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    // ensure that we have the student we want to view in the store
    const { fetchStudent } = this.props.actions;
    const { studentId } = this.props.params;

    fetchStudent(studentId);
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
