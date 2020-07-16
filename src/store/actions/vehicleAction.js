import axios from 'axios';
import api from '../../environments/environment';
import {
    GET_VEHICLE,
  VEHICLE_ERROR,
} from '../actionTypes';

export const getVehicles = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api.vehicle}/api/vehicles/`);
    dispatch({
      type: GET_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: 'Opps! Something Went Wrong Try Again',
    });
  }
};
