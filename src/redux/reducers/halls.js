import {
  HALLS_LOADING,
  HALLS_LOAD_SUCCEED,
  HALLS_LOAD_FAILED
} from "../actions/halls.js";

const initialState = {
  hallsLoadingState: "",
  error: null,
  items: []
};

export const hallsReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case HALLS_LOADING:
      return { ...state, hallsLoadingState: "loading" };
    case HALLS_LOAD_SUCCEED:
      return { ...state, hallsLoadingState: "succeed",  items: payload };
    case HALLS_LOAD_FAILED:
      return { ...state, hallsLoadingState: "failed", error: payload, items: [] };

    default:
      return state;
  }
};