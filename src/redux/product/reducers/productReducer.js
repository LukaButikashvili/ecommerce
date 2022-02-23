import statuses from "../../../config/statuses";
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCHING_PRODUCT_STATUS_ERROR,
  FETCHING_PRODUCT_STATUS_PENDING,
  FETCHING_PRODUCT_STATUS_SUCCESS,
} from "../actions/types";

const initialState = {
  status: statuses.INITIAL,
  products: [],
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
        products: [...state.products, ...action.payload.data],
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
    case ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    }
    case REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id != action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
