import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Moment from 'react-moment';
import 'moment-timezone';

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
    const { belts, classes, meeting_types, students } = data;
    let classId = params.classId;
    let cls = classes.get(classId);
    let studentsToShow = [];
    let clsInfo = [];
    let meetingType = undefined;

    if (cls) {
      studentsToShow = cls.get("students").map(id => students.get(id.toString())).valueSeq();
      meetingType = meeting_types.get(cls.get('meeting_type_id').toString());

      clsInfo = [
        { label: "School", val: cls.get('school').get('name') },
        { label: "Class Type", val: meetingType.get('name') },
        { label: "Met", val: cls.get('met_long_form') },
        { label: "Comment", val: cls.get('comment') },
      ];
    }

    return (
      <div>
        { cls &&
          <div>
            <div className="page-header">
              <h1>
                {cls.get('pretty_name')}
              </h1>
            </div>
            <dl className="dl-horizontal">
              { clsInfo.reduce((acc, item, ndx) => {
                  return acc.concat([
                    <dt key={"dt-cls-screen-" + item.label}><strong>{item.label}:</strong></dt>,
                    <dd key={"dd-cls-screen-" + item.val}>{item.val}</dd>
                  ]);
                }, [])
              }
            </dl>
            <div className="student-list">
              <StudentsList students={studentsToShow} belts={belts} />
            </div>
          </div>
        }
      </div>
    );
  }
}
