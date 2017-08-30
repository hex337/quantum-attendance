import requestsManager from './requestsManager';
import * as actionTypes from '../constants/classesConstants';

import { normalize } from 'normalizr';
import { clsSchema } from '../store/schema';

const url = '/meetings.json'

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
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities(url)
        .then((res) => {
          const dataToNormalize = { "classes": res.data };
          const normalizedData = normalize(dataToNormalize, clsSchema);
          dispatch(fetchClassesSuccess(normalizedData.entities));
        })
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
