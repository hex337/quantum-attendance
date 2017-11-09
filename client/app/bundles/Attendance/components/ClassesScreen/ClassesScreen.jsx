import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BaseComponent from '../../components/BaseComponent';
import ClassesList from './ClassesList/ClassesList';
import { ClassPropType, MeetingTypePropType } from './ClassesList/PropTypes';

class ClassesScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchClasses: PropTypes.func,
    }).isRequired,
    data: PropTypes.shape({
      classes: ImmutablePropTypes.mapOf(ClassPropType),
      meeting_types: ImmutablePropTypes.mapOf(MeetingTypePropType),
    }).isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchClasses } = this.props.actions;
    fetchClasses();
  }

  render() {
    const { data, actions, location, params } = this.props;
    let { classes, meeting_types } = data;

    return (
      <div>
        <div className="container">
          <ClassesList classes={classes} meeting_types={meeting_types} />
        </div>
      </div>
    );
  }
}

export default ClassesScreen;
