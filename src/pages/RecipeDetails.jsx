import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useRequestAPI from '../hooks/useRequestAPI';

const MAGIC_NUMBER7 = 7;
const MAGIC_NUMBER8 = 8;

export default function RecipeDetails() {
  const history = useHistory();
  const { makeFetch } = useRequestAPI();
  const [recipes, setRecipes] = useState('a');

  const getRecipeDetails = async () => {
    let mealOrDrink = '';
    let ENDPOINT = '';
    // lookup.php?i={id-da-receita}

    if (history.location.pathname.includes('meals')) {
      mealOrDrink = 'meal';
      const id = history.location.pathname.substring(MAGIC_NUMBER7);
      ENDPOINT = `lookup.php?i=${id}`;
      setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
    } else if (history.location.pathname.includes('drinks')) {
      mealOrDrink = 'cocktail';
      const id = history.location.pathname.substring(MAGIC_NUMBER8);
      ENDPOINT = `lookup.php?i=${id}`;
      setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <div>
      a
    </div>
  );
}
