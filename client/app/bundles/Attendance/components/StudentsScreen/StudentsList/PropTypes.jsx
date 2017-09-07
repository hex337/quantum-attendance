import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const BeltPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const StudentPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  belt: PropTypes.number.isRequired,
  belt_id: PropTypes.number.isRequired,
  school_id: PropTypes.number.isRequired,
  is_active: PropTypes.bool.isRequired,
  is_teacher: PropTypes.bool.isRequired,
  is_kid: PropTypes.bool.isRequired,
});

const StudentsListPropTypes = PropTypes.shape({
  students: ImmutablePropTypes.mapOf(StudentPropType).isRequired,
  belts: ImmutablePropTypes.mapOf(BeltPropType).isRequired,
}).isRequired;

export default StudentsListPropTypes;
