import statuses from "../../../config/statuses";

const initialState = {
  status: statuses.INITIAL,
  data: [],
  errorMessage: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case statuses.PENDING: {
      return {
        ...state,
        status: statuses.PENDING,
      };
    }
    case statuses.SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        status: statuses.SUCCESS,
      };
    }
    case statuses.ERROR: {
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
