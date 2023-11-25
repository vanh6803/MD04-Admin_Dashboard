import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { fetchCustomerFail, fetchCustomerSuccess } from "../actions/Customer";
import { FECTH_CUSTOMER_REQUEST } from "../constants";
import Cookies from "js-cookie";

function* fetchCustomer(action) {
  const { page, pageItem, role, token } = action.payload;
  console.log(`Bearer ${token}`);
  try {
    const response = yield call(() =>
      axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }user/customers?page=${page}&pageItem=${pageItem}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    console.log("fetch customer success - customer saga: ", response.data);
    yield put(fetchCustomerSuccess(response.data));
  } catch (error) {
    console.log("fetch customer fail - customer saga: ", error);
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchCustomerFail(errorData));
    } else {
      yield put(fetchCustomerFail(error.message));
    }
  }
}

export default function* watchFetchCustomer() {
  yield takeLatest(FECTH_CUSTOMER_REQUEST, fetchCustomer);
}
