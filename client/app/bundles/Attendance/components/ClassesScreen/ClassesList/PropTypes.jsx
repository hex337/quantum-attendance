import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const MeetingTypePropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

const ClassPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  member_count: PropTypes.number.isRequired,
  comment: PropTypes.string,
  met: PropTypes.string.isRequired,
  meeting_type: MeetingTypePropType.isRequired
});

const ClassesListPropTypes = {
  $$classes: ImmutablePropTypes.listOf(ClassPropType).isRequired
};

export default ClassesListPropTypes;