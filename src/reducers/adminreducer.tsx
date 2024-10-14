import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL,
    FETCH_DELIVERY_PERSONS_REQUEST,
    FETCH_DELIVERY_PERSONS_SUCCESS,
    FETCH_DELIVERY_PERSONS_FAIL,
    REGISTER_RESTAURANT_REQUEST,
    REGISTER_RESTAURANT_SUCCESS,
    REGISTER_RESTAURANT_FAIL,
    BLOCK_UNBLOCK_RESTAURANT_REQUEST,
    BLOCK_UNBLOCK_RESTAURANT_SUCCESS,
    BLOCK_UNBLOCK_RESTAURANT_FAIL
} from '../constants/adminContstants';
import { 
    ADD_CATEGORY_REQUEST, 
    ADD_CATEGORY_SUCCESS, 
    ADD_CATEGORY_FAIL 
} from "../constants/categoryConstants";

import { AnyAction } from 'redux';

interface AdminState {
    loading: boolean;
    users: Array<any>;
    restaurant: Array<any>;
    deliveryPersons: Array<any>;
    error: string | null;
    token?: string | null;
    isAuthenticated:boolean,
    category:Array<any>
}

interface RegisterrestaurantRequestAction {
    type: typeof REGISTER_RESTAURANT_REQUEST;
}
interface RegisterrestaurantSuccessAction {
    type: typeof REGISTER_RESTAURANT_SUCCESS;
    payload: any; 
}
interface RegisterrestaurantFailAction {
    type: typeof REGISTER_RESTAURANT_FAIL;
    payload: any; 
}
interface FetchUserRequestAction {
    type: typeof FETCH_USERS_REQUEST;
}  
interface FetchUserSuccessAction {
    type: typeof FETCH_USERS_SUCCESS;
    payload:any;    
}
interface FetchUserFailAction {
    type: typeof FETCH_USERS_FAIL;
    payload:any;    
}
interface FetchDeliveryPersonRequestAction {
    type: typeof FETCH_DELIVERY_PERSONS_REQUEST;      
}
interface FetchDeliveryPersonSucessAction {
    type: typeof FETCH_DELIVERY_PERSONS_SUCCESS;
    payload:any;    
}
interface FetchDeliveryPersonFailAction {
    type: typeof FETCH_DELIVERY_PERSONS_FAIL;
    payload:any;    
}
interface FetchRestaurantRequestAction {
    type: typeof FETCH_RESTAURANTS_REQUEST;      
}
interface FetchRestrauntSucessAction {
    type: typeof FETCH_RESTAURANTS_SUCCESS;
    payload:any;    
}
interface FetchRestaurantFailAction {
    type: typeof FETCH_RESTAURANTS_FAIL;
    payload:any;    
}

type AuthActionTypes =
|RegisterrestaurantRequestAction
    |RegisterrestaurantSuccessAction
    |RegisterrestaurantFailAction
    |FetchUserRequestAction
    |FetchUserSuccessAction
    |FetchUserFailAction
    |FetchDeliveryPersonRequestAction
    |FetchDeliveryPersonSucessAction
    |FetchDeliveryPersonFailAction
    |FetchRestaurantRequestAction
    |FetchRestrauntSucessAction
    |FetchRestaurantFailAction
    
    


export const initialState: AdminState = {
    loading: false,
    users: [],
    restaurant: [],
    deliveryPersons: [],
    error: null,
    isAuthenticated: false,
    category:[]
};

export const adminReducer = (state = initialState,  action: AuthActionTypes): AdminState => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case FETCH_RESTAURANTS_REQUEST:
        case FETCH_DELIVERY_PERSONS_REQUEST:
            return { ...state, loading: true };

            


        case REGISTER_RESTAURANT_REQUEST:
                return {
                    ...state,
                    loading: true,
                    isAuthenticated: false,
                };
         case REGISTER_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                restaurant: action.payload,
            };
            case REGISTER_RESTAURANT_FAIL:
                        return {
                            ...state,
                            loading: false,
                            isAuthenticated: false,
                            error: action.payload,
                        };     

        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };

        case FETCH_RESTAURANTS_SUCCESS:
            return { ...state, loading: false, restaurant: action.payload };

        case FETCH_DELIVERY_PERSONS_SUCCESS:
            return { ...state, loading: false, deliveryPersons: action.payload };

        case FETCH_USERS_FAIL:
        case FETCH_RESTAURANTS_FAIL:
        case FETCH_DELIVERY_PERSONS_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
