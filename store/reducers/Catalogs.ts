import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ICatalog, ICatalogsState } from "@/models/Catalogs";

const initialState: ICatalogsState = {
  isLoading: false,
  catalogs: [],
  selectedCatalog: undefined,
  error: false,
};

const catalogsReducers = {
  fetchCatalogs: (state: Draft<ICatalogsState>, _: PayloadAction<string>) => {
    state.isLoading = true;
  },
  fetchCatalogsSuccess: (
    state: Draft<ICatalogsState>,
    action: PayloadAction<ICatalog[]>
  ) => {
    state.isLoading = false;
    state.catalogs = action.payload;
  },
  fetchCatalogsFailed: (
    state: Draft<ICatalogsState>,
    action: PayloadAction<unknown>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  setSelectedCatalog: (
    state: Draft<ICatalogsState>,
    action: PayloadAction<ICatalog>
  ) => {
    state.selectedCatalog = action.payload;
  },
  resetCatalogs: (state: Draft<any>) => {
    state.catalogs = initialState.catalogs;
  },
  resetSelectedCatalog: (state: Draft<any>) => {
    state.catalogs = initialState.selectedCatalog;
  },
};

export const CatalogsSlice = createSlice({
  name: "CATALOGS",
  initialState,
  reducers: {
    ...catalogsReducers,
  },
});

export const {
  fetchCatalogs,
  fetchCatalogsFailed,
  fetchCatalogsSuccess,
  setSelectedCatalog,
  resetCatalogs,
  resetSelectedCatalog,
} = CatalogsSlice.actions;

export default CatalogsSlice.reducer;
