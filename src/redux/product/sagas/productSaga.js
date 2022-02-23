import { put, takeEvery, takeLatest } from "redux-saga/effects";
import statuses from "../../../config/statuses";
import {
  GET_PRODUCTS_SAGA,
  FETCHING_PRODUCT_STATUS_PENDING,
  FETCHING_PRODUCT_STATUS_SUCCESS,
  FETCHING_PRODUCT_STATUS_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SAGA,
  REMOVE_PRODUCT_SAGA,
  REMOVE_PRODUCT,
} from "../actions/types";

export function* getProductsSaga() {
  yield put({ type: FETCHING_PRODUCT_STATUS_PENDING });
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/products`);
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

export function* postProduct(props) {
  try {
    yield put({
      ...props,
      type: ADD_PRODUCT,
    });

    const res = yield fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      body: JSON.stringify(props.payload.product),
    });

    // if (!res.ok) {
    //   yield put({
    //     type: ADD_PRODUCT,
    //     payload: { errorMessage: "Error while adding posts" },
    //   });
    // }
  } catch (e) {
    yield put({
      type: ADD_PRODUCT,
      payload: { errorMessage: e.message },
    });
  }
}

export function* removeProduct(props) {
  try {
    yield put({
      ...props,
      type: REMOVE_PRODUCT,
    });

    const res = yield fetch(
      `${process.env.REACT_APP_API_URL}/products/${props.payload.id}`,
      {
        method: "DELETE",
      }
    );

    // if (!res.ok) {
    //   yield put({
    //     type: REMOVE_PRODUCT,
    //     payload: { errorMessage: "Error while removing posts" },
    //   });
    // }
  } catch (e) {
    // yield put({
    //   type: REMOVE_PRODUCT,
    //   payload: { errorMessage: e.message },
    // });
  }
}

export function* watchGetProductsSaga() {
  yield takeEvery(GET_PRODUCTS_SAGA, getProductsSaga);
  yield takeLatest(ADD_PRODUCT_SAGA, postProduct);
  yield takeLatest(REMOVE_PRODUCT_SAGA, removeProduct);
}
