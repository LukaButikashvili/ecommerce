import statuses from "../../../config/statuses";
import {
  FETCHING_PRODUCT_STATUS_ERROR,
  FETCHING_PRODUCT_STATUS_PENDING,
  FETCHING_PRODUCT_STATUS_SUCCESS,
} from "../actions/types";

const initialState = {
  status: statuses.INITIAL,
  data: [],
  errorMessage: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PRODUCT_STATUS_PENDING: {
      return {
        ...state,
        status: statuses.PENDING,
      };
    }
    case FETCHING_PRODUCT_STATUS_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        status: statuses.SUCCESS,
      };
    }
    case FETCHING_PRODUCT_STATUS_ERROR: {
      return {
        ...state,
        status: statuses.ERROR,
        errorMessage: action.payload.errorMessage,
      };
    }
    default:
      return state;
  }
};
