import axios, { AxiosError } from 'axios';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    OTP_USER_REQUEST,
    OTP_USER_SUCCESS,
    OTP_USER_FAIL,
    REGISTER_GOOGLE_REQUEST,
    REGISTER_GOOGLE_SUCCESS,
    REGISTER_GOOGLE_FAIL,
    LOGIN_USER_REQUEST ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS,
     ADD_TO_CART_FAIL,
     FETCH_CART_REQUEST,
     FETCH_CART_SUCCESS,
     FETCH_CART_FAIL

} from '../constants/userConstants';

import{FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL,}from '../constants/adminContstants'
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import api from '../api/Api';


interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;
    avatar?: string;
}

export const register = (userData: FormData) => async (dispatch: Dispatch<AnyAction>) => {
  debugger
    try {
        
       
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };
        console.log(userData,"byyeee")
        const entriesArray = Array.from(userData.entries());
        console.log("FormData entries:");
        entriesArray.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });

        const { data } = await api.post("http://localhost:5000/api/users/signup", userData);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

        return data.user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response?.data.message || 'An error occurred',
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: 'An unknown error occurred',
            });
        }
    }
};


interface decodedToken {  
    id: string;  
    email: string;  
    name: string;  
    avatar?: string;  
    
  }

  interface userData {
    email: string;
    password: string;
    
}
export const login = (userData: { email: string; password: string }) => async (dispatch: Dispatch<AnyAction>) => {
 debugger
    try {
      dispatch({ type:  LOGIN_USER_REQUEST });
  
      const { data } = await api.post("http://localhost:5000/api/users/login", userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data.token,"show")
      console.log(data.user.id,"datauserer backend boyy")
      localStorage.setItem('tokens', data.token);
      console.log(data,"data")
      localStorage.setItem('user', data.user.id);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
            user: data.user,
            token: data.token,
        },
      });
  
      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type:  LOGIN_USER_FAIL,
          payload: error.response?.data.message || 'An error occurred',
        });
      } else {
        dispatch({
          type:  LOGIN_USER_FAIL,
          payload: 'An unknown error occurred',
        });
      }
    }
  };
  

export const googleregister=(userData: decodedToken )=>async(dispatch:Dispatch<AnyAction>)=>{
    try {
        dispatch({type:REGISTER_GOOGLE_REQUEST})
        const {data}=await api.post("http://localhost:5000/api/users/googlesignup", userData)
        dispatch({
            type:REGISTER_GOOGLE_SUCCESS,
            payload:data.user
        })
        return data.user
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: REGISTER_GOOGLE_FAIL,
                payload: error.response?.data.message || 'An error occurred',
            });
        } else {
            dispatch({
                type: REGISTER_GOOGLE_FAIL,
                payload: 'An unknown error occurred',
            });
        }
    }
}


export const verifyOtp = (otp: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({ type: OTP_USER_REQUEST });
        console.log(otp,"ooooo")

        const { data } = await api.post('http://localhost:5000/api/users/verify-otp', { receivedOtp: otp },
            { headers: { 'Content-Type': 'application/json' }}
         );

        dispatch({
            type: OTP_USER_SUCCESS,
            payload: data,
        });

    } catch (error: any) {
        dispatch({
            type: OTP_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const fetchRestaurants = (keyword?: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ type: FETCH_RESTAURANTS_REQUEST });
  
      const response = await fetch(`http://localhost:5000/api/users?keyword=${keyword}`);
      const data = await response.json();
  
      dispatch({
        type:FETCH_RESTAURANTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type:FETCH_RESTAURANTS_FAIL,
        // payload: error.message,
      });
    }
  };



  export const addToCart = (foodItemId: string,userId:string, quantity: number = 1) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
  
      const response = await api.post('http://localhost:5000/api/users/addcart', {
        foodItemId,
        userId,
        quantity,
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

  export const fetchCartItems = (userId: string): ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch) => {
      
      try {
        dispatch({ type: FETCH_CART_REQUEST });
        console.log(userId,"userer")
  
        
        const { data } = await api.get(`http://localhost:5000/api/users/fetchcartitem`,{params:{userId}} );
        console.log(data,"fetch data")
        dispatch({ type: FETCH_CART_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: FETCH_CART_FAIL,
          payload: 'An error occurred while fetching cart items',
        });
      }
    };

    