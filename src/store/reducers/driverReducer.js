import {GET_DRIVER} from '../actionTypes';

const initialState = {
  drivers: null,
};

function driverReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DRIVER: {
      return {
        ...state,
        drivers: payload,
      };
    }

    default:
      return state;
  }
}

export default driverReducer;
