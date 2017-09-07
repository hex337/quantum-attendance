import attendanceReducer from './attendanceReducer';
import * as studentActions from '../actions/studentsActionCreators';

const fakeStudents = {
  data: [
    {
      id: 1,
      belt: {
        id: 1,
        name: 'white'
      },
      is_teacher: false,
      is_active: true,
      is_kid: false,
      first_name: 'Alex',
      last_name: 'K',
    },
    {
      id: 2,
      belt: {
        id: 1,
        name: 'white'
      },
      is_teacher: false,
      is_active: true,
      is_kid: false,
      first_name: 'Marco',
      last_name: 'L',
    }
  ]
};

describe('attendanceReducer', () => {
  describe('FETCH_STUDENTS', () => {
    let state;

    beforeEach(() => {
      state = attendanceReducer(
        undefined,
        studentActions.fetchStudentsSuccess(fakeStudents)
      );
    });

    it('should normalize the student correctly', () => {
      expect(state.get('$$attendance').get('students').size).toEqual(2)
      expect(state.get('$$attendance').get('belts').size).toEqual(1)

      expect(state.get('$$attendance').get('belts').get("1").get("name")).toEqual("white")
    });
  });
});
