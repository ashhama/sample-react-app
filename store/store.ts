import { AnyAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import { loadState,saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: { auth: authReducer },
preloadedState: persistedState,

});

store.subscribe(() => {
    saveState({ auth: store.getState().auth });
  });