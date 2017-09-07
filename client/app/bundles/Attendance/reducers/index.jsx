import { combineReducers } from 'redux';
import attendanceReducer, { $$initialState as $$attendanceState } from './attendanceReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$attendance: attendanceReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$attendanceState,
  railsContextState,
};
