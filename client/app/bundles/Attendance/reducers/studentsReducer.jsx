import Immutable from 'immutable';

import * as actionTypes from '../constants/studentsConstants';

export const $$studentsInitialState = Immutable.fromJS({
  $$students: {
    students: {},
    belts: {},
  },
  fetchStudentError: null,
  submitStudentError: null,
  isFetchingStudent: false,
  isSavingStudent: false
});

export default function studentsReducer($$state = $$studentsInitialState, action = null) {
  const { type, student, students, error } = action;

  switch(type) {
    case actionTypes.FETCH_STUDENTS_SUCCESS: {
      return $$state.mergeDeep({
        $$students: students,
        fetchStudentError: null,
        isFetchingStudent: false
      });
    }

    case actionTypes.FETCH_STUDENTS_FAILURE: {
      return $$state.merge({
        fetchStudentError: error,
        isFetchingStudent: false
      });
    }

    case actionTypes.MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$students'],
            $$students => ($$students.findIndex(students => students.get('id') === comment.get('id')) === -1 ? $$comments.unshift(Immutable.fromJS(student)) : $$students),
          )
      ));
    }

    case actionTypes.SUBMIT_STUDENT_SUCCESS: {
      return $$state.withMutations(state => (
        state.updateIn(
          ['$$students'],
          $$students => $$students.unshift(Immutable.fromJS(student)),
        ).merge({
          submitClassError: null,
          isSavingStudent: false,
        })
      ));
    }

    case actionTypes.SUBMIT_STUDENT_FAILURE: {
      return $$state.merge({
        submitClassError: error,
        isSavingStudent: false
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetchingStudent: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSavingStudent: true,
      });
    }

    default: {
      return $$state;
    }
  }
};
