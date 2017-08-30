import React from 'react';
import ClassesListPropTypes from './PropTypes';
import BaseComponent from '../../BaseComponent';
import { Link } from 'react-router';
import Moment from 'react-moment';
import 'moment-timezone';

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
        {/* August 30, 2017 15:44 */}
        <td><Moment format="MMMM DD, YYYY HH:mm" tz="America/Los_Angeles">{$$cls.get('met')}</Moment></td>
        <td>{$$cls.get('member_count')}</td>
        <td>{$$cls.get('comment')}</td>
      </tr>
    ) : '';

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Meeting Type</th>
            <th>Met</th>
            <th>Num Students</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {clsRows}
        </tbody>
      </table>
    );
  }
}
