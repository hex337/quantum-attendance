import Immutable from 'immutable';

import * as classesActionTypes from '../constants/classesConstants';
import * as studentsActionTypes from '../constants/studentsConstants';

export const $$initialState = Immutable.fromJS({
  $$attendance: {
    belts: {},
    classes: {},
    students: {},
  },
});

export default function attendanceReducer($$state = $$initialState, action = null) {
  const { type, entity, entities, error } = action;

  switch(type) {
    case classesActionTypes.FETCH_CLASSES_SUCCESS: {
      return $$state.merge({
        $$attendance: {
          classes: entities.classes
        },
      });
    }

    case classesActionTypes.FETCH_CLASSES_FAILURE: {
      return $$state.merge({
      });
    }

    // TODO: figure out how to get this to work
    case classesActionTypes.CLASS_MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$attendance'],
            $$classes => ($$classes.findIndex(clss => clss.get('id') === entity.get('id')) === -1 ? $$classes.unshift(Immutable.fromJS(clss)) : $$classes),
          )
      ));
    }

    // TODO: figure out how to get this to work
    case classesActionTypes.SUBMIT_CLASS_SUCCESS: {
      return $$state.withMutations(state => (
        state.updateIn(
          ['$$attendance'],
          classes => classes.unshift(Immutable.fromJS(entity)),
        ).merge({
        })
      ));
    }

    case classesActionTypes.SUBMIT_CLASS_FAILURE: {
      console.error("Error submitting class: " + error);
      return $$state.merge({
      });
    }

    case studentsActionTypes.FETCH_STUDENTS_SUCCESS: {
      return $$state.mergeDeep({
        $$attendance: {
          students: entities.students,
          belts: entities.belts,
        }
      });
    }

    case studentsActionTypes.FETCH_STUDENTS_FAILURE: {
      console.error("Error fetching students: " + error);
      return $$state.merge({
      });
    }

    // TODO: figure out how to get this to work
    case studentsActionTypes.STUDENT_MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$students'],
            $$students => ($$students.findIndex(students => students.get('id') === comment.get('id')) === -1 ? $$comments.unshift(Immutable.fromJS(student)) : $$students),
          )
      ));
    }

    // TODO: figure out how to get this to work
    case studentsActionTypes.SUBMIT_STUDENT_SUCCESS: {
      return $$state.withMutations(state => (
        state.updateIn(
          ['$$students'],
          $$students => $$students.unshift(Immutable.fromJS(student)),
        ).merge({
        })
      ));
    }

    case studentsActionTypes.SUBMIT_STUDENT_FAILURE: {
      console.error("Submit student error: " + error);
      return $$state.merge({
      });
    }

    default: {
      return $$state;
    }
  }
};
