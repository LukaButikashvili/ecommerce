import statuses from "../../../config/statuses";
import initialState from "../../initialState";

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case statuses.PENDING: {
      return {
        ...state,
        products: {
          ...state.products,
          status: statuses.PENDING,
        },
      };
    }
    case statuses.SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          data: action.payload.data,
          status: statuses.SUCCESS,
        },
      };
    }
    case statuses.ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          status: statuses.ERROR,
          errorMessage: action.payload.errorMessage,
        },
      };
    }
    default:
      return state;
  }
};
