import { put, takeLatest, call } from "redux-saga/effects";
import { fetchLoginFailure, fetchLoginSuccess } from "../actions/Login";
import axios from "axios";
import { LOGIN_REQUEST } from "../constants";

function* fetchLogin(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(() =>
      axios.post(`${import.meta.env.VITE_BASE_URL}login`, { email, password })
    );

    console.log("fetch Login success - login saga: ", response.data);
    yield put(fetchLoginSuccess(response.data));
  } catch (error) {
    console.log("fetch Login fail - login saga: ", error);
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchLoginFailure(errorData));
    } else {
      // Trong trường hợp lỗi mạng, bạn có thể xử lý error.message như bạn muốn
      yield put(fetchLoginFailure(error.message));
    }
  }
}

export default function* watchFetchLogin() {
  yield takeLatest(LOGIN_REQUEST, fetchLogin);
}
