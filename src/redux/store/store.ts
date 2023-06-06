import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./hooks";

export const store = configureStore({
     reducer: rootReducer,
});
