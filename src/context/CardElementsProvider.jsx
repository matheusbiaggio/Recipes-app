import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function CardElementsProvider({ children }) {
  const [renderElements, setRenderElements] = useState([]);
  const [favoriteRecipesLS, setFavoriteRecipesLS] = useState([]);
  const [mealsFavoriteRecipes, setMealsFavoriteRecipes] = useState([]);
  const [drinksFavoriteRecipes, setDrinksFavoriteRecipes] = useState([]);

  const NUMBER_TWELVE = 12;

  const verifyElementList = (mealOrDrink, fetchAPI, history) => {
    if (mealOrDrink === 'cocktail') {
      mealOrDrink = 'drinks';
    } else if (mealOrDrink === 'meal') {
      mealOrDrink = 'meals';
    }
    if (Object.values(fetchAPI).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (mealOrDrink === 'meals' && fetchAPI.meals.length === 1) {
      setRenderElements(fetchAPI.meals);
      history.push(`/meals/${fetchAPI.meals[0].idMeal}`);
    } else if (mealOrDrink === 'meals' && fetchAPI.meals.length > 1) {
      setRenderElements(fetchAPI.meals.slice(0, NUMBER_TWELVE));
    } else if (mealOrDrink === 'drinks' && fetchAPI.drinks.length === 1) {
      setRenderElements(fetchAPI.drinks);
      history.push(`/drinks/${fetchAPI.drinks[0].idDrink}`);
    } else if (mealOrDrink === 'drinks' && fetchAPI.drinks.length > 1) {
      setRenderElements(fetchAPI.drinks.slice(0, NUMBER_TWELVE));
    } else {
      console.log('NÃO ERA PARA ENTRAR AQUI');
    }
  };

  const values = useMemo(() => ({
    renderElements,
    setRenderElements,
    verifyElementList,
    favoriteRecipesLS,
    setFavoriteRecipesLS,
    mealsFavoriteRecipes,
    setMealsFavoriteRecipes,
    drinksFavoriteRecipes,
    setDrinksFavoriteRecipes,
  }), [renderElements,
    setRenderElements,
    favoriteRecipesLS,
    setFavoriteRecipesLS,
    mealsFavoriteRecipes,
    setMealsFavoriteRecipes,
    drinksFavoriteRecipes,
    setDrinksFavoriteRecipes]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

CardElementsProvider.propTypes = {}.isRequired;

export default CardElementsProvider;
