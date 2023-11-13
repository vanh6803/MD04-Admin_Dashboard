import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import productReducer from "./ProductReducer";
import customerReducer from "./CustomerReducer";

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  productReducer: productReducer,
  customerReducer: customerReducer,
});

export default rootReducer;
