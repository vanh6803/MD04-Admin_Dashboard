import { put, takeLatest, call } from "redux-saga/effects";
import { fetchProductFailure, fetchProductSuccess } from "../actions/Product";
import axios from "axios";
import { FECTH_PRODUCT_REQUEST } from "../constants";

console.log(import.meta.env.VITE_BASE_URL);

function* fetchProduct(action) {
  try {
    const response = yield call(() =>
      axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }products/all-product?page=1&itemsPerPage=10`
      )
    );

    console.log("fetch product success - product saga: ", response.data);
    yield put(fetchProductSuccess(response.data));
  } catch (error) {
    console.log("fetch product fail - product saga: ", error);
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchProductFailure(errorData));
    } else {
      yield put(fetchProductFailure(error.message));
    }
  }
}

export default function* watchFetchProduct() {
  yield takeLatest(FECTH_PRODUCT_REQUEST, fetchProduct);
}
