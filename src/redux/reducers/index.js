import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from 'redux-form'

import { authReducer } from "./auth";
import { hallsReduser } from "./halls";
import { ticketsReduser } from "./tickets";
import { popupReduser } from "./popup";

export const createRootReducer = (history) => {
  return combineReducers({
    form: formReducer,
    router: connectRouter(history),
    auth: authReducer,
    halls: hallsReduser,
    tickets: ticketsReduser,
    popup: popupReduser
  })
};