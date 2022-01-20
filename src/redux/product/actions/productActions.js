import { GET_PRODUCTS_SAGA } from "./types";

export const getProductsAction = () => {
  return {
    type: GET_PRODUCTS_SAGA,
  };
};
