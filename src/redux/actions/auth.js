import axios from "axios";
export const AUTH_REQUESTED = "AUTH_REQUESTED";
export const AUTH_SUCCEED = "AUTH_SUCCEED";
export const AUTH_FAILED = "AUTH_FAILED";
export const REGISTER_REQUESTED = "REGISTER_REQUESTED";
export const REGISTER_SUCCEED = "REGISTER_SUCCEED";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOG_OUT = "LOG_OUT";

export const registerRequested = (email, password, isAdmin = false) => ({
  type: REGISTER_REQUESTED,
  payload: { email, password, isAdmin }
});

export const registerSucceed = (email, id) => ({
  type: REGISTER_REQUESTED,
  payload: { email, id }
});

export const registerFailed = error => ({
  type: REGISTER_REQUESTED,
  payload: { error }
});

export const authSucceed = (userName, token) => ({
  type: AUTH_SUCCEED,
  payload: { userName, token }
});

export const authFailed = error => ({
  type: AUTH_FAILED,
  payload: error
});

export const logOut = () => ({
  type: LOG_OUT
});

export const register = (url, email, password) => dispatch => {
  dispatch(registerRequested(email, password));
  axios
    .post(url, email, password)
    .then(({ data }) => dispatch(registerSucceed(data.results)))
    .catch(() => dispatch(registerFailed()));
};