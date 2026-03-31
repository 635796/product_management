import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,

} from "../actions/productActions";

import {
  fetchProductsApi,
  addProductApi,
  deleteProductApi,
  updateProductApi,
} from "../../api/productsApi";


// ==============================
// Selector to get JWT from Redux
// ==============================
const getToken = (state) => state.auth.token;


// ==============================
// Worker Sagas
// ==============================

// 🔹 Fetch Products
function* fetchProductsSaga() {
  try {
    const token = yield select((state) => state.auth.token);

    const response = yield call(fetchProductsApi, token);

    // ✅ IMPORTANT FIX
    const products = Array.isArray(response)
      ? response
      : response.items || response.products || [];

    yield put({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products,
    });
  } catch (error) {
    yield put({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
}



// 🔹 Add Product
function* addProductSaga(action) {
  try {
    const token = yield select(getToken);

    const response = yield call(addProductApi, action.payload, token);

    yield put({
      type: ADD_PRODUCT_SUCCESS,
      payload: response.data,
    });

    // Optional: refresh product list
    yield put({ type: FETCH_PRODUCTS_REQUEST });
  } catch (error) {
    yield put({
      type: ADD_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}


// 🔹 Delete Product
function* deleteProductSaga(action) {
  try {
    const token = yield select(getToken);

    yield call(deleteProductApi, action.payload, token);

    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      payload: action.payload,
    });

    // Optional: refresh product list
    yield put({ type: FETCH_PRODUCTS_REQUEST });
  } catch (error) {
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}



function* updateProductSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    const { id, product } = action.payload;

    const updatedProduct = yield call(
      updateProductApi,
      id,
      product,
      token
    );

    yield put({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: updatedProduct,
    });

    // optional: re-fetch all products
    yield put({ type: FETCH_PRODUCTS_REQUEST });
  } catch (error) {
    yield put({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
}

// ==============================
// Watcher Saga
// ==============================

export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProductSaga);
}
