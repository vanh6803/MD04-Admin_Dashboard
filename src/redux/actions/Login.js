import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants";

export const fetchLoginRequest = (data) => {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
};

export const fetchLoginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const fetchLoginFailure = (error) => {
  console.log("login action failed", error);
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};
