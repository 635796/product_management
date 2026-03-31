import { takeLatest, put, select } from "redux-saga/effects";

// ==============================
// Action Types
// ==============================
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";

// ==============================
// Selectors
// ==============================
const getToken = (state) => state.auth.token;

// ==============================
// Worker Sagas
// ==============================

/**
 * Runs after successful login
 * Keeps auth sync logic centralized
 */
function* onLoginSuccessSaga(action) {
  try {
    const { token, user } = action.payload;

    // ✅ Example future usage:
    // localStorage.setItem("jwt", token);
    // localStorage.setItem("user", JSON.stringify(user));

    console.log("✅ Login successful:", user);
  } catch (error) {
    console.error("❌ Login success saga failed:", error);
  }
}

/**
 * Runs on logout
 * Clears all auth-related state and side effects
 */
function* onLogoutSaga() {
  try {
    // ✅ Example cleanup:
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("user");

    console.log("✅ User logged out, cleanup done");
  } catch (error) {
    console.error("❌ Logout cleanup failed:", error);
  }
}

/**
 * Placeholder for future token refresh logic
 */
function* refreshTokenSaga() {
  try {
    const token = yield select(getToken);

    if (!token) {
      yield put({ type: LOGOUT });
      return;
    }

    // 🔒 Future:
    // call refresh token API
    // update Redux with SET_TOKEN

    console.log("🔄 Token refresh placeholder");
  } catch (error) {
    yield put({ type: LOGOUT });
  }
}

// ==============================
// Watcher Saga
// ==============================

export default function* authSaga() {
  yield takeLatest(LOGIN_SUCCESS, onLoginSuccessSaga);
  yield takeLatest(LOGOUT, onLogoutSaga);
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}
