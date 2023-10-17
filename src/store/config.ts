import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
    },
    rootReducer
  ),
  devTools: true,
  middleware: (config) =>
    config({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
