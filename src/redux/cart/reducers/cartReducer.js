import {
  ADD_PRODUCT_TO_BASKET,
  CLONE_USERS_CART,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_BASKET,
} from "../actions/types";

const initialState = {
  userId: 1,
  date: "",
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        date: new Date(),
        cartProducts: [...state.cartProducts, action.payload.newProduct],
      };
    case REMOVE_PRODUCT_FROM_BASKET:
      return {
        ...state,
        date: new Date(),
        cartProducts: state.cartProducts.filter(
          (product) => product.productId !== action.payload.id
        ),
      };
    case INCREASE_PRODUCT_QUANTITY:
      const index = state.cartProducts.findIndex(
        (product) => product.productId === action.payload.id
      );

      let basketProducts = [...state.cartProducts];
      basketProducts[index] = {
        ...basketProducts[index],
        quantity: state.cartProducts[index].quantity + 1,
      };

      return {
        ...state,
        cartProducts: basketProducts,
      };
    case DECREASE_PRODUCT_QUANTITY:
      const productIndex = state.cartProducts.findIndex(
        (product) => product.productId === action.payload.id
      );

      let prevState = [...state.cartProducts];
      prevState[productIndex] = {
        ...prevState[productIndex],
        quantity: state.cartProducts[productIndex].quantity - 1,
      };
      return {
        ...state,
        cartProducts: prevState,
      };
    case CLONE_USERS_CART:
      return {
        ...state,
        cartProducts: action.payload.products,
      };
    default:
      return state;
    // throw new Error(`Invalid action ${action.type} was provided`);
  }
};

export default cartReducer;
