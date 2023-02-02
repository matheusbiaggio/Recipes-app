import React from 'react';

export default function RecipeDetailsDrink({ data, arrayIngredients, arrayMeasure }) {
  return (
    <div>
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
      </div>
    </div>
  );
}

RecipeDetailsDrink.propTypes = {}.isRequired;
