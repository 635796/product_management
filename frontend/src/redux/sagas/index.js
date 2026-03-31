import { all } from "redux-saga/effects";

import productSaga from "./productSaga";
import authSaga from "./authSaga";

/**
 * Root Saga
 * Combines all feature sagas
 */
export default function* rootSaga() {
  yield all([
    productSaga(),
    authSaga(),
  ]);
}