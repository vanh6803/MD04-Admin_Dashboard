import {
  FECTH_MY_INFO_FAILURE,
  FECTH_MY_INFO_REQUEST,
  FECTH_MY_INFO_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const myProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_MY_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FECTH_MY_INFO_SUCCESS:
      return {
        ...state,
        loading: true,
        data: action.payload,
        error: null,
      };
    case FECTH_MY_INFO_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default myProfileReducer;
