import React from 'react';

export default function RecipeDetailsMeal({ data, arrayIngredients, arrayMeasure }) {
  return (
    <div>
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
        <br />
        <iframe
          data-testid="video"
          src={ data.strYoutube }
          title={ data.strMeal }
          width="100"
          height="200"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}

RecipeDetailsMeal.propTypes = {}.isRequired;
