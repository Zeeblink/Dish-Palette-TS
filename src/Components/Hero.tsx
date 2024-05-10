import React from "react";
import { useState } from "react";
import { fetchRecipes } from "../States/recipesSlice";
import { AppDispatch } from "../store";

interface HeroProps {
  dispatch: AppDispatch;
}
const Hero: React.FC<HeroProps> = ({ dispatch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [change, setChange] = useState<boolean>(false)

  
  return (
    <div>
      {/* <!-- Hero section --> */}
      <div className="flex-col w-full mt-10 sm:mt-16 mb-24 px-4">
        <h1 className="text-center text-4xl sm:text-5xl mb-14 text-gray-800 leading-1.5 roboto-regular">
          Find the Perfect Recipe for your next meal
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchRecipes(inputValue));
            setChange(true)
          }}
          className="flex items-center justify-center pb-10"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-white focus:outline-none focus:shadow-outline border focus:bg-white border-gray-300 
                rounded-lg py-2 px-4 block w-1/2 appearance-none leading-normal focus:border-green-600"
            type="text"
            placeholder="Search for recipes"
          />
          <button
            id="search"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Search
          </button>
        </form>
      </div>
      <h1 className="text-center text-3xl font-bold origin-center text-gray-800 mb-16">
        {inputValue && change? inputValue  : "Popular"} Recipes
      </h1>
    </div>
  );
};

export default Hero;
