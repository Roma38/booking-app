import axios from "axios";
import { API_HOST } from "../../config";
import {openPopup} from "./popup";

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
    .get(`${API_HOST}/halls`)
    .then(({ data }) => dispatch(hallsLoadSucceed(data)))
    .catch(error => {
      dispatch((openPopup({
        content: `Ooops, something went wrong :(. Can't load data from server`,
        attributes: { negative: true }
      })))
      dispatch(hallsLoadFailed(error))});
};