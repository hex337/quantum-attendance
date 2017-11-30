import attendanceReducer from './attendanceReducer';
import * as studentActions from '../actions/studentsActionCreators';
import * as classActions from '../actions/classesActionCreators';

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

const fakeClasses = {
  data: [
    {
      id: 1,
      meeting_type: {
        id: 1,
        name: 'Advanced',
      },
      met: 'asdf',
      member_count: 1,
      comment: '',
      students: fakeStudents["data"],
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

  describe('FETCH_CLASSES', () => {
    let state;

    beforeEach(() => {
      state = attendanceReducer(
        undefined,
        classActions.fetchClassesSuccess(fakeClasses)
      );
    });

    it('should normalize the classes correctly', () => {
      expect(state.get('$$attendance').get('classes').size).toEqual(1)
      expect(state.get('$$attendance').get('meeting_types').size).toEqual(1)
      expect(state.get('$$attendance').get('students').size).toEqual(2)
      expect(state.get('$$attendance').get('belts').size).toEqual(1)

      expect(state.get('$$attendance').get('meeting_types').get('1').get('name')).toEqual('Advanced')
    });
  });
});
