import { all, call } from "redux-saga/effects";
import watchFetchLogin from "./AuthSaga";
import watchFetchProduct from "./ProductSaga";
import watchFetchCustomer from "./customerSaga";
import watchFetchMyProfile from "./MyProfileSaga";
import watchFetchCategory from "./CategorySaga";
import watchFetchStore from "./StoreSaga";

function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchProduct(),
    watchFetchCustomer(),
    watchFetchMyProfile(),
    watchFetchCategory(),
    watchFetchStore(),
  ]);
}
export default rootSaga;
