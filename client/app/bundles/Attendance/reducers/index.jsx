import { combineReducers } from 'redux';
import classesReducer, { $$initialState as $$classesState } from './classesReducer';
import studentsReducer, { $$studentsInitialState as $$studentsState } from './studentsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  classes: classesReducer,
  students: studentsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$classesState,
  $$studentsState,
  railsContextState,
};
