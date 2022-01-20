import { all } from "redux-saga/effects";
import { watchGetProductsSaga } from "./product/sagas/productSaga";

export default function* rootSaga() {
  yield all([watchGetProductsSaga()]);
}
