import {
  FECTH_MY_INFO_FAILURE,
  FECTH_MY_INFO_REQUEST,
  FECTH_MY_INFO_SUCCESS,
} from "../constants";

export const fetchMyProfileRequest = (uid, token) => {
  return {
    type: FECTH_MY_INFO_REQUEST,
    payload: { uid, token },
  };
};

export const fetchMyProfileSuccess = (data) => {
  console.log("Fetching profile - acttion: ", data);
  return {
    type: FECTH_MY_INFO_SUCCESS,
    payload: data,
  };
};

export const fetchMyProfileFailure = (error) => {
  console.log("Failed to fetch my profile - action: ", error);
  return {
    type: FECTH_MY_INFO_FAILURE,
    payload: error,
  };
};
