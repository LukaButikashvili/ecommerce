import { combineReducers } from "redux";
import { productReducer } from "./product/reducers/productReducer";
import userReducer from "./user/reducers/userReducer";
import cartReducer from "./cart/reducers/cartReducer";
import savedReducer from "./saved/reducers/savedReducer";

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  cartReducer,
  savedReducer,
});

export default rootReducer;
