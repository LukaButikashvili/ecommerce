import {
  ADD_PRODUCT_TO_BASKET,
  CLONE_USERS_CART,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_FROM_BASKET,
} from "./types";

const addProductToBasketAction = ({ newProduct }) => {
  return {
    type: ADD_PRODUCT_TO_BASKET,
    payload: { newProduct },
  };
};

const removeProductFromBasketAction = (id) => {
  return {
    type: REMOVE_PRODUCT_FROM_BASKET,
    payload: { id },
  };
};

const increaseProductQuantity = (id) => {
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    payload: { id },
  };
};

const decreaseProductQuantity = (id) => {
  return {
    type: DECREASE_PRODUCT_QUANTITY,
    payload: { id },
  };
};

const cloneUsersCart = (products) => {
  return {
    type: CLONE_USERS_CART,
    payload: { products },
  };
};

export {
  addProductToBasketAction,
  removeProductFromBasketAction,
  increaseProductQuantity,
  decreaseProductQuantity,
  cloneUsersCart,
};
