import { put, takeEvery, takeLatest } from "redux-saga/effects";
import statuses from "../../../config/statuses";
import {
  ADD_USER,
  ADD_USER_SAGA,
  FETCHING_USERS_STATUS_ERROR,
  FETCHING_USERS_STATUS_PENDING,
  FETCHING_USERS_STATUS_SUCCESS,
  GET_USERS_SAGA,
  REMOVE_USER,
  REMOVE_USER_SAGA,
} from "../actions/types";

export function* getUsersSaga() {
  yield put({ type: FETCHING_USERS_STATUS_PENDING });
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/users`);
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

export function* postUser(props) {
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      body: JSON.stringify(props.payload.user),
    });

    yield put({
      ...props,
      type: ADD_USER,
    });
    // if (!res.ok) {
    //   yield put({
    //     type: ADD_USER,
    //     payload: { errorMessage: "Error while posting posts" },
    //   });
    // }
  } catch (e) {
    yield put({
      type: ADD_USER,
      payload: { errorMessage: e.message },
    });
  }
}

export function* removeUser(props) {
  try {
    yield put({
      ...props,
      type: REMOVE_USER,
    });

    const res = yield fetch(
      `${process.env.REACT_APP_API_URL}/products/${props.payload.id}`,
      {
        method: "DELETE",
      }
    );

    // if (!res.ok) {
    //   yield put({
    //     type: REMOVE_USER,
    //     payload: { errorMessage: "Error while removing posts" },
    //   });
    // }
  } catch (e) {
    yield put({
      type: REMOVE_USER,
      payload: { errorMessage: e.message },
    });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS_SAGA, getUsersSaga);
  yield takeLatest(ADD_USER_SAGA, postUser);
  yield takeLatest(REMOVE_USER_SAGA, removeUser);
}
