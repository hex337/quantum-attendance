import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import BaseComponent from '../../components/BaseComponent';
import ClassesList from './ClassesList/ClassesList';

export default class ClassesScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchClasses } = this.props.actions;
    fetchClasses();
  }

  render() {
    const { data, actions, location, params } = this.props;
    let clsId = ('classId' in params) ? params.classId : ''

    return (
      <div>
        <div className="container">
          <ClassesList $$classes={data.get('$$classes')} />
        </div>
      </div>
    );
  }
}
