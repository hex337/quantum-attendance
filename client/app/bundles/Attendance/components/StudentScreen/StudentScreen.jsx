import React, { PropTypes } from 'react';

import BaseComponent from '../../components/BaseComponent';

export default class StudentScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  render() {
    const { data, actions, location, params } = this.props;
    let studentId = ('studentId' in params) ? params.studentId : '';

    return (
      <div>
        <div className="container">
          A whole bunch of students and stuff goes here.
        </div>
        <div>
          Student id: <strong>{studentId}</strong>.
        </div>
      </div>
    );
  }
}
