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
      belts: ImmutablePropTypes.mapOf(BeltPropType),
      classes: ImmutablePropTypes.mapOf(ClassPropType).isRequired,
      meeting_types: ImmutablePropTypes.mapOf(MeetingTypePropType).isRequired,
      students: ImmutablePropTypes.mapOf(StudentPropType),
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      classId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { fetchClass } = this.props.actions;
    const { classId } = this.props.params;

    // Always fetch since we don't know if we have everything we need.
    fetchClass(classId);
  }

  render() {
    const { data, actions, location, params } = this.props;
    const { belts, classes, meeting_types, students } = data;
    let classId = params.classId;
    let cls = classes.get(classId);
    let studentsToShow = [];
    let assistantsToShow = [];
    let clsInfo = [];
    let meetingType = undefined;
    let assistantsDiv = '';
    let instructor = undefined;

    if (cls && students) {
      studentsToShow = cls.get("students").map(id => students.get(id.toString())).valueSeq();
      assistantsToShow = cls.get("assistants").map(id => students.get(id.toString())).valueSeq();
      meetingType = meeting_types.get(cls.get('meeting_type_id').toString());
      instructor = students.get(cls.get("instructor").toString())

      clsInfo = [
        { label: "School", val: cls.get('school').get('name') },
        { label: "Class Type", val: meetingType.get('name') },
        { label: "Taught By", val: instructor.get('first_name') + ' ' + instructor.get('last_name') },
        { label: "Met", val: cls.get('met_long_form') },
        { label: "Comment", val: cls.get('comment') },
      ];

      if (cls.get("assistants").size > 0) {
        assistantsDiv = 
          <div>
            <h3>
              Assistants:
            </h3>
            <StudentsList students={assistantsToShow} belts={belts} />
          </div>;
      }
    }

    return (
      <div>
        { cls && students &&
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
            <h3>
              Students:
            </h3>
            <div className="student-list">
              <StudentsList students={studentsToShow} belts={belts} />
            </div>
          </div>
        }
      </div>
    );
  }
}
