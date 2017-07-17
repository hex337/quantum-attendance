import { createStore } from 'redux';
import attendanceReducer from '../reducers/attendanceReducer';

const configureStore = (railsProps) => (
  createStore(attendanceReducer, railsProps)
);

export default configureStore;
