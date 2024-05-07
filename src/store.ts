import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./States/recipesSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
