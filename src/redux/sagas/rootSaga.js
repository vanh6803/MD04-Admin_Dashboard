import { all, call } from "redux-saga/effects";
import watchFetchLogin from "./AuthSaga";
import watchFetchProduct from "./ProductSaga";
import watchFetchCustomer from "./customerSaga";
import watchFetchMyProfile from "./MyProfileSaga";
import watchFetchCategory from "./CategorySaga";
import watchFetchStore from "./StoreSaga";
import watchFetchStaff from "./StaffSaga";

function* rootSaga() {
  yield all([
    watchFetchLogin(),
    watchFetchProduct(),
    watchFetchCustomer(),
    watchFetchMyProfile(),
    watchFetchCategory(),
    watchFetchStore(),
    watchFetchStaff(),
  ]);
}
export default rootSaga;
