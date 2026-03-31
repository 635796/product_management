import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

/**
 * Create saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Enable Redux DevTools if available (for development)
 */
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create Redux store
 */
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

/**
 * Run root saga
 */
sagaMiddleware.run(rootSaga);

export default store;
