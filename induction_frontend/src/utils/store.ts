import { configureStore } from "@reduxjs/toolkit";

//reducers
import { authApi } from "../services/auth.servive";
import authReducer from "../state/auth.slice";
import { localStorageListener } from "./localstorage.middleware";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(localStorageListener.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
