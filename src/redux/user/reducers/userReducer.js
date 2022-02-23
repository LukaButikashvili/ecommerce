import statuses from "../../../config/statuses";
import {
  ADD_USER,
  FETCHING_USERS_STATUS_ERROR,
  FETCHING_USERS_STATUS_PENDING,
  FETCHING_USERS_STATUS_SUCCESS,
  REMOVE_USER,
} from "../actions/types";

const initialState = {
  status: statuses.INITIAL,
  users: [],
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
        users: [...state.users, ...action.payload.data],
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
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        users: state.users.filter((user) => user.id != action.payload.id),
      };
    }
    default:
      return state;
  }
};

export default userReducer;
