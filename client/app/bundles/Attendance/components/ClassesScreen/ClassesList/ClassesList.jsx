import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';
import Immutable from 'immutable';
import { Link } from 'react-router';

export const classPropTypes = {
  id: PropTypes.number.isRequired,
  met: PropTypes.string.isRequired,
}

export default class ClassesList extends BaseComponent {
  static propTypes = {
    $$classes: PropTypes.shape({
      classes: PropTypes.objectOf(PropTypes.shape(classPropTypes)),
    }),
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { $$classes } = this.props
    const classes = $$classes && $$classes.get('classes') ? $$classes.get('classes').valueSeq() : [];
    const clsRows = classes.map(($$cls) =>
      <tr key={$$cls.get('id')}>
        <td><Link to={'/test/classes/' + $$cls.get('id')}>{$$cls.get('id')}</Link></td>
        <td>{$$cls.get('met')}</td>
      </tr>
    );

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
