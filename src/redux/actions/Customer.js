import {
  FECTH_CUSTOMER_FAILURE,
  FECTH_CUSTOMER_REQUEST,
  FECTH_CUSTOMER_SUCCESS,
} from "../constants";

export const fetchCustomerRequest = (page, pageItem, role, token) => {
  return {
    type: FECTH_CUSTOMER_REQUEST,
    payload: { page, pageItem, role, token },
  };
};

export const fetchCustomerFail = (error) => {
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
