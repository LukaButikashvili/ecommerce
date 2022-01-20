import { put, takeEvery } from "redux-saga/effects";
import statuses from "../../../config/statuses";
import { GET_PRODUCTS_SAGA } from "../actions/types";

export function* getProductsSaga() {
  try {
    yield put({ type: statuses.PENDING });

    const res = yield fetch("https://fakestoreapi.com/products");
    const data = yield res.json();
    yield put({ type: statuses.SUCCESS, payload: { data: data } });

    if (!res.ok) {
      yield put({
        type: statuses.ERROR,
        payload: { errorMessage: "Error while fetching posts" },
      });
    }
  } catch (e) {
    yield put({ type: statuses.ERROR, payload: { errorMessage: e.message } });
  }
}

export function* watchGetProductsSaga() {
  yield takeEvery(GET_PRODUCTS_SAGA, getProductsSaga);
}
