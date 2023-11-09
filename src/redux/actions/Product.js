import {
  FECTH_PRODUCT_FAILURE,
  FECTH_PRODUCT_REQUEST,
  FECTH_PRODUCT_SUCCESS,
} from "../constants";

export const fetchProductRequest = () => {
  return {
    type: FECTH_PRODUCT_REQUEST,
  };
};
export const fetchProductSuccess = (data) => {
  return {
    type: FECTH_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const fetchProductFailure = (error) => {
  return {
    type: FECTH_PRODUCT_FAILURE,
    payload: error,
  };
};
