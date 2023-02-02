import { useState } from 'react';

export default function useStateContainer() {
  const [mealOrDrink, setMealOrDrink] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState('');
  const [getIdContinueRecipe, setGetIdContinueRecipe] = useState([]);
  const [getIdDoneRecipe, setGetIdDoneRecipe] = useState([]);

  return {
    mealOrDrink,
    setMealOrDrink,
    doneRecipes,
    setDoneRecipes,
    inProgressRecipes,
    setInProgressRecipes,
    getIdContinueRecipe,
    setGetIdContinueRecipe,
    getIdDoneRecipe,
    setGetIdDoneRecipe,
  };
}
