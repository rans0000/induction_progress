import { configureStore } from "@reduxjs/toolkit";

//reducers
import { authApi } from "../services/auth.servive";
import { onboardTaskApi } from "../services/onboardtask.service";
import authReducer from "../state/auth.slice";
import { localStorageListener } from "./localstorage.middleware";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [onboardTaskApi.reducerPath]: onboardTaskApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(localStorageListener.middleware)
      .concat(authApi.middleware, onboardTaskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
