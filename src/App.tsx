import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import Navigation from "./Components/Navigation";
import Hero from "./Components/Hero";
import RecipeList from "./Components/RecipeList";
import Footer from "./Components/Footer";
import { useEffect } from "react";
import { fetchRecipes } from "./States/recipesSlice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const loading = useSelector((state: RootState) => state.recipe.loading);


  // useEffect(() => {
  //   dispatch(fetchRecipes("random")); // Dispatch action with 'random' query
  // }, [dispatch]);


  return (
    <div className="bg-gray-100">
      <Navigation />
      <main className="py-10">
        <Hero dispatch={dispatch} />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : <RecipeList recipes={recipes} />}
      </main>
      <Footer />
      {/* <button onClick={handleClick}>Get repicpes</button> */}
    </div>
  );
}
