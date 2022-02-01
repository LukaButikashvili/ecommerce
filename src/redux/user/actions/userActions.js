import { GET_USERS_SAGA } from "./types";

export const getUsersAction = () => {
  return {
    type: GET_USERS_SAGA,
  };
};
