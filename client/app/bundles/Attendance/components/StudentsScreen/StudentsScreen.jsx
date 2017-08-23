import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import BaseComponent from '../../components/BaseComponent';
import StudentsList, { studentPropType } from './StudentsList/StudentsList';

class StudentsScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchStudents: PropTypes.function,
    }).isRequired,
    data: PropTypes.shape({
      isFetchingStudent: PropTypes.boolean,
      isSavingStudent: PropTypes.boolean,
      $$students: PropTypes.arrayOf(studentPropType),
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

    return (
      <div>
        <div className="container">
          <StudentsList $$students={data.get('$$students')} />
        </div>
      </div>
    );
  }
}

export default StudentsScreen;
