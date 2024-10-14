import {
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS,
     ADD_TO_CART_FAIL,
} from '../constants/userConstants'
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import api from '../api/Api';
export const addToCart = (foodItemId: string,userId?:string) => async (dispatch: Dispatch) => {
   debugger
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
  
      const response = await api.post('http://localhost:5000/api/users/addtocart', {
        foodItemId,
        userId,
        quantity:1
        
      });
      console.log(response.data,"addcart")
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        // payload: error.message,
      });
    }
  };
  export const removeCartItemApi = async (userId: string, itemId: string) => {
   
    try {
      console.log(userId,'userrrr');
      console.log(itemId,'itemmmid')
      const response = await api.delete('http://localhost:5000/api/users/removeItem', {
        params: { userId, itemId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const clearCartApi = async (userId: string) => {
    try {
      const response = await api.delete('http://localhost:5000/api/users/clearCart', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };