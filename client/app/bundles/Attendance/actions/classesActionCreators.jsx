import requestsManager from './requestsManager';
import * as actionTypes from '../constants/classesConstants';

const url = 'meetings.json'

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

export function fetchClassesSuccess(data) {
  return {
    type: actionTypes.FETCH_CLASSES_SUCCESS,
    classes: data,
  };
}

export function fetchClassesFailure(error) {
  return {
    type: actionTypes.FETCH_CLASSES_FAILURE,
    error,
  };
}

export function submitClassSuccess(cls) {
  return {
    type: actionTypes.SUBMIT_CLASS_SUCCESS,
    cls,
  };
}

export function submitClassFailure(error) {
  return {
    type: actionTypes.FETCH_CLASS_FAILURE,
    error,
  };
}

export function fetchClasses() {
  console.log("in fetchClasses()");
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities(url)
        .then(res => dispatch(fetchClassesSuccess(res.data)))
        .catch(error => dispatch(fetchClassesFailure(error)))
    );
  };
}

export function submitClass(cls) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity(url, { cls })
        .then(res => dispatch(submitClassSuccess(res.data)))
        .catch(error => dispatch(submitClassFailure(error)))
    );
  }
}
