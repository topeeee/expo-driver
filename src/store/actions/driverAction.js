import axios from 'axios';
import api from '../../environments/environment';
import {
    GET_DRIVER,
    DRIVER_ERROR,
} from '../actionTypes';

export const getDrivers = () => async (dispatch) => {
  console.log('getdrivers')
  try {
    const res = await axios.get(`${api.driver}/api/drivers/`);
    console.log(res.data, 'driver data')
    dispatch({
      type: GET_DRIVER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DRIVER_ERROR,
      payload: 'Opps! Something Went Wrong Try Again',
    });
  }
};
