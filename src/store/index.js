import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'

/* Reducer */
import rootReducer from "./reducers";

const logger = createLogger({
    // ...options
  });

const initialState = {};

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export default store;