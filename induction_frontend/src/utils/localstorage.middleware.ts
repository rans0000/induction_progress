import { createListenerMiddleware } from "@reduxjs/toolkit";
import { saveLoggedInUser, saveLoginToken } from "../state/auth.slice";
import type { RootState } from "./store";

const localStorageListener = createListenerMiddleware();

localStorageListener.startListening({
  actionCreator: saveLoginToken,
  effect: (action, listenerApi) => {
    const token = (listenerApi.getState() as RootState).auth.token;
    try {
      localStorage.setItem("token", token);
    } catch (error) {
      throw error;
    }
  },
});

localStorageListener.startListening({
  actionCreator: saveLoggedInUser,
  effect: (action, listenerApi) => {
    const user = (listenerApi.getState() as RootState).auth.loggedInUser;
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      throw error;
    }
  },
});

export { localStorageListener };
