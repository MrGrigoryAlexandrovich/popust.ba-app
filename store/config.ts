import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import Catalogs from "./reducers/Catalogs";
import Users from "./reducers/Users";
import Banners from "./reducers/Banners";

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
    snapSaveState: any;
  }
}

const rootReducer = combineReducers({
  catalogs: Catalogs,
  users: Users,
  banners: Banners,
});

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  preloadedState,
});

window.snapSaveState = () => ({
  __PRELOADED_STATE__: store.getState(),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
