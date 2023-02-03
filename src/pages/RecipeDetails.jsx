import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdviceCard from '../components/AdviceCard';
import useRequestAPI from '../hooks/useRequestAPI';
import setLocalStorage from '../Services/MockLocalStorage';
import '../Css/CssFooter.css';
import { verifyDoneRecipes, verifyInProgressRecipes } from '../Services/VerifyAll';
import { createObjectDrink, createObjectMeal } from '../Services/CreateObject';
import { incrementLocalStorage } from '../Services/incrementLocalStorage';
import RecipeDetailsMeal from '../components/RecipeDetailsMeal';
import RecipeDetailsDrink from '../components/RecipeDetailsDrink';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const MAGIC_NUMBER8 = 8;
const MAGIC_NUMBER7 = 7;
const MAGIC_NUMBER6 = 6;

export default function RecipeDetails() {
  const history = useHistory();
  const { makeFetch } = useRequestAPI();
  const [recipes, setRecipes] = useState('');
  const [advice, setAdvice] = useState({});
  const [nameButton, setNameButton] = useState('Start Recipe');
  const [showBtn, setShowBtn] = useState(true);
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [isShared, setIsShared] = useState(false);
  // eslint-disable-next-line global-require
  const copy = require('clipboard-copy');
  let mealOrDrink = '';
  let doneRecipes = [];
  let inProgressRecipes = '';
  let getIdContinueRecipe = [];
  let getIdDoneRecipe = [];

  const splitURL = history.location.pathname.split('/');
  const id = splitURL[splitURL.length - 1];

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
    } if (localStorage.getItem('favoriteRecipes')) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
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
    let newFavoriteRecipe = '';
    if (history.location.pathname.split('/')[1] === 'drinks') {
      newFavoriteRecipe = createObjectDrink(recipes.drinks);
    } else {
      newFavoriteRecipe = createObjectMeal(recipes.meals);
    }

    if (localStorage.getItem('favoriteRecipes')) {
      incrementLocalStorage(newFavoriteRecipe);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteRecipe]));
    }
    setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFilterRecipe(favoritesRecipes
      .filter((element) => (Number(element.id) === Number(id))));
  };

  const removeFavorite = () => {
    const filterId = favoritesRecipes
      .filter((element) => Number(element.id) !== Number(id));
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterId));
    setFavoritesRecipes(filterId);
    setFilterRecipe(filterId);
  };

  const shareRecipe = () => {
    setIsShared(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  };

  useEffect(() => {
    setLocalStorage();
    getLocalStorage();
    const getRecipeDetails = async () => {
      let ENDPOINT = '';
      if (history.location.pathname.includes('meals')) {
        mealOrDrink = 'meal';
        const id2 = history.location.pathname.substring(MAGIC_NUMBER7);
        ENDPOINT = `lookup.php?i=${id2}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
        setAdvice(await makeFetch('cocktail', 'search.php?s='));
      } else if (history.location.pathname.includes('drinks')) {
        mealOrDrink = 'cocktail';
        const id3 = history.location.pathname.substring(MAGIC_NUMBER8);
        ENDPOINT = `lookup.php?i=${id3}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
        setAdvice(await makeFetch('meal', 'search.php?s='));
      }
    };
    getRecipeDetails();
  }, []);

  useEffect(() => {
    verifyIdInLocalStorage();
    changeNameBtn();
    setFilterRecipe(favoritesRecipes
      .filter((element) => Number(element.id) === Number(id)));
  }, [recipes, favoritesRecipes]);

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
      <img
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
        aria-hidden="true"
        src={ shareIcon }
        alt="shareIcon"
      />
      {isShared && <span>Link copied!</span> }
      <img
        onClick={ () => (filterRecipe.length > 0 ? removeFavorite() : saveFavorite()) }
        aria-hidden="true"
        data-testid="favorite-btn"
        src={ filterRecipe.length > 0 ? blackHeartIcon : whiteHeartIcon }
        alt={ filterRecipe.length > 0 ? 'blackHeartIcon' : 'whiteHeartIcon' }
      />
    </div>
  );
}
