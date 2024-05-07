import React, { useEffect } from 'react'
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchRecipeInfo } from '../States/recipesSlice'

const RecipeInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const recipeInfo = useSelector((state: RootState) => state.recipe.recipeInfo)
  const loading = useSelector((state: RootState) => state.recipe.loading);
  const error = useSelector((state: RootState) => state.recipe.error);

  useEffect(() => {
    dispatch(fetchRecipeInfo(Number(id)))
  }, [dispatch, id])

  const renderInstructions = (instructions: string) => {
    if (!instructions) return null;

    const instructionSteps = instructions.split('<li>').map((step, index) => {
      if (index === 0) return null; // Skip the first element (before the first <li> tag)

      const trimmedStep = step.trim().replace('</li>', '');

      if (trimmedStep.startsWith('<ol>')) {
        // Step with ordered list
        const [stepNumber, stepText] = trimmedStep.split('</ol><li>');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-green-700">{stepNumber}</h3>
            <p
              className="text-green-600"
              dangerouslySetInnerHTML={{ __html: stepText }}
            />
          </div>
        );
      } else if (trimmedStep.includes('<ul>')) {
        // Step with unordered list
        const stepText = trimmedStep.replace('<ul>', '').replace('</ul>', '');
        return (
          <div key={index} className="mb-4">
            <ul className="list-disc list-inside">
              {stepText.split('<li>').map((bullet, index) => (
                <li
                  key={index}
                  className="text-green-600"
                  dangerouslySetInnerHTML={{ __html: bullet.replace('</li>', '') }}
                />
              ))}
            </ul>
          </div>
        );
      } else {
        // Plain text step
        return (
          <div key={index} className="mb-4">
            <p
              className="text-green-600"
              dangerouslySetInnerHTML={{ __html: trimmedStep }}
            />
          </div>
        );
      }
    });

    return <div className="mt-4">{instructionSteps}</div>;
  };

  return (
    <>
      <Navigation />
      <div className="bg-white min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-xl">Error: {error}</p>
          </div>
        ) : recipeInfo ? (
          <div className="container mx-auto py-8">
            <div className="bg-green-50 rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <img
                    src={recipeInfo.image}
                    alt={recipeInfo.title}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold text-green-800 mb-4">
                    {recipeInfo.title}
                  </h1>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">
                      Ingredients
                    </h2>
                    <ul className="list-disc list-inside">
                      {recipeInfo.extendedIngredients.map((ingredient, index) => (
                        <li key={index} className="text-green-600">
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-green-700 mb-2">
                      Instructions
                    </h2>
                    {renderInstructions(recipeInfo.instructions)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-green-500 text-xl">RecipeInfo not found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default RecipeInfo;