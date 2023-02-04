import React, { useContext, useEffect, useState } from 'react';
import CardFavorite from '../components/CardFavorite';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function DoneRecipes() {
  const { favoriteRecipesLS, setFavoriteRecipesLS,
    mealsFavoriteRecipes, setMealsFavoriteRecipes,
    drinksFavoriteRecipes, setDrinksFavoriteRecipes } = useContext(AppContext);
  const [choiceFilter, setChoiceFilter] = useState('');

  const separateByType = () => {
    if (favoriteRecipesLS.length > 0) {
      setMealsFavoriteRecipes(favoriteRecipesLS
        .filter((element) => (element.type === 'meal')));
      setDrinksFavoriteRecipes(favoriteRecipesLS
        .filter((element) => (element.type === 'drink')));
    }
  };

  const handleFilter = () => {
    if (choiceFilter === 'meal') {
      return (
        <CardFavorite
          arrayFavoriteRecipes={ mealsFavoriteRecipes }
          typeArray="meal"
        />
      );
    } if (choiceFilter === 'drink') {
      return (
        <CardFavorite
          arrayFavoriteRecipes={ drinksFavoriteRecipes }
          typeArray="drink"
        />
      );
    }
    return (
      <CardFavorite
        arrayFavoriteRecipes={ favoriteRecipesLS }
        typeArray="all"
      />
    );
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavoriteRecipesLS(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useEffect(() => {
    separateByType();
  }, [favoriteRecipesLS]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setChoiceFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setChoiceFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setChoiceFilter('drink') }
      >
        Drinks
      </button>
      { handleFilter() }
    </div>
  );
}

export default DoneRecipes;

// [{
//   id: id-da-receita,
//   type: meal-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]
