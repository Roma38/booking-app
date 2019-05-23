import {
  AUTH_REQUESTED,
  AUTH_SUCCEED,
  AUTH_FAILED,
  LOG_OUT
} from "../actions/auth";

const initialState = {
  authState: "unauthorized",
  _id: null,
  email: null,
  token: null,
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
      return { authState: "loggedIn", _id, email, token, authError: null };
    case AUTH_FAILED:
      return { ...initialState, authError: payload };
    case LOG_OUT:
      localStorage.clear();
      return { ...initialState };

    default:
      return state;
  }
};