import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../components/BaseComponent';
import StudentsList from './StudentsList/StudentsList';
import { StudentPropType, BeltPropType } from './StudentsList/PropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';

class StudentsScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchStudents: PropTypes.func,
    }),
    data: ImmutablePropTypes.contains({
      isFetchingStudent: PropTypes.bool,
      isSavingStudent: PropTypes.bool,
      $$attendance: ImmutablePropTypes.contains({
        students: ImmutablePropTypes.mapOf(StudentPropType),
        belts: ImmutablePropTypes.mapOf(BeltPropType),
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchStudents } = this.props.actions;
    fetchStudents();
  }

  render() {
    const { data, actions, location, params } = this.props;
    let attendance = data.get('$$attendance');

    return (
      <div>
        <div className="container">
          <StudentsList $$attendance={attendance} />
        </div>
      </div>
    );
  }
}

export default StudentsScreen;
