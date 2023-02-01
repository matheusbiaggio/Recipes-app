import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AdviceCard from '../components/AdviceCard';
import useRequestAPI from '../hooks/useRequestAPI';
import '../Css/CssFooter.css';

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

  const mockStorage = {
    drinks: { 13501: ['agua'], 2222: ['açucar'] },
    meals: { 111: ['carne'], 222: ['arroz'] },
  };

  const mockDoneRecipeStorage = [{ id: 15997 }];

  const verifyIdInLocalStorage = () => {
    if (recipes && doneRecipes && inProgressRecipes) {
      const data = recipes.meals ? recipes.meals[0] : recipes.drinks[0];
      if (doneRecipes.mockDoneRecipeStorage.length > 0) {
        if (history.location.pathname.includes('drinks')) {
          const filterId = doneRecipes.mockDoneRecipeStorage.filter((element) => (
            Number(element.id) === Number(data.idDrink)
          ));
          getIdDoneRecipe = filterId;
        } else if (history.location.pathname.includes('meals')) {
          const filterId = doneRecipes.mockDoneRecipeStorage.filter((element) => (
            Number(element.id) === Number(data.idMeal)
          ));
          getIdDoneRecipe = filterId;
        }
      }
      if (Object.keys(inProgressRecipes.mockStorage.drinks).length > 0
        || Object.keys(inProgressRecipes.mockStorage.meals).length > 0) {
        let filterId = '';
        if (history.location.pathname.includes('drinks')) {
          filterId = Object.keys(inProgressRecipes.mockStorage.drinks)
            .filter((element) => (
              element === data.idDrink
            ));
        } else if (history.location.pathname.includes('meals')) {
          filterId = Object.keys(inProgressRecipes.mockStorage.meals)
            .filter((element) => (
              element === Object.keys(data.idMeal)
            ));
        }
        getIdContinueRecipe = filterId;
      }
    }
  };

  const getLocalStorage = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ mockStorage }));
    localStorage.setItem('doneRecipes', JSON.stringify({ mockDoneRecipeStorage }));
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

  useEffect(() => {
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
          { data && isMeal
            ? (
              <div>
                <img src={ data.strMealThumb } alt="" data-testid="recipe-photo" />
                <h2 data-testid="recipe-title">
                  { data.strMeal }
                </h2>
                <span data-testid="recipe-category">
                  Title:
                  { data.strCategory }
                </span>
                {
                  arrayIngredients.map((ingredient, index) => (
                    <span
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      ingredientes:
                      { ingredient }
                      { arrayMeasure[index] }
                    </span>
                  ))
                }
                <span data-testid="instructions">
                  instruções:
                  { data.strInstructions }
                </span>

                <iframe
                  data-testid="video"
                  src={ data.strYoutube }
                  title={ data.strMeal }
                  width="100"
                  height="200"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>)
            : (
              <div>
                <img src={ data.strDrinkThumb } alt="" data-testid="recipe-photo" />
                <h2 data-testid="recipe-title">
                  { data.strDrink }
                </h2>
                <span data-testid="recipe-category">
                  { data.strAlcoholic }
                </span>
                {
                  arrayIngredients.map((ingredient, index) => (
                    <span
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      ingredientes:
                      { ingredient }
                      { arrayMeasure[index] }
                    </span>
                  ))
                }
                <span data-testid="instructions">
                  { data.strInstructions }
                </span>
              </div>)}
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
      console.log('clickou');
      history.push(`${history.location.pathname}/in-progress`);
    }
  };

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
    </div>
  );
}
