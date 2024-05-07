import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import Navigation from "./Components/Navigation";
import Hero from "./Components/Hero";
import RecipeList from "./Components/RecipeList";
import Footer from "./Components/Footer";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);


  return (
    <div className="bg-gray-100">
      <Navigation />
      <main className="py-10">
      <Hero dispatch={dispatch} />
      <RecipeList recipes={recipes}/>
      </main>
      <Footer/>
      {/* <button onClick={handleClick}>Get repicpes</button> */}
    </div>
  );
}
