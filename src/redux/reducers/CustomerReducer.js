import {
  FECTH_CUSTOMER_FAILURE,
  FECTH_CUSTOMER_REQUEST,
  FECTH_CUSTOMER_SUCCESS,
} from "./../constants/index";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  console.log("customer reducer - action type: ", action.type);
  switch (action.type) {
    case FECTH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FECTH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FECTH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
