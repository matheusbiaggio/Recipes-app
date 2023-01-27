import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function CardMeal({ mealOrDrink }) {
  const { renderElements } = useContext(AppContext);

  const NUMBER_TWELVE = 12;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  let renderElements12 = [];

  if (renderElements.length !== 0) {
    renderElements12 = isMeal && renderElements.meals.slice(0, NUMBER_TWELVE);
  }

  return (
    <div>
      {
        renderElements.length !== 0
          ? renderElements12.map(({ strMealThumb, strMeal }, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
            </div>
          )) : <span>card vazio</span>
      }
    </div>
  );
}

CardMeal.propTypes = {}.isRequired;

export default CardMeal;
