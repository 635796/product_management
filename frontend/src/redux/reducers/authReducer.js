const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };

    case "LOGOUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}