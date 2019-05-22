import axios from "axios";
import { push } from 'connected-react-router'
import { API_HOST } from "../../config";

export const AUTH_REQUESTED = "AUTH_REQUESTED";
export const AUTH_SUCCEED = "AUTH_SUCCEED";
export const AUTH_FAILED = "AUTH_FAILED";
export const REGISTER_REQUESTED = "REGISTER_REQUESTED";
export const REGISTER_SUCCEED = "REGISTER_SUCCEED";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOG_OUT = "LOG_OUT";

export const authRequested = () => ({
  type: AUTH_REQUESTED,
});

export const authSucceed = payload => ({
  type: AUTH_SUCCEED,
  payload
});

export const authFailed = error => ({
  type: AUTH_FAILED,
  payload: error
});

export const logOut = () => ({
  type: LOG_OUT
});

export const register = data => dispatch => axios({
  method: 'post',
  url: `${API_HOST}:4000/signUp`,
  data
}).then(({ data }) => dispatch(push('/login')))
  .catch(error => dispatch(authFailed(error.response.data.errors.message)));

export const login = ({ email, password }) => dispatch => {
  dispatch(authRequested());
  axios({
    method: 'post',
    url: `${API_HOST}:4000/signIn`,
    data: { email, password }
  }).then(({ data }) => {
    dispatch(push('/halls'));
    dispatch(authSucceed({ ...data, email }));
  })
    .catch(error => dispatch(authFailed(error.response.data.message)));
};
