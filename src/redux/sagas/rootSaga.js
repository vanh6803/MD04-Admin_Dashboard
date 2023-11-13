import { all } from "redux-saga/effects";
import watchFetchLogin from "./AuthSaga";
import watchFetchProduct from "./ProductSaga";
import watchFetchCustomer from "./customerSaga";

function* rootSaga() {
  yield all([watchFetchLogin(), watchFetchProduct(), watchFetchCustomer()]);
}
export default rootSaga;
