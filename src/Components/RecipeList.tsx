import React from "react";
import { Recipe } from "../States/recipeSlice";
import { Link } from "react-router-dom";

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div>
      <div className=" mb-8 sm:grid sm:grid-cols-3 gap-3">
        {recipes.map((recipe) => (
          <div className="px-2 mb-8" key={recipe.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={recipe.image} alt="Recipe Image" className="w-full" />
              <div className="p-4">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  {recipe.title}
                </h2>
              </div>
              <div className="p-4 bg-gray-100">
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="text-white font-medium px-3 py-2 bg-green-600 hover:bg-gray-300 rounded-lg"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecipeList;
