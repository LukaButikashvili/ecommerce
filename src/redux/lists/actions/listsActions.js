import {
  ADD_LIST,
  ADD_PRODUCT_TO_LIST,
  EDIT_LIST_NAME,
  REMOVE_LIST,
} from "./types";

const addListAction = (listName) => {
  return {
    type: ADD_LIST,
    payload: { listName },
  };
};

const removeListAction = (listName) => {
  return {
    type: REMOVE_LIST,
    payload: { listName },
  };
};

const editListNameAction = (newName, oldName) => {
  return {
    type: EDIT_LIST_NAME,
    payload: { newName, oldName },
  };
};

const addProductToListAction = (listName, id) => {
  return {
    type: ADD_PRODUCT_TO_LIST,
    payload: { listName, id },
  };
};
const removeProducFromListAction = (listName, id) => {
  return {
    type: ADD_PRODUCT_TO_LIST,
    payload: { listName, id },
  };
};

export {
  addListAction,
  removeListAction,
  editListNameAction,
  addProductToListAction,
  removeProducFromListAction,
};
