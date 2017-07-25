import classesReducer, { $$initialState as $$classesState } from './classesReducer';
//import studentsReducer, { $$initialState as $$studentsState } from './studentsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$attendanceStore: classesReducer,
  //$$studentsStore: studentsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$classesState,
  railsContextState,
};
