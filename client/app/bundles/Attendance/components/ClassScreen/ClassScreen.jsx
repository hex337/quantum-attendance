import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BaseComponent from '../../components/BaseComponent';
import { ClassPropType, ClassTypePropType } from '../ClassesScreen/ClassesList/PropTypes';

export default class ClassScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchClass: PropTypes.func,
    }).isRequired,
    data: PropTypes.shape({
      classes: ImmutablePropTypes.mapOf(ClassPropType).isRequired,
      class_types: ImmutablePropTypes.mapOf(ClassTypePropType).isRequired,
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
    const { classes } = data;
    console.log(classes);

    // only fetch the class if we don't already have it
    if (typeof classes.get(classId) == 'undefined') {
      fetchClass(classId);
    }
  }

  render() {
    const { data, actions, location, params } = this.props;
    const { classes, class_types } = data;
    let classId = params.classId;
    let cls = classes.get(classId);
    console.log(cls);

    return (
      <div>
        { cls &&
          <div className="container">
            <div>
              A whole bunch of classes and stuff goes here.
            </div>
            <div>
              Class id: <strong>{classId}</strong>.
            </div>
            <div>
              Member Count: {cls.get('member_count')}
            </div>
          </div>
        }
      </div>
    );
  }
}
