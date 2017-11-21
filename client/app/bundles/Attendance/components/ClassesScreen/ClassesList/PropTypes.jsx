import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const MeetingTypePropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

export const ClassPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  member_count: PropTypes.number.isRequired,
  comment: PropTypes.string,
  met: PropTypes.string.isRequired,
  meeting_type: PropTypes.number.isRequired,
  meeting_type_id: PropTypes.number.isRequired,
});

const ClassesListPropTypes = ImmutablePropTypes.mapOf(ClassPropType).isRequired;

export default ClassesListPropTypes;
