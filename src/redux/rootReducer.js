import { combineReducers } from "redux";
import { productReducer } from "./product/reducers/productReducer";

const rootReducer = combineReducers({
  productReducer,
});

export default rootReducer;
