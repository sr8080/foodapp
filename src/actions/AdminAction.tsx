import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import api from '../api/Api';



import {
  LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAIL,
  FETCH_DELIVERY_PERSONS_REQUEST,
  FETCH_DELIVERY_PERSONS_SUCCESS,
  FETCH_DELIVERY_PERSONS_FAIL,
  BLOCK_UNBLOCK_USER_REQUEST,
  BLOCK_UNBLOCK_USER_SUCCESS,
  BLOCK_UNBLOCK_USER_FAIL,
  BLOCK_UNBLOCK_RESTAURANT_REQUEST,
  BLOCK_UNBLOCK_RESTAURANT_SUCCESS,
  BLOCK_UNBLOCK_RESTAURANT_FAIL,
  BLOCK_UNBLOCK_DELIVERYBOY_REQUEST,
  BLOCK_UNBLOCK_DELIVERYBOY_SUCCESS,
  BLOCK_UNBLOCK_DELIVERYBOY_FAIL
} from '../constants/adminContstants'
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';

export const adminlogin = (userData: { email: string; password: string }) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ type:  LOGIN_ADMIN_REQUEST });
  
      const { data } = await api.post("http://localhost:5000/api/admin/adminlogin", userData);
     
      console.log(data.token,"show")
      localStorage.setItem('admintoken', data.token);
      dispatch({
        type: LOGIN_ADMIN_SUCCESS,
        payload: {
            user: data.user,
            token: data.token
        },
      });
  
      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type:  LOGIN_ADMIN_FAIL,
          payload: error.response?.data.message || 'An error occurred',
        });
      } else {
        dispatch({
          type:  LOGIN_ADMIN_FAIL,
          payload: 'An unknown error occurred',
        });
      }
    }
  };

  export const fetchUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    console.log("1");
    try {
        dispatch({ type: FETCH_USERS_REQUEST });
        console.log("2");
        const { data } = await api.get('http://localhost:5000/api/admin/users');
        console.log("3");
        console.log(data, "dataaaaa");
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_USERS_FAIL,
            payload: 'An error occurred',
        });
    }
};

export const blockUnblockUser = (userId: string, newStatus: boolean) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({ type: BLOCK_UNBLOCK_USER_REQUEST });
    console.log("f1001")

    const { data } = await api.put(`http://localhost:5000/api/admin/users/${userId}/block`, { isBlocked: newStatus });
    console.log(data,"f1002")
    dispatch({
      type: BLOCK_UNBLOCK_USER_SUCCESS,
      payload: data,
    });

    // Optionally, fetch the updated list of users after blocking/unblocking
    // dispatch(fetchUsers())
  } catch (error) {
    dispatch({
      type: BLOCK_UNBLOCK_USER_FAIL,
      payload: 'An error occurred while updating the user status',
    });
  }
};

// Fetch Restaurants
export const fetchRestaurants = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
     
        dispatch({ type: FETCH_RESTAURANTS_REQUEST });
        const { data } = await api.get('http://localhost:5000/api/admin/restaurants');
        console.log(data,'acccttiiiooonnnnndddaaattttaaaa')
        dispatch({ type: FETCH_RESTAURANTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_RESTAURANTS_FAIL,
            payload:  'An error occurred',
        });
    }
};

export const blockUnblockRestaurant = (restaurantId: string, newStatus: boolean) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({ type: BLOCK_UNBLOCK_RESTAURANT_REQUEST });
    console.log("f1001")

    const { data } = await api.put(`http://localhost:5000/api/admin/restaurant/${restaurantId}/block`, { isBlocked: newStatus });
    console.log(data,"f1002")
    dispatch({
      type: BLOCK_UNBLOCK_RESTAURANT_SUCCESS,
      payload: data,
    });

    // Optionally, fetch the updated list of users after blocking/unblocking
    // dispatch(fetchUsers())
  } catch (error) {
    dispatch({
      type: BLOCK_UNBLOCK_RESTAURANT_FAIL,
      payload: 'An error occurred while updating the user status',
    });
  }
};



// Fetch Delivery Persons
export const fetchDeliveryPersons = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({ type: FETCH_DELIVERY_PERSONS_REQUEST });
        const { data } = await api.get('http://localhost:5000/api/admin/deliverypersons');
        dispatch({ type: FETCH_DELIVERY_PERSONS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_DELIVERY_PERSONS_FAIL,
            payload:  'An error occurred',
        });
    }
};


export const blockUnblockDeliveryboy = (deliveryboyId: string, newStatus: boolean) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({ type: BLOCK_UNBLOCK_DELIVERYBOY_REQUEST });
    console.log("f1001")

    const { data } = await api.put(`http://localhost:5000/api/admin/deliveryboy/${deliveryboyId}/block`, { isBlocked: newStatus });
    console.log(data,"f1002")
    dispatch({
      type: BLOCK_UNBLOCK_DELIVERYBOY_SUCCESS,
      payload: data,
    });

    // Optionally, fetch the updated list of users after blocking/unblocking
    // dispatch(fetchUsers())
  } catch (error) {
    dispatch({
      type: BLOCK_UNBLOCK_DELIVERYBOY_FAIL,
      payload: 'An error occurred while updating the user status',
    });
  }
};