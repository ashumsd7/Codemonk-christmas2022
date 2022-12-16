import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mainApi } from "../services/api";
import { isLoggedIn, logOut } from "../utils";

export const rtkQueryErrorLogger = () => (next) => (action) => {
  if (
    isRejectedWithValue(action) &&
    action?.payload?.status === 401 &&
    isLoggedIn()
  )
    logOut();
  return next(action);
};

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);
