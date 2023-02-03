import React, { useEffect, useState } from 'react';
import CardDone from '../components/CardDone';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipesLS, setDoneRecipesLS] = useState([]);
  const [mealsDoneRecipes, setMealsDoneRecipes] = useState([]);
  const [drinksDoneRecipes, setDrinksDoneRecipes] = useState([]);
  const [choiceFilter, setChoiceFilter] = useState('');

  const separateByType = () => {
    if (doneRecipesLS.length > 0) {
      setMealsDoneRecipes(doneRecipesLS.filter((element) => (element.type === 'meal')));
      setDrinksDoneRecipes(doneRecipesLS.filter((element) => (element.type === 'drink')));
    }
  };

  const handleFilter = () => {
    if (choiceFilter === 'meal') {
      return <CardDone arrayDoneRecipes={ mealsDoneRecipes } />;
    } if (choiceFilter === 'drink') {
      return <CardDone arrayDoneRecipes={ drinksDoneRecipes } />;
    }
    return (
      <div>
        <CardDone arrayDoneRecipes={ doneRecipesLS } />
      </div>
    );
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipesLS(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  useEffect(() => {
    separateByType();
  }, [doneRecipesLS]);

  return (
    <div>
      <Header title="Done Recipes" />
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
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]
