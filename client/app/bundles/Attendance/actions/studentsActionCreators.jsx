import requestsManager from './requestsManager';
import * as actionTypes from '../constants/studentsConstants';

import { normalize } from 'normalizr';
import { studentSchema } from '../store/schema';

const url = '/members.json'

export function fetchStudentsSuccess(res) {
  const dataToNormalize = { "students": res.data };
  const normalizedData = normalize(dataToNormalize, studentSchema);

  return {
    type: actionTypes.FETCH_STUDENTS_SUCCESS,
    entities: normalizedData.entities,
  };
}

export function fetchStudentSuccess(res) {
  const dataToNormalize = { "students": [res.data] };
  const normalizedData = normalize(dataToNormalize, studentSchema);

  return {
    type: actionTypes.FETCH_STUDENT_SUCCESS,
    entities: normalizedData.entities,
  };
}

export function fetchStudentsFailure(error) {
  return {
    type: actionTypes.FETCH_STUDENTS_FAILURE,
    error,
  };
}

export function fetchStudentFailure(error) {
  return {
    type: actionTypes.FETCH_STUDENT_FAILURE,
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

export function fetchStudent(id) {
  const studentUrl = "/members/" + id.toString() + ".json";

  return (dispatch) => {
    return (
      requestsManager
        .fetchEntities(studentUrl)
        .then(res => {
          dispatch(fetchStudentSuccess(res));
        })
        .catch(error => dispatch(fetchStudentFailure(error)))
    );
  }
}

export function submitStudent(student) {
  return (dispatch) => {
    return (
      requestsManager
        .submitEntity(url, { student })
        .then(res => dispatch(submitStudentSuccess(res.data)))
        .catch(error => dispatch(submitStudentFailure(error)))
    );
  }
}
