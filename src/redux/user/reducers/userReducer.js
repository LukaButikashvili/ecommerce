import statuses from "../../../config/statuses";
import {
  FETCHING_USERS_STATUS_ERROR,
  FETCHING_USERS_STATUS_PENDING,
  FETCHING_USERS_STATUS_SUCCESS,
} from "../actions/types";

const initialState = {
  status: statuses.INITIAL,
  data: [],
  errorMessage: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS_STATUS_PENDING: {
      return {
        ...state,
        status: statuses.PENDING,
      };
    }
    case FETCHING_USERS_STATUS_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        status: statuses.SUCCESS,
      };
    }
    case FETCHING_USERS_STATUS_ERROR: {
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

export default userReducer;
