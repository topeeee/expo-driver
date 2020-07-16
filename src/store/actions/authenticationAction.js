import {
  LOGIN,
  AUTH_ERROR,
  REMOVE_AUTH_ERROR,
  DRIVER_EMAIL,
} from '../actionTypes';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import api from '../../environments/environment';

export const LogIn = (username, password) => async (dispatch) => {
  const body = {username, password};
  dispatch(getDriverEmail(username));
  try {
    const res = await axios.post(`${api.login}/api/login/`, body);
    const token = res.data.Authorized;
    // dispatch(storeToken(token));
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    if (res) {
      dispatch(storeToken(token));
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response,
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_AUTH_ERROR,
        }),
      5000,
    );
  }
};

export const getDriverEmail = (username) => async (dispatch) => {
  try {
    dispatch({
      type: DRIVER_EMAIL,
      payload: username,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response,
    });
  }
};

// function getDriverEmail(email){
//   return {
//     type: DRIVER_EMAIL,
//     payload: email,
//   };
// }

async function storeToken(user) {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

export async function getToken() {
  try {
    let userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);
    console.log(data, 'fffffffffffffffffffffffffffff');
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
