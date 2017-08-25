import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import Immutable from 'immutable';
import { Link } from 'react-router';

export const classPropTypes = {
  id: PropTypes.number.isRequired,
  met: PropTypes.string.isRequired,
};

export default class ClassesList extends BaseComponent {
  static propTypes = {
    $$classes: PropTypes.instanceOf(Immutable.List),
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { $$classes } = this.props;
    const clsRows = $$classes ? $$classes.map(($$cls, index) =>
      <tr key={$$cls.get('id')}>
        <td><Link to={'/test/classes/' + $$cls.get('id')}>{$$cls.get('meeting_type').get('name')}</Link></td>
        <td>{$$cls.get('met')}</td>
      </tr>
    ) : '';

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Meeting Type</th>
            <th>Met</th>
          </tr>
        </thead>
        <tbody>
          {clsRows}
        </tbody>
      </table>
    );
  }
}
