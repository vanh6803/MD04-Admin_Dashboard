import { all } from "redux-saga/effects";
import watchFetchLogin from "./AuthSaga";
import watchFetchProduct from "./ProductSaga";

function* rootSaga() {
  yield all([watchFetchLogin(), watchFetchProduct()]);
}
export default rootSaga;
