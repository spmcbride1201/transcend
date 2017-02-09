import { createStore, applyMiddleware, combineReducers } from 'redux';

// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/user-reducer';
import authReducer from './reducers/auth';
import vrModeReducer from './reducers/vrmode-reducer';
import isLoadedReducer from './reducers/is-loaded-reducer';
import webrtcReducer from './reducers/webrtc-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  vrMode: vrModeReducer,
  isLoaded: isLoadedReducer,
  webrtc: webrtcReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  //  createLogger({ collapsed: true })
  )
);
