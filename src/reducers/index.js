import socialReducer from "./social";
import loggedReducer from "./isLogged";

import { combineReducers } from "redux";
import authReducer from "./auth";

const allReducers = combineReducers({
  socialType: socialReducer,
  isLoggedIn: loggedReducer,
  loggedUser: authReducer,
});

export default allReducers;
