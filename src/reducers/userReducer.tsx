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
    LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGIN_ADMIN_FAIL,
    REGISTER_RESTAURANT_REQUEST,
    REGISTER_RESTAURANT_SUCCESS,
    REGISTER_RESTAURANT_FAIL,
    REGISTER_DELIVERY_PERSON_REQUEST,
    REGISTER_DELIVERY_PERSON_SUCCESS,
    REGISTER_DELIVERY_PERSON_FAIL,
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS,
     ADD_TO_CART_FAIL,
     FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAIL

   


} from '../constants/userConstants';


interface AuthState {
    user: any; 
    restaurants: Array<any>;
    loading: boolean;
    isAuthenticatedUser: boolean;
    token?: string | null;
    error?: any;
    cart: Array<any>;
}


interface RegisterUserRequestAction {
    type: typeof REGISTER_USER_REQUEST;
}
interface RegistergoogleRequestAction {
    type: typeof REGISTER_GOOGLE_REQUEST;
}

interface RegistergoogleSuccessAction {
    type: typeof REGISTER_GOOGLE_SUCCESS;
    payload: any; 
}

interface RegistergoogleFailAction {
    type: typeof REGISTER_GOOGLE_FAIL;
    payload: any; 
}

interface RegisterUserSuccessAction {
    type: typeof REGISTER_USER_SUCCESS;
    payload: any; 
}

interface RegisterUserFailAction {
    type: typeof REGISTER_USER_FAIL;
    payload: any; 
}

interface OtpUserRequestAction {
    type: typeof OTP_USER_REQUEST;
}

interface OtpUserSuccessAction {
    type: typeof OTP_USER_SUCCESS;
    payload: any; 
}

interface OtpUserFailAction {
    type: typeof OTP_USER_FAIL;
    payload: any; 
}

interface LoginUserRequestAction {
    type: typeof LOGIN_USER_REQUEST;
}

interface LoginUserSuccessAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: any; 
}

interface LoginUserFailAction {
    type: typeof LOGIN_USER_FAIL;
    payload: any; 
}

interface LoginAdminRequestAction {
    type: typeof LOGIN_ADMIN_REQUEST;
}

interface LoginAdminSuccessAction {
    type: typeof LOGIN_ADMIN_SUCCESS;
    payload: any; 
}

interface LoginAdminFailAction {
    type: typeof LOGIN_ADMIN_FAIL;
    payload: any; 
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
interface RegisterDeliverypersonRequestAction {
    type: typeof REGISTER_DELIVERY_PERSON_REQUEST;
}

interface RegisterDeliverypersonSuccessAction {
    type: typeof REGISTER_DELIVERY_PERSON_SUCCESS;
    payload: any; 
}

interface RegisterDeliverypersonFailAction {
    type: typeof REGISTER_DELIVERY_PERSON_FAIL;
    payload: any; 
}

interface addcartRequestAction {
    type: typeof ADD_TO_CART_REQUEST, 
   
}

interface addcartSuccessAction {
    type: typeof  ADD_TO_CART_SUCCESS,
    
    payload: any; 
}

interface addcartFailAction {
    type: typeof  ADD_TO_CART_FAIL,
    payload: any; 
}
interface fetchcartRequestAction {
    type: typeof FETCH_CART_REQUEST, 
   
}

    
    

interface fetchcartSuccessAction {
    type: typeof  FETCH_CART_SUCCESS,
    
    payload: any; 
}

interface fetchcartFailAction {
    type: typeof  FETCH_CART_FAIL,
    payload: any; 
}
  

type AuthActionTypes =
    | RegisterUserRequestAction
    | RegisterUserSuccessAction
    | RegisterUserFailAction
    | OtpUserRequestAction
    | OtpUserSuccessAction
    | OtpUserFailAction
    |RegistergoogleRequestAction
    |RegistergoogleSuccessAction
    |RegistergoogleFailAction
    |LoginUserRequestAction
    |LoginUserSuccessAction
    |LoginUserFailAction
    |LoginAdminRequestAction
    |LoginAdminSuccessAction
    |LoginAdminFailAction
    |RegisterrestaurantRequestAction
    |RegisterrestaurantSuccessAction
    |RegisterrestaurantFailAction
    |RegisterDeliverypersonRequestAction
    |RegisterDeliverypersonSuccessAction
    |RegisterDeliverypersonFailAction
    |addcartRequestAction
    |addcartSuccessAction
    |addcartFailAction
    |fetchcartSuccessAction
    |fetchcartRequestAction
    |fetchcartFailAction
   
   


export const initialState: AuthState = {
    user: {}, 
    restaurants: [],
    loading: false,
    isAuthenticatedUser: false,
    token: localStorage.getItem('token') || null,
    cart:[]
};

export const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticatedUser: false,
            };
        case REGISTER_USER_SUCCESS:
            
            return {
                ...state,
                loading: false,
                isAuthenticatedUser: true,
                user: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticatedUser: false,
                user: null,
                error: action.payload,
            };
        case OTP_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticatedUser: false,
            };
        case OTP_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticatedUser: true,
                user: action.payload,
            };
        case OTP_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticatedUser: false,
                user: null,
                error: action.payload,
            };
        case REGISTER_GOOGLE_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticatedUser:false,
            }
        case REGISTER_GOOGLE_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticatedUser:true,
                user:action.payload
            }
        case REGISTER_GOOGLE_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticatedUser:false,
                user:null,
                error:action.payload
            };
            case LOGIN_USER_REQUEST:
                return {
                    ...state,
                    loading: true,
                    isAuthenticatedUser: false,
                };
            // case LOGIN_USER_SUCCESS:
            //     // localStorage.setItem('token', action.payload.token);
            //     localStorage.setItem('user',action.payload.user)
            //     console.log(action.payload.user,"uuu")
            //     return {
            //         ...state,
            //         loading: false,
            //         isAuthenticatedUser: true,
            //         // user: action.payload,
            //         user: action.payload.user,
            //     token: action.payload.token,
            //     };
            case LOGIN_USER_SUCCESS:
                console.log(action.payload.user.isBlocked,"blockk status")
    if (action.payload.user.isBlocked) {
        return {
            ...state,
            loading: false,
            isAuthenticatedUser: false, 
            user: null, 
            token: null, 
            error: "User is blocked", 
        };
    } else {
        console.log(action.payload.user._id,"uuu test")
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('users', action.payload.user.id); 
        localStorage.setItem('userdetails', JSON.stringify(action.payload.user)); 
        return {
            ...state,
            loading: false,
            isAuthenticatedUser: true, 
            user: action.payload.user,
            token: action.payload.token,
        };
    }
            case LOGIN_USER_FAIL:
                localStorage.removeItem('token'); 
                return {
                    ...state,
                    loading: false,
                    isAuthenticatedUser: false,
                    user: null,
                    token: null,
                    error: action.payload,
                };   
                case LOGIN_USER_REQUEST:
                    return {
                        ...state,
                        loading: true,
                        isAuthenticatedUser: false,
                    };
                case LOGIN_USER_SUCCESS:
                    localStorage.setItem('token', action.payload.token);
                    return {
                        ...state,
                        loading: false,
                        isAuthenticatedUser: true,
                        // user: action.payload,
                        user: action.payload.user,
                    token: action.payload.token,
                    };
                case LOGIN_USER_FAIL:
                    localStorage.removeItem('token'); 
                    return {
                        ...state,
                        loading: false,
                        isAuthenticatedUser: false,
                        user: null,
                        token: null,
                        error: action.payload,
                    }; 
                    case REGISTER_RESTAURANT_REQUEST:
                        return {
                            ...state,
                            loading: true,
                            isAuthenticatedUser: false,
                        };
                    case REGISTER_RESTAURANT_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            isAuthenticatedUser: true,
                            user: action.payload,
                        };
                    case REGISTER_RESTAURANT_FAIL:
                        return {
                            ...state,
                            loading: false,
                            isAuthenticatedUser: false,
                            user: null,
                            error: action.payload,
                        };     
                        case REGISTER_DELIVERY_PERSON_REQUEST:
                            return {
                                ...state,
                                loading: true,
                                isAuthenticatedUser: false,
                            };
                        case REGISTER_DELIVERY_PERSON_SUCCESS:
                            return {
                                ...state,
                                loading: false,
                                isAuthenticatedUser: true,
                                user: action.payload,
                            };
                        case REGISTER_DELIVERY_PERSON_FAIL:
                            return {
                                ...state,
                                loading: false,
                                isAuthenticatedUser: false,
                                user: null,
                                error: action.payload,
                            };            

                        case ADD_TO_CART_REQUEST:
                            return {
                                ...state,
                                loading: true,
                                isAuthenticatedUser: false,
                            }
                        case ADD_TO_CART_SUCCESS:
                            return{
                                ...state,
                                loading: false,
                                isAuthenticatedUser: true,
                                // user: action.payload,
                                cart: action.payload,
                            } ;   
                        case ADD_TO_CART_FAIL:
                            return{
                                ...state,
                            loading: false,
                            isAuthenticatedUser: false,
                        
                            error: action.payload,
                            }    
                        case FETCH_CART_REQUEST:
                            return{
                                ...state,
                                loading: true,
                                isAuthenticatedUser: false,
                            }    
                        case FETCH_CART_SUCCESS:
                            return {
                                ...state,
                                loading: false,
                                isAuthenticatedUser: true,
                                // user: action.payload,
                                cart: action.payload,
                            }
                        case FETCH_CART_FAIL:
                            return {
                                ...state,
                                loading: false,
                                isAuthenticatedUser: false,

                            }    
                        
        default:
            return state;
    }
};