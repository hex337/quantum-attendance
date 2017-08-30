import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import reducers, { initialStates } from '../reducers';

import * as schema from './schema';

export default (props, railsContext) => {
  const initialClasses = props.classes;
  const initialStudents = props.students;
  const { $$classesState, $$studentsState } = initialStates;
  const initialState = {
    classes: $$classesState,
    students: $$studentsState,
    railsContext,
  };

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware.withExtraArgument({ schema }))
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
