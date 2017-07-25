import React, { PropTypes } from 'react';

import BaseComponent from '../../components/BaseComponent';

export default class ClassScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  render() {
    const { data, actions } = this.props;

    return (
      <div>
        <div className="container">
          A whole bunch of classes and stuff goes here.
        </div>
      </div>
    );
  }
}
