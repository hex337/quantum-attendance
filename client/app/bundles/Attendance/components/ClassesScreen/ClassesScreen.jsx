import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import BaseComponent from '../../components/BaseComponent';
import ClassesList, { classPropTypes } from './ClassesList/ClassesList';

class ClassesScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchClasses: PropTypes.function,
    }).isRequired,
    data: PropTypes.shape({
      $$attendance: PropTypes.shape({
        classes: PropTypes.objectOf(PropTypes.shape(classPropTypes)),
      }),
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
    let classes = data;

    return (
      <div>
        <div className="container">
          <ClassesList classes={classes} />
        </div>
      </div>
    );
  }
}

export default ClassesScreen;
