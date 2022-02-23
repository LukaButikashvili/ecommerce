import { ADD_USER_SAGA, GET_USERS_SAGA, REMOVE_USER_SAGA } from "./types";

export const getUsersAction = () => {
  return {
    type: GET_USERS_SAGA,
  };
};

export const addUserAction = (user) => {
  return {
    type: ADD_USER_SAGA,
    payload: { user },
  };
};

export const removeUserAction = (id) => {
  return {
    type: REMOVE_USER_SAGA,
    payload: { id },
  };
};
