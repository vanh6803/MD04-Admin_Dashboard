import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";

const rootReducer = combineReducers({
  loginReducer: loginReducer,
});

export default rootReducer;
