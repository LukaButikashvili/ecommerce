import { all } from "redux-saga/effects";
import { watchGetProductsSaga } from "./product/sagas/productSaga";
import { watchGetUsersSaga } from "./user/sagas/userSaga";

export default function* rootSaga() {
  yield all([watchGetProductsSaga(), watchGetUsersSaga()]);
}
