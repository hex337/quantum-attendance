import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import BaseComponent from '../../components/BaseComponent';

export default class ClassScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  render() {
    const { data, actions, location, params } = this.props;
    let clsId = ('classId' in params) ? params.classId : ''

    return (
      <div>
        <div className="container">
          <div>
            A whole bunch of classes and stuff goes here.
          </div>
          <div>
            <Link to="/test/classes/1">Class 1 Here</Link>
          </div>
          <div>
            Class id: <strong>{clsId}</strong>.
          </div>
        </div>
      </div>
    );
  }
}
