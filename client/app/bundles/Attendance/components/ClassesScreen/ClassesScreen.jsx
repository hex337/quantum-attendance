import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import BaseComponent from '../../components/BaseComponent';
import ClassesList, { classPropType } from './ClassesList/ClassesList';

class ClassesScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.shape({
      fetchClasses: PropTypes.function,
    }).isRequired,
    data: PropTypes.shape({
      isFetching: PropTypes.boolean,
      isSaving: PropTypes.boolean,
      $$classes: PropTypes.arrayOf(classPropType),
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

    return (
      <div>
        <div className="container">
          <ClassesList $$classes={data.get('$$classes')} />
        </div>
      </div>
    );
  }
}

export default ClassesScreen;
