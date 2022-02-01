import { put, takeEvery } from "redux-saga/effects";
import statuses from "../../../config/statuses";
import {
  GET_PRODUCTS_SAGA,
  FETCHING_PRODUCT_STATUS_PENDING,
  FETCHING_PRODUCT_STATUS_SUCCESS,
  FETCHING_PRODUCT_STATUS_ERROR,
} from "../actions/types";

export function* getProductsSaga() {
  yield put({ type: FETCHING_PRODUCT_STATUS_PENDING });
  try {
    const res = yield fetch("https://fakestoreapi.com/products");
    const data = yield res.json();
    yield put({
      type: FETCHING_PRODUCT_STATUS_SUCCESS,
      payload: { data: data },
    });

    if (!res.ok) {
      yield put({
        type: statuses.ERROR,
        payload: { errorMessage: "Error while fetching posts" },
      });
    }
  } catch (e) {
    yield put({
      type: FETCHING_PRODUCT_STATUS_ERROR,
      payload: { errorMessage: e.message },
    });
  }
}

export function* watchGetProductsSaga() {
  yield takeEvery(GET_PRODUCTS_SAGA, getProductsSaga);
}
