import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user.models";

type AuthState = {
  token: string;
  loggedInUser: User | null;
};

const initialState: AuthState = {
  token: "",
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    saveLoggedInUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { saveLoginToken, saveLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
