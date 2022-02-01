import { put, takeEvery } from "redux-saga/effects";
import statuses from "../../../config/statuses";
import {
  FETCHING_USERS_STATUS_ERROR,
  FETCHING_USERS_STATUS_PENDING,
  FETCHING_USERS_STATUS_SUCCESS,
  GET_USERS_SAGA,
} from "../actions/types";

export function* getUsersSaga() {
  yield put({ type: FETCHING_USERS_STATUS_PENDING });
  try {
    const res = yield fetch("https://fakestoreapi.com/users");
    const data = yield res.json();
    yield put({ type: FETCHING_USERS_STATUS_SUCCESS, payload: { data: data } });

    if (!res.ok) {
      yield put({
        type: statuses.ERROR,
        payload: { errorMessage: "Error while fetching posts" },
      });
    }
  } catch (e) {
    yield put({
      type: FETCHING_USERS_STATUS_ERROR,
      payload: { errorMessage: e.message },
    });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS_SAGA, getUsersSaga);
}
