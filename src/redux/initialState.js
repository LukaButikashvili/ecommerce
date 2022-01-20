import statuses from "../config/statuses";

const initialState = {
  products: {
    status: statuses.INITIAL,
    data: [],
    errorMessage: "",
  },
  users: {
    status: statuses.INITIAL,
    data: [],
    errorMessage: "",
  },
};

export default initialState;
