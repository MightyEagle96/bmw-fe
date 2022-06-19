import counterReducer from "./counter";
import loggedReducer from "./isLogged";

import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const allReducers = combineReducers({
  counter: counterReducer,
  isLoggedIn: loggedReducer,
});

const persistConfig = { key: "main-root", storage };
export default allReducers;
