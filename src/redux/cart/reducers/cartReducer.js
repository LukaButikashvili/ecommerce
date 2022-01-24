import {
  ADD_PRODUCT_TO_BASKET,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_BASKET,
} from "../actions/types";

const initialState = {
  userId: 1,
  date: "",
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        date: new Date(),
        products: [...state.products, action.payload.newProduct],
      };
    case REMOVE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        date: new Date(),
        products: state.products.filter(
          (product) => product.productId !== action.payload.id
        ),
      };
    case INCREASE_PRODUCT_QUANTITY:
      const index = state.products.findIndex(
        (product) => product.productId === action.payload.id
      );

      let basketProducts = [...state.products];
      basketProducts[index] = {
        ...basketProducts[index],
        date: new Date(),
        quantity: state.products[index].quantity + 1,
      };

      return {
        ...state,
        products: basketProducts,
      };
    case DECREASE_PRODUCT_QUANTITY:
      const productIndex = state.products.findIndex(
        (product) => product.productId === action.payload.id
      );

      let prevState = [...state.products];
      prevState[productIndex] = {
        ...prevState[productIndex],
        date: new Date(),
        quantity: state.products[productIndex].quantity - 1,
      };

      return {
        ...state,
        products: prevState,
      };
    default:
      return state;
    // throw new Error(`Invalid action ${action.type} was provided`);
  }
};

export default cartReducer;
