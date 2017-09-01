import requestsManager from './requestsManager';
import * as actionTypes from '../constants/studentsConstants';

import { normalize } from 'normalizr';
import { studentSchema } from '../store/schema';

const url = '/members.json'

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function fetchStudentsSuccess(res) {
  const dataToNormalize = { "students": res.data };
  const normalizedData = normalize(dataToNormalize, studentSchema);

  return {
    type: actionTypes.FETCH_STUDENTS_SUCCESS,
    students: normalizedData.entities,
  };
}

export function fetchStudentsFailure(error) {
  return {
    type: actionTypes.FETCH_STUDENTS_FAILURE,
    error,
  };
}

export function submitStudentSuccess(student) {
  return {
    type: actionTypes.SUBMIT_STUDENT_SUCCESS,
    student,
  };
}

export function submitStudentFailure(error) {
  return {
    type: actionTypes.FETCH_STUDENT_FAILURE,
    error,
  };
}

export function fetchStudents() {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities(url)
        .then(res => {
          dispatch(fetchStudentsSuccess(res));
        })
        .catch(error => dispatch(fetchStudentsFailure(error)))
    );
  };
}

export function submitStudent(student) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity(url, { student })
        .then(res => dispatch(submitStudentSuccess(res.data)))
        .catch(error => dispatch(submitStudentFailure(error)))
    );
  }
}
