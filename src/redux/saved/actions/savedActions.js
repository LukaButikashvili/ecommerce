import { ADD_PRODUCT_TO_SAVED, REMOVE_PRODUCT_FROM_SAVED } from "./types";

const addProductToSavedAction = (product) => {
  return {
    type: ADD_PRODUCT_TO_SAVED,
    payload: { product },
  };
};

const removeProductFromSavedAction = (id) => {
  return {
    type: REMOVE_PRODUCT_FROM_SAVED,
    payload: { id },
  };
};

export { addProductToSavedAction, removeProductFromSavedAction };
