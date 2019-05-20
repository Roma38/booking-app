import {
  TICKETS_LOADING,
  TICKETS_LOAD_SUCCEED,
  TICKETS_LOAD_FAILED,
} from "../actions/tickets.js";

const initialState = {
  ticketsLoadingState: "",
  error: null,
  items: []
};

export const ticketsReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case TICKETS_LOADING:
      return { ...state, ticketsLoadingState: "loading" };
    case TICKETS_LOAD_SUCCEED:
      return { ...state, ticketsLoadingState: "succeed",  items: payload };
    case TICKETS_LOAD_FAILED:
      return { ...state, ticketsLoadingState: "failed", error: payload, items: [] };

    default:
      return state;
  }
};