import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { hallsReduser } from "./halls";
import { ticketsReduser } from "./tickets";

const rootReduser = combineReducers({
  auth: authReducer,
  halls: hallsReduser,
  tickets: ticketsReduser
});

export default rootReduser;