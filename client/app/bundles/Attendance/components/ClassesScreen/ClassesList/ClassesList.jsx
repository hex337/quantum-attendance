import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import Immutable from 'immutable';

export const classPropTypes = {
  id: PropTypes.number.isRequired,
  met: PropTypes.string.isRequired,
}

export default class ClassesList extends BaseComponent {
  static propTypes = {
    $$classes: PropTypes.instanceOf(Immutable.List),
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { $$classes } = this.props
    const clsRows = $$classes ? $$classes.map(($$cls, index) =>
      <tr key={$$cls.get('id')}>
        <td>{$$cls.get('id')}</td>
        <td>{$$cls.get('met')}</td>
      </tr>
    ) : '';

    return (
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>met</th>
          </tr>
        </thead>
        <tbody>
          {clsRows}
        </tbody>
      </table>
    );
  }
}
