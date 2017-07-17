import { combineReducers } from 'redux';
import { HELLO_WORLD_NAME_UPDATE } from '../constants/attendanceConstants';

const name = (state = '', action) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const attendanceReducer = combineReducers({ name });

export default attendanceReducer;
