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
      console.log("LVGYSFU")
      const { _id, email, token } = payload;
      return { authState: "logedIn", _id, email, token, authError: null };
    case AUTH_FAILED:
      return { ...initialState, authError: payload };
    case LOG_OUT:
      return { ...initialState };

    default:
      return state;
  }
};