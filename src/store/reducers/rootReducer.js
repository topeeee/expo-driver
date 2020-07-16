import {combineReducers} from 'redux';
import authenticationReducer from './authenticationReducer';
import driverReducer from './driverReducer';

export default combineReducers({
  auth: authenticationReducer,
  driver: driverReducer,
});
