import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import productReducer from "./ProductReducer";
import customerReducer from "./CustomerReducer";
import myProfileReducer from "./MyProfileReducer";
import categoryReducer from "./CategoryReducer";
import storeReducer from "./StoreReducer";
import staffReducer from './StaffReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  productReducer: productReducer,
  customerReducer: customerReducer,
  myProfileReducer: myProfileReducer,
  categoryReducer: categoryReducer,
  storeReducer: storeReducer,
  staffReducer: staffReducer
});

export default rootReducer;
