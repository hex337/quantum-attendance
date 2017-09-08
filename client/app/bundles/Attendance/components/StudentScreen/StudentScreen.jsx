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
      students: ImmutablePropTypes.mapOf(StudentPropType).isRequired,
      belts: ImmutablePropTypes.mapOf(BeltPropType).isRequired,
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
    const { data } = this.props;
    const { students } = data;

    // Only fetch the student if we don't already have them.
    if (typeof students.get(studentId) == 'undefined') {
      fetchStudent(studentId);
    }
  }

  render() {
    const { data, actions, location, params } = this.props;
    const { belts, students } = data;
    let studentId = params.studentId;
    let student = students.get(studentId);

    // This isn't great, we should probably have some kind of message
    // if the student isn't found. But that would only happen if you
    // manually type in the url and use an id that doesn't exist.
    return (
      <div>
        { student &&
          <div>
            <div className="container">
              A whole bunch of students and stuff goes here.
            </div>
            <div>
              Student id: <strong>{studentId}</strong>.
            </div>
            <div className="student-name">
              {student.get('first_name')} {student.get('last_name')}
            </div>
          </div>
        }
      </div>
    );
  }
}
