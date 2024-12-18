import { call, put, takeLatest } from "redux-saga/effects";
import { apiGetBanners } from "@/api/Banner";
import {
  fetchBanners,
  fetchBannersFailed,
  fetchBannersSuccess,
} from "../reducers/Banners";

function* handleOnFetchBanners() {
  try {
    const { data } = yield call(apiGetBanners);
    yield put(fetchBannersSuccess(data));
  } catch (e) {
    yield put(fetchBannersFailed(e)); // TODO define type of error and handle error
  }
}

function* CatalogsSaga() {
  yield takeLatest(fetchBanners, handleOnFetchBanners);
}

export default CatalogsSaga;
