/**
 * Register the Redux Stores
 *
 */

import { AnyAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import formReducer from "./form";
import { loadState,saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: { auth: authReducer, form: formReducer },
preloadedState: persistedState,

});

// Here we subscribe to the store to save the state to local storage whenever the state changes.
store.subscribe(() => {
    saveState({ auth: store.getState().auth });
  });