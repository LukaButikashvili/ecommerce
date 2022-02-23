import {
  ADD_PRODUCT_SAGA,
  GET_PRODUCTS_SAGA,
  REMOVE_PRODUCT_SAGA,
} from "./types";

export const getProductsAction = () => {
  return {
    type: GET_PRODUCTS_SAGA,
  };
};
export const addProductAction = (product) => {
  return {
    type: ADD_PRODUCT_SAGA,
    payload: { product },
  };
};

export const removeProductAction = (id) => {
  return {
    type: REMOVE_PRODUCT_SAGA,
    payload: { id },
  };
};
