import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCatalogs,
  fetchCatalogsFailed,
  fetchCatalogsSuccess,
} from "../reducers/Catalogs";
import { apiGetCatalogs } from "@/api/Catalogs";

function* handleOnFetchCatalogs({ payload }: { payload: string }) {
  const url = payload ? `/catalogs/owner/${payload}` : "/catalogs";
  try {
    const { data } = yield call(apiGetCatalogs, { url });
    yield put(fetchCatalogsSuccess(data));
  } catch (e) {
    yield put(fetchCatalogsFailed(e)); // TODO define type of error and handle error
  }
}

function* CatalogsSaga() {
  yield takeLatest(fetchCatalogs, handleOnFetchCatalogs);
}

export default CatalogsSaga;
