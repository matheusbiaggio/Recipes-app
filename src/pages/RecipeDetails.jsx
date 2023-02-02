import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdviceCard from '../components/AdviceCard';
import useRequestAPI from '../hooks/useRequestAPI';
import setLocalStorage from '../Services/MockLocalStorage';
import '../Css/CssFooter.css';
import { verifyDoneRecipes, verifyInProgressRecipes } from '../Services/VerifyAll';
import { createObjectDrink, createObjectMeal } from '../Services/CreateObject';
import { getLocalStorageGeneric } from '../Services/getLocalStorage';
import RecipeDetailsMeal from '../components/RecipeDetailsMeal';
import RecipeDetailsDrink from '../components/RecipeDetailsDrink';

const MAGIC_NUMBER7 = 7;
const MAGIC_NUMBER8 = 8;
const MAGIC_NUMBER6 = 6;

export default function RecipeDetails() {
  const history = useHistory();
  const { makeFetch } = useRequestAPI();
  const [recipes, setRecipes] = useState('');
  const [advice, setAdvice] = useState({});
  const [nameButton, setNameButton] = useState('Start Recipe');
  const [showBtn, setShowBtn] = useState(true);

  let mealOrDrink = '';
  let doneRecipes = [];
  let inProgressRecipes = '';
  let getIdContinueRecipe = [];
  let getIdDoneRecipe = [];

  const verifyIdInLocalStorage = () => {
    if (recipes && doneRecipes && inProgressRecipes) {
      const data = recipes.meals ? recipes.meals[0] : recipes.drinks[0];
      if (doneRecipes.length > 0) {
        getIdDoneRecipe = (
          verifyDoneRecipes(doneRecipes, data, history.location.pathname));
      }
      if (Object.keys(inProgressRecipes.drinks).length > 0
        || Object.keys(inProgressRecipes.meals).length > 0) {
        getIdContinueRecipe = (
          verifyInProgressRecipes(inProgressRecipes, data, history.location.pathname));
      }
    }
  };

  const getLocalStorage = () => {
    if (localStorage.getItem('doneRecipes')) {
      doneRecipes = (JSON.parse(localStorage.getItem('doneRecipes')));
    } if (localStorage.getItem('inProgressRecipes')) {
      inProgressRecipes = (JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  const changeNameBtn = () => {
    if (getIdDoneRecipe.length > 0) {
      setShowBtn(false);
    } else if (getIdDoneRecipe.length === 0 && getIdContinueRecipe.length > 0) {
      setNameButton('Continue Recipe');
    }
  };

  const renderRecipes = () => {
    if (recipes) {
      const data = recipes.meals ? recipes.meals[0] : recipes.drinks[0];
      const isMeal = !!recipes.meals;
      const keysAndValuesData = Object.entries((data));
      const arrayIngredients = [];
      const arrayMeasure = [];
      for (let i = 0; i < Object.keys(data).length; i += 1) {
        if (keysAndValuesData[i][1] && keysAndValuesData[i][0].includes('Ingredient')) {
          arrayIngredients.push(keysAndValuesData[i][1]);
        } else if (keysAndValuesData[i][1]
          && keysAndValuesData[i][0].includes('Measure')) {
          arrayMeasure.push(keysAndValuesData[i][1]);
        }
      }

      return (
        <div>
          {
            data && isMeal
              ? (
                <RecipeDetailsMeal
                  data={ data }
                  arrayIngredients={ arrayIngredients }
                  arrayMeasure={ arrayMeasure }
                />)
              : (
                <RecipeDetailsDrink
                  data={ data }
                  arrayIngredients={ arrayIngredients }
                  arrayMeasure={ arrayMeasure }
                />)
          }
        </div>
      );
    }
  };

  const renderAdviceCard = () => {
    if (Object.keys(advice).length > 0) {
      if (history.location.pathname.includes('meals')) {
        return (
          advice.drinks.map((element, index) => (
            index < MAGIC_NUMBER6 && (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <AdviceCard
                  index={ index }
                  title={ element.strDrink }
                  img={ element.strDrinkThumb }
                />
              </div>)
          ))
        );
      }
      if (history.location.pathname.includes('drinks')) {
        return (
          advice.meals.map((element, index) => (
            index < MAGIC_NUMBER6 && (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <AdviceCard
                  index={ index }
                  title={ element.strMeal }
                  img={ element.strMealThumb }
                />
              </div>)
          ))
        );
      }
    }
  };

  const handleClick = () => {
    if (nameButton === 'Start Recipe') {
      history.push(`${history.location.pathname}/in-progress`);
    }
  };

  const saveFavorite = () => {
    if (recipes) {
      let newFavoriteRecipe = '';
      if (recipes.drinks) {
        newFavoriteRecipe = createObjectDrink(recipes.drinks);
      } else {
        newFavoriteRecipe = createObjectMeal(recipes.meals);
      }

      if (localStorage.getItem('favoriteRecipes')) {
        getLocalStorageGeneric();
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteRecipe]));
      }
    }
  };

  useEffect(() => {
    setLocalStorage();
    const getRecipeDetails = async () => {
      let ENDPOINT = '';
      if (history.location.pathname.includes('meals')) {
        mealOrDrink = 'meal';
        const id = history.location.pathname.substring(MAGIC_NUMBER7);
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
        setAdvice(await makeFetch('cocktail', 'search.php?s='));
      } else if (history.location.pathname.includes('drinks')) {
        mealOrDrink = 'cocktail';
        const id = history.location.pathname.substring(MAGIC_NUMBER8);
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
        setAdvice(await makeFetch('meal', 'search.php?s='));
      }
    };
    getRecipeDetails();
  }, []);

  useEffect(() => {
    getLocalStorage();
    verifyIdInLocalStorage();
    changeNameBtn();
  }, [recipes]);

  return (
    <div>
      {renderRecipes()}
      <div className="container-advice">
        {renderAdviceCard()}
      </div>
      {showBtn && (
        <button
          onClick={ handleClick }
          className="Footer"
          data-testid="start-recipe-btn"
        >
          {nameButton}
        </button>)}
      <button data-testid="share-btn">
        Share Recipe
      </button>
      <button onClick={ saveFavorite } data-testid="favorite-btn">
        Favorite Recipe
      </button>
    </div>
  );
}
