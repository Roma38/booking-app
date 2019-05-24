import { OPEN_POPUP, CLOSE_POPUP } from "../actions/popup";

const initialState = {
  isVisible: false,
  content: "",
  attributes: null
};

export const popupReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_POPUP:
      return { ...state, isVisible: true, content: payload.content, attributes: payload.attributes };
    case CLOSE_POPUP:
      return { ...initialState };

    default:
      return state;
  }
};