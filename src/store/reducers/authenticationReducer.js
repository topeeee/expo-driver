import {
  LOGIN,
  AUTH_ERROR,
  REMOVE_AUTH_ERROR,
  DRIVER_EMAIL,
} from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  loginResponse: null,
  driverEmail: null,
  loading: false,
  errors: null,
};

function authenticationReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        loginResponse: payload,
        isAuthenticated: true,
        loading: false,
      };
    }

    case DRIVER_EMAIL: {
      return {
        ...state,
        driverEmail: payload,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        errors: payload,
      };
    }

    case REMOVE_AUTH_ERROR: {
      return {
        ...state,
        errors: null,
      };
    }
    default:
      return state;
  }
}

export default authenticationReducer;
