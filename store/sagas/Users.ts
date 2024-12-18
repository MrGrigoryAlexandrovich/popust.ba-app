import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSuccess,
} from "../reducers/Users";
import { apiGetUsers } from "@/api/Users";

function* handleOnFetchUsers() {
  try {
    const { data } = yield call(apiGetUsers);
    yield put(fetchUsersSuccess(data));
  } catch (e) {
    yield put(fetchUsersFailed(e));
  }
}

function* UsersSaga() {
  yield takeLatest(fetchUsers, handleOnFetchUsers);
}

export default UsersSaga;
