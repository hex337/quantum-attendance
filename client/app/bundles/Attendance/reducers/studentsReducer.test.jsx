import studentsReducer from './studentsReducer';
import * as actions from '../actions/studentsActionCreators';

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
    }
  ]
};

describe('studentsReducer', () => {
  describe('FETCH_STUDENTS', () => {
    let state;

    beforeEach(() => {
      state = studentsReducer(
        undefined,
        actions.fetchStudentsSuccess(fakeStudents)
      );
    });

    it('should normalize the student correctly', () => {
      expect(state.get('$$students').get('students').size).toEqual(1)
      expect(state.get('$$students').get('belts').size).toEqual(1)

      expect(state.get('$$students').get('belts').get("1").get("name")).toEqual("white")
    });
  });
});
