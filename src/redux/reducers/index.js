import authType from "./authType";
import loggedUser from "./loggedUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  authType,
  loggedUser,
});

export default allReducers;
