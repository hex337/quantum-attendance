import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import Immutable from 'immutable';

export const classesPropTypes = {
  $$classes: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default class ClassesList extends BaseComponent {
  static propTypes = classesPropTypes;

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { $$classes } = this.props
    const clsRows = $$classes.map(($$cls, index) =>
      <tr>
        <td>{$$cls.id}</td>
        <td>{$$cls.met}</td>
      </tr>
    );

    return (
      <table className="table">
        <thead>
          <th>id</th>
          <th>met</th>
        </thead>
        <tbody>
          {clsRows}
        </tbody>
      </table>
    );
  }
}
