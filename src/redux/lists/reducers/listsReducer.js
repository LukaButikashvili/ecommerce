import {
  ADD_LIST,
  ADD_PRODUCT_TO_LIST,
  EDIT_LIST_NAME,
  REMOVE_LIST,
  REMOVE_PRODUCT_FROM_LIST,
} from "../actions/types";

const listsReducer = (state = {}, action) => {
  const tempLists = { ...state };
  switch (action.type) {
    case ADD_LIST:
      tempLists[action.payload.listName] = [];
      return tempLists;

    case REMOVE_LIST:
      delete tempLists[action.payload.listName];
      return tempLists;

    case EDIT_LIST_NAME:
      tempLists[action.payload.newName] = tempLists[action.payload.oldName];
      delete tempLists[action.payload.oldName];
      return tempLists;

    case REMOVE_PRODUCT_FROM_LIST:
      const removeProductFromList = tempLists[action.payload.listName].filter(
        (item) => item !== action.payload.id
      );
      tempLists[action.payload.listName] = removeProductFromList;
      return tempLists;

    case ADD_PRODUCT_TO_LIST:
      tempLists[action.payload.listName].push(action.payload.id);
      return tempLists;

    default:
      return state;
  }
};

export default listsReducer;
