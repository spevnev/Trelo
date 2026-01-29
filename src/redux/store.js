import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import bundle from "../services/api";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: bundle,
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
