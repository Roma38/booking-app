import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { authReducer } from "./auth";
import { hallsReduser } from "./halls";
import { ticketsReduser } from "./tickets";

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    halls: hallsReduser,
    tickets: ticketsReduser
  })
};

export const a = 1;