import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  productReducer: productReducer,
});

export default rootReducer;
