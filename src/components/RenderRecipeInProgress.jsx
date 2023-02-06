import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function RenderRecipeInProgress({ recipeInProgress }) {
  const [isShared, setIsShared] = useState(false);
  const history = useHistory;
  const arrayIngredients = [];
  const arrayIngredientsSaved = [];

  const verifyChecked = ({ target }) => {
    arrayIngredients.push(target.name);

    if (target.parentNode.className === 'not-scratched') {
      target.parentNode.className = 'scratched';
    } else {
      target.parentNode.className = 'not-scratched';
    }

    if (recipeInProgress.meals) {
      if (localStorage.getItem('inProgressRecipes')) {
        const mealsInPregress = (JSON.parse(localStorage.getItem('inProgressRecipes')));
        const id = recipeInProgress.meals[0].idMeal;
        const entries = Object.entries(mealsInPregress.meals);
        entries.push([id, arrayIngredients]);
        const atualizedInProgressRecipes = Object.fromEntries(entries);
        mealsInPregress.meals = atualizedInProgressRecipes;
        localStorage.setItem('inProgressRecipes', JSON.stringify(mealsInPregress));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify(mealsInPregress));
      }
    } else if (recipeInProgress.drinks) {
      if (localStorage.getItem('inProgressRecipes')) {
        const drinksInPregress = (JSON.parse(localStorage.getItem('inProgressRecipes')));
        const id = recipeInProgress.drinks[0].idDrink;
        const entries = Object.entries(drinksInPregress.drinks);
        console.log(entries);
        entries.push([id, arrayIngredients]);
        const atualizedInProgressRecipes = Object.fromEntries(entries);
        drinksInPregress.drinks = atualizedInProgressRecipes;
        localStorage.setItem('inProgressRecipes', JSON.stringify(drinksInPregress));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify(drinksInPregress));
      }
    }
  };

  const atualizedInProgressRecipes = () => {
    // arrayIngredientsSaved[0].forEach((element) => {
    //   console.log(element);
    //   // const isEquals = document.getElementsByName(element)[0];
    //   // console.log(typeof isEquals);
    //   // isEquals.checked = true;
    //   // if (document.getElementsByName(element)) {
    //   //
    //   // }
    // });
    // console.log(document.getElementsByName('Frangelico')[0]);
    console.log(arrayIngredientsSaved);
  };

  const getLocalStorageIngredients = () => {
    if (recipeInProgress.meals && localStorage.getItem('inProgressRecipes')) {
      const id = recipeInProgress.meals[0].idMeal;
      const mealsInPregress = (JSON.parse(localStorage.getItem('inProgressRecipes')));
      const entries = Object.entries(mealsInPregress.meals);
      const comparative = entries.filter((element) => element[0] === id);
      console.log(comparative);
      // arrayIngredientsSaved.push(entries);
    }

    if (recipeInProgress.drinks && localStorage.getItem('inProgressRecipes')) {
      const id = recipeInProgress.drinks[0].idDrink;
      const drinksInPregress = (JSON.parse(localStorage.getItem('inProgressRecipes')));
      const entries = Object.entries(drinksInPregress.drinks);
      const comparative = entries.filter((element) => element[0] === id);
      arrayIngredientsSaved.push(comparative[0][1]);
      console.log(arrayIngredientsSaved);
    }

    atualizedInProgressRecipes();
  };

  const renderRecipe = () => {
    if (recipeInProgress) {
      const data = recipeInProgress.meals ? recipeInProgress.meals[0]
        : recipeInProgress.drinks[0];

      const title = recipeInProgress.meals ? recipeInProgress.meals[0].strMeal
        : recipeInProgress.drinks[0].strDrink;
      const img = recipeInProgress.meals ? recipeInProgress.meals[0].strMealThumb
        : recipeInProgress.drinks[0].strDrinkThumb;
      const category = '';
      const instructions = '';
      const keysAndValuesData = Object.entries((data));
      const ingredients = [];
      const measure = [];

      for (let i = 0; i < Object.keys(data).length; i += 1) {
        if (keysAndValuesData[i][1] && keysAndValuesData[i][0].includes('Ingredient')) {
          ingredients.push(keysAndValuesData[i][1]);
        } else if (keysAndValuesData[i][1]
            && keysAndValuesData[i][0].includes('Measure')) {
          measure.push(keysAndValuesData[i][1]);
        }
      }

      return (
        <div>
          <img data-testid="recipe-photo" src={ img } alt="recipe" />
          <h2 data-testid="recipe-title">{ title }</h2>
          <br />
          <h4 data-testid="recipe-category">{ category }</h4>
          <br />
          <span data-testid="instructions">{instructions}</span>
          {ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${ingredient}${measure[index]}` }
              className="not-scratched"
            >
              <input
                className="teste"
                type="checkbox"
                onChange={ verifyChecked }
                name={ ingredient }
                id={ `${ingredient}${measure[index]}` }
              />
              { `${ingredient}${measure[index]}` }
            </label>))}
        </div>
      );
    }
  };

  useEffect(() => {
    getLocalStorageIngredients();
  }, []);

  const shareRecipe = () => {
    setIsShared(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  return (
    <div>
      {renderRecipe()}
      <img
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
        aria-hidden="true"
        src={ shareIcon }
        alt="shareIcon"
      />
      {isShared && <span>Link copied!</span> }
      <img
        aria-hidden="true"
        data-testid="favorite-btn"
        src="favorite"
        alt="favorite"
      />
      <button
        className="Footer"
        data-testid="finish-recipe-btn"
      >
        finish recipe
      </button>
    </div>
  );
}

RenderRecipeInProgress.propTypes = {}.isRequired;
