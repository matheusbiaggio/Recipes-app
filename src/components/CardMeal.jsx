import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function CardMeal({ mealOrDrink }) {
  const { renderElements } = useContext(AppContext);

  const history = useHistory();

  const NUMBER_TWELVE = 12;

  let isMeal = '';

  if (mealOrDrink === 'meal') {
    isMeal = true;
  } else {
    isMeal = false;
  }

  let renderElements12 = [];

  const handleClick = ({ target }) => {
    history.push(`/meals/${target.id}`);
  };

  const renderCard = () => {
    if (renderElements) {
      renderElements12 = isMeal && renderElements.slice(0, NUMBER_TWELVE);
      return (
        renderElements12.map(({ strMealThumb, strMeal, idMeal }, index) => (
          <button
            className="recipe"
            data-testid={ `${index}-recipe-card` }
            id={ idMeal }
            key={ index }
            onClick={ handleClick }
          >
            <img
              className="image-recipe"
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3
              className="title-recipe"
              data-testid={ `${index}-card-name` }
            >
              {strMeal}
            </h3>
          </button>
        ))
      );
    }
  };

  return (
    <div className="containerRecipes">
      {
        renderElements.length !== 0
          ? renderCard() : <span>card vazio</span>
      }
    </div>
  );
}

CardMeal.propTypes = {}.isRequired;

export default CardMeal;
