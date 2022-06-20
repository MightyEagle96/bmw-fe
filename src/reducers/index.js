import counterReducer from "./counter";
import loggedReducer from "./isLogged";

import { combineReducers } from "redux";
import authReducer from "./auth";

const allReducers = combineReducers({
  counter: counterReducer,
  isLoggedIn: loggedReducer,
  loggedUser: authReducer,
});

export default allReducers;
