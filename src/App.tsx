import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "./States/recipeSlice";
import { RootState, AppDispatch } from "./store";
import Navigation from "./Components/Navigation";
import Hero from "./Components/Hero";
import RecipeList from "./Components/RecipeList";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);


  return (
    <div className="App">
      <Navigation />
      <Hero dispatch={dispatch} />
      <RecipeList recipes={recipes} />

      {/* <button onClick={handleClick}>Get repicpes</button> */}
    </div>
  );
}
