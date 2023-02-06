import { useState } from 'react';
import useRequestAPI from './useRequestAPI';

export default function useStateContainer() {
  const { makeFetch } = useRequestAPI();
  const [recipeInProgress, setRecipeInProgress] = useState('');

  const getRecipeDetails = async ({ rota, id }) => {
    let ENDPOINT = '';
    if (rota.includes('meals')) {
      ENDPOINT = `lookup.php?i=${id}`;
      setRecipes(await makeFetch('meal', ENDPOINT));
    } else if (rota.includes('drinks')) {
      ENDPOINT = `lookup.php?i=${id}`;
      setRecipes(await makeFetch('cocktail', ENDPOINT));
    }
  };

  return {
    recipeInProgress,
    setRecipeInProgress,
    getRecipeDetails,
  };
}
