import axios from "axios";
import { API_HOST } from "../../config";

export const HALLS_LOADING = "HALLS_LOADING";
export const HALLS_LOAD_SUCCEED = "HALLS_LOAD_SUCCEED";
export const HALLS_LOAD_FAILED = "HALLS_LOAD_FAILED";

export const hallsLoadStart = () => ({ type: HALLS_LOADING });

export const hallsLoadSucceed = data => ({
  type: HALLS_LOAD_SUCCEED,
  payload: data.halls
});

export const hallsLoadFailed = error => ({
  type: HALLS_LOAD_FAILED,
  payload: error
});

export const getHalls = () => dispatch => {
  dispatch(hallsLoadStart());
  axios
    .get(`${API_HOST}:4000/halls`)
    .then(({ data }) => dispatch(hallsLoadSucceed(data)))
    .catch(error => dispatch(hallsLoadFailed(error)));
};