import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk}  from 'redux-thunk';

import { authReducer } from './reducers/userReducer';
import {adminReducer} from './reducers/adminreducer'
import {restaurantReducer} from './reducers/restaurantreducer'

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  admin:adminReducer,
  restaurant:restaurantReducer,
 
});

// Enhancer setup for Redux DevTools
const composeEnhancers =
  (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

// Create store with thunk middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Define AppDispatch type, which includes ThunkDispatch
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;