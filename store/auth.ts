import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthItem from "../models/AuthModel";

const initialState: AuthItem = {
  token: null,
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authenticate: (state, action: PayloadAction<{user:string,token:string}>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    deauthenticate: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
