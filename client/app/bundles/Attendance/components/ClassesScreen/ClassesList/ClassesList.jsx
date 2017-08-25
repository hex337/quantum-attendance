import React from 'react';
import ClassesListPropTypes from './PropTypes';
import BaseComponent from '../../BaseComponent';
import { Link } from 'react-router';

export default class ClassesList extends BaseComponent {
  static propTypes = ClassesListPropTypes;

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
