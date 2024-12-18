import { all } from "redux-saga/effects";
import CatalogsSaga from "./Catalogs";
import UsersSaga from "./Users";
import BannersSaga from "./Banners";

export default function* rootSaga() {
  yield all([CatalogsSaga(), UsersSaga(), BannersSaga()]);
}
