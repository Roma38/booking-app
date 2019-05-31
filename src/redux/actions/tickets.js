import axios from "axios";
import { API_HOST } from "../../config";

export const TICKETS_LOADING = "TICKETS_LOADING";
export const TICKETS_LOAD_SUCCEED = "TICKETS_LOAD_SUCCEED";
export const TICKETS_LOAD_FAILED = "TICKETS_LOAD_FAILED";

export const ticketsLoadStart = () => ({ type: TICKETS_LOADING });

export const ticketsLoadSucceed = tickets => ({
  type: TICKETS_LOAD_SUCCEED,
  payload: tickets
});

export const ticketsLoadFailed = error => ({
  type: TICKETS_LOAD_FAILED,
  payload: error
});

export const getTickets = () => dispatch => {
  dispatch(ticketsLoadStart());
  axios
    .get(`${API_HOST}/tickets`)
    .then(({ data }) => dispatch(ticketsLoadSucceed(data)))
    .catch(error => dispatch(ticketsLoadFailed(error)));
};

// export const createTicket = () => dispatch => {

// }