import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import ResponsiveEmbed from 'react-bootstrap/lib/ResponsiveEmbed';
import useRequestAPI from '../hooks/useRequestAPI';

const MAGIC_NUMBER7 = 7;
const MAGIC_NUMBER8 = 8;

export default function RecipeDetails() {
  const history = useHistory();
  const { makeFetch } = useRequestAPI();
  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    const getRecipeDetails = async () => {
      let mealOrDrink = '';
      let ENDPOINT = '';

      if (history.location.pathname.includes('meals')) {
        mealOrDrink = 'meal';
        const id = history.location.pathname.substring(MAGIC_NUMBER7);
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
      } else if (history.location.pathname.includes('drinks')) {
        mealOrDrink = 'cocktail';
        const id = history.location.pathname.substring(MAGIC_NUMBER8);
        ENDPOINT = `lookup.php?i=${id}`;
        setRecipes(await makeFetch(mealOrDrink, ENDPOINT));
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
        }
        else if (teste[i][1] && teste[i][0].includes('Measure')) {
          arrayMeasure.push(teste[i][1]);
        }
      }
      console.log(arrayIngredients);

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
                  width="853"
                  height="480"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                {/* <ResponsiveEmbed a16by9>
                  <embed src={ data.strYoutube } />
                </ResponsiveEmbed> */}

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

  return (
    renderRecipes()
  );
}

// A foto deve possuir o atributo data-testid="recipe-photo";
// O título deve possuir o atributo data-testid="recipe-title";
// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O texto de instruções deve possuir o atributo data-testid="instructions";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
