import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RenderRecipeInProgress from '../components/RenderRecipeInProgress';
import useRequestAPI from '../hooks/useRequestAPI';

export default function ProgressRecipes() {
  const history = useHistory();

  const id = history.location.pathname.replace(/[^0-9]/g, '');

  const { makeFetch } = useRequestAPI();
  const [recipeInProgress, setRecipeInProgress] = useState('');

  useEffect(() => {
    const getRecipeInProgress = async () => {
      let ENDPOINT = '';
      if (history.location.pathname.includes('meals')) {
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipeInProgress(await makeFetch('meal', ENDPOINT));
      } else if (history.location.pathname.includes('drinks')) {
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipeInProgress(await makeFetch('cocktail', ENDPOINT));
      }
    };
    getRecipeInProgress();
  }, []);
  return (
    <div>
      <RenderRecipeInProgress recipeInProgress={ recipeInProgress } />
    </div>
  );
}
