import { combineReducers } from "redux";
import { productReducer } from "./product/reducers/productReducer";
import cartReducer from "./cart/reducers/cartReducer";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
});

export default rootReducer;
