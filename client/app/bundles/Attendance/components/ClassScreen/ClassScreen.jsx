import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BaseComponent from '../../components/BaseComponent';
import StudentsList from '../StudentsScreen/StudentsList/StudentsList';
import { ClassPropType, MeetingTypePropType } from '../ClassesScreen/ClassesList/PropTypes';
import { BeltPropType, StudentPropType } from '../StudentsScreen/StudentsList/PropTypes';

export default class ClassScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchClass: PropTypes.func,
    }).isRequired,
    data: PropTypes.shape({
      belts: ImmutablePropTypes.mapOf(BeltPropType).isRequired,
      classes: ImmutablePropTypes.mapOf(ClassPropType).isRequired,
      meeting_types: ImmutablePropTypes.mapOf(MeetingTypePropType).isRequired,
      students: ImmutablePropTypes.mapOf(StudentPropType).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      classId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { fetchClass } = this.props.actions;
    const { classId } = this.props.params;
    const { data } = this.props;
    const { belts, classes, meeting_types, students } = data;

    // only fetch the class if we don't already have it
    if (typeof classes.get(classId) == 'undefined') {
      fetchClass(classId);
    }
  }

  render() {
    const { data, actions, location, params } = this.props;
    const { belts, classes, class_types, students } = data;
    let classId = params.classId;
    let cls = classes.get(classId);
    let studentsToShow = [];

    if (cls) {
      studentsToShow = cls.get("students").map(id => students.get(id.toString())).valueSeq();
    }

    return (
      <div>
        { cls &&
          <div className="container">
            <div>
              Class id: <strong>{classId}</strong>.
            </div>
            <div>
              Member Count: <span className="member_count">{cls.get('member_count')}</span>
            </div>
            <div>
              <strong>Students in this class:</strong>
            </div>
            <div className="student-list">
              <StudentsList students={studentsToShow} belts={belts} />
            </div>
          </div>
        }
      </div>
    );
  }
}
