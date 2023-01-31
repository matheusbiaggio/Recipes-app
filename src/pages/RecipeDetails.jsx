import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  let mealOrDrink = '';

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

  const renderRecipes = () => {
    if (recipes) {
      const data = recipes.meals ? recipes.meals[0] : recipes.drinks[0];
      const isMeal = !!recipes.meals;
      const teste = Object.entries((data));
      const arrayIngredients = [];
      const arrayMeasure = [];
      for (let i = 0; i < Object.keys(data).length; i += 1) {
        if (teste[i][1] && teste[i][0].includes('Ingredient')) {
          arrayIngredients.push(teste[i][1]);
        } else if (teste[i][1] && teste[i][0].includes('Measure')) {
          arrayMeasure.push(teste[i][1]);
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
                  frameBorder="0"
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      {renderRecipes()}
      <Slider { ...settings }>
        {renderAdviceCard()}
      </Slider>
      {/* {arrayDoneRecipes.length > 0 ?  : <button className="Footer" data-testid="start-recipe-btn">
        Start Recipe
      </button> } */}
    </div>

  );
}

