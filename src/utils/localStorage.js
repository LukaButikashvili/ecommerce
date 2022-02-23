import statuses from "../config/statuses";

export const loadState = (keyName) => {
  try {
    const serializedState = JSON.parse(localStorage.getItem(keyName));
    if (serializedState === null) {
      return undefined;
    }

    if (keyName === "products") {
      return {
        status: statuses.INITIAL,
        products: serializedState,
        errorMessage: "",
      };
    }

    if (keyName === "users") {
      return {
        status: statuses.INITIAL,
        users: serializedState,
        errorMessage: "",
      };
    }

    return serializedState;
  } catch (err) {
    return undefined;
  }
};

// export const saveState = (state) => {
//   console.log(state);
//   try {
//     // const serializedState = JSON.stringify(state);
//     // localStorage.setItem("state", serializedState);
//   } catch (err) {
//     // ignore
//   }
// };
