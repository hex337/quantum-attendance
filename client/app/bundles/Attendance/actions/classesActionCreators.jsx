import requestsManager from './requestsManager';
import * as actionTypes from '../constants/classesConstants';

import { normalize } from 'normalizr';
import { clsSchema } from '../store/schema';

const url = '/meetings.json'

export function fetchClassesSuccess(res) {
  const dataToNormalize = { "classes": res.data };
  const normalizedData = normalize(dataToNormalize, clsSchema);

  return {
    type: actionTypes.FETCH_CLASSES_SUCCESS,
    entities: normalizedData.entities,
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
    return (
      requestsManager
        .fetchEntities(url)
        .then((res) => {
          dispatch(fetchClassesSuccess(res));
        })
        .catch(error => dispatch(fetchClassesFailure(error)))
    );
  };
}

export function submitClass(cls) {
  return (dispatch) => {
    return (
      requestsManager
        .submitEntity(url, { cls })
        .then(res => dispatch(submitClassSuccess(res.data)))
        .catch(error => dispatch(submitClassFailure(error)))
    );
  }
}
