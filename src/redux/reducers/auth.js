import {
  AUTH_REQUESTED,
  AUTH_SUCCEED,
  AUTH_FAILED,
  LOG_OUT
} from "../actions/auth";

const initialState = {
  authState: "unauthorized",
  _id: localStorage.getItem('_id') || null,
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null,
  authError: null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUESTED:
      return { ...initialState, authState: "loading" };
    case AUTH_SUCCEED:
      const { _id, email, token } = payload;
      localStorage.setItem('_id', _id);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      return { authState: "logedIn", _id, email, token, authError: null };
    case AUTH_FAILED:
      return { ...initialState, authError: payload };
    case LOG_OUT:
      localStorage.removeItem("_id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return { ...initialState };

    default:
      return state;
  }
};