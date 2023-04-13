import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user.models";

type AppState = {
  token: string;
  loggedInUser: User | null;
};

const initialState: AppState = {
  token: "",
  loggedInUser: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getLoginToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { getLoginToken } = appSlice.actions;
export default appSlice.reducer;
