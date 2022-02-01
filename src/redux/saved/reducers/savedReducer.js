import {
  ADD_PRODUCT_TO_SAVED,
  REMOVE_PRODUCT_FROM_SAVED,
} from "../actions/types";

const initialState = [];

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_SAVED:
      return [...state, action.payload.product];

    case REMOVE_PRODUCT_FROM_SAVED:
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
};

export default savedReducer;
