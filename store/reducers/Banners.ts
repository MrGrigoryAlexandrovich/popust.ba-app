import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IBannersState } from "@/models/Banners";

const initialState: IBannersState = {
  isLoading: false,
  banners: [],
  error: false,
};

const bannersReducers = {
  fetchBanners: (state: Draft<IBannersState>) => {
    state.isLoading = true;
  },
  fetchBannersSuccess: (
    state: Draft<IBannersState>,
    action: PayloadAction<string[]>
  ) => {
    state.isLoading = false;
    state.banners = action.payload;
  },
  fetchBannersFailed: (
    state: Draft<IBannersState>,
    action: PayloadAction<unknown>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export const BannersSlice = createSlice({
  name: "BANNERS",
  initialState,
  reducers: {
    ...bannersReducers,
  },
});

export const { fetchBanners, fetchBannersFailed, fetchBannersSuccess } =
  BannersSlice.actions;

export default BannersSlice.reducer;
