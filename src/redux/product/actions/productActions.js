import { ADD_PRODUCT, GET_PRODUCTS_SAGA } from "./types";

export const getProductsAction = () => {
  return {
    type: GET_PRODUCTS_SAGA,
  };
};
export const addProductAction = (product) => {
  console.log(product);
  return {
    type: ADD_PRODUCT,
    payload: { product },
  };
};
