import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { loadState } from "../utils/localStorage";
import localStorageKeys from "../config/localStorageKeys";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
  rootReducer,
  {
    cartReducer: loadState(localStorageKeys.CART),
    productReducer: loadState(localStorageKeys.PRODUCTS),
    userReducer: loadState(localStorageKeys.USERS),
    listsReducer: loadState(localStorageKeys.LISTS),
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
