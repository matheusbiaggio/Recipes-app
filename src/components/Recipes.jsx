import React, { useContext, useEffect } from 'react';
import CardMeal from './CardMeal';
import CardDrink from './CardDrink';
import useRequestAPI from '../hooks/useRequestAPI';
import AppContext from '../context/AppContext';

function Recipes({ mealOrDrink }) {
  const { setRenderElements } = useContext(AppContext);

  const { isLoading, makeFetch } = useRequestAPI();

  const renderCard = () => {
    if (mealOrDrink === 'cocktail') {
      return <CardDrink mealOrDrink="cocktail" />;
    }
    return <CardMeal mealOrDrink="meal" />;
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await makeFetch(mealOrDrink, 'search.php?s=');
        if (mealOrDrink === 'cocktail') {
          setRenderElements(data.drinks);
        } else if (mealOrDrink === 'meal') {
          setRenderElements(data.meals);
        }
      } finally {
        console.log('Request resolved');
      }
    };

    getList();
  }, []);

  useEffect(() => {
    renderCard();
  }, [mealOrDrink]);

  return (
    <div className="recipesAll">
      {
        isLoading && <span>Carregando...</span>
      }
      {
        renderCard()
      }
    </div>
  );
}

Recipes.propTypes = {}.isRequired;

export default Recipes;
