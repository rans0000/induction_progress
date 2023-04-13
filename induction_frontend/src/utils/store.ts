import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

//reducers
import appReducer from "../state/app.slice";
import { appApi } from "../services/app.servive";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
