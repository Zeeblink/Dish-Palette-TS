import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiKey: string = "2ecf0a5ce6b7456e97ff317224c58869";
export const apiKey2: string = "013562ac369b4664b552f29d4aa440ed";

// types

export interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface ingredientsType {
  name: string,
  amount: 2,
  unit: "cups"
}

export interface RecipeInfoType extends Recipe {
  extendedIngredients: ingredientsType[],
  instructions: string
}

interface RecipesType {
  recipes: Recipe[];
  loading: boolean;
  error?: string | null;
  recipeInfo: RecipeInfoType | null;
}

// initial state
const initialState: RecipesType = {
  recipes: [],
  loading: false,
  error: null,
  recipeInfo: null
};

// async function to fetch data from spoonacular API

export const fetchRecipes = createAsyncThunk<Recipe[], string>(
  "recipes/fetchRecipes",
  async (query) => {
    if(query === "random"){
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey2}&number=9`,
        );
        return response.data.recipes; // Return the fetched data
      } catch (error) {
        throw Error("Failed to fetch data"); // Throw an error if fetching fails
      }
    }
    else{
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`,
        );
        return response.data.results; // Return the fetched data
      } catch (error) {
        throw Error("Failed to fetch data"); // Throw an error if fetching fails
      }
    }
  },
);


// async function to fetch detailed recipe information
export const fetchRecipeInfo = createAsyncThunk<RecipeInfoType, number>(
  "recipes/fetchRecipeInfo",
  async (recipeId: number) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
      return response.data;
    } catch (error) {
      // Assuming the API returns an error message as a string
      throw Error("Failed to fetch recipe Info"); // Throw an error if fetching fails
    }
  },
)

// reducers
const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        // console.log("Data fetched:", action.payload);
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(fetchRecipeInfo.pending, state => {
        state.loading = true
      })
      .addCase(fetchRecipeInfo.fulfilled, (state, action) => {
        state.loading = false
        state.recipeInfo = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchRecipeInfo.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default recipeSlice.reducer;

// API keys:
// EA: 013562ac369b4664b552f29d4aa440ed Qwerty: 2ecf0a5ce6b7456e97ff317224c58869