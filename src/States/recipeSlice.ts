import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiKey: string = "2ecf0a5ce6b7456e97ff317224c58869";

// types

export interface Recipe {
  id: number;
  title: string;
  image: string;
}
interface recipesType {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: recipesType = {
  recipes: [],
  loading: false,
  error: null,
};

// async function to fetch data from spoonacular API

export const fetchRecipes = createAsyncThunk<Recipe[], string>(
  "recipes/fetchRecipes",
  async (query) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`,
      );
      return response.data.results; // Return the fetched data
    } catch (error) {
      throw Error("Failed to fetch data"); // Throw an error if fetching fails
    }
  },
);

// reducrs
const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        // console.log("Data fetched:", action.payload);
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error
      });
  },
});

export default recipeSlice.reducer;

//   const data = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
