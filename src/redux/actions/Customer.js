import {
  FECTH_CUSTOMER_FAILURE,
  FECTH_CUSTOMER_REQUEST,
  FECTH_CUSTOMER_SUCCESS,
} from "../constants";

export const fetchCustomerRequest = (page, pageItem, role) => {
  return {
    type: FECTH_CUSTOMER_REQUEST,
    payload: { page, pageItem, role },
  };
};

export const fetchCustomerFail = (error) => {
  console.log("Failed to fetch customer- action customer: ", error);
  return {
    type: FECTH_CUSTOMER_FAILURE,
    payload: error,
  };
};

export const fetchCustomerSuccess = (data) => {
  return {
    type: FECTH_CUSTOMER_SUCCESS,
    payload: data,
  };
};
